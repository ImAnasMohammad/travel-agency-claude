/*
 *  FileName:-     AddressForm.jsx
 *  Description:-  Form for creating/editing addresses with label, street, city, state, country, pincode
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Home, Briefcase, MapPin, Loader2 } from 'lucide-react';

const schema = Yup.object({
  label: Yup.string().required('Label is required'),
  street: Yup.string().min(5, 'Enter a valid street address').required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  pincode: Yup.string()
    .matches(/^\d{4,10}$/, 'Enter a valid pincode')
    .required('Pincode is required'),
  isDefault: Yup.boolean(),
});

const LABEL_OPTIONS = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'work', label: 'Work', icon: Briefcase },
  { value: 'other', label: 'Other', icon: MapPin },
];

const AddressForm = ({ defaultValues, onSubmit, isSubmitting, onCancel }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || { label: 'home', country: 'India', isDefault: false },
  });

  const selectedLabel = watch('label');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
        <div className="flex gap-2">
          {LABEL_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <label
                key={opt.value}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm
                  ${selectedLabel === opt.value
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
              >
                <input type="radio" value={opt.value} {...register('label')} className="sr-only" />
                <Icon className="w-4 h-4" />
                {opt.label}
              </label>
            );
          })}
        </div>
        {errors.label && <p className="text-red-500 text-xs mt-1">{errors.label.message}</p>}
      </div>

      {/* Street */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
        <textarea
          {...register('street')}
          rows={2}
          placeholder="123, Apartment Name, Street Name"
          className={`w-full px-4 py-2.5 rounded-xl border text-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-black transition-all
            ${errors.street ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
        />
        {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            {...register('city')}
            placeholder="Mumbai"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all ${errors.city ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            type="text"
            {...register('state')}
            placeholder="Maharashtra"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all ${errors.state ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            type="text"
            {...register('country')}
            placeholder="India"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all ${errors.country ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
          <input
            type="text"
            {...register('pincode')}
            placeholder="400001"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black transition-all ${errors.pincode ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
        </div>
      </div>

      {/* Set as default */}
      <label className="flex items-center gap-3 cursor-pointer py-2">
        <input type="checkbox" {...register('isDefault')} className="w-4 h-4 rounded accent-black" />
        <span className="text-sm text-gray-700">Set as default address</span>
      </label>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-black text-white
            font-semibold text-sm hover:bg-gray-800 disabled:opacity-50 transition-all"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {defaultValues ? 'Update Address' : 'Add Address'}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
