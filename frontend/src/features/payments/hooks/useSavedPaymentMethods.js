/*
 *  FileName:-     useSavedPaymentMethods.js
 *  Description:-  Custom hook for managing saved payment methods
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useGetSavedCardsQuery, useDeleteCardMutation, useAddCardMutation } from '../apis/paymentApi';

export const useSavedPaymentMethods = () => {
  const { data, isLoading, refetch } = useGetSavedCardsQuery();
  const [deleteCard, { isLoading: isDeleting }] = useDeleteCardMutation();
  const [addCard, { isLoading: isAdding }] = useAddCardMutation();

  const savedCards = data?.cards || [];

  const handleDeleteCard = useCallback(async (cardId) => {
    try {
      await deleteCard(cardId).unwrap();
      toast.success('Card removed');
    } catch {
      toast.error('Failed to remove card');
    }
  }, [deleteCard]);

  const handleAddCard = useCallback(async (cardData) => {
    try {
      await addCard(cardData).unwrap();
      toast.success('Card saved successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save card');
    }
  }, [addCard]);

  const getCardBrand = (number) => {
    const num = (number || '').replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    if (/^6(?:011|5)/.test(num)) return 'discover';
    return 'unknown';
  };

  return {
    savedCards,
    isLoading,
    isDeleting,
    isAdding,
    handleDeleteCard,
    handleAddCard,
    getCardBrand,
    refetch,
  };
};
