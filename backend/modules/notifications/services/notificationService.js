/*
 *  FileName:-     notificationService.js
 *  Description:-  Business logic for notification management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const notificationRepository = require("../repositories/notificationRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getAll
 *  Description:-  Returns paginated notifications for user
 *  Arguments:-    userId - string, query - { page, limit, isRead }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = async (userId, query) => {
  return notificationRepository.findByUser(userId, query);
};

/*
 *  functionName:- markRead
 *  Description:-  Marks a notification as read
 *  Arguments:-    notificationId - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const markRead = async (notificationId, userId) => {
  const notification = await notificationRepository.markRead(notificationId, userId);
  if (!notification) throw new AppError("Notification not found.", HTTP_STATUS.NOT_FOUND);
  return notification;
};

/*
 *  functionName:- markAllRead
 *  Description:-  Marks all notifications as read
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const markAllRead = async (userId) => {
  await notificationRepository.markAllRead(userId);
  return { message: "All notifications marked as read." };
};

/*
 *  functionName:- remove
 *  Description:-  Deletes a notification
 *  Arguments:-    notificationId - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = async (notificationId, userId) => {
  const notification = await notificationRepository.deleteById(notificationId, userId);
  if (!notification) throw new AppError("Notification not found.", HTTP_STATUS.NOT_FOUND);
  return { message: "Notification deleted." };
};

/*
 *  functionName:- create
 *  Description:-  Creates a notification and emits socket event if available
 *  Arguments:-    data - { userId, title, body, type, link, metadata }, io - Socket.io instance
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data, io = null) => {
  const notification = await notificationRepository.create(data);
  if (io) {
    io.to(`user_${data.user}`).emit("notification_received", notification);
  }
  return notification;
};

module.exports = { getAll, markRead, markAllRead, remove, create };
