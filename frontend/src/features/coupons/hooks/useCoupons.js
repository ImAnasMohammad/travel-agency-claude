/*
 *  FileName:-     useCoupons.js
 *  Description:-  Custom hook for coupon validation and management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useValidateCouponMutation } from '../apis/couponApi';
import {
  setAppliedCoupon,
  clearAppliedCoupon,
  setValidating,
  setCouponError,
  selectAppliedCoupon,
  selectCouponError,
  selectCouponValidating,
} from '../slices/couponSlice';

export const useCoupons = ({ packageId, amount } = {}) => {
  const dispatch = useDispatch();
  const [couponInput, setCouponInput] = useState('');

  const appliedCoupon = useSelector(selectAppliedCoupon);
  const error = useSelector(selectCouponError);
  const isValidating = useSelector(selectCouponValidating);

  const [validateCoupon] = useValidateCouponMutation();

  const handleApply = useCallback(async (code) => {
    const codeToApply = code || couponInput;
    if (!codeToApply.trim()) return;

    dispatch(setValidating(true));
    dispatch(setCouponError(null));

    try {
      const result = await validateCoupon({
        code: codeToApply.trim().toUpperCase(),
        packageId,
        amount,
      }).unwrap();

      dispatch(setAppliedCoupon({
        code: result.code,
        discount: result.discountAmount,
        discountType: result.discountType,
        discountValue: result.discountValue,
        description: result.description,
      }));

      toast.success(`Coupon applied! You save ₹${result.discountAmount}`);
      setCouponInput('');
    } catch (err) {
      const message = err?.data?.message || 'Invalid or expired coupon';
      dispatch(setCouponError(message));
      toast.error(message);
    } finally {
      dispatch(setValidating(false));
    }
  }, [couponInput, packageId, amount, validateCoupon, dispatch]);

  const handleRemove = useCallback(() => {
    dispatch(clearAppliedCoupon());
    setCouponInput('');
    toast.success('Coupon removed');
  }, [dispatch]);

  const calculateDiscount = useCallback((totalAmount) => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.discount || 0;
  }, [appliedCoupon]);

  return {
    couponInput,
    setCouponInput,
    appliedCoupon,
    error,
    isValidating,
    handleApply,
    handleRemove,
    calculateDiscount,
  };
};
