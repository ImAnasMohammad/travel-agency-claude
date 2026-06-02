/*
 *  FileName:-     DestinationDetailsPage.jsx
 *  Description:-  Full destination detail page with hero, highlights, packages, visa info, weather, and gallery
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, MapPin, Loader2 } from 'lucide-react';
import { useState } from 'react';
import DestinationBanner from '../components/DestinationBanner';
import DestinationHighlights from '../components/DestinationHighlights';
import VisaInfoCard from '../components/VisaInfoCard';
import WeatherInfoCard from '../components/WeatherInfoCard';
import useDestinationDetails from '../hooks/useDestinationDetails';

const GalleryModal = ({ images, index, onClose }) => {
  const [current, setCurrent] = useState(index);
  const prev = (e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}>
      <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
        <X size={20} className="text-white" />
      </button>
      {images.length > 1 && (
        <button onClick={prev}
          className="absolute left-4 sm:left-8 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/25 transition-colors">
          <ChevronLeft size={22} className="text-white" />
        </button>
      )}
      <img src={images[current]} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl"
        onClick={(e) => e.stopPropagation()} />
      {images.length > 1 && (
        <button onClick={next}
          className="absolute right-4 sm:right-8 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/25 transition-colors">
          <ChevronRight size={22} className="text-white" />
        </button>
      )}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40'}`} />
        ))}
      </div>
    </motion.div>
  );
};

const DestinationDetailsPage = () => {
  const { slug } = useParams();
  const { destination, packages, gallery, highlights, visaInfo, weatherInfo, isLoading, error } = useDestinationDetails(slug);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const errorStatus = error?.status || error?.originalStatus;
  const isNotFoundError = errorStatus === 404;
  const hasRequestError = Boolean(error) && !isNotFoundError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (hasRequestError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <p className="text-xl font-bold text-black">Unable to load destination</p>
        <p className="text-sm text-gray-500 max-w-md">
          We could not reach the server right now. Please ensure the backend API is running and try again.
        </p>
        <Link to="/destinations" className="text-sm text-gray-500 hover:text-black underline">Browse all destinations</Link>
      </div>
    );
  }

  if (isNotFoundError || !destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-xl font-bold text-black">Destination not found</p>
        <Link to="/destinations" className="text-sm text-gray-500 hover:text-black underline">Browse all destinations</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <DestinationBanner destination={destination} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-light">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={12} />
            <Link to="/destinations" className="hover:text-black">Destinations</Link>
            <ChevronRight size={12} />
            <span className="text-black font-medium">{destination.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-black tracking-tight mb-4">About {destination.name}</h2>
              <p className="text-gray-600 font-light leading-relaxed text-base">{destination.longDescription || destination.description}</p>
            </motion.div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-black tracking-tight mb-6">Highlights</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                      <span className="text-xl">{h.emoji || '✨'}</span>
                      <span className="text-sm font-medium text-black">{h.title || h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-black tracking-tight mb-6">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.slice(0, 6).map((img, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.02 }} onClick={() => { setGalleryIndex(i); setGalleryOpen(true); }}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer relative group">
                      <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      {i === 5 && gallery.length > 6 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-xl">+{gallery.length - 6}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Packages */}
            {packages.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-black tracking-tight">Available Packages</h2>
                  <Link to={`/packages?destination=${slug}`} className="text-sm text-gray-500 hover:text-black font-light">
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packages.slice(0, 4).map((pkg) => (
                    <Link key={pkg._id} to={`/packages/${pkg.slug || pkg._id}`}
                      className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-black transition-colors group">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {pkg.coverImage && <img src={pkg.coverImage} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-black truncate group-hover:underline">{pkg.title}</p>
                        <p className="text-xs text-gray-500 font-light">{pkg.duration?.days}D/{pkg.duration?.nights}N</p>
                        <p className="text-sm font-bold text-[#0B4F6C] mt-1">From ₹{(pkg.discountedPrice || pkg.basePrice)?.toLocaleString('en-IN')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <VisaInfoCard visaInfo={visaInfo} />
            <WeatherInfoCard weatherInfo={weatherInfo} />

            {/* Quick Facts */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-black mb-4">Quick Facts</h3>
              <div className="space-y-3">
                {[
                  { label: 'Country', value: destination.country },
                  { label: 'Continent', value: destination.continent },
                  { label: 'Language', value: destination.languages?.join(', ') },
                  { label: 'Currency', value: destination.currency },
                  { label: 'Time Zone', value: destination.timeZone },
                ].filter((f) => f.value).map((fact) => (
                  <div key={fact.label} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500 font-light">{fact.label}</span>
                    <span className="font-medium text-black">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {galleryOpen && (
        <GalleryModal images={gallery} index={galleryIndex} onClose={() => setGalleryOpen(false)} />
      )}
    </div>
  );
};

export default DestinationDetailsPage;
