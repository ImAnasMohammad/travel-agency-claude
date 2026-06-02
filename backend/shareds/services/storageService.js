/*
 *  FileName:-     storageService.js
 *  Description:-  File storage service supporting local storage and Cloudinary upload
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const path = require("path");
const fs = require("fs");
const { env } = require("../../configs/envConfig");
const logger = require("../utils/logger");
const { AppError } = require("../utils/errorHandler");
const { HTTP_STATUS } = require("../constants/appConstants");

let cloudinary = null;

/*
 *  functionName:- initCloudinary
 *  Description:-  Initializes Cloudinary SDK with credentials from env
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const initCloudinary = () => {
  if (
    env.CLOUDINARY_CLOUD_NAME &&
    env.CLOUDINARY_API_KEY &&
    env.CLOUDINARY_API_SECRET
  ) {
    try {
      cloudinary = require("cloudinary").v2;
      cloudinary.config({
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
      });
      logger.info("Cloudinary initialized.");
    } catch (err) {
      logger.warn("Cloudinary package not available, using local storage.");
    }
  }
};

initCloudinary();

/*
 *  functionName:- ensureDirectoryExists
 *  Description:-  Creates directory recursively if it does not exist
 *  Arguments:-    dirPath - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/*
 *  functionName:- uploadToLocal
 *  Description:-  Saves uploaded file to local disk and returns file metadata
 *  Arguments:-    file - Multer file object, folder - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const uploadToLocal = (file, folder = "general") => {
  const uploadPath = path.join(process.cwd(), env.UPLOAD_DIR, folder);
  ensureDirectoryExists(uploadPath);

  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
  const filePath = path.join(uploadPath, filename);

  fs.renameSync(file.path, filePath);

  const fileUrl = `${env.CLIENT_URL ? env.CLIENT_URL.replace("3000", env.PORT.toString()) : "http://localhost:5000"}/uploads/${folder}/${filename}`;

  return {
    url: fileUrl,
    filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    path: filePath,
    folder,
    provider: "local",
  };
};

/*
 *  functionName:- uploadToCloudinary
 *  Description:-  Uploads a file to Cloudinary and returns file metadata
 *  Arguments:-    file - Multer file object, folder - string, options - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const uploadToCloudinary = async (file, folder = "general", options = {}) => {
  if (!cloudinary) {
    throw new AppError("Cloudinary is not configured.", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  const uploadOptions = {
    folder: `travel-agency/${folder}`,
    resource_type: "auto",
    transformation: [{ quality: "auto", fetch_format: "auto" }],
    ...options,
  };

  const result = await cloudinary.uploader.upload(file.path, uploadOptions);

  // Clean up temp file
  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
    filename: result.public_id.split("/").pop(),
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: result.bytes,
    folder,
    provider: "cloudinary",
    width: result.width,
    height: result.height,
    format: result.format,
  };
};

/*
 *  functionName:- uploadFile
 *  Description:-  Uploads file to Cloudinary if configured, otherwise to local storage
 *  Arguments:-    file - Multer file object, folder - string, options - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const uploadFile = async (file, folder = "general", options = {}) => {
  if (cloudinary && env.CLOUDINARY_CLOUD_NAME) {
    return uploadToCloudinary(file, folder, options);
  }
  return uploadToLocal(file, folder);
};

/*
 *  functionName:- deleteFile
 *  Description:-  Deletes a file from local storage or Cloudinary
 *  Arguments:-    fileData - object with provider, path/publicId
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteFile = async (fileData) => {
  try {
    if (fileData.provider === "cloudinary" && cloudinary) {
      await cloudinary.uploader.destroy(fileData.publicId);
      logger.info(`Deleted file from Cloudinary: ${fileData.publicId}`);
    } else if (fileData.path && fs.existsSync(fileData.path)) {
      fs.unlinkSync(fileData.path);
      logger.info(`Deleted local file: ${fileData.path}`);
    }
    return true;
  } catch (error) {
    logger.error(`Failed to delete file: ${error.message}`);
    return false;
  }
};

/*
 *  functionName:- deleteLocalFile
 *  Description:-  Deletes a file from local filesystem by path
 *  Arguments:-    filePath - string absolute path
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteLocalFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
};

/*
 *  functionName:- getPublicUrl
 *  Description:-  Returns the public URL for an uploaded file
 *  Arguments:-    filename - string, folder - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getPublicUrl = (filename, folder = "general") => {
  return `http://localhost:${env.PORT}/uploads/${folder}/${filename}`;
};

module.exports = {
  uploadFile,
  uploadToLocal,
  uploadToCloudinary,
  deleteFile,
  deleteLocalFile,
  getPublicUrl,
  ensureDirectoryExists,
};
