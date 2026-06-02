/*
 *  FileName:-     documentService.js
 *  Description:-  Business logic for travel document upload and management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const documentRepository = require("../repositories/documentRepository");
const { uploadFile, deleteFile } = require("../../../shareds/services/storageService");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getAll
 *  Description:-  Returns all travel documents for a user
 *  Arguments:-    userId - string, query - { type }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = async (userId, query = {}) => {
  const filter = {};
  if (query.type) filter.type = query.type;
  if (query.bookingId) filter.booking = query.bookingId;
  return documentRepository.findByUser(userId, filter);
};

/*
 *  functionName:- upload
 *  Description:-  Uploads a travel document file and saves record
 *  Arguments:-    userId - string, file - Multer file, data - { type, title, bookingId, expiryDate }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const upload = async (userId, file, data) => {
  if (!file) throw new AppError("No file provided.", HTTP_STATUS.BAD_REQUEST);

  const uploaded = await uploadFile(file, "documents");

  return documentRepository.create({
    user: userId,
    type: data.type,
    title: data.title,
    booking: data.bookingId || undefined,
    documentNumber: data.documentNumber,
    expiryDate: data.expiryDate,
    issueDate: data.issueDate,
    issuingCountry: data.issuingCountry,
    fileUrl: uploaded.url,
    fileName: uploaded.filename,
    fileSize: uploaded.size,
    mimeType: uploaded.mimetype,
    publicId: uploaded.publicId,
    provider: uploaded.provider,
  });
};

/*
 *  functionName:- remove
 *  Description:-  Deletes a travel document record and file
 *  Arguments:-    docId - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = async (docId, userId) => {
  const doc = await documentRepository.findById(docId);
  if (!doc || doc.user.toString() !== userId) {
    throw new AppError("Document not found.", HTTP_STATUS.NOT_FOUND);
  }

  if (doc.publicId && doc.provider) {
    await deleteFile({ provider: doc.provider, publicId: doc.publicId, path: doc.fileUrl });
  }

  await documentRepository.deleteById(docId);
  return { message: "Document deleted." };
};

/*
 *  functionName:- download
 *  Description:-  Returns document download URL
 *  Arguments:-    docId - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const download = async (docId, userId) => {
  const doc = await documentRepository.findById(docId);
  if (!doc || doc.user.toString() !== userId) {
    throw new AppError("Document not found.", HTTP_STATUS.NOT_FOUND);
  }
  return { fileUrl: doc.fileUrl, fileName: doc.fileName, mimeType: doc.mimeType };
};

module.exports = { getAll, upload, remove, download };
