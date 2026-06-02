/*
 *  FileName:-     RegisterPage.jsx
 *  Description:-  Split-layout registration page with travel gradient left panel and register form right panel
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { motion } from 'framer-motion';
import { Compass, Shield, Headphones, CreditCard } from 'lucide-react';
import RegisterForm from '../components/RegisterForm';

const perks = [
  { icon: Shield, title: 'Secure Booking', desc: '256-bit SSL encryption on all transactions' },
  { icon: Headphones, title: '24/7 Support', desc: 'Expert travel assistance around the clock' },
  { icon: CreditCard, title: 'Flexible Payments', desc: 'Pay in installments, no hidden fees' },
];

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative hidden lg:flex lg:w-2/5 xl:w-1/2 overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(160deg, #0B4F6C 0%, #00B4D8 50%, #FF6B35 100%)' }}
      >
        {/* Pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        {/* Blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-black/10 rounded-full blur-3xl" />

        {/* Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Compass size={22} className="text-[#0B4F6C]" />
          </div>
          <span className="text-white text-2xl font-bold tracking-tight">WanderLux</span>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative z-10 space-y-8"
        >
          <div>
            <p className="text-white/60 text-xs font-light tracking-widest uppercase mb-3">Start your adventure</p>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-none tracking-tight">
              Join the<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #FFD166, #FF6B35)' }}>
                Explorer
              </span><br />
              Community
            </h1>
          </div>

          <p className="text-white/70 text-sm font-light leading-relaxed max-w-xs">
            Create your free account and unlock exclusive deals, personalized itineraries, and a world of travel benefits.
          </p>

          {/* Perks */}
          <div className="space-y-4">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <perk.icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{perk.title}</p>
                  <p className="text-white/60 text-xs font-light">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 flex items-center gap-2"
        >
          <div className="flex -space-x-2">
            {['🧳', '✈️', '🗺️', '🏖️'].map((emoji, i) => (
              <div key={i} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-sm border border-white/30">
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-white/70 text-xs font-light ml-2">50,000+ explorers and counting</p>
        </motion.div>
      </motion.div>

      {/* Right Panel - Register Form */}
      <div className="flex-1 flex items-start justify-center p-6 sm:p-10 lg:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-4">
          {/* Mobile Logo */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5 mb-6 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0B4F6C, #00B4D8)' }}>
              <Compass size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-black tracking-tight">WanderLux</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-7">
            <h2 className="text-3xl font-bold text-black tracking-tight leading-none mb-2">Create account</h2>
            <p className="text-gray-500 font-light text-sm">Free forever. No credit card required.</p>
          </motion.div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
