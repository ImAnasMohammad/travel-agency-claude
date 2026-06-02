/*
 *  FileName:-     AiItineraryBuilderPage.jsx
 *  Description:-  AI itinerary builder page with destination input and mock generated itinerary
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, MapPin, Clock, Wallet, Heart, RefreshCw, Download, BookOpen,
  Wand2, ChevronRight, CheckCircle, Star,
} from 'lucide-react';
import useAiItineraryBuilder from '../hooks/useAiItineraryBuilder';
import ItineraryTimeline from '../components/ItineraryTimeline';
import toast from 'react-hot-toast';

const BUDGET_OPTIONS = [
  { value: 'low', label: 'Budget', desc: '< ₹8K/day', icon: '💰', color: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  { value: 'medium', label: 'Standard', desc: '₹8K–₹18K/day', icon: '⭐', color: 'border-blue-200 bg-blue-50 text-blue-700' },
  { value: 'high', label: 'Premium', desc: '₹18K–₹35K/day', icon: '💎', color: 'border-purple-200 bg-purple-50 text-purple-700' },
  { value: 'premium', label: 'Luxury', desc: '₹35K+/day', icon: '👑', color: 'border-amber-200 bg-amber-50 text-amber-700' },
];

const POPULAR_DESTINATIONS = ['Goa', 'Rajasthan', 'Kerala', 'Ladakh', 'Himachal Pradesh', 'Andaman', 'Varanasi', 'Coorg'];

const AiItineraryBuilderPage = () => {
  const {
    destination, days, budget, interests, generatedItinerary, isGenerating,
    setField, handleToggleInterest, generateItinerary, reset, INTEREST_OPTIONS,
  } = useAiItineraryBuilder();

  const [step, setStep] = useState(1);

  const canGenerate = destination && days >= 1 && days <= 30;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    const result = await generateItinerary();
    if (result) setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#0B4F6C]/5">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8] text-white px-4 sm:px-6 py-10 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold">AI-Powered Itinerary Builder</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">Build Your Dream Itinerary</h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">Tell us your destination and preferences — our AI creates a personalized day-by-day travel plan instantly.</p>
        </motion.div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-white text-[#0B4F6C]' : 'bg-white/30 text-white'}`}>{s}</div>
              {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-white' : 'bg-white/30'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-12 mt-1">
          {['Configure', 'Preferences', 'Itinerary'].map((label, i) => (
            <span key={label} className={`text-xs ${step >= i + 1 ? 'text-white' : 'text-white/50'}`}>{label}</span>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Step 1: Basic Config */}
        {step <= 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#0B4F6C]" /> Where are you going?
            </h2>

            <div className="space-y-5">
              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Destination *</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setField('destination', e.target.value)}
                  placeholder="e.g. Goa, Rajasthan, Kerala..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {POPULAR_DESTINATIONS.map((dest) => (
                    <button key={dest} onClick={() => setField('destination', dest)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${destination === dest ? 'bg-[#0B4F6C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#0B4F6C]/10'}`}>
                      {dest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Number of Days *</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setField('days', Math.max(1, days - 1))} className="w-10 h-10 border border-gray-200 rounded-xl text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center">−</button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-black text-[#0B4F6C]">{days}</span>
                    <span className="text-gray-500 text-sm ml-1">days</span>
                  </div>
                  <button onClick={() => setField('days', Math.min(30, days + 1))} className="w-10 h-10 border border-gray-200 rounded-xl text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center">+</button>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Budget Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button key={opt.value} onClick={() => setField('budget', opt.value)} className={`p-3 rounded-xl border-2 text-left transition-all ${budget === opt.value ? `${opt.color} border-current shadow-sm` : 'border-gray-200 hover:border-gray-300'}`}>
                      <span className="text-lg">{opt.icon}</span>
                      <p className="text-xs font-bold mt-1">{opt.label}</p>
                      <p className="text-[10px] opacity-70">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Interests */}
        {step <= 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" /> What are your interests?
            </h2>
            <p className="text-sm text-gray-500 mb-4">Select all that apply (optional — helps personalize your itinerary)</p>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleToggleInterest(interest)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all ${interests.includes(interest) ? 'bg-[#0B4F6C] text-white border-[#0B4F6C] shadow-sm' : 'border-gray-200 text-gray-600 hover:border-[#0B4F6C]/40 hover:text-[#0B4F6C]'}`}
                >
                  {interests.includes(interest) && <CheckCircle className="w-4 h-4" />}
                  {interest}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Generate Button */}
        {step <= 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}>
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8] text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating your personalized itinerary...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate AI Itinerary
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Generated Itinerary */}
        <AnimatePresence>
          {generatedItinerary && step === 3 && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-semibold opacity-80">AI Generated Itinerary</span>
                </div>
                <h2 className="text-2xl font-black mb-1">{generatedItinerary.destination}</h2>
                <div className="flex flex-wrap gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-sm text-white/80"><Clock className="w-4 h-4" />{generatedItinerary.days?.length || days} Days</span>
                  <span className="flex items-center gap-1.5 text-sm text-white/80"><Wallet className="w-4 h-4" />Est. ₹{(generatedItinerary.estimatedCost || 0).toLocaleString('en-IN')}</span>
                  {interests.length > 0 && <span className="flex items-center gap-1.5 text-sm text-white/80"><Heart className="w-4 h-4" />{interests.join(', ')}</span>}
                </div>
              </div>

              {/* Highlights */}
              {generatedItinerary.highlights && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Trip Highlights</h3>
                  <ul className="space-y-2">
                    {generatedItinerary.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00B4D8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Day Timeline */}
              <ItineraryTimeline days={generatedItinerary.days} showAll />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => { reset(); setStep(1); }} className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4" /> Regenerate
                </button>
                <button onClick={() => toast.success('Itinerary saved!')} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#0B4F6C] text-white text-sm font-semibold rounded-xl hover:bg-[#0B4F6C]/90 transition-colors">
                  <BookOpen className="w-4 h-4" /> Save Itinerary
                </button>
                <button onClick={() => toast.success('Downloading PDF...')} className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AiItineraryBuilderPage;
