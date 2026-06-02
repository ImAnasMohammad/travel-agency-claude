/*
 *  FileName:-     RegisterForm.jsx
 *  Description:-  Animated registration form with full name, email, phone, password fields and terms checkbox
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { registerSchema } from '../validations/authValidation';
import { useRegisterMutation } from '../apis/authApi';
import toast from 'react-hot-toast';

const fieldVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.35 } }),
};

const PasswordStrength = ({ password }) => {
  const checks = [
    { label: 'At least 8 characters', test: password?.length >= 8 },
    { label: 'Uppercase letter', test: /[A-Z]/.test(password || '') },
    { label: 'Number', test: /[0-9]/.test(password || '') },
    { label: 'Special character', test: /[!@#$%^&*]/.test(password || '') },
  ];
  const score = checks.filter((c) => c.test).length;
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < score ? colors[score - 1] : 'bg-gray-100'}`} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {checks.map((c, i) => (
          <div key={i} className={`flex items-center gap-1 text-xs transition-colors ${c.test ? 'text-green-600' : 'text-gray-400'}`}>
            <CheckCircle2 size={10} className={c.test ? 'text-green-500' : 'text-gray-300'} />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onTouched',
  });

  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      const nameParts = data.fullName.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : nameParts[0];
      await registerMutation({ firstName, lastName, email: data.email, phone: data.phone, password: data.password }).unwrap();
      toast.success('Account created! Please verify your email.');
      navigate('/auth/otp-verification', { state: { email: data.email } });
    } catch (error) {
      toast.error(error?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const inputClass = (error, touched) =>
    `w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-sm font-light text-black placeholder-gray-400 outline-none transition-all duration-200 ${
      error && touched
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-100'
    }`;

  const fields = [
    { key: 'fullName', label: 'Full Name', icon: User, type: 'text', placeholder: 'John Doe', autocomplete: 'name' },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'you@example.com', autocomplete: 'email' },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+1 (555) 000-0000', autocomplete: 'tel' },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {fields.map((field, i) => (
        <motion.div key={field.key} custom={i} variants={fieldVariant}>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
            {field.label}
          </label>
          <div className="relative">
            <field.icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register(field.key)}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autocomplete}
              className={inputClass(errors[field.key], touchedFields[field.key])}
            />
          </div>
          <AnimatePresence>
            {errors[field.key] && touchedFields[field.key] && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-1.5 text-xs text-red-500 font-light">
                {errors[field.key].message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Password */}
      <motion.div custom={3} variants={fieldVariant}>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Password</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            autoComplete="new-password"
            className={`${inputClass(errors.password, touchedFields.password)} pr-11`}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {password && <PasswordStrength password={password} />}
        {errors.password && touchedFields.password && (
          <p className="mt-1 text-xs text-red-500 font-light">{errors.password.message}</p>
        )}
      </motion.div>

      {/* Confirm Password */}
      <motion.div custom={4} variants={fieldVariant}>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Confirm Password</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            {...register('confirmPassword')}
            type={showConfirm ? 'text' : 'password'}
            placeholder="Repeat your password"
            autoComplete="new-password"
            className={`${inputClass(errors.confirmPassword, touchedFields.confirmPassword)} pr-11`}
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && touchedFields.confirmPassword && (
          <p className="mt-1.5 text-xs text-red-500 font-light">{errors.confirmPassword.message}</p>
        )}
      </motion.div>

      {/* Terms */}
      <motion.div custom={5} variants={fieldVariant} className="flex items-start gap-2.5">
        <input
          {...register('agreeToTerms')}
          type="checkbox"
          id="terms"
          className="w-4 h-4 mt-0.5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
        />
        <label htmlFor="terms" className="text-sm text-gray-500 font-light leading-relaxed cursor-pointer">
          I agree to the{' '}
          <Link to="/terms" className="text-black font-medium hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-black font-medium hover:underline">Privacy Policy</Link>
        </label>
      </motion.div>
      {errors.agreeToTerms && (
        <p className="text-xs text-red-500 font-light -mt-2">{errors.agreeToTerms.message}</p>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <><Loader2 size={16} className="animate-spin" /> Creating account...</>
        ) : (
          <>Create free account <ArrowRight size={16} /></>
        )}
      </motion.button>

      <p className="text-center text-sm text-gray-500 font-light">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-black font-medium hover:underline">Sign in</Link>
      </p>
    </motion.form>
  );
};

export default RegisterForm;
