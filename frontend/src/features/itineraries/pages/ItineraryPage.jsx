/*
 *  FileName:-     ItineraryPage.jsx
 *  Description:-  Full itinerary view page with timeline, highlights, and package details
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, IndianRupee, Star, CheckCircle, XCircle, Download, Share2 } from 'lucide-react';
import ItineraryTimeline from '../components/ItineraryTimeline';
import toast from 'react-hot-toast';

const mockItinerary = {
  id: 'ITN-001',
  packageId: 'PKG-001',
  packageName: 'Rajasthan Royal Heritage Tour',
  destination: 'Rajasthan, India',
  duration: { days: 7, nights: 6 },
  basePrice: 45000,
  rating: 4.8,
  reviews: 142,
  coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=400&fit=crop',
  highlights: [
    'Explore the iconic Amber Fort and palace complex',
    'Camel safari in the golden sand dunes of Jaisalmer',
    'Witness the spectacular Mehrangarh Fort in Jodhpur',
    'Romantic boat ride on Lake Pichola in Udaipur',
    'Shopping at vibrant local bazaars',
    'Traditional Rajasthani cultural dinner show',
  ],
  inclusions: ['All hotel accommodations (3-star)', 'Daily breakfast', 'AC transport throughout', 'Licensed local guides', 'Entry fees to monuments', 'Airport transfers'],
  exclusions: ['Airfare to/from Rajasthan', 'Lunch and dinner (except Day 1 welcome dinner)', 'Camera fees at monuments', 'Personal shopping', 'Travel insurance'],
  days: [
    { day: 1, title: 'Arrival in Jaipur – The Pink City', description: 'Arrive at Jaipur International Airport. Transfer to hotel and check-in. Evening visit to Hawa Mahal for sunset views. Welcome dinner with traditional Rajasthani music.', activities: ['Airport Transfer', 'Hotel Check-in', 'Hawa Mahal Visit', 'Sunset Photography', 'Welcome Dinner'], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: 'Hotel Jai Mahal Palace, Jaipur' },
    { day: 2, title: 'Jaipur Full Day – Amber Fort & City Tour', description: 'After breakfast, explore the magnificent Amber Fort via elephant ride. Continue to Jal Mahal, City Palace, and Jantar Mantar. Evening free for local bazaar shopping.', activities: ['Amber Fort & Elephant Ride', 'Jal Mahal', 'City Palace Museum', 'Jantar Mantar', 'Johri Bazaar Shopping'], meals: { breakfast: true, lunch: true, dinner: false }, accommodation: 'Hotel Jai Mahal Palace, Jaipur' },
    { day: 3, title: 'Jaipur to Jaisalmer – Desert Journey', description: 'Early morning drive to Jaisalmer (6 hours). Visit Jaisalmer Fort upon arrival. Evening camel safari in the Sam Sand Dunes with folk music and dinner under stars.', activities: ['Scenic Drive', 'Jaisalmer Fort', 'Patwon Ki Haveli', 'Camel Safari', 'Folk Music & Dance'], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: 'Desert View Resort, Jaisalmer' },
    { day: 4, title: 'Jaisalmer to Jodhpur – The Blue City', description: 'Morning free for exploring local markets. Drive to Jodhpur (3 hours). Visit the imposing Mehrangarh Fort. Evening walk through the famous blue-painted old city streets.', activities: ['Local Market Tour', 'Mehrangarh Fort', 'Jaswant Thada', 'Blue City Walk', 'Rooftop Dinner'], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: 'RAAS Jodhpur Hotel' },
    { day: 5, title: 'Jodhpur to Udaipur – City of Lakes', description: 'Drive to Udaipur through scenic Aravalli Hills (5 hours). Check in and explore Lake Pichola by boat. Visit City Palace and enjoy the magical Udaipur illuminations by night.', activities: ['Aravalli Scenic Drive', 'City Palace', 'Lake Pichola Boat Ride', 'Bagore Ki Haveli', 'Udaipur Light Show'], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: 'Hotel Fateh Garh, Udaipur' },
    { day: 6, title: 'Udaipur – Gardens & Culture', description: 'Visit Saheliyon ki Bari gardens and Shilpgram artisan village. Afternoon cooking class with local family. Evening at the iconic Fateh Prakash rooftop with sunset views over the lake.', activities: ['Saheliyon ki Bari', 'Shilpgram Village', 'Rajasthani Cooking Class', 'Jagdish Temple', 'Fateh Prakash Sunset'], meals: { breakfast: true, lunch: true, dinner: false }, accommodation: 'Hotel Fateh Garh, Udaipur' },
    { day: 7, title: 'Udaipur Departure', description: 'Checkout after breakfast. Optional morning visit to Monsoon Palace. Transfer to Udaipur Airport/Railway Station for your onward journey with beautiful memories.', activities: ['Monsoon Palace (optional)', 'Souvenir Shopping', 'Airport Transfer', 'Farewell Breakfast'], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: null },
  ],
};

const ItineraryPage = () => {
  const { packageId } = useParams();
  const itinerary = mockItinerary;

  const handleDownloadPDF = () => {
    toast.success('Downloading PDF itinerary...');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 sm:h-80">
        <img src={itinerary.coverImage} alt={itinerary.packageName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-[#00B4D8] text-white text-xs font-bold rounded-full mb-2">Itinerary</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{itinerary.packageName}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-white/80 text-sm"><MapPin className="w-4 h-4" />{itinerary.destination}</span>
              <span className="flex items-center gap-1 text-white/80 text-sm"><Clock className="w-4 h-4" />{itinerary.duration.days}D/{itinerary.duration.nights}N</span>
              <span className="flex items-center gap-1 text-white/80 text-sm"><Star className="w-4 h-4 text-amber-400 fill-amber-400" />{itinerary.rating} ({itinerary.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-[#0B4F6C]">₹{itinerary.basePrice.toLocaleString('en-IN')}</span>
            <span className="text-gray-500 text-sm">/ person</span>
          </div>
          <div className="flex gap-2">
            <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 bg-[#0B4F6C] text-white text-sm font-semibold rounded-xl hover:bg-[#0B4F6C]/90 transition-colors">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Trip Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {itinerary.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 bg-[#0B4F6C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-[#0B4F6C]" />
                </div>
                <span className="text-sm text-gray-700">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center"><CheckCircle className="w-3 h-3 text-emerald-600" /></span>
              Inclusions
            </h3>
            <ul className="space-y-2">
              {itinerary.inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center"><XCircle className="w-3 h-3 text-red-500" /></span>
              Exclusions
            </h3>
            <ul className="space-y-2">
              {itinerary.exclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Day Timeline */}
        <ItineraryTimeline days={itinerary.days} showAll />

        {/* Book CTA */}
        <div className="bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8] rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Ready for this adventure?</h3>
          <p className="text-white/80 text-sm mb-4">Book now and get ₹2,000 off with code EARLY2026</p>
          <button className="px-8 py-3 bg-white text-[#0B4F6C] text-sm font-bold rounded-xl hover:bg-white/90 transition-colors">
            Book This Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
