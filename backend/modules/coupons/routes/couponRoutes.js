/*
 *  FileName:-     couponRoutes.js
 *  Description:-  Coupon routes for validation and admin management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

router.use(authenticate);
router.post("/validate", couponController.validate);

router.use(requireAdmin);
router.get("/", couponController.getAll);
router.post("/", couponController.create);
router.patch("/:id", couponController.update);
router.delete("/:id", couponController.remove);

module.exports = router;
