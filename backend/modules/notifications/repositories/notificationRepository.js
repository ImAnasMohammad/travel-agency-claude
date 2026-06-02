/*
 *  FileName:-     notificationRepository.js
 *  Description:-  Data access layer for Notification model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const NotificationModel = require("../models/NotificationModel");

/*
 *  functionName:- findByUser
 *  Description:-  Returns paginated notifications for a user
 *  Arguments:-    userId - string, options - { page, limit, isRead }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUser = async (userId, options = {}) => {
  const { page = 1, limit = 20, isRead } = options;
  const skip = (page - 1) * limit;
  const filter = { user: userId };
  if (isRead !== undefined) filter.isRead = isRead === "true" || isRead === true;
  const [data, total] = await Promise.all([
    NotificationModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
    NotificationModel.countDocuments(filter).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

/*
 *  functionName:- create
 *  Description:-  Creates a new notification
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new NotificationModel(data);
  return doc.save();
};

/*
 *  functionName:- markRead
 *  Description:-  Marks a specific notification as read
 *  Arguments:-    id - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const markRead = async (id, userId) => {
  return NotificationModel.findOneAndUpdate(
    { _id: id, user: userId },
    { isRead: true, readAt: new Date() },
    { new: true }
  ).exec();
};

/*
 *  functionName:- markAllRead
 *  Description:-  Marks all notifications as read for a user
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const markAllRead = async (userId) => {
  return NotificationModel.updateMany(
    { user: userId, isRead: false },
    { isRead: true, readAt: new Date() }
  ).exec();
};

/*
 *  functionName:- deleteById
 *  Description:-  Deletes a notification by ID for a user
 *  Arguments:-    id - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id, userId) => {
  return NotificationModel.findOneAndDelete({ _id: id, user: userId }).exec();
};

/*
 *  functionName:- countUnread
 *  Description:-  Returns unread notification count for a user
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const countUnread = async (userId) => {
  return NotificationModel.countDocuments({ user: userId, isRead: false }).exec();
};

module.exports = { findByUser, create, markRead, markAllRead, deleteById, countUnread };
