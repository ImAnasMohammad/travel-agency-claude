/*
 *  FileName:-     AdminReviewModerationCard.jsx
 *  Description:-  Review card component with approve/reject actions and star rating display
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Star, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const STATUS_CONFIG = {
  pending: { label: 'Pending Review', classes: 'bg-amber-100 text-amber-700' },
  approved: { label: 'Approved', classes: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Rejected', classes: 'bg-red-100 text-red-700' },
  flagged: { label: 'Flagged', classes: 'bg-orange-100 text-orange-700' },
};

const StarRating = ({ value, max = 5 }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(max)].map((_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < value ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
    ))}
  </div>
);

// Normalise both real API shape and legacy mock shape into a common structure
const normalise = (review) => {
  const id = review._id || review.id;
  const userName = review.user?.name || review.userId?.firstName
    ? `${review.userId?.firstName || ''} ${review.userId?.lastName || ''}`.trim()
    : review.user?.email?.split('@')[0] || 'User';
  const userEmail = review.user?.email || review.userId?.email || '';
  const packageTitle = typeof review.package === 'string'
    ? review.package
    : (review.package?.title || review.packageId?.title || '—');
  const comment = review.comment || review.body || '';
  const date = review.date || review.createdAt;

  // Derive status string from isApproved / status field
  let status = review.status;
  if (!status) {
    status = review.isApproved ? 'approved' : 'pending';
  }

  return { id, userName, userEmail, packageTitle, comment, date, status };
};

const AdminReviewModerationCard = ({ review, onApprove, onReject, onView }) => {
  const { id, userName, userEmail, packageTitle, comment, date, status } = normalise(review);
  const { rating, title, images } = review;
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const canModerate = status === 'pending' || status === 'flagged';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {userName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.classes}`}>{cfg.label}</span>
          {date && <p className="text-xs text-gray-400">{new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
        </div>
      </div>

      {/* Package */}
      <p className="text-xs font-medium text-[#0B4F6C] bg-[#0B4F6C]/10 inline-block px-2 py-0.5 rounded mb-2">
        {packageTitle}
      </p>

      {/* Rating + Title */}
      <div className="flex items-center gap-2 mb-2">
        <StarRating value={rating} />
        <span className="text-sm font-bold text-gray-700">{rating}/5</span>
      </div>
      {title && <h4 className="text-sm font-semibold text-gray-800 mb-1.5">"{title}"</h4>}

      {/* Comment */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{comment}</p>

      {/* Images */}
      {images && images.length > 0 && (
        <div className="flex gap-2 mt-3">
          {images.slice(0, 3).map((img, idx) => (
            <img key={idx} src={img?.url || img} alt="" className="w-14 h-14 rounded-lg object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
          ))}
          {images.length > 3 && (
            <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">+{images.length - 3}</div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
        {canModerate ? (
          <>
            <button onClick={() => onApprove?.(id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" /> Approve
            </button>
            <button onClick={() => onReject?.(id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors">
              <ThumbsDown className="w-3.5 h-3.5" /> Reject
            </button>
          </>
        ) : (
          <span className={`text-xs font-semibold ${status === 'approved' ? 'text-emerald-600' : 'text-red-500'}`}>
            {status === 'approved' ? '✓ Approved' : '✗ Rejected'}
          </span>
        )}
        <button onClick={() => onView?.(review)} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors">
          <Eye className="w-3.5 h-3.5" /> View Full
        </button>
      </div>
    </motion.div>
  );
};

export default AdminReviewModerationCard;
