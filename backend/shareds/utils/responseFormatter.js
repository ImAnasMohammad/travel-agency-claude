/*
 *  FileName:-     responseFormatter.js
 *  Description:-  Standardized API response formatter with success, message, data, pagination
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const { HTTP_STATUS } = require("../constants/appConstants");

/*
 *  functionName:- successResponse
 *  Description:-  Sends a successful JSON response
 *  Arguments:-    res - Express response, message - string, data - any, statusCode - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const successResponse = (
  res,
  message = "Success",
  data = null,
  statusCode = HTTP_STATUS.OK
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

/*
 *  functionName:- createdResponse
 *  Description:-  Sends a 201 Created response
 *  Arguments:-    res - Express response, message - string, data - any
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const createdResponse = (res, message = "Created successfully", data = null) => {
  return successResponse(res, message, data, HTTP_STATUS.CREATED);
};

/*
 *  functionName:- paginatedResponse
 *  Description:-  Sends a paginated success response with pagination metadata
 *  Arguments:-    res - Express response, message - string, data - array, pagination - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const paginatedResponse = (res, message = "Success", data = [], pagination = {}) => {
  const {
    total = 0,
    page = 1,
    limit = 10,
    totalPages = Math.ceil(total / limit),
  } = pagination;

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages,
      hasNextPage: Number(page) < totalPages,
      hasPrevPage: Number(page) > 1,
    },
    timestamp: new Date().toISOString(),
  });
};

/*
 *  functionName:- errorResponse
 *  Description:-  Sends an error JSON response
 *  Arguments:-    res - Express response, message - string, statusCode - number, errors - array
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const errorResponse = (
  res,
  message = "Something went wrong",
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  errors = null
) => {
  const payload = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };
  if (errors) payload.errors = errors;
  return res.status(statusCode).json(payload);
};

/*
 *  functionName:- notFoundResponse
 *  Description:-  Sends a 404 Not Found response
 *  Arguments:-    res - Express response, message - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const notFoundResponse = (res, message = "Resource not found") => {
  return errorResponse(res, message, HTTP_STATUS.NOT_FOUND);
};

/*
 *  functionName:- unauthorizedResponse
 *  Description:-  Sends a 401 Unauthorized response
 *  Arguments:-    res - Express response, message - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const unauthorizedResponse = (res, message = "Unauthorized") => {
  return errorResponse(res, message, HTTP_STATUS.UNAUTHORIZED);
};

/*
 *  functionName:- forbiddenResponse
 *  Description:-  Sends a 403 Forbidden response
 *  Arguments:-    res - Express response, message - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const forbiddenResponse = (res, message = "Access forbidden") => {
  return errorResponse(res, message, HTTP_STATUS.FORBIDDEN);
};

/*
 *  functionName:- validationErrorResponse
 *  Description:-  Sends a 422 Unprocessable Entity response for validation errors
 *  Arguments:-    res - Express response, errors - array
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const validationErrorResponse = (res, errors = []) => {
  return res.status(HTTP_STATUS.UNPROCESSABLE).json({
    success: false,
    message: "Validation failed",
    errors,
    timestamp: new Date().toISOString(),
  });
};

/*
 *  functionName:- noContentResponse
 *  Description:-  Sends a 204 No Content response
 *  Arguments:-    res - Express response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const noContentResponse = (res) => {
  return res.status(HTTP_STATUS.NO_CONTENT).send();
};

module.exports = {
  successResponse,
  createdResponse,
  paginatedResponse,
  errorResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
  validationErrorResponse,
  noContentResponse,
};
