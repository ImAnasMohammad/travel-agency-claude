/*
 *  FileName:-     ProfileEditForm.jsx
 *  Description:-  Edit profile form for updating name, phone, date of birth, and travel preferences
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { User, Phone, Calendar, Heart, Loader2, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import useUser from '../hooks/useUser';

const PREFERENCE_OPTIONS = ['Beach', 'Mountains', 'City', 'Adventure', 'Culture', 'Food', 'Luxury', 'Budget', 'Solo', 'Family'];

const ProfileEditForm = ({ onSuccess }) => {
  const { profile, updateProfile, isUpdating } = useUser();

  const { register, handleSubmit, reset, control, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      dateOfBirth: '',
      preferredDestinations: [],
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
        preferredDestinations: profile.preferences?.preferredDestinations || [],
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    const { preferredDestinations, dateOfBirth, ...rest } = data;
    await updateProfile({
      ...rest,
      ...(dateOfBirth && { dateOfBirth }),
      preferences: { preferredDestinations },
    });
    onSuccess?.();
  };

  const inputClass = (error) =>
    `w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm font-light text-black placeholder-gray-400 outline-none transition-all ${
      error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-100'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">First Name</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input {...register('firstName', { required: 'First name is required', minLength: { value: 2, message: 'Min 2 chars' } })}
              type="text" placeholder="John" className={inputClass(errors.firstName)} />
          </div>
          {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input {...register('lastName', { required: 'Last name is required', minLength: { value: 2, message: 'Min 2 chars' } })}
              type="text" placeholder="Doe" className={inputClass(errors.lastName)} />
          </div>
          {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
        <div className="relative">
          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input {...register('phone')} type="tel" placeholder="+1 (555) 000-0000" className={inputClass(errors.phone)} />
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Date of Birth</label>
        <div className="relative">
          <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input {...register('dateOfBirth')} type="date" className={inputClass(errors.dateOfBirth)} />
        </div>
      </div>

      {/* Travel Preferences */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
          <span className="flex items-center gap-1.5"><Heart size={12} /> Travel Preferences</span>
        </label>
        <Controller
          name="preferredDestinations"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {PREFERENCE_OPTIONS.map((pref) => {
                const selected = field.value?.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => {
                      const newVal = selected
                        ? field.value.filter((p) => p !== pref)
                        : [...(field.value || []), pref];
                      field.onChange(newVal);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selected
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {pref}
                  </button>
                );
              })}
            </div>
          )}
        />
      </div>

      {/* Save Button */}
      <motion.button
        type="submit"
        disabled={isUpdating || !isDirty}
        whileHover={{ scale: (isUpdating || !isDirty) ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-black text-white py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUpdating ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> Save Changes</>}
      </motion.button>
    </form>
  );
};

export default ProfileEditForm;
