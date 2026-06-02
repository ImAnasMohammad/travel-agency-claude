/*
 *  FileName:-     ForgotPasswordPage.jsx
 *  Description:-  Centered clean card page for forgot password with travel branding
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { motion } from 'framer-motion';
import { Compass, KeyRound } from 'lucide-react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #0B4F6C, #00B4D8)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD166)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 p-8 sm:p-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
              style={{ background: 'linear-gradient(135deg, #0B4F6C, #00B4D8)' }}>
              <KeyRound size={26} className="text-white" />
            </div>
            <div className="flex items-center gap-2">
              <Compass size={14} className="text-[#0B4F6C]" />
              <span className="text-sm font-semibold text-gray-400 tracking-widest uppercase">WanderLux</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-2">
            Reset password
          </h1>
          <p className="text-gray-500 font-light text-sm leading-relaxed">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <ForgotPasswordForm />

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 font-light mt-8">
          Protected by WanderLux security &bull; 256-bit SSL
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
