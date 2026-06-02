/*
 *  FileName:-     notificationRoutes.js
 *  Description:-  Notification routes
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");

router.use(authenticate);
router.get("/", notificationController.getAll);
router.patch("/read-all", notificationController.markAllRead);
router.patch("/:id/read", notificationController.markRead);
router.delete("/:id", notificationController.remove);

module.exports = router;
