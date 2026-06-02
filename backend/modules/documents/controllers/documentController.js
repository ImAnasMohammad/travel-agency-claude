/*
 *  FileName:-     documentController.js
 *  Description:-  HTTP handlers for travel document upload and management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const documentService = require("../services/documentService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, createdResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getAll
 *  Description:-  Returns all travel documents
 *  Arguments:-    req - Request (query: type, bookingId), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = asyncWrapper(async (req, res) => {
  const docs = await documentService.getAll(req.user.userId, req.query);
  return successResponse(res, "Documents fetched.", docs);
});

/*
 *  functionName:- upload
 *  Description:-  Uploads a travel document
 *  Arguments:-    req - Request (file, body: type, title, etc.), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const upload = asyncWrapper(async (req, res) => {
  const doc = await documentService.upload(req.user.userId, req.file, req.body);
  return createdResponse(res, "Document uploaded.", doc);
});

/*
 *  functionName:- remove
 *  Description:-  Deletes a travel document
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = asyncWrapper(async (req, res) => {
  const result = await documentService.remove(req.params.id, req.user.userId);
  return successResponse(res, result.message, null);
});

/*
 *  functionName:- download
 *  Description:-  Returns document download info
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const download = asyncWrapper(async (req, res) => {
  const result = await documentService.download(req.params.id, req.user.userId);
  return successResponse(res, "Download URL generated.", result);
});

module.exports = { getAll, upload, remove, download };
