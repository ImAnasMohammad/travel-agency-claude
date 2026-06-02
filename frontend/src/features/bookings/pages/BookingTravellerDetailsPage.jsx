/*
 *  FileName:-     BookingTravellerDetailsPage.jsx
 *  Description:-  Step 2: Fill traveller details with previously saved travellers panel
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertCircle, Users, BookOpen } from 'lucide-react';
import BookingTimeline from '../components/BookingTimeline';
import BookingTravellerList from '../components/BookingTravellerList';
import { useBookingCheckout } from '../hooks/useBookingCheckout';
import { travellerSchema, emergencyContactSchema } from '../validations/bookingValidation';
import { useGetSavedTravellersQuery, useSaveTravellersMutation } from '../../users/apis/userApi';

const BookingTravellerDetailsPage = () => {
  const navigate = useNavigate();
  const { packageId } = useParams();
  const {
    checkoutData,
    travellerDetails,
    emergencyContact,
    handleUpdateTraveller,
    handleSetEmergencyContact,
    handleNextStep,
    handlePrevStep,
  } = useBookingCheckout();

  const { data: savedTravellers = [] } = useGetSavedTravellersQuery();
  const [saveTravellers] = useSaveTravellersMutation();

  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [savedPanelOpen, setSavedPanelOpen] = useState(true);

  const handleTravellerChange = (index, data) => {
    handleUpdateTraveller(index, data);
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`travellers[${index}]`];
      return next;
    });
  };

  const handleApplySaved = (saved, slotIndex) => {
    handleUpdateTraveller(slotIndex, {
      firstName: saved.firstName || '',
      lastName: saved.lastName || '',
      age: saved.age != null ? String(saved.age) : '',
      gender: saved.gender || '',
      nationality: saved.nationality || '',
      passportNumber: saved.passportNumber || '',
      dateOfBirth: saved.dateOfBirth ? saved.dateOfBirth.slice(0, 10) : '',
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`travellers[${slotIndex}]`];
      return next;
    });
  };

  const validateAll = async () => {
    setIsValidating(true);
    const newErrors = {};
    let isValid = true;

    for (let i = 0; i < checkoutData.guestCount; i++) {
      try {
        await travellerSchema.validate(travellerDetails[i] || {}, { abortEarly: false });
      } catch (err) {
        isValid = false;
        const travellerErrors = {};
        err.inner.forEach((e) => { travellerErrors[e.path] = e.message; });
        newErrors[`travellers[${i}]`] = travellerErrors;
      }
    }

    try {
      await emergencyContactSchema.validate(emergencyContact, { abortEarly: false });
    } catch (err) {
      isValid = false;
      const ecErrors = {};
      err.inner.forEach((e) => { ecErrors[e.path] = e.message; });
      newErrors.emergencyContact = ecErrors;
    }

    setErrors(newErrors);
    setIsValidating(false);
    return isValid;
  };

  const handleContinue = async () => {
    const valid = await validateAll();
    if (valid) {
      // Save travellers in background — non-blocking
      saveTravellers(travellerDetails.slice(0, checkoutData.guestCount)).unwrap().catch(() => {});
      handleNextStep();
      navigate(`/book/${packageId}/review`);
    }
  };

  const handleBack = () => {
    handlePrevStep();
    navigate(`/book/${packageId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Timeline */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <BookingTimeline currentStep={2} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-900">Traveller Details</h1>
            <p className="text-gray-500 mt-1">
              Fill in details for all {checkoutData.guestCount}{' '}
              {checkoutData.guestCount === 1 ? 'traveller' : 'travellers'}.
            </p>
          </div>

          {/* Previously Saved Travellers Panel */}
          <AnimatePresence>
            {savedTravellers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-5 overflow-hidden"
              >
                <button
                  onClick={() => setSavedPanelOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#0B4F6C]" />
                    <span className="font-bold text-gray-900">Previously Saved Travellers</span>
                    <span className="ml-1 text-xs bg-[#0B4F6C] text-white rounded-full px-2 py-0.5">
                      {savedTravellers.length}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${savedPanelOpen ? 'rotate-90' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {savedPanelOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3">
                        <p className="text-sm text-gray-500">
                          Click a traveller slot button to pre-fill that form.
                        </p>
                        {savedTravellers.map((t, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-full bg-[#0B4F6C] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {t.firstName?.[0]}{t.lastName?.[0]}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm truncate">
                                  {t.firstName} {t.lastName}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {[
                                    t.gender && (t.gender.charAt(0).toUpperCase() + t.gender.slice(1)),
                                    t.age ? `${t.age} yrs` : null,
                                    t.nationality,
                                  ].filter(Boolean).join(' · ')}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-1.5 flex-shrink-0 flex-wrap justify-end">
                              {Array.from({ length: checkoutData.guestCount }, (_, slotIdx) => (
                                <button
                                  key={slotIdx}
                                  onClick={() => handleApplySaved(t, slotIdx)}
                                  className="px-2.5 py-1 text-xs font-semibold bg-black text-white rounded-full hover:bg-gray-700 transition-colors"
                                  title={`Fill Traveller ${slotIdx + 1}`}
                                >
                                  T{slotIdx + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Validation error banner */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-700">Please fix the errors below</p>
                <p className="text-xs text-red-600 mt-0.5">
                  Make sure all required fields are filled correctly.
                </p>
              </div>
            </div>
          )}

          <BookingTravellerList
            travellers={travellerDetails}
            guestCount={checkoutData.guestCount}
            errors={errors}
            emergencyContact={emergencyContact}
            onTravellerChange={handleTravellerChange}
            onEmergencyContactChange={handleSetEmergencyContact}
          />

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300
                text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={isValidating}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-black text-white
                text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isValidating ? 'Validating...' : 'Save and Review'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingTravellerDetailsPage;
