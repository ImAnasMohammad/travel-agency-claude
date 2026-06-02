/*
 *  FileName:-     LoginForm.jsx
 *  Description:-  Beautiful login form with email/password fields, show/hide toggle, and React Hook Form + Yup validation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginSchema } from '../validations/authValidation';
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  const inputClass = (error, touched) =>
    `w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-sm font-light text-black placeholder-gray-400 outline-none transition-all duration-200 ${
      error && touched
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-100'
    }`;

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* Email Field */}
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
            className={inputClass(errors.email, touchedFields.email)}
          />
        </div>
        {errors.email && touchedFields.email && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-red-500 font-light"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-xs text-gray-500 hover:text-black transition-colors font-light"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            autoComplete="current-password"
            className={`${inputClass(errors.password, touchedFields.password)} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && touchedFields.password && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-red-500 font-light"
          >
            {errors.password.message}
          </motion.p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2.5">
        <input
          {...register('rememberMe')}
          type="checkbox"
          id="rememberMe"
          className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
        />
        <label htmlFor="rememberMe" className="text-sm text-gray-500 font-light cursor-pointer select-none">
          Keep me signed in
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <ArrowRight size={16} />
          </>
        )}
      </motion.button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400 font-light">or</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-500 font-light">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-black font-medium hover:underline transition-all"
        >
          Create one free
        </Link>
      </p>
    </motion.form>
  );
};

export default LoginForm;
