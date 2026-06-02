/*
 *  FileName:-     agentController.js
 *  Description:-  HTTP handlers for agent operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const agentService = require("../services/agentService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, createdResponse, paginatedResponse } = require("../../../shareds/utils/responseFormatter");

const getProfile = asyncWrapper(async (req, res) => {
  const profile = await agentService.getProfile(req.user.userId);
  return successResponse(res, "Agent profile fetched.", profile);
});

const createProfile = asyncWrapper(async (req, res) => {
  const profile = await agentService.createProfile(req.user.userId, req.body);
  return createdResponse(res, "Agent profile created.", profile);
});

const updateProfile = asyncWrapper(async (req, res) => {
  const profile = await agentService.updateProfile(req.user.userId, req.body);
  return successResponse(res, "Agent profile updated.", profile);
});

const getBookings = asyncWrapper(async (req, res) => {
  const result = await agentService.getBookings(req.user.userId, req.query);
  return paginatedResponse(res, "Agent bookings fetched.", result.data, { total: result.total, page: result.page, limit: result.limit });
});

const getCommissions = asyncWrapper(async (req, res) => {
  const commissions = await agentService.getCommissions(req.user.userId);
  return successResponse(res, "Commissions fetched.", commissions);
});

const createQuote = asyncWrapper(async (req, res) => {
  const quote = await agentService.createQuote(req.user.userId, req.body);
  return createdResponse(res, "Quote created.", quote);
});

const getAllAgents = asyncWrapper(async (req, res) => {
  const result = await agentService.getAllAgents(req.query);
  return paginatedResponse(res, "All agents fetched.", result.data, { total: result.total, page: result.page, limit: result.limit });
});

const updateAgentStatus = asyncWrapper(async (req, res) => {
  const agent = await agentService.updateAgentStatus(req.params.id, req.body.status);
  return successResponse(res, "Agent status updated.", agent);
});

module.exports = { getProfile, createProfile, updateProfile, getBookings, getCommissions, createQuote, getAllAgents, updateAgentStatus };
