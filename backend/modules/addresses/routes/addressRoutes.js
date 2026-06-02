/*
 *  FileName:-     addressRoutes.js
 *  Description:-  Address routes for CRUD operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");

router.use(authenticate);
router.get("/", addressController.getAll);
router.post("/", addressController.create);
router.patch("/:id", addressController.update);
router.delete("/:id", addressController.remove);
router.patch("/:id/default", addressController.setDefault);

module.exports = router;
