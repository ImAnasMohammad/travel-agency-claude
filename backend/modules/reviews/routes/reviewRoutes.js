/*
 *  FileName:-     reviewRoutes.js
 *  Description:-  Review routes for user and admin review management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

router.get("/package/:packageId", reviewController.getByPackage);

router.use(authenticate);
router.post("/", reviewController.create);
router.patch("/:id", reviewController.update);
router.delete("/:id", reviewController.remove);

router.get("/admin/all", requireAdmin, reviewController.getAllForAdmin);
router.patch("/:id/moderate", requireAdmin, reviewController.moderate);

module.exports = router;
