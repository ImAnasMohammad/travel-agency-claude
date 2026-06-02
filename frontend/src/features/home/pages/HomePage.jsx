/*
 *  FileName:-     HomePage.jsx
 *  Description:-  Stunning home page with hero, categories, destinations, packages, testimonials
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Search, MapPin, Calendar, Users, ChevronDown, ArrowRight,
  Star, Shield, Headphones, DollarSign, Map, ChevronRight,
  CheckCircle, Compass, Camera, Tent, Heart, Globe,
  Mail, Phone, Instagram, Facebook, Twitter, Mountain,
} from 'lucide-react';
import { useGetFeaturedDestinationsQuery } from '../../destinations/apis/destinationApi';
import { useGetCategoriesQuery } from '../../categories/apis/categoryApi';
import { useGetFeaturedPackagesQuery } from '../../packages/apis/packageApi';

// ═══════════════════════════════════════════════════════
// STATIC CONSTANTS (not data-driven)
// ═══════════════════════════════════════════════════════

const FEATURES = [
  { icon: DollarSign, title: 'Best Price Guarantee', desc: "We match any price. Find it cheaper anywhere and we'll refund the difference.", color: '#FF6B35' },
  { icon: Map, title: 'Expert Local Guides', desc: 'Our certified guides have years of local experience to make your trip unforgettable.', color: '#0B4F6C' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock customer support available via call, chat, and email.', color: '#00B4D8' },
  { icon: Shield, title: 'Custom Itineraries', desc: "Bespoke travel plans tailored exactly to your preferences and budget.", color: '#FFD166' },
];

const HOW_IT_WORKS = [
  { step: 1, icon: Compass, title: 'Choose Destination', desc: 'Browse 500+ destinations and find your dream getaway' },
  { step: 2, icon: Map, title: 'Select Package', desc: 'Pick from curated packages or customize your own' },
  { step: 3, icon: CheckCircle, title: 'Book & Pay', desc: 'Secure booking with multiple payment options' },
  { step: 4, icon: Globe, title: 'Travel & Enjoy', desc: 'Sit back, relax, and create lifetime memories' },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma', location: 'Mumbai, India', rating: 5,
    review: "WanderLux made our honeymoon absolutely magical! The Maldives package was flawless from start to finish. Every detail was taken care of.",
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b1fae8c3?w=100',
    trip: 'Maldives Honeymoon',
  },
  {
    name: 'Rahul Verma', location: 'Bangalore, India', rating: 5,
    review: "The Bali trip exceeded all my expectations. The guides were knowledgeable, hotels were premium, and the itinerary was perfectly planned.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    trip: 'Bali Explorer',
  },
  {
    name: 'Sneha Patel', location: 'Ahmedabad, India', rating: 5,
    review: "Rajasthan tour with WanderLux was a cultural dream! The fort visits, camel rides, and royal dining experience — absolutely priceless.",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    trip: 'Rajasthan Royal Tour',
  },
];

// ═══════════════════════════════════════════════════════
// ANIMATION HELPERS
// ═══════════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ text }) => (
  <span className="text-xs font-black tracking-[0.25em] text-[#00B4D8] uppercase font-mono">
    {text}
  </span>
);

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════

const HomePage = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [activePackageTab, setActivePackageTab] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const { data: destinationsData, isLoading: destLoading } = useGetFeaturedDestinationsQuery();
  const { data: categoriesData, isLoading: catLoading } = useGetCategoriesQuery();
  const { data: packagesData, isLoading: pkgLoading } = useGetFeaturedPackagesQuery(6);

  const toArray = (val) => (Array.isArray(val) ? val : []);
  const destinations = toArray(destinationsData?.data);
  const categories = toArray(categoriesData);
  const packages = toArray(packagesData?.data);

  const PACKAGE_TABS = ['All', ...new Set(packages.map((p) => p.category?.name || p.category).filter(Boolean))];

  const filteredPackages = activePackageTab === 'All'
    ? packages
    : packages.filter((p) => (p.category?.name || p.category) === activePackageTab);

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ destination, date, guests }).toString();
    window.location.href = `/packages?${params}`;
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 1: HERO                                    */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #0B4F6C 0%, #005F7F 30%, #00B4D8 65%, #FF6B35 100%)',
          }}
        />

        <div className="absolute inset-0 z-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/30"
              style={{
                width: `${200 + i * 150}px`,
                height: `${200 + i * 150}px`,
                left: `${10 + i * 8}%`,
                top: `${5 + i * 5}%`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-0 overflow-hidden">
          {[
            { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300', x: '75%', y: '15%', size: 'w-40 h-40', delay: 0 },
            { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300', x: '5%', y: '20%', size: 'w-28 h-28', delay: 0.3 },
            { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300', x: '82%', y: '60%', size: 'w-32 h-32', delay: 0.6 },
            { src: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300', x: '2%', y: '65%', size: 'w-24 h-24', delay: 0.2 },
          ].map((img, i) => (
            <motion.div
              key={i}
              className={`absolute ${img.size} rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30`}
              style={{ left: img.x, top: img.y }}
              initial={{ opacity: 0, scale: 0.7, rotate: -10 + i * 5 }}
              animate={{ opacity: 0.7, scale: 1, rotate: -5 + i * 3 }}
              transition={{ delay: img.delay + 0.5, duration: 0.8, ease: 'easeOut' }}
            >
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-white/80 font-mono text-sm tracking-[0.3em] uppercase mb-6">
              Premium Travel Experiences
            </p>
            <h1
              className="text-white font-black leading-none mb-6"
              style={{
                fontSize: 'clamp(48px, 8vw, 96px)',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              Discover Your<br />
              <span style={{ color: '#FFD166' }}>Next Adventure</span>
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Premium travel packages to the world's most beautiful destinations
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="bg-white rounded-2xl md:rounded-full p-3 shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2 md:gap-0"
          >
            <div className="flex items-center gap-2 flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <MapPin className="w-5 h-5 text-[#0B4F6C] flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-medium">Destination</p>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <Calendar className="w-5 h-5 text-[#0B4F6C] flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-medium">Travel Date</p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="text-sm text-gray-800 outline-none bg-transparent w-36"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 md:pr-2">
              <Users className="w-5 h-5 text-[#0B4F6C] flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-medium">Guests</p>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="text-sm text-gray-800 outline-none bg-transparent"
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors flex-shrink-0"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </motion.form>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4 md:gap-8 mt-8 flex-wrap"
          >
            {[
              { value: '500+', label: 'Destinations' },
              { value: '10,000+', label: 'Happy Travelers' },
              { value: '4.9★', label: 'Rating' },
              { value: '8+', label: 'Years Experience' },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px h-8 bg-white/30 hidden md:block" />}
                <div className="text-center">
                  <p className="text-white font-black text-2xl">{stat.value}</p>
                  <p className="text-white/70 text-xs font-medium">{stat.label}</p>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-1 text-white/70">
            <p className="text-xs font-medium tracking-wider">SCROLL</p>
            <ChevronDown className="w-5 h-5" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 2: CATEGORIES                              */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FadeUp className="text-center mb-12">
            <SectionLabel text="Explore by Type" />
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3" style={{ letterSpacing: '-0.02em' }}>
              Find Your Perfect Journey
            </h2>
          </FadeUp>

          {catLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="rounded-2xl aspect-[3/4] bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat, i) => (
                <FadeUp key={cat._id || cat.id || cat.name} delay={i * 0.1}>
                  <Link
                    to={`/packages?category=${cat.slug || cat.name?.toLowerCase()}`}
                    className="group relative overflow-hidden rounded-2xl aspect-[3/4] block"
                  >
                    <img
                      src={cat.image?.url || cat.imageUrl || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400'}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white">
                      <p className="font-bold text-lg">{cat.name}</p>
                      {cat.packageCount != null && (
                        <p className="text-xs text-white/70">{cat.packageCount} packages</p>
                      )}
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 3: TRENDING DESTINATIONS                   */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FadeUp className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel text="Top Picks" />
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3" style={{ letterSpacing: '-0.02em' }}>
                Trending Destinations
              </h2>
            </div>
            <Link to="/destinations" className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>

          {destLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl aspect-video bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {destinations.map((dest, i) => (
                <FadeUp key={dest._id || dest.id || dest.name} delay={i * 0.1}>
                  <Link to={`/destinations/${dest.slug || dest._id || dest.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl aspect-video">
                      <img
                        src={dest.image || dest.imageUrl || dest.coverImage}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {dest.tag && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                            {dest.tag}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                        <div>
                          <h3 className="text-2xl font-black text-white">{dest.name}</h3>
                          <p className="text-sm text-white/80">{dest.country}</p>
                        </div>
                        {dest.packageCount != null && (
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 text-right">
                            <p className="text-lg font-black">{dest.packageCount}</p>
                            <p className="text-xs text-white/80">Packages</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          )}

          <FadeUp className="text-center mt-8 md:hidden">
            <Link to="/destinations" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 font-medium hover:bg-gray-100">
              View All Destinations <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 4: POPULAR PACKAGES                        */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FadeUp className="text-center mb-8">
            <SectionLabel text="Hand-Picked" />
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3" style={{ letterSpacing: '-0.02em' }}>
              Popular Packages
            </h2>
          </FadeUp>

          {/* Tabs */}
          <FadeUp delay={0.1} className="flex gap-2 justify-center mb-10 flex-wrap">
            {PACKAGE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePackageTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                  ${activePackageTab === tab
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </FadeUp>

          {pkgLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="h-52 bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg, i) => (
                <FadeUp key={pkg._id || pkg.id} delay={i * 0.08}>
                  <Link to={`/packages/${pkg._id || pkg.id}`} className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={pkg.image || pkg.imageUrl || pkg.coverImage}
                        alt={pkg.name || pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {pkg.badge && (
                        <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {pkg.badge}
                        </span>
                      )}
                      {pkg.rating != null && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
                          <span className="text-xs font-bold text-gray-800">{pkg.rating}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#0B4F6C] transition-colors">
                          {pkg.name || pkg.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                        {(pkg.destination?.name || pkg.destination) && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {pkg.destination?.name || pkg.destination}
                          </span>
                        )}
                        {pkg.duration && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />{pkg.duration?.days}D / {pkg.duration?.nights}N
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400">Starting from</p>
                          <p className="text-2xl font-black text-gray-900">{formatAmount(pkg.price || pkg.basePrice || 0)}</p>
                          <p className="text-xs text-gray-400">per person</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-sm font-semibold group-hover:bg-[#0B4F6C] transition-colors">
                          Book Now <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          )}

          <FadeUp className="text-center mt-10">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-black font-bold hover:bg-black hover:text-white transition-all"
            >
              Explore All Packages <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 5: WHY CHOOSE US                           */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <FadeUp className="text-center mb-14">
            <SectionLabel text="Our Promise" />
            <h2 className="text-4xl md:text-5xl font-black mt-3" style={{ letterSpacing: '-0.02em' }}>
              Why Travel With <span style={{ color: '#00B4D8' }}>WanderLux?</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="group p-6 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 6: HOW IT WORKS                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp className="text-center mb-16">
            <SectionLabel text="Simple Process" />
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3" style={{ letterSpacing: '-0.02em' }}>
              How It Works
            </h2>
          </FadeUp>

          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#0B4F6C] via-[#00B4D8] to-[#FF6B35] z-0" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {HOW_IT_WORKS.map((step, i) => {
                const Icon = step.icon;
                const colors = ['#0B4F6C', '#00B4D8', '#FF6B35', '#FFD166'];
                return (
                  <FadeUp key={i} delay={i * 0.15} className="flex flex-col items-center text-center">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                      style={{ backgroundColor: colors[i], boxShadow: `0 8px 24px ${colors[i]}40` }}
                    >
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-xs font-black text-gray-600 mb-3">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 7: TESTIMONIALS                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp className="text-center mb-12">
            <SectionLabel text="Happy Travelers" />
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3" style={{ letterSpacing: '-0.02em' }}>
              What Our Travelers Say
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[#FFD166] fill-[#FFD166]" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
                    "{t.review}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{t.trip}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 8: NEWSLETTER CTA                          */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeUp>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-[#00B4D8]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ letterSpacing: '-0.02em' }}>
              Get Exclusive <span style={{ color: '#FFD166' }}>Travel Deals</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join 50,000+ travel enthusiasts and get the best deals delivered to your inbox
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-xl font-bold text-green-400">You're subscribed!</p>
                <p className="text-gray-400 text-sm">Watch for exclusive deals in your inbox</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40
                    focus:outline-none focus:border-[#00B4D8] transition-all text-sm"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-xs text-gray-500 mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>

            <div className="flex items-center justify-center gap-6 mt-10 pt-10 border-t border-white/10">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
