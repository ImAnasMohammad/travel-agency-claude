/*
 *  FileName:-     vendorRoutes.js
 *  Description:-  Vendor routes for profile management and admin approval
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin, requireVendor } = require("../../../shareds/middlewares/roleMiddleware");

router.use(authenticate);

router.post("/", vendorController.create);
router.get("/:id", vendorController.getById);
router.patch("/:id", vendorController.update);

router.get("/", requireAdmin, vendorController.getAll);
router.patch("/:id/approve", requireAdmin, vendorController.approveReject);

module.exports = router;
