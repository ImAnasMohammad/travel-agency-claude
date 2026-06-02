/*
 *  FileName:-     loyaltyRoutes.js
 *  Description:-  Loyalty points routes for balance and transactions
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const loyaltyController = require("../controllers/loyaltyController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");

router.use(authenticate);
router.get("/balance", loyaltyController.getBalance);
router.get("/transactions", loyaltyController.getTransactions);
router.post("/redeem", loyaltyController.redeem);

module.exports = router;
