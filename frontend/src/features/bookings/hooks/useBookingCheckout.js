/*
 *  FileName:-     useBookingCheckout.js
 *  Description:-  Custom hook for the multi-step booking checkout flow
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  selectCheckoutData,
  selectTravellerDetails,
  selectEmergencyContact,
  selectBookingStep,
  setCheckoutData,
  setSelectedDate,
  setSelectedVariant,
  setGuestCount,
  setCoupon,
  clearCoupon,
  setPriceBreakdown,
  setTravellerDetails,
  updateTraveller,
  setEmergencyContact,
  setStep,
  nextStep,
  prevStep,
  resetBookingFlow,
  setCurrentBooking,
} from '../slices/bookingSlice';
import { useCreateBookingMutation } from '../apis/bookingApi';

export const useBookingCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutData = useSelector(selectCheckoutData);
  const travellerDetails = useSelector(selectTravellerDetails);
  const emergencyContact = useSelector(selectEmergencyContact);
  const step = useSelector(selectBookingStep);

  const [createBooking, { isLoading: isCreating }] = useCreateBookingMutation();

  const handleSetDate = useCallback((date) => {
    dispatch(setSelectedDate(date));
  }, [dispatch]);

  const handleSetVariant = useCallback((variant) => {
    dispatch(setSelectedVariant(variant));
  }, [dispatch]);

  const handleSetGuestCount = useCallback((count) => {
    dispatch(setGuestCount(count));
    // Initialize traveller slots
    const travellers = Array.from({ length: count }, (_, i) => ({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      passportNumber: '',
      nationality: '',
      dateOfBirth: '',
    }));
    dispatch(setTravellerDetails(travellers));
  }, [dispatch]);

  const handleApplyCoupon = useCallback((code, discount) => {
    dispatch(setCoupon({ code, discount }));
  }, [dispatch]);

  const handleRemoveCoupon = useCallback(() => {
    dispatch(clearCoupon());
  }, [dispatch]);

  const handleUpdatePriceBreakdown = useCallback((breakdown) => {
    dispatch(setPriceBreakdown(breakdown));
  }, [dispatch]);

  const handleUpdateTraveller = useCallback((index, data) => {
    dispatch(updateTraveller({ index, data }));
  }, [dispatch]);

  const handleSetEmergencyContact = useCallback((contact) => {
    dispatch(setEmergencyContact(contact));
  }, [dispatch]);

  const handleNextStep = useCallback(() => {
    dispatch(nextStep());
  }, [dispatch]);

  const handlePrevStep = useCallback(() => {
    dispatch(prevStep());
  }, [dispatch]);

  const handleGoToStep = useCallback((stepNumber) => {
    dispatch(setStep(stepNumber));
  }, [dispatch]);

  const handleCreateBooking = useCallback(async () => {
    try {
      const payload = {
        packageId: checkoutData.packageId,
        variantId: checkoutData.selectedVariant?.id,
        travelDate: checkoutData.selectedDate,
        guestCount: checkoutData.guestCount,
        couponCode: checkoutData.couponCode || undefined,
        travellers: travellerDetails,
        emergencyContact,
        priceBreakdown: checkoutData.priceBreakdown,
      };

      const result = await createBooking(payload).unwrap();
      dispatch(setCurrentBooking(result.data || result));
      return result;
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create booking');
      throw err;
    }
  }, [checkoutData, travellerDetails, emergencyContact, createBooking, dispatch]);

  const handleReset = useCallback(() => {
    dispatch(resetBookingFlow());
  }, [dispatch]);

  const initializeCheckout = useCallback((packageDetails) => {
    dispatch(setCheckoutData({
      packageId: packageDetails._id || packageDetails.id,
      packageDetails,
    }));
    dispatch(setStep(1));
  }, [dispatch]);

  return {
    checkoutData,
    travellerDetails,
    emergencyContact,
    step,
    isCreating,
    handleSetDate,
    handleSetVariant,
    handleSetGuestCount,
    handleApplyCoupon,
    handleRemoveCoupon,
    handleUpdatePriceBreakdown,
    handleUpdateTraveller,
    handleSetEmergencyContact,
    handleNextStep,
    handlePrevStep,
    handleGoToStep,
    handleCreateBooking,
    handleReset,
    initializeCheckout,
  };
};
