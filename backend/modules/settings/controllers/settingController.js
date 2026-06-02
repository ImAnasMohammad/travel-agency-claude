/*
 *  FileName:-     settingController.js
 *  Description:-  HTTP handlers for platform settings
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const settingService = require("../services/settingService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse } = require("../../../shareds/utils/responseFormatter");

const getSettings = asyncWrapper(async (req, res) => {
  const settings = await settingService.getSettings();
  return successResponse(res, "Settings fetched.", settings);
});

const updateSettings = asyncWrapper(async (req, res) => {
  const settings = await settingService.updateSettings(req.body);
  return successResponse(res, "Settings updated.", settings);
});

module.exports = { getSettings, updateSettings };
