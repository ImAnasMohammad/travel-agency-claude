/*
 *  FileName:-     uploadMiddleware.js
 *  Description:-  Multer setup for handling single and multiple file uploads
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { env } = require("../../configs/envConfig");
const { AppError } = require("../utils/errorHandler");
const { HTTP_STATUS } = require("../constants/appConstants");

const tempUploadDir = path.join(process.cwd(), env.UPLOAD_DIR, "temp");

if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}

/*
 *  functionName:- diskStorage
 *  Description:-  Creates Multer disk storage engine saving to temp folder
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

/*
 *  functionName:- imageFileFilter
 *  Description:-  Validates file mime type for image uploads
 *  Arguments:-    req - Request, file - Multer file, cb - Multer callback
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = env.ALLOWED_IMAGE_TYPES;
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
        HTTP_STATUS.BAD_REQUEST
      ),
      false
    );
  }
};

/*
 *  functionName:- documentFileFilter
 *  Description:-  Validates file mime type for document uploads
 *  Arguments:-    req - Request, file - Multer file, cb - Multer callback
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const documentFileFilter = (req, file, cb) => {
  const allowedTypes = env.ALLOWED_DOC_TYPES;
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
        HTTP_STATUS.BAD_REQUEST
      ),
      false
    );
  }
};

/*
 *  functionName:- uploadSingleImage
 *  Description:-  Multer middleware for single image upload with fieldname parameter
 *  Arguments:-    fieldName - string (default: 'image')
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const uploadSingleImage = (fieldName = "image") => {
  return multer({
    storage: diskStorage,
    fileFilter: imageFileFilter,
    limits: { fileSize: env.MAX_FILE_SIZE },
  }).single(fieldName);
};

/*
 *  functionName:- uploadMultipleImages
 *  Description:-  Multer middleware for multiple image uploads
 *  Arguments:-    fieldName - string, maxCount - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const uploadMultipleImages = (fieldName = "images", maxCount = 10) => {
  return multer({
    storage: diskStorage,
    fileFilter: imageFileFilter,
    limits: { fileSize: env.MAX_FILE_SIZE },
  }).array(fieldName, maxCount);
};

/*
 *  functionName:- uploadSingleDocument
 *  Description:-  Multer middleware for single document upload
 *  Arguments:-    fieldName - string (default: 'document')
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const uploadSingleDocument = (fieldName = "document") => {
  return multer({
    storage: diskStorage,
    fileFilter: documentFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
  }).single(fieldName);
};

/*
 *  functionName:- uploadFields
 *  Description:-  Multer middleware for multiple named fields
 *  Arguments:-    fields - array of { name, maxCount }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const uploadFields = (fields) => {
  return multer({
    storage: diskStorage,
    fileFilter: imageFileFilter,
    limits: { fileSize: env.MAX_FILE_SIZE },
  }).fields(fields);
};

/*
 *  functionName:- handleMulterError
 *  Description:-  Express error handler specifically for Multer errors
 *  Arguments:-    err - error, req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return next(
        new AppError(
          `File too large. Maximum size is ${env.MAX_FILE_SIZE / 1024 / 1024}MB.`,
          HTTP_STATUS.BAD_REQUEST
        )
      );
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return next(
        new AppError("Too many files uploaded.", HTTP_STATUS.BAD_REQUEST)
      );
    }
    return next(new AppError(`Upload error: ${err.message}`, HTTP_STATUS.BAD_REQUEST));
  }
  next(err);
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  uploadSingleDocument,
  uploadFields,
  handleMulterError,
};
