/*
 *  FileName:-     roleMiddleware.js
 *  Description:-  Role-based access control middleware for user, admin, agent, vendor roles
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const { AppError } = require("../utils/errorHandler");
const { ROLES, HTTP_STATUS } = require("../constants/appConstants");

/*
 *  functionName:- requireRoles
 *  Description:-  Returns middleware that restricts access to specified roles
 *  Arguments:-    ...roles - allowed role strings
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError("Authentication required.", HTTP_STATUS.UNAUTHORIZED)
      );
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Access denied. Required role(s): ${roles.join(", ")}. Your role: ${req.user.role}`,
          HTTP_STATUS.FORBIDDEN
        )
      );
    }
    next();
  };
};

/*
 *  functionName:- requireAdmin
 *  Description:-  Restricts route to admin role only
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const requireAdmin = requireRoles(ROLES.ADMIN);

/*
 *  functionName:- requireAgent
 *  Description:-  Restricts route to agent role only
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const requireAgent = requireRoles(ROLES.AGENT);

/*
 *  functionName:- requireVendor
 *  Description:-  Restricts route to vendor role only
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const requireVendor = requireRoles(ROLES.VENDOR);

/*
 *  functionName:- requireAdminOrAgent
 *  Description:-  Restricts route to admin or agent roles
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const requireAdminOrAgent = requireRoles(ROLES.ADMIN, ROLES.AGENT);

/*
 *  functionName:- requireAdminOrVendor
 *  Description:-  Restricts route to admin or vendor roles
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const requireAdminOrVendor = requireRoles(ROLES.ADMIN, ROLES.VENDOR);

/*
 *  functionName:- requireAnyStaff
 *  Description:-  Restricts route to admin, agent, or vendor roles
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const requireAnyStaff = requireRoles(ROLES.ADMIN, ROLES.AGENT, ROLES.VENDOR);

/*
 *  functionName:- requireOwnerOrAdmin
 *  Description:-  Checks if user is the resource owner or an admin
 *  Arguments:-    getOwnerIdFn - async function(req) returning owner ID string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const requireOwnerOrAdmin = (getOwnerIdFn) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new AppError("Authentication required.", HTTP_STATUS.UNAUTHORIZED));
      }
      if (req.user.role === ROLES.ADMIN) {
        return next();
      }
      const ownerId = await getOwnerIdFn(req);
      if (!ownerId) {
        return next(new AppError("Resource not found.", HTTP_STATUS.NOT_FOUND));
      }
      if (ownerId.toString() !== req.user.userId.toString()) {
        return next(
          new AppError(
            "You are not authorized to perform this action.",
            HTTP_STATUS.FORBIDDEN
          )
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  requireRoles,
  requireAdmin,
  requireAgent,
  requireVendor,
  requireAdminOrAgent,
  requireAdminOrVendor,
  requireAnyStaff,
  requireOwnerOrAdmin,
};
