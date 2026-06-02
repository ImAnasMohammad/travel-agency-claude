/*
 *  FileName:-     itineraryRoutes.js
 *  Description:-  Itinerary routes
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const itineraryController = require("../controllers/itineraryController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

router.get("/package/:packageId", itineraryController.getByPackage);

router.use(authenticate, requireAdmin);
router.post("/", itineraryController.create);
router.patch("/:id", itineraryController.update);
router.delete("/:id", itineraryController.remove);

module.exports = router;
