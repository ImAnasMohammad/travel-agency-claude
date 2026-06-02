/*
 *  FileName:-     PackageDetailsPage.jsx
 *  Description:-  Comprehensive package detail page with gallery, tabs, sticky pricing, and related packages
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Loader2, MapPin, Calendar, Star, MessageSquare, HelpCircle, List, Grid3X3 } from 'lucide-react';
import PackageBanner from '../components/PackageBanner';
import PackageGallery from '../components/PackageGallery';
import PackageHighlights from '../components/PackageHighlights';
import PackageInclusions from '../components/PackageInclusions';
import PackageExclusions from '../components/PackageExclusions';
import PackageFaqs from '../components/PackageFaqs';
import PackagePricingSummary from '../components/PackagePricingSummary';
import PackageCard from '../components/PackageCard';
import usePackageDetails from '../hooks/usePackageDetails';
import { useWishlists } from '../../wishlists/hooks/useWishlists';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Grid3X3 },
  { id: 'itinerary', label: 'Itinerary', icon: List },
  { id: 'inclusions', label: 'Inclusions', icon: ChevronRight },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

const ReviewCard = ({ review }) => (
  <div className="p-5 bg-gray-50 rounded-xl">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] rounded-full flex items-center justify-center text-white text-sm font-bold">
          {review.user?.name?.[0] || 'U'}
        </div>
        <div>
          <p className="text-sm font-semibold text-black">{review.user?.name || 'Anonymous'}</p>
          <p className="text-xs text-gray-400 font-light">{review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {Array(5).fill(0).map((_, i) => (
          <Star key={i} size={12} className={i < review.rating ? 'text-[#FFD166]' : 'text-gray-200'} fill="currentColor" />
        ))}
      </div>
    </div>
    <p className="text-sm text-gray-600 font-light leading-relaxed">{review.comment}</p>
  </div>
);

const ItineraryDay = ({ day }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-bold">{day.day}</span>
      </div>
      <div className="w-0.5 bg-gray-200 flex-1 mt-2" />
    </div>
    <div className="pb-8 flex-1">
      <h3 className="font-bold text-black text-sm mb-1">{day.title}</h3>
      <p className="text-gray-500 font-light text-sm leading-relaxed mb-3">{day.description}</p>
      {day.activities && (
        <div className="flex flex-wrap gap-2">
          {day.activities.map((act, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-light">{act}</span>
          ))}
        </div>
      )}
      {day.accommodation && (
        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500 font-light">
          <span>🏨</span> {day.accommodation}
        </div>
      )}
    </div>
  </div>
);

const PackageDetailsPage = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [galleryOpen, setGalleryOpen] = useState(false);

  const { pkg, gallery, itinerary, inclusions, exclusions, faqs, reviews, highlights, relatedPackages, isLoading, error } = usePackageDetails(slug);
  const { handleToggle } = useWishlists();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 px-4">
        <p className="text-xl font-bold text-black">Package not found</p>
        <Link to="/packages" className="text-sm text-gray-500 hover:text-black underline">Browse all packages</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <PackageBanner pkg={pkg} galleryCount={gallery.length} onGalleryOpen={() => setGalleryOpen(true)} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-light">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={12} />
            <Link to="/packages" className="hover:text-black">Packages</Link>
            <ChevronRight size={12} />
            <span className="text-black font-medium truncate max-w-[200px]">{pkg.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-6 border-b border-gray-200">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors relative ${
                    activeTab === tab.id ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="tabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

                {/* Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Description */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                      <h2 className="text-xl font-bold text-black tracking-tight mb-4">About This Package</h2>
                      <p className="text-gray-600 font-light leading-relaxed">{pkg.description || pkg.overview}</p>
                      {pkg.longDescription && pkg.longDescription !== pkg.description && (
                        <p className="text-gray-600 font-light leading-relaxed mt-3">{pkg.longDescription}</p>
                      )}
                    </div>

                    {/* Highlights */}
                    {highlights.length > 0 && (
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <PackageHighlights highlights={highlights} />
                      </div>
                    )}

                    {/* Gallery Preview */}
                    {gallery.length > 0 && (
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold text-black tracking-tight">Gallery</h2>
                          <button onClick={() => setGalleryOpen(true)}
                            className="text-sm text-gray-500 hover:text-black font-light">
                            View all {gallery.length} photos
                          </button>
                        </div>
                        <PackageGallery images={gallery} title={pkg.title} />
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'Duration', value: `${pkg.duration?.days ?? 0}D / ${pkg.duration?.nights ?? 0}N`, icon: '📅' },
                        { label: 'Group Size', value: `Max ${pkg.maxGroupSize || 20}`, icon: '👥' },
                        { label: 'Difficulty', value: pkg.difficulty || 'Easy', icon: '🏔️' },
                        { label: 'Language', value: pkg.language || 'English', icon: '🌐' },
                      ].map((info) => (
                        <div key={info.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                          <div className="text-2xl mb-1">{info.icon}</div>
                          <p className="text-xs text-gray-400 font-light uppercase tracking-wide mb-1">{info.label}</p>
                          <p className="text-sm font-semibold text-black">{info.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Itinerary */}
                {activeTab === 'itinerary' && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-black tracking-tight mb-6">Day-by-Day Itinerary</h2>
                    {itinerary.length > 0 ? (
                      <div>
                        {itinerary.map((day, i) => (
                          <ItineraryDay key={i} day={{ ...day, day: day.day || i + 1 }} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 font-light text-center py-8">Itinerary details coming soon.</p>
                    )}
                  </div>
                )}

                {/* Inclusions */}
                {activeTab === 'inclusions' && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-8">
                    <PackageInclusions inclusions={inclusions} />
                    <div className="border-t border-gray-100 pt-8">
                      <PackageExclusions exclusions={exclusions} />
                    </div>
                  </div>
                )}

                {/* Reviews */}
                {activeTab === 'reviews' && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-xl font-bold text-black tracking-tight">Reviews</h2>
                      {pkg.rating && (
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl">
                          <Star size={14} className="text-[#FFD166]" fill="currentColor" />
                          <span className="font-bold text-black">{Number(pkg.rating).toFixed(1)}</span>
                          <span className="text-gray-400 text-sm font-light">({pkg.reviewCount || reviews.length} reviews)</span>
                        </div>
                      )}
                    </div>
                    {reviews.length > 0 ? (
                      <div className="space-y-4">
                        {reviews.map((review, i) => <ReviewCard key={i} review={review} />)}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare size={40} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-400 font-light">No reviews yet. Be the first!</p>
                      </div>
                    )}
                  </div>
                )}

                {/* FAQ */}
                {activeTab === 'faq' && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <PackageFaqs faqs={faqs} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-6">
              <PackagePricingSummary pkg={pkg} onToggleWishlist={() => handleToggle(pkg._id)} />
            </div>
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black tracking-tight">You Might Also Like</h2>
              <Link to="/packages" className="text-sm text-gray-500 hover:text-black font-light">View all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedPackages.map((p, i) => (
                <motion.div key={p._id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <PackageCard pkg={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      {galleryOpen && gallery.length > 0 && (
        <PackageGallery images={gallery} title={pkg.title} />
      )}
    </div>
  );
};

export default PackageDetailsPage;
