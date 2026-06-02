/*
 *  FileName:-     categoryRoutes.js
 *  Description:-  Category routes for public listing and admin management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);

router.use(authenticate, requireAdmin);
router.post("/", categoryController.create);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.remove);

module.exports = router;
