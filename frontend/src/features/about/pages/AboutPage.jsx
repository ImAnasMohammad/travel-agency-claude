/*
 *  FileName:-     AboutPage.jsx
 *  Description:-  Company story, mission, team, and stats page for travel agency
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Users, Globe2, Award, Heart, Star, Shield, Clock,
  Compass, TrendingUp, CheckCircle, ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STATS = [
  { icon: Clock, value: '2009', label: 'Founded', desc: 'Years of expertise', color: 'text-[#0B4F6C]', bg: 'bg-[#0B4F6C]/10' },
  { icon: Globe2, value: '28+', label: 'Countries', desc: 'Destinations covered', color: 'text-[#00B4D8]', bg: 'bg-[#00B4D8]/10' },
  { icon: Users, value: '50,000+', label: 'Happy Travelers', desc: 'Trust us every year', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { icon: Compass, value: '180+', label: 'Expert Guides', desc: 'Across all destinations', color: 'text-purple-600', bg: 'bg-purple-100' },
];

const VALUES = [
  { icon: Heart, title: 'Passion for Travel', desc: 'We don\'t just plan trips — we create stories. Every itinerary is crafted with love, local expertise, and attention to detail that makes each journey unforgettable.', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: Shield, title: 'Trust & Transparency', desc: 'No hidden costs, no surprise changes. We believe in full transparency in pricing and communication, so you can travel with complete peace of mind.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Star, title: 'Premium Quality', desc: 'From handpicked hotels to certified guides, we maintain the highest standards. Our quality promise means you always get more than you expect.', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: TrendingUp, title: 'Continuous Innovation', desc: 'We constantly evolve our offerings with AI-powered itinerary builders, live trip tracking, and real-time support to make your travel seamless.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const TEAM = [
  { name: 'Arjun Kapoor', role: 'Founder & CEO', bio: '15+ years in travel industry. Ex-Thomas Cook India. Passionate about making travel accessible to all.', avatar: 'AK', gradient: 'from-[#0B4F6C] to-[#00B4D8]' },
  { name: 'Priya Sharma', role: 'Head of Operations', bio: 'Former hospitality manager. Ensures every trip runs perfectly — from booking to return.', avatar: 'PS', gradient: 'from-purple-500 to-pink-500' },
  { name: 'Vikram Nair', role: 'Chief Technology Officer', bio: 'Built our AI itinerary platform and live tracking system. Makes travel tech simple and powerful.', avatar: 'VN', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Kavya Reddy', role: 'Head of Customer Experience', bio: 'Dedicated to making every customer feel valued. Manages our network of 180+ guides nationwide.', avatar: 'KR', gradient: 'from-amber-500 to-orange-500' },
  { name: 'Rahul Gupta', role: 'Lead Destination Expert', bio: '12 years exploring India\'s hidden gems. Author of "Off the Beaten Path — India Edition."', avatar: 'RG', gradient: 'from-rose-500 to-red-500' },
  { name: 'Ananya Joshi', role: 'Marketing Director', bio: 'Digital storyteller who built our community of 200K+ travel enthusiasts across platforms.', avatar: 'AJ', gradient: 'from-indigo-500 to-purple-500' },
];

const MILESTONES = [
  { year: '2009', event: 'Founded in Bangalore with 3 employees and a dream' },
  { year: '2012', event: 'Reached 5,000 travelers milestone. Expanded to 12 destinations' },
  { year: '2015', event: 'Launched corporate travel division. Partnered with 50+ hotels' },
  { year: '2018', event: 'Introduced agent & vendor portal. Opened offices in 5 major cities' },
  { year: '2021', event: 'Survived & thrived post-pandemic. Launched live trip tracking system' },
  { year: '2024', event: 'Crossed 50,000 happy travelers. Launched AI Itinerary Builder' },
  { year: '2026', event: 'Present: 28+ destination countries, 180+ guides, ₹100Cr+ revenue' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0B4F6C] via-[#0B4F6C] to-[#00B4D8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#00B4D8] blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Heart className="w-4 h-4 text-rose-300" /> Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Turning Dreams Into<br />
              <span className="text-[#90E0EF]">Journeys Since 2009</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We're not just a travel agency — we're your travel companions. From the mountains of Ladakh to the beaches of Andaman, we've been crafting unforgettable experiences for over 15 years.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {STATS.map(({ icon: Icon, value, label, desc, color, bg }) => (
            <motion.div key={label} variants={itemVariants} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <p className={`text-3xl font-black ${color}`}>{value}</p>
              <p className="text-sm font-bold text-gray-800 mt-1">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-bold text-[#00B4D8] uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2 mb-6 leading-tight">
              Born From a Passion<br />for Discovery
            </h2>
            <div className="space-y-4 text-gray-600 text-base leading-relaxed">
              <p>It all started in 2009 when our founder Arjun Kapoor, frustrated by impersonal travel packages and hidden costs, decided to build a travel company that truly cared about the traveler's experience.</p>
              <p>Starting with just 3 destinations and a small team in Bangalore, we grew by focusing on one thing: creating moments that matter. We handpicked local guides with deep cultural knowledge, negotiated transparently with hotels, and built relationships that last a lifetime.</p>
              <p>Today, we serve over 50,000 travelers annually across 28+ countries, but our philosophy remains unchanged — every traveler is unique, and every journey should be personal.</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {['ISO 9001 Certified', 'IATA Accredited', 'Ministry of Tourism Recognized', 'TripAdvisor Excellence Award'].map((cert) => (
                <span key={cert} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B4F6C]/10 text-[#0B4F6C] text-xs font-semibold rounded-full">
                  <CheckCircle className="w-3 h-3" /> {cert}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=350&fit=crop" alt="Rajasthan" className="w-full h-48 sm:h-64 object-cover rounded-2xl" />
              <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop" alt="Kerala" className="w-full h-32 sm:h-44 object-cover rounded-2xl mt-8" />
              <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=200&fit=crop" alt="Goa" className="w-full h-32 sm:h-44 object-cover rounded-2xl" />
              <img src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=300&h=350&fit=crop" alt="Ladakh" className="w-full h-48 sm:h-64 object-cover rounded-2xl -mt-8" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#0B4F6C] text-white rounded-2xl p-4 shadow-xl">
              <p className="text-3xl font-black">4.9<span className="text-lg">/5</span></p>
              <div className="flex gap-0.5 my-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />)}</div>
              <p className="text-xs text-white/70">12,000+ Google Reviews</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#00B4D8] uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">Our Core Values</h2>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {VALUES.map(({ icon: Icon, title, desc, color, bg }) => (
              <motion.div key={title} variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline/Milestones */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#00B4D8] uppercase tracking-wider">Our Growth</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">15+ Years of Milestones</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0B4F6C] to-[#00B4D8]" />
          <div className="space-y-6">
            {MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative flex gap-4 sm:gap-0 sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-8 sm:ml-0' : 'sm:pl-8 sm:ml-auto sm:flex-row-reverse'} pl-10 sm:pl-0`}
              >
                <div className="absolute left-1 sm:left-auto sm:-right-3 sm:top-3 w-6 h-6 bg-[#0B4F6C] rounded-full border-4 border-white shadow-md flex items-center justify-center" style={index % 2 === 0 ? { right: 'auto', left: '1.5rem' } : { left: 'auto', right: '1.5rem' }}>
                  <div className="w-2 h-2 bg-[#00B4D8] rounded-full" />
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex-1">
                  <span className="inline-block px-2.5 py-0.5 bg-[#0B4F6C] text-white text-xs font-bold rounded-full mb-2">{milestone.year}</span>
                  <p className="text-sm text-gray-700">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#00B4D8] uppercase tracking-wider">The People Behind the Magic</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">Meet Our Team</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto text-sm">Passionate travel professionals dedicated to making your journey extraordinary.</p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {TEAM.map(({ name, role, bio, avatar, gradient }) => (
              <motion.div key={name} variants={itemVariants} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-black mb-4 group-hover:scale-105 transition-transform`}>
                  {avatar}
                </div>
                <h3 className="text-base font-bold text-gray-900">{name}</h3>
                <p className="text-xs font-semibold text-[#00B4D8] mb-2">{role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8] py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/80 text-lg mb-8">Join 50,000+ travelers who trust us to turn their travel dreams into reality.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#0B4F6C] text-sm font-bold rounded-2xl hover:bg-white/95 transition-colors shadow-lg">
              Explore Packages <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/20 text-white text-sm font-semibold rounded-2xl hover:bg-white/30 transition-colors border border-white/30">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
