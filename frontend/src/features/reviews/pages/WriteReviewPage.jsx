/*
 *  FileName:-     WriteReviewPage.jsx
 *  Description:-  Full review writing page with package summary header
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, CheckCircle } from 'lucide-react';
import ReviewForm from '../components/ReviewForm';
import { useReviews } from '../hooks/useReviews';

const WriteReviewPage = () => {
  const { packageId, bookingId } = useParams();
  const navigate = useNavigate();
  const { handleCreate, isCreating } = useReviews(packageId);

  // Mock package data — in real app, fetch by packageId
  const pkg = {
    name: 'Bali Paradise Escape',
    destination: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
    travelDate: '2026-01-15',
    duration: '7N/8D',
  };

  const handleSubmit = async (formData) => {
    try {
      await handleCreate({ ...formData, bookingId });
      navigate(`/packages/${packageId}`);
    } catch { /* errors handled in hook */ }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link
            to={`/packages/${packageId}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Package
          </Link>
          <h1 className="text-2xl font-black">Write a Review</h1>
          <p className="text-gray-400 text-sm mt-1">Share your experience to help other travelers</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Package Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6"
        >
          <div className="flex gap-4 p-5">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
            />
            <div>
              <h3 className="font-bold text-gray-900">{pkg.name}</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{pkg.destination}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(pkg.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Verified Trip</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Review Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-5">Your Review</h2>
          <ReviewForm
            onSubmit={handleSubmit}
            isSubmitting={isCreating}
            onCancel={() => navigate(-1)}
          />
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700"
        >
          <p className="font-semibold mb-2">Tips for a great review:</p>
          <ul className="space-y-1 text-blue-600">
            <li>• Be specific about what you liked or disliked</li>
            <li>• Mention the highlights of the destination</li>
            <li>• Comment on tour guides, accommodation, food</li>
            <li>• Upload photos to make your review more helpful</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default WriteReviewPage;
