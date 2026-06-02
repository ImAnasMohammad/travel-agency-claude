/*
 *  FileName:-     packageRoutes.js
 *  Description:-  Package routes for public browsing and admin management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");
const { searchRateLimiter } = require("../../../shareds/middlewares/rateLimitMiddleware");

router.get("/", searchRateLimiter, packageController.getAll);
router.get("/featured", packageController.getFeatured);
router.get("/search", searchRateLimiter, packageController.search);
router.get("/admin/all", authenticate, requireAdmin, packageController.getAllAdmin);
router.get("/:id", packageController.getById);

router.use(authenticate, requireAdmin);
router.post("/", packageController.create);
router.patch("/:id", packageController.update);
router.delete("/:id", packageController.remove);

module.exports = router;
