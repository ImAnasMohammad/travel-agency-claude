/*
 *  FileName:-     OtpVerificationForm.jsx
 *  Description:-  6-digit OTP input with auto-focus, paste support, and countdown resend timer
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVerifyOtpMutation, useResendOtpMutation } from '../apis/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import toast from 'react-hot-toast';

const RESEND_TIMEOUT = 60;

const OtpVerificationForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const email = location.state?.email || '';

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const focusInput = (index) => {
    if (inputRefs.current[index]) inputRefs.current[index].focus();
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) focusInput(index + 1);
    if (newOtp.every((d) => d !== '')) handleAutoSubmit(newOtp);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < 5) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split('').forEach((digit, i) => { if (i < 6) newOtp[i] = digit; });
    setOtp(newOtp);
    focusInput(Math.min(pasted.length, 5));
    if (newOtp.every((d) => d !== '')) handleAutoSubmit(newOtp);
  };

  const handleAutoSubmit = useCallback(async (otpArray) => {
    const otpString = otpArray.join('');
    if (otpString.length !== 6) return;
    try {
      const result = await verifyOtp({ email, otp: otpString }).unwrap();
      if (result.data?.accessToken) {
        dispatch(setCredentials({ user: result.data.user, token: result.data.accessToken, refreshToken: result.data.refreshToken }));
      }
      toast.success('Email verified successfully!');
      navigate('/');
    } catch (err) {
      setError(err?.data?.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      focusInput(0);
    }
  }, [email, verifyOtp, dispatch, navigate]);

  const handleResend = async () => {
    if (!canResend) return;
    try {
      await resendOtp({ email }).unwrap();
      setCanResend(false);
      setCountdown(RESEND_TIMEOUT);
      setOtp(['', '', '', '', '', '']);
      setError('');
      focusInput(0);
      toast.success('New OTP sent to your email!');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to resend OTP.');
    }
  };

  const otpValue = otp.join('');
  const isComplete = otpValue.length === 6;

  return (
    <div className="space-y-6">
      {/* OTP Inputs */}
      <div className="flex gap-3 justify-center" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={(e) => e.target.select()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`w-12 h-14 text-center text-xl font-semibold border-2 rounded-xl outline-none transition-all duration-200 ${
              error
                ? 'border-red-400 bg-red-50 text-red-600'
                : digit
                ? 'border-black bg-black text-white'
                : 'border-gray-200 bg-white text-black focus:border-black focus:ring-2 focus:ring-gray-100'
            }`}
          />
        ))}
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-center text-sm text-red-500 font-light">
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Manual Submit */}
      <motion.button
        onClick={() => handleAutoSubmit(otp)}
        disabled={!isComplete || isVerifying}
        whileHover={{ scale: (!isComplete || isVerifying) ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isVerifying ? (
          <><Loader2 size={16} className="animate-spin" /> Verifying...</>
        ) : (
          <><CheckCircle2 size={16} /> Verify OTP</>
        )}
      </motion.button>

      {/* Resend */}
      <div className="text-center">
        {canResend ? (
          <button
            onClick={handleResend}
            disabled={isResending}
            className="flex items-center justify-center gap-1.5 mx-auto text-sm text-black font-medium hover:underline disabled:opacity-50"
          >
            {isResending ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
            Resend OTP
          </button>
        ) : (
          <p className="text-sm text-gray-400 font-light">
            Resend OTP in{' '}
            <span className="text-black font-medium tabular-nums">
              0:{String(countdown).padStart(2, '0')}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default OtpVerificationForm;
