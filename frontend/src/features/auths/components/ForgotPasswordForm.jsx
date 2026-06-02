/*
 *  FileName:-     ForgotPasswordForm.jsx
 *  Description:-  Forgot password form with email input and submission feedback
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { forgotPasswordSchema } from '../validations/authValidation';
import { useForgotPasswordMutation } from '../apis/authApi';
import toast from 'react-hot-toast';

const ForgotPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data).unwrap();
      setSentEmail(data.email);
      setSubmitted(true);
      toast.success('Reset link sent! Check your inbox.');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to send reset email. Try again.');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-sm font-light text-black placeholder-gray-400 outline-none transition-all duration-200 ${
                  errors.email && touchedFields.email
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-100'
                }`}
              />
            </div>
            {errors.email && touchedFields.email && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-red-500 font-light">
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><Loader2 size={16} className="animate-spin" /> Sending link...</>
            ) : (
              <>Send reset link <ArrowRight size={16} /></>
            )}
          </motion.button>

          <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-gray-500 font-light hover:text-black transition-colors">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </motion.form>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 size={32} className="text-green-500" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black mb-1">Check your inbox</h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              We've sent a password reset link to<br />
              <span className="text-black font-medium">{sentEmail}</span>
            </p>
          </div>
          <p className="text-xs text-gray-400 font-light">
            Didn't receive it? Check your spam folder or{' '}
            <button onClick={() => setSubmitted(false)} className="text-black font-medium hover:underline">
              try again
            </button>
          </p>
          <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-gray-500 font-light hover:text-black transition-colors mt-2">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordForm;
