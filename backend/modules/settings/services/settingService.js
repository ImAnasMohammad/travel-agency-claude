/*
 *  FileName:-     settingService.js
 *  Description:-  Business logic for platform settings (singleton get/update)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const SettingModel = require("../models/SettingModel");

const getSettings = async () => {
  let settings = await SettingModel.findOne({ singleton: "platform" });
  if (!settings) {
    settings = await SettingModel.create({ singleton: "platform" });
  }
  return settings;
};

const updateSettings = async (data) => {
  const settings = await SettingModel.findOneAndUpdate(
    { singleton: "platform" },
    { $set: data },
    { new: true, upsert: true, runValidators: true }
  );
  return settings;
};

module.exports = { getSettings, updateSettings };
