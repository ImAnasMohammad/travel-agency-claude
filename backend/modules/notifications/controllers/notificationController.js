/*
 *  FileName:-     notificationController.js
 *  Description:-  HTTP handlers for notification management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const notificationService = require("../services/notificationService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, paginatedResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getAll
 *  Description:-  Returns user notifications
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = asyncWrapper(async (req, res) => {
  const result = await notificationService.getAll(req.user.userId, req.query);
  return paginatedResponse(res, "Notifications fetched.", result.data, { total: result.total, page: result.page, limit: result.limit });
});

/*
 *  functionName:- markRead
 *  Description:-  Marks a notification as read
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const markRead = asyncWrapper(async (req, res) => {
  const notification = await notificationService.markRead(req.params.id, req.user.userId);
  return successResponse(res, "Notification marked as read.", notification);
});

/*
 *  functionName:- markAllRead
 *  Description:-  Marks all notifications as read
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const markAllRead = asyncWrapper(async (req, res) => {
  const result = await notificationService.markAllRead(req.user.userId);
  return successResponse(res, result.message, null);
});

/*
 *  functionName:- remove
 *  Description:-  Deletes a notification
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = asyncWrapper(async (req, res) => {
  const result = await notificationService.remove(req.params.id, req.user.userId);
  return successResponse(res, result.message, null);
});

module.exports = { getAll, markRead, markAllRead, remove };
