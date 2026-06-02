/*
 *  FileName:-     OtpVerificationPage.jsx
 *  Description:-  Centered OTP verification page with branding and countdown resend
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck, Mail } from 'lucide-react';
import OtpVerificationForm from '../components/OtpVerificationForm';

const OtpVerificationPage = () => {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) return <Navigate to="/auth/register" replace />;

  const masked = email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + b.replace(/./g, '*') + c);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-20 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #00B4D8, #0B4F6C)' }} />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full opacity-15 blur-3xl"
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
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                style={{ background: 'linear-gradient(135deg, #0B4F6C, #00B4D8)' }}>
                <ShieldCheck size={30} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Compass size={12} className="text-[#0B4F6C]" />
              <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">WanderLux</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-2">
            Verify your email
          </h1>
          <p className="text-gray-500 font-light text-sm leading-relaxed">
            We've sent a 6-digit code to
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            <Mail size={14} className="text-[#00B4D8]" />
            <span className="text-sm font-medium text-black">{masked}</span>
          </div>
        </div>

        <OtpVerificationForm />

        {/* Security note */}
        <div className="mt-8 p-3 bg-gray-50 rounded-xl flex items-start gap-2.5">
          <ShieldCheck size={14} className="text-[#0B4F6C] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-500 font-light leading-relaxed">
            For your security, this code expires in 10 minutes. Never share it with anyone.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerificationPage;
