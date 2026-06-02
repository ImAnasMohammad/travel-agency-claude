/*
 *  FileName:-     usePayments.js
 *  Description:-  Custom hook for payment processing logic
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  setSelectedMethod,
  setCardData,
  setUpiId,
  setSelectedBank,
  setProcessing,
  setPaymentStatus,
  setPaymentError,
  resetPayment,
  selectPaymentMethod,
  selectCardData,
  selectUpiId,
  selectSelectedBank,
  selectIsProcessing,
  selectPaymentStatus,
} from '../slices/paymentSlice';
import { useInitiatePaymentMutation, useVerifyPaymentMutation } from '../apis/paymentApi';

export const usePayments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedMethod = useSelector(selectPaymentMethod);
  const cardData = useSelector(selectCardData);
  const upiId = useSelector(selectUpiId);
  const selectedBank = useSelector(selectSelectedBank);
  const isProcessing = useSelector(selectIsProcessing);
  const paymentStatus = useSelector(selectPaymentStatus);

  const [initiatePayment] = useInitiatePaymentMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const handleSelectMethod = useCallback((method) => {
    dispatch(setSelectedMethod(method));
  }, [dispatch]);

  const handleCardChange = useCallback((field, value) => {
    dispatch(setCardData({ [field]: value }));
  }, [dispatch]);

  const handleUpiChange = useCallback((value) => {
    dispatch(setUpiId(value));
  }, [dispatch]);

  const handleBankChange = useCallback((bank) => {
    dispatch(setSelectedBank(bank));
  }, [dispatch]);

  const processPayment = useCallback(async ({ bookingId, amount }) => {
    dispatch(setProcessing(true));
    dispatch(setPaymentError(null));

    try {
      const payload = {
        bookingId,
        amount,
        method: selectedMethod,
        ...(selectedMethod === 'card' && { cardData }),
        ...(selectedMethod === 'upi' && { upiId }),
        ...(selectedMethod === 'netbanking' && { bank: selectedBank }),
      };

      const { orderId, razorpayOrderId } = await initiatePayment(payload).unwrap();

      // Simulate Razorpay flow
      const paymentResult = await simulateRazorpay({ amount, orderId: razorpayOrderId });

      await verifyPayment({
        paymentId: paymentResult.razorpay_payment_id,
        signature: paymentResult.razorpay_signature,
        orderId: paymentResult.razorpay_order_id,
      }).unwrap();

      dispatch(setPaymentStatus('success'));
      toast.success('Payment successful!');
      navigate(`/booking-success?bookingId=${bookingId}`);
    } catch (err) {
      dispatch(setPaymentStatus('failed'));
      dispatch(setPaymentError(err?.data?.message || 'Payment failed'));
      toast.error(err?.data?.message || 'Payment failed. Please try again.');
      navigate('/payment-failed');
    } finally {
      dispatch(setProcessing(false));
    }
  }, [selectedMethod, cardData, upiId, selectedBank, initiatePayment, verifyPayment, dispatch, navigate]);

  const handleReset = useCallback(() => {
    dispatch(resetPayment());
  }, [dispatch]);

  return {
    selectedMethod,
    cardData,
    upiId,
    selectedBank,
    isProcessing,
    paymentStatus,
    handleSelectMethod,
    handleCardChange,
    handleUpiChange,
    handleBankChange,
    processPayment,
    handleReset,
  };
};

// Simulates Razorpay SDK flow (replace with real SDK in production)
const simulateRazorpay = ({ amount, orderId }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate for dev
      if (Math.random() > 0.1) {
        resolve({
          razorpay_payment_id: `pay_${Date.now()}`,
          razorpay_order_id: orderId,
          razorpay_signature: `sig_${Date.now()}`,
        });
      } else {
        reject(new Error('Payment declined'));
      }
    }, 2000);
  });
