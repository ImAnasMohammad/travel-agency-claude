/*
 *  FileName:-     userService.js
 *  Description:-  Business logic for user profile operations and admin management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const userRepository = require("../repositories/userRepository");
const authRepository = require("../../auths/repositories/authRepository");
const AuthModel = require("../../auths/models/AuthModel");
const { uploadFile, deleteFile } = require("../../../shareds/services/storageService");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, ROLES } = require("../../../shareds/constants/appConstants");

const getProfile = async (authId) => {
  const profile = await userRepository.findByAuthId(authId);
  if (!profile) throw new AppError("User profile not found.", HTTP_STATUS.NOT_FOUND);
  return profile;
};

const updateProfile = async (authId, updateData) => {
  const allowedFields = ["firstName", "lastName", "phone", "dateOfBirth", "gender", "preferences"];
  const filteredData = {};
  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) filteredData[field] = updateData[field];
  });
  const profile = await userRepository.updateByAuthId(authId, filteredData);
  if (!profile) throw new AppError("User profile not found.", HTTP_STATUS.NOT_FOUND);
  return profile;
};

const updateAvatar = async (authId, file) => {
  if (!file) throw new AppError("No image file provided.", HTTP_STATUS.BAD_REQUEST);
  const profile = await userRepository.findByAuthId(authId);
  if (!profile) throw new AppError("User profile not found.", HTTP_STATUS.NOT_FOUND);
  if (profile.avatar && profile.avatar.publicId) {
    await deleteFile({ provider: profile.avatar.provider, publicId: profile.avatar.publicId, path: profile.avatar.path });
  }
  const uploaded = await uploadFile(file, "avatars");
  const updated = await userRepository.updateByAuthId(authId, {
    avatar: { url: uploaded.url, publicId: uploaded.publicId || uploaded.filename, provider: uploaded.provider },
  });
  return updated;
};

const getPassportDetails = async (authId) => {
  const profile = await userRepository.findByAuthId(authId);
  if (!profile) throw new AppError("User profile not found.", HTTP_STATUS.NOT_FOUND);
  return profile.passportInfo || {};
};

const updatePassportDetails = async (authId, passportData) => {
  const profile = await userRepository.updateByAuthId(authId, { passportInfo: passportData });
  if (!profile) throw new AppError("User profile not found.", HTTP_STATUS.NOT_FOUND);
  return profile.passportInfo;
};

const changePassword = async (authId, currentPassword, newPassword) => {
  if (!currentPassword || !newPassword) throw new AppError("Current and new passwords are required.", HTTP_STATUS.BAD_REQUEST);
  const authDoc = await authRepository.findByIdWithSensitive(authId);
  if (!authDoc) throw new AppError("User not found.", HTTP_STATUS.NOT_FOUND);
  const isMatch = await authDoc.comparePassword(currentPassword);
  if (!isMatch) throw new AppError("Current password is incorrect.", HTTP_STATUS.BAD_REQUEST);
  authDoc.password = newPassword;
  await authRepository.saveDocument(authDoc);
};

const deleteAccount = async (authId) => {
  await authRepository.updateById(authId, { isActive: false });
  await userRepository.updateByAuthId(authId, { isActive: false });
};

const updateNotificationPreferences = async (authId, preferences) => {
  const profile = await userRepository.updateByAuthId(authId, { notificationPreferences: preferences });
  if (!profile) throw new AppError("User profile not found.", HTTP_STATUS.NOT_FOUND);
  return profile.notificationPreferences || preferences;
};

const getAllUsers = async (query = {}) => {
  const { page = 1, limit = 10, role, search } = query;

  // Build auth filter for role/email search
  const authFilter = {};
  if (role && role !== "all") authFilter.role = role;
  if (search) authFilter.email = { $regex: search, $options: "i" };

  // Get auth IDs matching the filter
  let authIdFilter = {};
  if (Object.keys(authFilter).length > 0) {
    const matchingAuths = await AuthModel.find(authFilter).select("_id").lean();
    const matchingIds = matchingAuths.map((a) => a._id);
    authIdFilter = { authId: { $in: matchingIds } };
  }

  // Also allow name search
  if (search) {
    const nameFilter = { $or: [{ firstName: { $regex: search, $options: "i" } }, { lastName: { $regex: search, $options: "i" } }] };
    if (Object.keys(authIdFilter).length > 0) {
      authIdFilter = { $or: [authIdFilter, nameFilter] };
    } else {
      authIdFilter = nameFilter;
    }
  }

  return userRepository.findAll(authIdFilter, { page: Number(page), limit: Number(limit) });
};

const updateUserBlock = async (authId, isBlocked) => {
  const authDoc = await authRepository.updateById(authId, { isActive: !isBlocked });
  if (!authDoc) throw new AppError("User not found.", HTTP_STATUS.NOT_FOUND);
  return authDoc;
};

const updateUserRole = async (authId, role) => {
  if (!role || !Object.values(ROLES).includes(role)) {
    throw new AppError("Invalid role value.", HTTP_STATUS.BAD_REQUEST);
  }
  const authDoc = await authRepository.updateById(authId, { role });
  if (!authDoc) throw new AppError("User not found.", HTTP_STATUS.NOT_FOUND);
  return authDoc;
};

const getSavedTravellers = async (authId) => {
  const profile = await userRepository.findByAuthId(authId);
  if (!profile) throw new AppError("User profile not found.", HTTP_STATUS.NOT_FOUND);
  return profile.savedTravellers || [];
};

const saveTravellers = async (authId, travellers) => {
  if (!Array.isArray(travellers)) throw new AppError("Travellers must be an array.", HTTP_STATUS.BAD_REQUEST);
  const cleaned = travellers
    .filter((t) => t.firstName && t.lastName)
    .map(({ firstName, lastName, age, gender, nationality, passportNumber, dateOfBirth }) => ({
      firstName, lastName, age, gender, nationality, passportNumber, dateOfBirth,
    }));
  const profile = await userRepository.updateByAuthId(authId, { savedTravellers: cleaned });
  if (!profile) throw new AppError("User profile not found.", HTTP_STATUS.NOT_FOUND);
  return profile.savedTravellers;
};

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
