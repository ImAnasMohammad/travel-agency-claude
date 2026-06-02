/*
 *  FileName:-     ReviewCard.jsx
 *  Description:-  Beautiful review card with user avatar, star rating, text and helpful count
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { ThumbsUp, MoreVertical, Flag, Trash2, Edit2 } from 'lucide-react';
import ReviewStarRating from './ReviewStarRating';

const ReviewCard = ({ review, currentUserId, onDelete, onEdit, onMarkHelpful }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);

  const {
    _id,
    user,
    rating,
    title,
    body,
    images = [],
    helpfulCount = 0,
    createdAt,
    isVerifiedPurchase,
  } = review || {};

  const isOwner = currentUserId && user?._id === currentUserId;

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric',
        })
      : '';

  const getInitials = (name) =>
    (name || 'U').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  const handleHelpful = () => {
    if (!isHelpfulClicked) {
      setIsHelpfulClicked(true);
      onMarkHelpful?.(_id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        {/* User Info */}
        <div className="flex items-start gap-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {getInitials(user?.name)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">{user?.name || 'Anonymous'}</p>
              {isVerifiedPurchase && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <ReviewStarRating rating={rating} size="sm" readonly />
              <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-10 min-w-[140px]">
              {isOwner ? (
                <>
                  <button
                    onClick={() => { onEdit?.(review); setShowMenu(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => { onDelete?.(_id); setShowMenu(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Flag className="w-4 h-4" /> Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Content */}
      <div className="mt-4">
        {title && (
          <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
        )}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{body}</p>
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Review image ${i + 1}`}
              className="w-20 h-20 object-cover rounded-xl flex-shrink-0 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      )}

      {/* Helpful */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <button
          onClick={handleHelpful}
          className={`flex items-center gap-2 text-sm transition-colors
            ${isHelpfulClicked ? 'text-[#0B4F6C] font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <ThumbsUp className={`w-4 h-4 ${isHelpfulClicked ? 'fill-[#0B4F6C]' : ''}`} />
          Helpful ({helpfulCount + (isHelpfulClicked ? 1 : 0)})
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
