/*
 *  FileName:-     userController.js
 *  Description:-  HTTP handlers for user profile operations and admin management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const userService = require("../services/userService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, paginatedResponse } = require("../../../shareds/utils/responseFormatter");

const getProfile = asyncWrapper(async (req, res) => {
  const profile = await userService.getProfile(req.user.userId);
  return successResponse(res, "Profile fetched.", profile);
});

const updateProfile = asyncWrapper(async (req, res) => {
  const profile = await userService.updateProfile(req.user.userId, req.body);
  return successResponse(res, "Profile updated.", profile);
});

const updateAvatar = asyncWrapper(async (req, res) => {
  const profile = await userService.updateAvatar(req.user.userId, req.file);
  return successResponse(res, "Avatar updated.", { avatar: profile.avatar });
});

const getPassportDetails = asyncWrapper(async (req, res) => {
  const passport = await userService.getPassportDetails(req.user.userId);
  return successResponse(res, "Passport details fetched.", passport);
});

const updatePassportDetails = asyncWrapper(async (req, res) => {
  const passport = await userService.updatePassportDetails(req.user.userId, req.body);
  return successResponse(res, "Passport details updated.", passport);
});

const changePassword = asyncWrapper(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await userService.changePassword(req.user.userId, currentPassword, newPassword);
  return successResponse(res, "Password updated successfully.");
});

const deleteAccount = asyncWrapper(async (req, res) => {
  await userService.deleteAccount(req.user.userId);
  return successResponse(res, "Account deleted successfully.");
});

const updateNotificationPreferences = asyncWrapper(async (req, res) => {
  const prefs = await userService.updateNotificationPreferences(req.user.userId, req.body);
  return successResponse(res, "Notification preferences updated.", prefs);
});

const getAllUsers = asyncWrapper(async (req, res) => {
  const result = await userService.getAllUsers(req.query);
  return paginatedResponse(res, "All users fetched.", result.data, { total: result.total, page: result.page, limit: result.limit });
});

const updateUserBlock = asyncWrapper(async (req, res) => {
  const user = await userService.updateUserBlock(req.params.id, req.body.isBlocked);
  return successResponse(res, "User block status updated.", user);
});

const updateUserRole = asyncWrapper(async (req, res) => {
  const user = await userService.updateUserRole(req.params.id, req.body.role);
  return successResponse(res, "User role updated.", user);
});

const getSavedTravellers = asyncWrapper(async (req, res) => {
  const travellers = await userService.getSavedTravellers(req.user.userId);
  return successResponse(res, "Saved travellers fetched.", travellers);
});

const saveTravellers = asyncWrapper(async (req, res) => {
  const travellers = await userService.saveTravellers(req.user.userId, req.body.travellers);
  return successResponse(res, "Travellers saved.", travellers);
});

module.exports = {
  getProfile,
  updateProfile,
  updateAvatar,
  getPassportDetails,
  updatePassportDetails,
  changePassword,
  deleteAccount,
  updateNotificationPreferences,
  getAllUsers,
  updateUserBlock,
  updateUserRole,
  getSavedTravellers,
  saveTravellers,
};
