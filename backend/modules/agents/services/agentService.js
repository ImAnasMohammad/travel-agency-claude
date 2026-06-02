/*
 *  FileName:-     agentService.js
 *  Description:-  Business logic for agent profile, bookings, and commission tracking
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const agentRepository = require("../repositories/agentRepository");
const bookingRepository = require("../../bookings/repositories/bookingRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, AGENT_STATUS } = require("../../../shareds/constants/appConstants");

const getProfile = async (userId) => {
  const agent = await agentRepository.findByUserId(userId);
  if (!agent) throw new AppError("Agent profile not found.", HTTP_STATUS.NOT_FOUND);
  return agent;
};

const createProfile = async (userId, data) => {
  const existing = await agentRepository.findByUserId(userId);
  if (existing) throw new AppError("Agent profile already exists.", HTTP_STATUS.CONFLICT);
  return agentRepository.create({ ...data, user: userId });
};

const updateProfile = async (userId, updateData) => {
  const agent = await agentRepository.findByUserId(userId);
  if (!agent) throw new AppError("Agent profile not found.", HTTP_STATUS.NOT_FOUND);
  return agentRepository.updateById(agent._id, updateData);
};

const getBookings = async (userId, query = {}) => {
  const agent = await agentRepository.findByUserId(userId);
  if (!agent) throw new AppError("Agent profile not found.", HTTP_STATUS.NOT_FOUND);
  return bookingRepository.findAll({ agent: agent._id }, query);
};

const getCommissions = async (userId) => {
  const agent = await agentRepository.findByUserId(userId);
  if (!agent) throw new AppError("Agent profile not found.", HTTP_STATUS.NOT_FOUND);
  return {
    totalCommissionEarned: agent.totalCommissionEarned,
    pendingCommission: agent.pendingCommission,
    commissionRate: agent.commissionRate,
    totalRevenue: agent.totalRevenue,
    bookingsCount: agent.bookingsCount,
  };
};

const createQuote = async (agentUserId, quoteData) => {
  const agent = await agentRepository.findByUserId(agentUserId);
  if (!agent) throw new AppError("Agent profile not found.", HTTP_STATUS.NOT_FOUND);
  const booking = await bookingRepository.create({
    ...quoteData,
    agent: agent._id,
    status: "pending",
  });
  return booking;
};

const getAllAgents = async (query = {}) => {
  const { page = 1, limit = 10, status, search } = query;
  const filter = {};
  if (status && status !== "all") filter.status = status;
  if (search) {
    filter.$or = [
      { agencyName: { $regex: search, $options: "i" } },
      { agencyCode: { $regex: search, $options: "i" } },
    ];
  }
  return agentRepository.findAll(filter, { page: Number(page), limit: Number(limit) });
};

const updateAgentStatus = async (agentId, status) => {
  if (!status || !Object.values(AGENT_STATUS).includes(status)) {
    throw new AppError("Invalid status value.", HTTP_STATUS.BAD_REQUEST);
  }
  const updateData = { status };
  if (status === AGENT_STATUS.ACTIVE) updateData.activatedAt = new Date();
  const agent = await agentRepository.updateById(agentId, updateData);
  if (!agent) throw new AppError("Agent not found.", HTTP_STATUS.NOT_FOUND);
  return agent;
};

module.exports = { getProfile, createProfile, updateProfile, getBookings, getCommissions, createQuote, getAllAgents, updateAgentStatus };
