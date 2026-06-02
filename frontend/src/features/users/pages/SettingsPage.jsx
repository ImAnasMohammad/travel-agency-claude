/*
 *  FileName:-     SettingsPage.jsx
 *  Description:-  Account settings page with change password, notification preferences, and danger zone
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Bell, Trash2, Eye, EyeOff, Loader2, Save, ArrowLeft, Shield, Mail, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChangePasswordMutation, useUpdateNotificationPreferencesMutation, useDeleteAccountMutation } from '../apis/userApi';
import useAuth from '../../auths/hooks/useAuth';
import toast from 'react-hot-toast';

const passwordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().min(8).matches(/[A-Z]/).matches(/[0-9]/).required('New password required'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords do not match').required(),
});

const SectionCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6">
    <div className="flex items-center gap-2.5 mb-6">
      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"><Icon size={15} className="text-black" /></div>
      <h2 className="text-base font-bold text-black tracking-tight">{title}</h2>
    </div>
    {children}
  </div>
);

const SettingsPage = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [notifPrefs, setNotifPrefs] = useState({ email: true, sms: false, push: true, promotions: true, bookingUpdates: true });
  const { logout } = useAuth();

  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [updateNotifications, { isLoading: isSavingNotifs }] = useUpdateNotificationPreferencesMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onPasswordChange = async (data) => {
    try {
      await changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword }).unwrap();
      toast.success('Password updated successfully!');
      reset();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update password.');
    }
  };

  const handleNotifSave = async () => {
    try {
      await updateNotifications(notifPrefs).unwrap();
      toast.success('Notification preferences saved!');
    } catch {
      toast.error('Failed to save preferences.');
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }
    try {
      await deleteAccount().unwrap();
      await logout();
    } catch {
      toast.error('Failed to delete account. Contact support.');
    }
  };

  const inputClass = (error) =>
    `w-full pl-10 pr-10 py-3 bg-white border rounded-xl text-sm font-light text-black outline-none transition-all ${
      error ? 'border-red-400' : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-100'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back */}
        <Link to="/profile" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors font-light w-fit">
          <ArrowLeft size={14} /> Back to Profile
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Settings</h1>
          <p className="text-gray-500 font-light text-sm mt-1">Manage your account security and preferences</p>
        </div>

        {/* Change Password */}
        <SectionCard title="Change Password" icon={Lock}>
          <form onSubmit={handleSubmit(onPasswordChange)} className="space-y-4">
            {[
              { name: 'currentPassword', label: 'Current Password', show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
              { name: 'newPassword', label: 'New Password', show: showNew, toggle: () => setShowNew(!showNew) },
              { name: 'confirmPassword', label: 'Confirm New Password', show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">{field.label}</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input {...register(field.name)} type={field.show ? 'text' : 'password'}
                    className={inputClass(errors[field.name])} />
                  <button type="button" onClick={field.toggle}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                    {field.show ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {errors[field.name] && <p className="mt-1 text-xs text-red-500">{errors[field.name].message}</p>}
              </div>
            ))}
            <motion.button type="submit" disabled={isChangingPassword} whileTap={{ scale: 0.98 }}
              className="w-full bg-black text-white py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50">
              {isChangingPassword ? <><Loader2 size={14} className="animate-spin" /> Updating...</> : <><Save size={14} /> Update Password</>}
            </motion.button>
          </form>
        </SectionCard>

        {/* Notification Preferences */}
        <SectionCard title="Notification Preferences" icon={Bell}>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Booking confirmations, receipts', icon: Mail },
              { key: 'sms', label: 'SMS Notifications', desc: 'Travel reminders and alerts', icon: Smartphone },
              { key: 'push', label: 'Push Notifications', desc: 'App updates and reminders', icon: Bell },
              { key: 'promotions', label: 'Promotions & Deals', desc: 'Exclusive offers and discounts', icon: Shield },
              { key: 'bookingUpdates', label: 'Booking Updates', desc: 'Status changes and check-in info', icon: Shield },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <item.icon size={15} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-black">{item.label}</p>
                    <p className="text-xs text-gray-400 font-light">{item.desc}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifPrefs((p) => ({ ...p, [item.key]: !p[item.key] }))}
                  role="switch"
                  aria-checked={notifPrefs[item.key]}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 ${notifPrefs[item.key] ? 'bg-black' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${notifPrefs[item.key] ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
            <motion.button onClick={handleNotifSave} disabled={isSavingNotifs} whileTap={{ scale: 0.98 }}
              className="w-full bg-black text-white py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50">
              {isSavingNotifs ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Save Preferences</>}
            </motion.button>
          </div>
        </SectionCard>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-red-100 p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center"><Trash2 size={15} className="text-red-500" /></div>
            <h2 className="text-base font-bold text-red-600 tracking-tight">Danger Zone</h2>
          </div>
          <p className="text-sm text-gray-500 font-light mb-4 leading-relaxed">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Type <span className="font-bold text-red-500">DELETE</span> to confirm</label>
              <input type="text" value={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE here"
                className="w-full px-4 py-3 border border-red-200 rounded-xl text-sm font-light outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50" />
            </div>
            <button onClick={handleDeleteAccount} disabled={isDeleting || deleteConfirm !== 'DELETE'}
              className="w-full bg-red-500 text-white py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isDeleting ? <><Loader2 size={14} className="animate-spin" /> Deleting account...</> : <><Trash2 size={14} /> Delete Account Permanently</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
