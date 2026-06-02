/*
 *  FileName:-     NotFoundPage.jsx
 *  Description:-  404 Not Found error page with navigation back to home
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Compass } from 'lucide-react';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#0B4F6C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FF6B35]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg relative z-10"
      >
        {/* Compass icon */}
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Compass className="w-12 h-12 text-white" />
        </motion.div>

        {/* 404 text */}
        <div className="relative mb-4">
          <span className="text-[120px] font-bold text-black leading-none tracking-tighter select-none">
            404
          </span>
        </div>

        <h1 className="text-2xl font-bold text-black tracking-tight mb-3">
          Looks like you're lost
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 border border-black text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">Quick Links</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: 'Packages', href: '/packages' },
              { label: 'Destinations', href: '/destinations' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-gray-500 hover:text-black transition-colors underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
