/*
 *  FileName:-     useAiItineraryBuilder.js
 *  Description:-  Custom hook for AI itinerary builder with mock generation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  selectAiBuilderState,
  setAiBuilderField,
  setGeneratedItinerary,
  setIsGenerating,
  toggleInterest,
  resetAiBuilder,
} from '../slices/itinerarySlice';
import toast from 'react-hot-toast';

const ACTIVITY_TEMPLATES = {
  Adventure: ['Trekking', 'Rock Climbing', 'River Rafting', 'Paragliding', 'Zip-lining'],
  Cultural: ['Museum Visit', 'Heritage Walk', 'Temple Tour', 'Cultural Show', 'Local Market'],
  Beach: ['Beach Walk', 'Snorkeling', 'Kayaking', 'Sunset Viewing', 'Water Sports'],
  Food: ['Local Cuisine Tour', 'Cooking Class', 'Food Market Visit', 'Restaurant Dinner', 'Street Food Walk'],
  Nature: ['Wildlife Safari', 'Bird Watching', 'Nature Walk', 'Photography Tour', 'Botanical Garden'],
  Spiritual: ['Meditation Session', 'Yoga Class', 'Temple Visit', 'Ghat Evening Aarti', 'Pilgrimage'],
};

const generateMockItinerary = ({ destination, days, budget, interests }) => {
  const budgetHotels = { low: 'Budget Guesthouse', medium: 'Business Hotel', high: 'Luxury Resort', premium: '5-Star Resort' };
  const budgetMeals = { low: 'Dhaba', medium: 'Mid-range Restaurant', high: 'Fine Dining', premium: 'Gourmet Restaurant' };

  const allActivities = interests.length > 0
    ? interests.flatMap((i) => ACTIVITY_TEMPLATES[i] || [])
    : Object.values(ACTIVITY_TEMPLATES).flat();

  return {
    id: `AI-${Date.now()}`,
    destination,
    days: parseInt(days),
    budget,
    generatedAt: new Date().toISOString(),
    estimatedCost: { low: 8000, medium: 18000, high: 35000, premium: 65000 }[budget] * parseInt(days),
    days: Array.from({ length: parseInt(days) }, (_, i) => ({
      day: i + 1,
      title: i === 0 ? `Arrival in ${destination}` : i === parseInt(days) - 1 ? `Departure from ${destination}` : `Exploring ${destination} - Day ${i + 1}`,
      description: i === 0
        ? `Arrive at ${destination} and check in to your hotel. Freshen up and take a leisurely evening walk to explore the surroundings.`
        : `Full day of sightseeing and activities in ${destination}. Explore local attractions and immerse yourself in the culture.`,
      activities: allActivities.slice(i * 2, i * 2 + 3).filter(Boolean),
      meals: {
        breakfast: i > 0,
        lunch: true,
        dinner: i < parseInt(days) - 1,
      },
      accommodation: i < parseInt(days) - 1 ? budgetHotels[budget] + `, ${destination}` : null,
      travelTime: i === 0 ? '3-4 hours from nearest airport' : null,
    })),
    highlights: [
      `Best of ${destination} in ${days} days`,
      `${interests.join(', ')} focused itinerary`,
      `${budgetHotels[budget]} accommodations`,
      'All major attractions covered',
    ],
    inclusions: ['Hotel accommodation', 'Daily breakfast', 'Local transport', 'Guide fees'],
    exclusions: ['Airfare', 'Personal expenses', 'Optional activities', 'Travel insurance'],
  };
};

const useAiItineraryBuilder = () => {
  const dispatch = useDispatch();
  const builderState = useSelector(selectAiBuilderState);

  const setField = useCallback(
    (field, value) => dispatch(setAiBuilderField({ field, value })),
    [dispatch]
  );

  const handleToggleInterest = useCallback(
    (interest) => dispatch(toggleInterest(interest)),
    [dispatch]
  );

  const generateItinerary = useCallback(async () => {
    const { destination, days, budget, interests } = builderState;

    if (!destination || !days) {
      toast.error('Please fill in destination and number of days');
      return;
    }

    dispatch(setIsGenerating(true));
    toast.loading('Generating your personalized itinerary...', { id: 'ai-gen' });

    try {
      // Simulate AI generation delay
      await new Promise((r) => setTimeout(r, 2500));
      const itinerary = generateMockItinerary({ destination, days, budget, interests });
      dispatch(setGeneratedItinerary(itinerary));
      toast.success('Itinerary generated!', { id: 'ai-gen' });
      return itinerary;
    } catch (error) {
      dispatch(setIsGenerating(false));
      toast.error('Generation failed. Please try again.', { id: 'ai-gen' });
    }
  }, [builderState, dispatch]);

  const reset = useCallback(() => dispatch(resetAiBuilder()), [dispatch]);

  return {
    ...builderState,
    setField,
    handleToggleInterest,
    generateItinerary,
    reset,
    INTEREST_OPTIONS: Object.keys(ACTIVITY_TEMPLATES),
  };
};

export default useAiItineraryBuilder;
