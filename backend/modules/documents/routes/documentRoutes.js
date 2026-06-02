/*
 *  FileName:-     documentRoutes.js
 *  Description:-  Travel document routes for upload and management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { uploadSingleDocument, handleMulterError } = require("../../../shareds/middlewares/uploadMiddleware");
const { uploadRateLimiter } = require("../../../shareds/middlewares/rateLimitMiddleware");

router.use(authenticate);
router.get("/", documentController.getAll);
router.post(
  "/",
  uploadRateLimiter,
  uploadSingleDocument("document"),
  handleMulterError,
  documentController.upload
);
router.get("/:id/download", documentController.download);
router.delete("/:id", documentController.remove);

module.exports = router;
