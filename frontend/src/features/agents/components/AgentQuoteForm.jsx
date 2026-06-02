/*
 *  FileName:-     AgentQuoteForm.jsx
 *  Description:-  Quote generation form for agents with package selection and custom pricing
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Calculator, Send, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object({
  customerName: yup.string().required('Customer name required'),
  customerEmail: yup.string().email().required('Customer email required'),
  customerPhone: yup.string().min(10).required('Phone required'),
  packageId: yup.string().required('Select a package'),
  destination: yup.string().required(),
  travelDate: yup.string().required('Travel date required'),
  returnDate: yup.string().required('Return date required'),
  adults: yup.number().min(1).required(),
  children: yup.number().min(0).required(),
  specialRequests: yup.string(),
  roomType: yup.string().required(),
  customDiscount: yup.number().min(0).max(30),
});

const PACKAGES = [
  { id: 'PKG-001', name: 'Golden Triangle Tour', basePrice: 45000 },
  { id: 'PKG-002', name: 'Kerala Backwaters', basePrice: 38500 },
  { id: 'PKG-003', name: 'Goa Beach Holiday', basePrice: 22000 },
  { id: 'PKG-004', name: 'Manali Snow Trek', basePrice: 31000 },
  { id: 'PKG-005', name: 'Andaman Explorer', basePrice: 55000 },
];

const ROOM_TYPES = ['Standard', 'Deluxe', 'Super Deluxe', 'Suite'];

const FormField = ({ label, error, required, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-gray-600">{label} {required && <span className="text-red-500">*</span>}</label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const AgentQuoteForm = ({ onSuccess }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quoteTotal, setQuoteTotal] = useState(0);
  const [commissionEarned, setCommissionEarned] = useState(0);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { customerName: '', customerEmail: '', customerPhone: '', packageId: '', destination: '', travelDate: '', returnDate: '', adults: 2, children: 0, specialRequests: '', roomType: 'Standard', customDiscount: 0 },
  });

  const adults = watch('adults') || 2;
  const children = watch('children') || 0;
  const discount = watch('customDiscount') || 0;
  const roomType = watch('roomType');

  const calculateQuote = () => {
    if (!selectedPackage) return;
    const roomMultiplier = { Standard: 1, Deluxe: 1.3, 'Super Deluxe': 1.6, Suite: 2.2 }[roomType] || 1;
    const base = selectedPackage.basePrice * (adults + children * 0.5) * roomMultiplier;
    const discountedTotal = base * (1 - discount / 100);
    const commission = discountedTotal * 0.08;
    setQuoteTotal(Math.round(discountedTotal));
    setCommissionEarned(Math.round(commission));
  };

  const handlePackageChange = (e) => {
    const pkg = PACKAGES.find((p) => p.id === e.target.value);
    setSelectedPackage(pkg || null);
  };

  const onSubmit = async (data) => {
    const quote = { ...data, quoteTotal, commissionEarned, status: 'sent', createdAt: new Date().toISOString() };
    await new Promise((r) => setTimeout(r, 800));
    toast.success('Quote sent to customer successfully!');
    onSuccess?.(quote);
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Customer Info */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Customer Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Customer Name" error={errors.customerName?.message} required>
            <input {...register('customerName')} className={inputClass} placeholder="Full name" />
          </FormField>
          <FormField label="Email" error={errors.customerEmail?.message} required>
            <input type="email" {...register('customerEmail')} className={inputClass} placeholder="email@example.com" />
          </FormField>
          <FormField label="Phone" error={errors.customerPhone?.message} required>
            <input {...register('customerPhone')} className={inputClass} placeholder="+91-XXXXXXXXXX" />
          </FormField>
        </div>
      </div>

      {/* Package & Travel */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Package & Travel Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Select Package" error={errors.packageId?.message} required>
            <select {...register('packageId')} onChange={(e) => { register('packageId').onChange(e); handlePackageChange(e); }} className={`${inputClass} bg-white`}>
              <option value="">Choose a package</option>
              {PACKAGES.map((p) => <option key={p.id} value={p.id}>{p.name} – ₹{p.basePrice.toLocaleString('en-IN')}/person</option>)}
            </select>
          </FormField>
          <FormField label="Room Type" error={errors.roomType?.message} required>
            <select {...register('roomType')} className={`${inputClass} bg-white`}>
              {ROOM_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </FormField>
          <FormField label="Travel Date" error={errors.travelDate?.message} required>
            <input type="date" {...register('travelDate')} className={inputClass} />
          </FormField>
          <FormField label="Return Date" error={errors.returnDate?.message} required>
            <input type="date" {...register('returnDate')} className={inputClass} />
          </FormField>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <FormField label="Adults" error={errors.adults?.message} required>
            <input type="number" {...register('adults')} className={inputClass} min={1} />
          </FormField>
          <FormField label="Children" error={errors.children?.message}>
            <input type="number" {...register('children')} className={inputClass} min={0} />
          </FormField>
          <FormField label="Discount (%)" error={errors.customDiscount?.message}>
            <input type="number" {...register('customDiscount')} className={inputClass} min={0} max={30} step={0.5} />
          </FormField>
        </div>
      </div>

      {/* Special Requests */}
      <FormField label="Special Requests">
        <textarea {...register('specialRequests')} rows={2} className={`${inputClass} resize-none`} placeholder="Dietary requirements, accessibility needs, special occasions..." />
      </FormField>

      {/* Quote Calculation */}
      {selectedPackage && (
        <div className="bg-gradient-to-r from-[#0B4F6C]/5 to-[#00B4D8]/5 rounded-xl p-4 border border-[#00B4D8]/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#0B4F6C]" /> Quote Estimate
            </h4>
            <button type="button" onClick={calculateQuote} className="text-xs text-[#00B4D8] hover:text-[#0B4F6C] font-semibold">Recalculate</button>
          </div>
          {quoteTotal > 0 && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">Total Quote</p>
                <p className="text-xl font-black text-[#0B4F6C]">₹{quoteTotal.toLocaleString('en-IN')}</p>
                {discount > 0 && <p className="text-xs text-emerald-600">After {discount}% discount</p>}
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">Your Commission (8%)</p>
                <p className="text-xl font-black text-emerald-700">₹{commissionEarned.toLocaleString('en-IN')}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={calculateQuote} className="flex items-center gap-2 px-4 py-2.5 border border-[#0B4F6C] text-[#0B4F6C] text-sm font-semibold rounded-lg hover:bg-[#0B4F6C]/5 transition-colors">
          <Calculator className="w-4 h-4" /> Calculate
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-lg hover:bg-[#0B4F6C]/90 disabled:opacity-60 transition-colors">
          {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Quote to Customer</>}
        </button>
      </div>
    </form>
  );
};

export default AgentQuoteForm;
