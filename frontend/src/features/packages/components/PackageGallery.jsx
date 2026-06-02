/*
 *  FileName:-     PackageGallery.jsx
 *  Description:-  Image gallery grid with modal lightbox, navigation arrows, and keyboard support
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const PackageGallery = ({ images = [], title = '' }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index) => { setActiveIndex(index); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, prev, next]);

  if (!images.length) return null;

  const displayImages = images.slice(0, 5);
  const remaining = images.length - 5;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-64 sm:h-96 rounded-2xl overflow-hidden">
        {/* Main Large Image */}
        <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => openLightbox(0)}>
          <img src={displayImages[0]} alt={`${title} 1`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Smaller Images */}
        {displayImages.slice(1, 5).map((img, i) => (
          <div key={i} className="relative group cursor-pointer overflow-hidden"
            onClick={() => openLightbox(i + 1)}>
            <img src={img} alt={`${title} ${i + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            {i === 3 && remaining > 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-xl">+{remaining}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <X size={20} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm font-light px-4 py-2 rounded-full">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Prev / Next */}
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 sm:left-8 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 sm:right-8 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Image */}
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={images[activeIndex]}
              alt=""
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Thumbnails */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4">
              {images.slice(0, 10).map((img, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-75'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PackageGallery;
