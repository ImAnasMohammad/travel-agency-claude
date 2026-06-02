/*
 *  FileName:-     PackageForm.jsx
 *  Description:-  Full package creation/edit form with itinerary builder, variants, and toggles
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import {
  Plus, Trash2, Image as ImageIcon, Check, X, Loader2,
} from 'lucide-react';
import { useGetDestinationsQuery } from '../../destinations/apis/destinationApi';
import { useGetCategoriesQuery } from '../../categories/apis/categoryApi';

const schema = yup.object({
  title: yup.string().min(5, 'Title must be at least 5 characters').required('Title is required'),
  description: yup.string().min(20, 'Description too short').required(),
  destination: yup.string().required('Destination is required'),
  category: yup.string().required('Category is required'),
  duration: yup.object({
    days: yup.number().min(1).required(),
    nights: yup.number().min(0).required(),
  }),
  basePrice: yup.number().min(100, 'Price must be at least ₹100').required(),
  maxGroupSize: yup.number().min(1).required(),
  isActive: yup.boolean(),
  isFeatured: yup.boolean(),
});

const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
      active ? 'bg-[#0B4F6C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const FormField = ({ label, error, required, children }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

/* Normalize initialData.itinerary from API shape to form state shape */
const normalizeItinerary = (raw) => {
  if (!raw?.length) {
    return [{ day: 1, title: '', description: '', activities: [''], meals: { breakfast: false, lunch: false, dinner: false }, accommodation: '' }];
  }
  return raw.map((day) => ({
    day: day.day,
    title: day.title || '',
    description: day.description || '',
    accommodation: day.accommodation || '',
    activities: Array.isArray(day.activities) && day.activities.length
      ? day.activities.map((a) => (typeof a === 'object' ? a.activity || '' : a))
      : [''],
    meals: Array.isArray(day.meals)
      ? {
          breakfast: day.meals.some((m) => m.toLowerCase() === 'breakfast'),
          lunch: day.meals.some((m) => m.toLowerCase() === 'lunch'),
          dinner: day.meals.some((m) => m.toLowerCase() === 'dinner'),
        }
      : { breakfast: false, lunch: false, dinner: false },
  }));
};

const PackageForm = ({ initialData = null, onSubmit: onSubmitProp, onCancel }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [highlights, setHighlights] = useState(initialData?.highlights || ['']);
  const [inclusions, setInclusions] = useState(initialData?.inclusions || ['']);
  const [exclusions, setExclusions] = useState(initialData?.exclusions || ['']);
  const [itinerary, setItinerary] = useState(() => normalizeItinerary(initialData?.itinerary));

  const { data: destData, isLoading: destLoading } = useGetDestinationsQuery({ limit: 100 });
  const { data: catData, isLoading: catLoading } = useGetCategoriesQuery();

  const destinations = destData?.data || [];
  const categories = Array.isArray(catData?.data) ? catData.data : (Array.isArray(catData) ? catData : []);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          destination: initialData.destination?._id || initialData.destination || '',
          category: initialData.category?._id || initialData.category || '',
          duration: initialData.duration || { days: 3, nights: 2 },
          basePrice: initialData.basePrice,
          maxGroupSize: initialData.maxGroupSize || 15,
          isActive: initialData.isActive ?? true,
          isFeatured: initialData.isFeatured ?? false,
        }
      : {
          title: '', description: '', destination: '', category: '',
          duration: { days: 3, nights: 2 }, basePrice: 5000, maxGroupSize: 15,
          isActive: true, isFeatured: false,
        },
  });

  const tabs = ['basic', 'details', 'itinerary', 'pricing', 'media'];

  const addListItem = (setter, list) => setter([...list, '']);
  const removeListItem = (setter, list, idx) => setter(list.filter((_, i) => i !== idx));
  const updateListItem = (setter, list, idx, val) => setter(list.map((item, i) => (i === idx ? val : item)));

  const addItineraryDay = () => {
    setItinerary([...itinerary, {
      day: itinerary.length + 1,
      title: '', description: '', activities: [''],
      meals: { breakfast: false, lunch: false, dinner: false },
      accommodation: '',
    }]);
  };

  const updateItinerary = (idx, field, value) => {
    setItinerary(itinerary.map((day, i) => (i === idx ? { ...day, [field]: value } : day)));
  };

  const toggleMeal = (dayIdx, meal) => {
    setItinerary(itinerary.map((day, i) =>
      i === dayIdx ? { ...day, meals: { ...day.meals, [meal]: !day.meals[meal] } } : day
    ));
  };

  const handleFormSubmit = async (data) => {
    const payload = {
      ...data,
      highlights: highlights.filter(Boolean),
      inclusions: inclusions.filter(Boolean),
      exclusions: exclusions.filter(Boolean),
      itinerary: itinerary
        .filter((day) => day.title.trim())
        .map((day) => ({
          day: day.day,
          title: day.title,
          description: day.description,
          accommodation: day.accommodation,
          meals: Object.entries(day.meals)
            .filter(([, v]) => v)
            .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1)),
          activities: day.activities
            .filter(Boolean)
            .map((a) => (typeof a === 'string' ? { activity: a } : a)),
        })),
    };
    await onSubmitProp?.(payload);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Tab Navigation */}
      <div className="flex gap-1 p-4 border-b border-gray-100 flex-wrap">
        {tabs.map((tab) => (
          <TabButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabButton>
        ))}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
        {/* Basic Tab */}
        {activeTab === 'basic' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <FormField label="Package Title" error={errors.title?.message} required>
              <input {...register('title')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" placeholder="e.g. Golden Triangle Deluxe Tour" />
            </FormField>

            <FormField label="Description" error={errors.description?.message} required>
              <textarea {...register('description')} rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] resize-none" placeholder="Describe the package in detail..." />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Destination" error={errors.destination?.message} required>
                <select {...register('destination')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] bg-white" disabled={destLoading}>
                  <option value="">{destLoading ? 'Loading...' : 'Select destination'}</option>
                  {destinations.map((d) => (
                    <option key={d._id} value={d._id}>{d.name}{d.country ? `, ${d.country}` : ''}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Category" error={errors.category?.message} required>
                <select {...register('category')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] bg-white" disabled={catLoading}>
                  <option value="">{catLoading ? 'Loading...' : 'Select category'}</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <FormField label="Days" error={errors.duration?.days?.message} required>
                <input type="number" {...register('duration.days')} min={1} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
              </FormField>
              <FormField label="Nights" error={errors.duration?.nights?.message} required>
                <input type="number" {...register('duration.nights')} min={0} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
              </FormField>
              <FormField label="Base Price (₹)" error={errors.basePrice?.message} required>
                <input type="number" {...register('basePrice')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
              </FormField>
              <FormField label="Max Group Size" error={errors.maxGroupSize?.message} required>
                <input type="number" {...register('maxGroupSize')} min={1} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
              </FormField>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('isActive')} className="w-4 h-4 rounded border-gray-300 text-[#0B4F6C] focus:ring-[#0B4F6C]" />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 rounded border-gray-300 text-[#0B4F6C] focus:ring-[#0B4F6C]" />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
          </motion.div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {[
              { label: 'Highlights', state: highlights, setter: setHighlights, icon: '✨', placeholder: 'e.g. Visit Taj Mahal at sunrise' },
              { label: 'Inclusions', state: inclusions, setter: setInclusions, icon: '✅', placeholder: 'e.g. Breakfast included' },
              { label: 'Exclusions', state: exclusions, setter: setExclusions, icon: '❌', placeholder: 'e.g. Personal expenses' },
            ].map(({ label, state, setter, icon, placeholder }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-800">{icon} {label}</h4>
                  <button type="button" onClick={() => addListItem(setter, state)} className="flex items-center gap-1 text-xs text-[#00B4D8] hover:text-[#0B4F6C] font-medium">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {state.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={item} onChange={(e) => updateListItem(setter, state, idx, e.target.value)} placeholder={placeholder} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
                      {state.length > 1 && (
                        <button type="button" onClick={() => removeListItem(setter, state, idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {itinerary.map((day, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0B4F6C] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {day.day}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Day {day.day}</span>
                  </div>
                  {itinerary.length > 1 && (
                    <button type="button" onClick={() => setItinerary(itinerary.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input value={day.title} onChange={(e) => updateItinerary(idx, 'title', e.target.value)} placeholder="Day title (e.g. Arrival in Delhi)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
                  <input value={day.accommodation} onChange={(e) => updateItinerary(idx, 'accommodation', e.target.value)} placeholder="Hotel / Accommodation" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
                </div>
                <textarea value={day.description} onChange={(e) => updateItinerary(idx, 'description', e.target.value)} rows={2} placeholder="Day description and notes..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] resize-none mb-3" />
                <div className="flex gap-3">
                  {['breakfast', 'lunch', 'dinner'].map((meal) => (
                    <button key={meal} type="button" onClick={() => toggleMeal(idx, meal)} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${day.meals[meal] ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                      {day.meals[meal] ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button type="button" onClick={addItineraryDay} className="w-full py-3 border-2 border-dashed border-[#00B4D8] text-[#0B4F6C] rounded-xl text-sm font-semibold hover:bg-[#00B4D8]/5 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Day
            </button>
          </motion.div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-sm text-gray-500">Base price is set in the Basic tab. Additional pricing variants can be added after creating the package.</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700">Discount & Tax</p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <FormField label="Discounted Price (₹)">
                  <input type="number" {...register('discountedPrice')} min={0} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" placeholder="Optional" />
                </FormField>
                <FormField label="Tax %">
                  <input type="number" {...register('taxPercent')} min={0} max={100} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" placeholder="5" />
                </FormField>
              </div>
            </div>
          </motion.div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#00B4D8] transition-colors cursor-pointer">
              <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700 mb-1">Drop images here or click to upload</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB each. First image will be cover.</p>
              <button type="button" className="mt-3 px-4 py-2 bg-[#0B4F6C] text-white text-sm rounded-lg hover:bg-[#0B4F6C]/90">
                Browse Files
              </button>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-6 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-lg hover:bg-[#0B4F6C]/90 disabled:opacity-60 transition-colors flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? 'Saving...' : initialData ? 'Update Package' : 'Create Package'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          )}
          <div className="flex gap-1 ml-auto">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-xs rounded ${activeTab === tab ? 'bg-[#0B4F6C] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
