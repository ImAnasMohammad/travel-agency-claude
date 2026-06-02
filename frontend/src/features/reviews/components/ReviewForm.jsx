/*
 *  FileName:-     ReviewForm.jsx
 *  Description:-  Review writing form with star rating, title, body and image upload
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, X, Loader2 } from 'lucide-react';
import ReviewStarRating from './ReviewStarRating';
import {
  setReviewFormField,
  setReviewRating,
  addReviewImage,
  removeReviewImage,
  resetReviewForm,
  selectReviewForm,
} from '../slices/reviewSlice';

const ReviewForm = ({ onSubmit, isSubmitting, onCancel }) => {
  const dispatch = useDispatch();
  const form = useSelector(selectReviewForm);
  const fileRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.slice(0, 5 - form.images.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => dispatch(addReviewImage(reader.result));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.rating === 0) return;
    onSubmit(form);
  };

  const handleCancel = () => {
    dispatch(resetReviewForm());
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Star Rating */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Rating <span className="text-red-500">*</span>
        </label>
        <ReviewStarRating
          rating={form.rating}
          onChange={(val) => dispatch(setReviewRating(val))}
          size="xl"
          showLabel
        />
        {form.rating === 0 && (
          <p className="text-xs text-gray-400 mt-1">Click a star to rate</p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Review Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => dispatch(setReviewFormField({ field: 'title', value: e.target.value }))}
          placeholder="Summarize your experience..."
          maxLength={100}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
            focus:outline-none focus:ring-2 focus:ring-black transition-all"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{form.title.length}/100</p>
      </div>

      {/* Body */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Your Review <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.body}
          onChange={(e) => dispatch(setReviewFormField({ field: 'body', value: e.target.value }))}
          placeholder="Share details of your experience, what you liked, what could be better..."
          rows={5}
          maxLength={1000}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
            focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{form.body.length}/1000</p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Add Photos <span className="text-gray-400 text-xs font-normal">(max 5)</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {form.images.map((img, i) => (
            <div key={i} className="relative w-20 h-20">
              <img src={img} alt="" className="w-full h-full object-cover rounded-xl border border-gray-200" />
              <button
                type="button"
                onClick={() => dispatch(removeReviewImage(i))}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {form.images.length < 5 && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-gray-400 transition-colors"
            >
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Add</span>
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || form.rating === 0 || !form.body.trim()}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-black text-white
            font-semibold text-sm hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
