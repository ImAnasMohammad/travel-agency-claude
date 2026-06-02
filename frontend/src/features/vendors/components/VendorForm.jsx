/*
 *  FileName:-     VendorForm.jsx
 *  Description:-  Create/edit vendor form with business details and commission settings
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().min(2).required('Business name is required'),
  ownerName: yup.string().min(2).required('Owner name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().min(10).required('Phone is required'),
  category: yup.string().required('Category is required'),
  location: yup.string().required('Location is required'),
  address: yup.string().required('Address is required'),
  commissionRate: yup.number().min(0).max(50).required('Commission rate is required'),
  bankName: yup.string().required('Bank name is required'),
  accountNumber: yup.string().min(8).required('Account number is required'),
  ifscCode: yup.string().min(11).max(11).required('IFSC code is required'),
  gstNumber: yup.string().nullable(),
  description: yup.string(),
  isActive: yup.boolean(),
});

const CATEGORIES = ['Hotels', 'Transport', 'Activities', 'Restaurants', 'Tour Operators', 'Equipment', 'Photography'];

const FormField = ({ label, error, required, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-gray-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const VendorForm = ({ initialData = null, onSubmit: onSubmitProp, onCancel, loading = false }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: '', ownerName: '', email: '', phone: '', category: '',
      location: '', address: '', commissionRate: 10, bankName: '',
      accountNumber: '', ifscCode: '', gstNumber: '', description: '', isActive: true,
    },
  });

  const handleFormSubmit = async (data) => {
    await onSubmitProp?.(data);
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Business Info */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Business Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Business Name" error={errors.name?.message} required>
            <input {...register('name')} className={inputClass} placeholder="e.g. Sunrise Travels" />
          </FormField>
          <FormField label="Owner Name" error={errors.ownerName?.message} required>
            <input {...register('ownerName')} className={inputClass} placeholder="Full name of owner" />
          </FormField>
          <FormField label="Email" error={errors.email?.message} required>
            <input type="email" {...register('email')} className={inputClass} placeholder="business@email.com" />
          </FormField>
          <FormField label="Phone" error={errors.phone?.message} required>
            <input {...register('phone')} className={inputClass} placeholder="+91-9876543210" />
          </FormField>
          <FormField label="Category" error={errors.category?.message} required>
            <select {...register('category')} className={`${inputClass} bg-white`}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="City/Location" error={errors.location?.message} required>
            <input {...register('location')} className={inputClass} placeholder="e.g. Jaipur, Rajasthan" />
          </FormField>
        </div>
        <div className="mt-4">
          <FormField label="Full Address" error={errors.address?.message} required>
            <textarea {...register('address')} rows={2} className={`${inputClass} resize-none`} placeholder="Complete business address" />
          </FormField>
        </div>
        <div className="mt-4">
          <FormField label="Description" error={errors.description?.message}>
            <textarea {...register('description')} rows={2} className={`${inputClass} resize-none`} placeholder="Brief description of vendor services" />
          </FormField>
        </div>
      </div>

      {/* Commission & Tax */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Commission & Tax</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Commission Rate (%)" error={errors.commissionRate?.message} required>
            <input type="number" step="0.5" {...register('commissionRate')} className={inputClass} min={0} max={50} />
          </FormField>
          <FormField label="GST Number" error={errors.gstNumber?.message}>
            <input {...register('gstNumber')} className={inputClass} placeholder="22AAAAA0000A1Z5 (optional)" />
          </FormField>
        </div>
      </div>

      {/* Banking */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Banking Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Bank Name" error={errors.bankName?.message} required>
            <input {...register('bankName')} className={inputClass} placeholder="e.g. HDFC Bank" />
          </FormField>
          <FormField label="Account Number" error={errors.accountNumber?.message} required>
            <input {...register('accountNumber')} className={inputClass} placeholder="Account number" />
          </FormField>
          <FormField label="IFSC Code" error={errors.ifscCode?.message} required>
            <input {...register('ifscCode')} className={`${inputClass} uppercase`} placeholder="e.g. HDFC0001234" maxLength={11} />
          </FormField>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" {...register('isActive')} className="w-4 h-4 rounded border-gray-300 text-[#0B4F6C]" />
        <span className="text-sm font-medium text-gray-700">Vendor is Active</span>
      </label>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
        )}
        <button type="submit" disabled={isSubmitting || loading} className="flex-1 sm:flex-none px-6 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-lg hover:bg-[#0B4F6C]/90 disabled:opacity-60 transition-colors">
          {isSubmitting || loading ? 'Saving...' : initialData ? 'Update Vendor' : 'Add Vendor'}
        </button>
      </div>
    </form>
  );
};

export default VendorForm;
