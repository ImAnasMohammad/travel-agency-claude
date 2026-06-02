/*
 *  FileName:-     CouponForm.jsx
 *  Description:-  Create/edit coupon form with discount type, validity, and usage limits
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X } from 'lucide-react';

const schema = yup.object({
  code: yup.string().min(3).max(20).uppercase().required('Coupon code is required'),
  discountType: yup.string().oneOf(['percentage', 'flat']).required(),
  discountValue: yup.number().min(1).required('Discount value is required'),
  maxDiscount: yup.number().when('discountType', {
    is: 'percentage',
    then: (s) => s.min(1).required('Max discount cap is required for % coupons'),
    otherwise: (s) => s.nullable(),
  }),
  minOrderValue: yup.number().min(0).required(),
  usageLimit: yup.number().min(1).required(),
  perUserLimit: yup.number().min(1).required(),
  validFrom: yup.string().required('Start date is required'),
  validTo: yup.string().required('End date is required'),
  isActive: yup.boolean(),
  description: yup.string(),
  applicableOn: yup.string().oneOf(['all', 'packages', 'destinations']),
});

const FormField = ({ label, error, required, children, hint }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-gray-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-400">{hint}</p>}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const CouponForm = ({ initialData = null, onSubmit: onSubmitProp, onCancel }) => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      code: '', discountType: 'percentage', discountValue: 10, maxDiscount: 500,
      minOrderValue: 1000, usageLimit: 100, perUserLimit: 1,
      validFrom: '', validTo: '', isActive: true, description: '', applicableOn: 'all',
    },
  });

  const discountType = watch('discountType');

  const handleFormSubmit = async (data) => {
    await onSubmitProp?.(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Coupon Code" error={errors.code?.message} required hint="Customers will enter this code at checkout">
          <input {...register('code')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] uppercase" placeholder="e.g. SUMMER25" />
        </FormField>

        <FormField label="Description" error={errors.description?.message}>
          <input {...register('description')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" placeholder="Short description for admin reference" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <FormField label="Discount Type" error={errors.discountType?.message} required>
          <select {...register('discountType')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] bg-white">
            <option value="percentage">Percentage (%)</option>
            <option value="flat">Flat (₹)</option>
          </select>
        </FormField>

        <FormField label={discountType === 'percentage' ? 'Discount %' : 'Flat Discount (₹)'} error={errors.discountValue?.message} required>
          <input type="number" {...register('discountValue')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
        </FormField>

        {discountType === 'percentage' && (
          <FormField label="Max Discount Cap (₹)" error={errors.maxDiscount?.message} required hint="Maximum discount in rupees">
            <input type="number" {...register('maxDiscount')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
          </FormField>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <FormField label="Min Order Value (₹)" error={errors.minOrderValue?.message} required>
          <input type="number" {...register('minOrderValue')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
        </FormField>

        <FormField label="Total Usage Limit" error={errors.usageLimit?.message} required>
          <input type="number" {...register('usageLimit')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
        </FormField>

        <FormField label="Per User Limit" error={errors.perUserLimit?.message} required>
          <input type="number" {...register('perUserLimit')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <FormField label="Valid From" error={errors.validFrom?.message} required>
          <input type="date" {...register('validFrom')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
        </FormField>

        <FormField label="Valid To" error={errors.validTo?.message} required>
          <input type="date" {...register('validTo')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
        </FormField>

        <FormField label="Applicable On" error={errors.applicableOn?.message}>
          <select {...register('applicableOn')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] bg-white">
            <option value="all">All Packages</option>
            <option value="packages">Specific Packages</option>
            <option value="destinations">Specific Destinations</option>
          </select>
        </FormField>
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <input type="checkbox" {...register('isActive')} className="w-4 h-4 rounded border-gray-300 text-[#0B4F6C] focus:ring-[#0B4F6C]" />
        <span className="text-sm font-medium text-gray-700">Coupon is Active</span>
      </label>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
        )}
        <button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none px-6 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-lg hover:bg-[#0B4F6C]/90 disabled:opacity-60 transition-colors">
          {isSubmitting ? 'Saving...' : initialData ? 'Update Coupon' : 'Create Coupon'}
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
