/*
 *  FileName:-     ResetPasswordPage.jsx
 *  Description:-  Reset password page with token verification and new password form
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const schema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain uppercase letter')
    .matches(/[0-9]/, 'Must contain a number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const password = watch('password', '');

  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  /*
   *  functionName:- onSubmit
   *  Description:-  Handles password reset form submission
   *  Arguments:-    data: { password, confirmPassword }
   *  Author:-       Shaik Mohammad Anas
   *  Created-date:- 13-04-2026
   */
  const onSubmit = async (data) => {
    try {
      // API call would go here: resetPassword({ token, password: data.password })
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
      setTimeout(() => navigate('/auth/login'), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2 tracking-tight">Password Reset!</h2>
          <p className="text-gray-500 mb-6">
            Your password has been updated. Redirecting to login...
          </p>
          <Link
            to="/auth/login"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back */}
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        {/* Icon */}
        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
          <Lock className="w-7 h-7 text-white" />
        </div>

        <h1 className="text-3xl font-bold text-black tracking-tight mb-2">Create new password</h1>
        <p className="text-gray-500 mb-8">Your new password must be different from your previous passwords.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-black mb-1.5">New Password</label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                className={`w-full border rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-black ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {/* Strength meter */}
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i <= strength ? strengthColors[strength] : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Strength: <span className="font-medium">{strengthLabels[strength]}</span>
                </p>
              </div>
            )}
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-black mb-1.5">Confirm Password</label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm new password"
                className={`w-full border rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-black ${
                  errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ResetPasswordPage;
