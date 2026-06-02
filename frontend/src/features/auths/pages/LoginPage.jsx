/*
 *  FileName:-     LoginPage.jsx
 *  Description:-  Stunning split-layout login page with travel gradient left panel and clean white right panel
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { motion } from 'framer-motion';
import { Compass, MapPin, Star, Globe } from 'lucide-react';
import LoginForm from '../components/LoginForm';

const travelSpots = [
  { name: 'Santorini', tag: 'Greece', icon: '🏛️' },
  { name: 'Bali', tag: 'Indonesia', icon: '🌴' },
  { name: 'Maldives', tag: 'Indian Ocean', icon: '🐚' },
  { name: 'Kyoto', tag: 'Japan', icon: '⛩️' },
];

const FloatingCard = ({ item, delay, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={`absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3 ${className}`}
  >
    <span className="text-2xl">{item.icon}</span>
    <div>
      <p className="text-white text-sm font-semibold leading-tight">{item.name}</p>
      <p className="text-white/60 text-xs font-light">{item.tag}</p>
    </div>
    <Star size={12} className="text-yellow-300 ml-auto" fill="currentColor" />
  </motion.div>
);

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Panel - Travel Visual */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative hidden lg:flex lg:w-1/2 xl:w-3/5 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B4F6C 0%, #00B4D8 40%, #FF6B35 80%, #FFD166 100%)',
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Animated blobs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-black/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Compass size={22} className="text-[#0B4F6C]" />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">WanderLux</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <p className="text-white/70 text-sm font-light tracking-widest uppercase mb-3">Your Journey Awaits</p>
              <h1 className="text-5xl xl:text-6xl font-bold text-white leading-none tracking-tight">
                Travel the<br />
                <span className="text-transparent bg-clip-text" style={{
                  backgroundImage: 'linear-gradient(90deg, #FFD166, #FF6B35)'
                }}>
                  World with
                </span><br />
                Confidence
              </h1>
            </div>
            <p className="text-white/70 text-base font-light leading-relaxed max-w-sm">
              Join 50,000+ travelers who trust WanderLux for unforgettable journeys crafted just for them.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: '50K+', label: 'Happy Travelers' },
                { value: '120+', label: 'Destinations' },
                { value: '4.9★', label: 'Average Rating' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                  <p className="text-white/60 text-xs font-light">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating Destination Cards */}
          <div className="relative h-32">
            <FloatingCard item={travelSpots[0]} delay={0.8} className="bottom-0 left-0" />
            <FloatingCard item={travelSpots[1]} delay={1.0} className="bottom-4 right-8" />
          </div>
        </div>

        {/* Globe Icon Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute top-1/2 right-8 -translate-y-1/2"
        >
          <Globe size={300} className="text-white" />
        </motion.div>

        {/* Location pins */}
        {travelSpots.slice(2).map((spot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.2 }}
            className="absolute"
            style={{ top: `${25 + i * 30}%`, right: `${15 + i * 10}%` }}
          >
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
              <MapPin size={10} className="text-white" fill="currentColor" />
              <span className="text-white text-xs font-light">{spot.name}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 mb-8 lg:hidden"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0B4F6C, #00B4D8)' }}>
              <Compass size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-black tracking-tight">WanderLux</span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight leading-none mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 font-light text-base">Sign in to continue your journey</p>
          </motion.div>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
