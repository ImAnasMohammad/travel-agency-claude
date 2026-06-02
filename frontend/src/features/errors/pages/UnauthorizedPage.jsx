/*
 *  FileName:-     UnauthorizedPage.jsx
 *  Description:-  403 Unauthorized page shown when user lacks access permissions
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldX, Home, LogIn } from 'lucide-react';

function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-4xl font-bold text-black tracking-tight mb-3">403</h1>
        <h2 className="text-xl font-semibold text-black mb-3">Access Denied</h2>
        <p className="text-gray-500 mb-8">
          You don't have permission to view this page. Please log in with the appropriate account or contact support.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/auth/login"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-black text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default UnauthorizedPage;
