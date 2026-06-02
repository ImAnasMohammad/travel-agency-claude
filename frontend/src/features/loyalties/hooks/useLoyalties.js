/*
 *  FileName:-     useLoyalties.js
 *  Description:-  Custom hook for loyalty program data and operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useGetBalanceQuery, useGetTransactionsQuery, useRedeemPointsMutation } from '../apis/loyaltyApi';
import { TIERS } from '../slices/loyaltySlice';

export const useLoyalties = () => {
  const { data: balanceData, isLoading: isLoadingBalance, refetch: refetchBalance } = useGetBalanceQuery();
  const { data: txData, isLoading: isLoadingTx } = useGetTransactionsQuery();
  const [redeemPoints, { isLoading: isRedeeming }] = useRedeemPointsMutation();

  const balance = balanceData?.balance || 0;
  const tier = balanceData?.tier || 'BRONZE';
  const transactions = txData?.transactions || [];
  const tierInfo = TIERS[tier] || TIERS.BRONZE;

  const getNextTier = () => {
    const tierKeys = Object.keys(TIERS);
    const currentIdx = tierKeys.indexOf(tier);
    if (currentIdx < tierKeys.length - 1) {
      return { key: tierKeys[currentIdx + 1], ...TIERS[tierKeys[currentIdx + 1]] };
    }
    return null;
  };

  const nextTier = getNextTier();
  const progressToNextTier = nextTier
    ? Math.min(100, Math.round(((balance - tierInfo.minPoints) / (nextTier.minPoints - tierInfo.minPoints)) * 100))
    : 100;

  const pointsToNextTier = nextTier ? Math.max(0, nextTier.minPoints - balance) : 0;

  const pointsValue = (points) => Math.floor(points / 10); // 10 points = ₹1

  const handleRedeem = useCallback(async (points, bookingId) => {
    if (points > balance) {
      toast.error('Insufficient loyalty points');
      return;
    }
    try {
      await redeemPoints({ points, bookingId }).unwrap();
      toast.success(`${points} points redeemed! ₹${pointsValue(points)} discount applied`);
      refetchBalance();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to redeem points');
    }
  }, [balance, redeemPoints, refetchBalance]);

  return {
    balance,
    tier,
    tierInfo,
    nextTier,
    progressToNextTier,
    pointsToNextTier,
    transactions,
    isLoadingBalance,
    isLoadingTx,
    isRedeeming,
    handleRedeem,
    pointsValue,
  };
};
