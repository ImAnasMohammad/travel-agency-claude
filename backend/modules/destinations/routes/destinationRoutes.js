/*
 *  FileName:-     destinationRoutes.js
 *  Description:-  Destination routes for public listing and admin CRUD
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

router.get("/", destinationController.getAll);
router.get("/featured", destinationController.getFeatured);
router.get("/:id", destinationController.getById);

router.use(authenticate, requireAdmin);
router.post("/", destinationController.create);
router.patch("/:id", destinationController.update);
router.delete("/:id", destinationController.remove);

module.exports = router;
