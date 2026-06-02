/*
 *  FileName:-     settingRoutes.js
 *  Description:-  Platform settings routes (admin only)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const settingController = require("../controllers/settingController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

router.get("/", authenticate, requireAdmin, settingController.getSettings);
router.patch("/", authenticate, requireAdmin, settingController.updateSettings);

module.exports = router;
