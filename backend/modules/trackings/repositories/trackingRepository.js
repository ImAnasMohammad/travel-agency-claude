/*
 *  FileName:-     trackingRepository.js
 *  Description:-  Data access layer for Tracking model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const TrackingModel = require("../models/TrackingModel");

/*
 *  functionName:- findByBooking
 *  Description:-  Finds tracking for a booking
 *  Arguments:-    bookingId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByBooking = async (bookingId) => {
  return TrackingModel.findOne({ booking: bookingId }).exec();
};

/*
 *  functionName:- findByShareToken
 *  Description:-  Finds tracking by share token for public access
 *  Arguments:-    token - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByShareToken = async (token) => {
  return TrackingModel.findOne({ shareToken: token, isShareEnabled: true }).exec();
};

/*
 *  functionName:- findOrCreate
 *  Description:-  Finds existing tracking or creates new one for booking
 *  Arguments:-    bookingId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findOrCreate = async (bookingId) => {
  let tracking = await TrackingModel.findOne({ booking: bookingId }).exec();
  if (!tracking) {
    tracking = new TrackingModel({ booking: bookingId, updates: [] });
    await tracking.save();
  }
  return tracking;
};

/*
 *  functionName:- save
 *  Description:-  Saves a tracking document instance
 *  Arguments:-    tracking - TrackingModel instance
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const save = async (tracking) => tracking.save();

/*
 *  functionName:- updateById
 *  Description:-  Updates tracking by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return TrackingModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

module.exports = { findByBooking, findByShareToken, findOrCreate, save, updateById };
