/*
 *  FileName:-     reviewService.js
 *  Description:-  Business logic for review creation, moderation, and package rating updates
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const reviewRepository = require("../repositories/reviewRepository");
const packageRepository = require("../../packages/repositories/packageRepository");
const bookingRepository = require("../../bookings/repositories/bookingRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, BOOKING_STATUS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getByPackage
 *  Description:-  Returns paginated approved reviews for a package
 *  Arguments:-    packageId - string, query - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getByPackage = async (packageId, query = {}) => {
  return reviewRepository.findByPackage(packageId, query);
};

/*
 *  functionName:- create
 *  Description:-  Creates a review, validates booking ownership and completion
 *  Arguments:-    userId - string, reviewData - { packageId, bookingId, rating, title, body }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (userId, reviewData) => {
  const { packageId, bookingId, rating, title, body } = reviewData;

  const booking = await bookingRepository.findById(bookingId);
  if (!booking) throw new AppError("Booking not found.", HTTP_STATUS.NOT_FOUND);
  if (booking.user.toString() !== userId) throw new AppError("Access denied.", HTTP_STATUS.FORBIDDEN);
  if (booking.status !== BOOKING_STATUS.COMPLETED) {
    throw new AppError("You can only review completed bookings.", HTTP_STATUS.BAD_REQUEST);
  }

  const existing = await reviewRepository.findByUserAndPackage(userId, packageId);
  if (existing) throw new AppError("You have already reviewed this package.", HTTP_STATUS.CONFLICT);

  const review = await reviewRepository.create({
    user: userId,
    package: packageId,
    booking: bookingId,
    rating,
    title,
    body,
    images: reviewData.images || [],
    subRatings: reviewData.subRatings || {},
  });

  return review;
};

/*
 *  functionName:- update
 *  Description:-  Updates a review
 *  Arguments:-    reviewId - string, userId - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = async (reviewId, userId, updateData) => {
  const review = await reviewRepository.findById(reviewId);
  if (!review) throw new AppError("Review not found.", HTTP_STATUS.NOT_FOUND);
  if (review.user.toString() !== userId) throw new AppError("Access denied.", HTTP_STATUS.FORBIDDEN);

  const updated = await reviewRepository.updateById(reviewId, {
    rating: updateData.rating,
    title: updateData.title,
    body: updateData.body,
    isApproved: false,
  });
  return updated;
};

/*
 *  functionName:- remove
 *  Description:-  Deletes a review (user can delete own, admin can delete any)
 *  Arguments:-    reviewId - string, userId - string, role - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = async (reviewId, userId, role) => {
  const review = await reviewRepository.findById(reviewId);
  if (!review) throw new AppError("Review not found.", HTTP_STATUS.NOT_FOUND);
  if (role !== "admin" && review.user.toString() !== userId) {
    throw new AppError("Access denied.", HTTP_STATUS.FORBIDDEN);
  }
  await reviewRepository.deleteById(reviewId);
  await updatePackageRating(review.package.toString());
  return { message: "Review deleted." };
};

/*
 *  functionName:- moderate
 *  Description:-  Admin approves or rejects a review
 *  Arguments:-    reviewId - string, isApproved - boolean, adminNote - string, moderatedBy - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const moderate = async (reviewId, isApproved, adminNote, moderatedBy) => {
  const review = await reviewRepository.updateById(reviewId, {
    isApproved,
    adminNote,
    approvedAt: isApproved ? new Date() : undefined,
    moderatedBy,
  });
  if (!review) throw new AppError("Review not found.", HTTP_STATUS.NOT_FOUND);

  if (isApproved) {
    await updatePackageRating(review.package.toString());
  }

  return review;
};

/*
 *  functionName:- updatePackageRating
 *  Description:-  Recalculates and updates package average rating
 *  Arguments:-    packageId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updatePackageRating = async (packageId) => {
  const stats = await reviewRepository.calculatePackageRating(packageId);
  await packageRepository.updateRating(
    packageId,
    Math.round(stats.avgRating * 10) / 10,
    stats.count
  );
};

/*
 *  functionName:- getAllForAdmin
 *  Description:-  Returns all reviews for admin moderation
 *  Arguments:-    query - { page, limit, isApproved }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAllForAdmin = async (query = {}) => {
  const filter = {};
  if (query.isApproved !== undefined) filter.isApproved = query.isApproved === "true";
  return reviewRepository.findAll(filter, query);
};

module.exports = { getByPackage, create, update, remove, moderate, getAllForAdmin };
