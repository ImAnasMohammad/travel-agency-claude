/*
 *  FileName:-     Footer.jsx
 *  Description:-  WanderLux full-width dark footer with 4 columns, newsletter, and social links
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plane, MapPin, Phone, Mail, Send, Facebook, Instagram, Twitter, Youtube,
  ArrowRight, Heart,
} from 'lucide-react';
import toast from 'react-hot-toast';

/* ============================================================
   Footer Data
   ============================================================ */
const footerLinks = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Story', path: '/about#story' },
    { label: 'Meet the Team', path: '/about#team' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press & Media', path: '/press' },
    { label: 'Blog', path: '/blog' },
  ],
  destinations: [
    { label: 'Goa', path: '/destinations/goa' },
    { label: 'Kerala', path: '/destinations/kerala' },
    { label: 'Rajasthan', path: '/destinations/rajasthan' },
    { label: 'Himachal Pradesh', path: '/destinations/himachal-pradesh' },
    { label: 'Maldives', path: '/destinations/maldives' },
    { label: 'Bali', path: '/destinations/bali' },
    { label: 'Dubai', path: '/destinations/dubai' },
    { label: 'View All', path: '/destinations' },
  ],
  services: [
    { label: 'Holiday Packages', path: '/packages' },
    { label: 'Group Tours', path: '/packages?type=group' },
    { label: 'Honeymoon Packages', path: '/packages?type=honeymoon' },
    { label: 'Adventure Tours', path: '/packages?type=adventure' },
    { label: 'Corporate Travel', path: '/services/corporate' },
    { label: 'Visa Assistance', path: '/services/visa' },
    { label: 'Travel Insurance', path: '/services/insurance' },
  ],
};

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/wanderlux' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/wanderlux' },
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/wanderlux' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@wanderlux' },
];

const legalLinks = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Refund Policy', path: '/refund-policy' },
  { label: 'Cookie Policy', path: '/cookies' },
];

/* ============================================================
   Footer Component
   ============================================================ */
function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setSubscribing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Subscribed! Welcome to WanderLux updates.');
    setEmail('');
    setSubscribing(false);
  };

  return (
    <footer className="bg-black text-white" aria-label="Footer">
      {/* ---- Top section: CTA banner ---- */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0B4F6C] via-[#00B4D8] to-[#FF6B35] py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Ready for your next adventure?
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Explore over 500+ handcrafted travel packages across 50+ destinations.
            </p>
          </div>
          <Link
            to="/packages"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-100 transition-colors group"
          >
            Explore Packages
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {/* Decorative dots */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ---- Main footer content ---- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Column 1: Brand + Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#00B4D8] transition-colors">
                <Plane className="w-5 h-5 text-black group-hover:text-white transform -rotate-45 transition-colors" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Wander<span className="text-[#00B4D8]">Lux</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              India&apos;s premier travel agency crafting unforgettable journeys since 2010.
              From serene backwaters to snowy peaks — we make every trip extraordinary.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#00B4D8] flex-shrink-0" />
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@wanderlux.com"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#00B4D8] flex-shrink-0" />
                hello@wanderlux.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                <span>42, Travel Hub, Connaught Place, New Delhi — 110001</span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">
                Get exclusive travel deals in your inbox
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:border-[#00B4D8] focus:bg-white/15 transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#00B4D8] hover:text-white disabled:opacity-50 transition-colors"
                  aria-label="Subscribe"
                >
                  {subscribing ? (
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
              <p className="text-xs text-gray-600 mt-2">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Destinations */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
              Destinations
            </h3>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all hover:scale-110"
                    aria-label={`Follow on ${social.label}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            &copy; {currentYear} WanderLux. Made with{' '}
            <Heart className="w-3.5 h-3.5 text-[#FF6B35] fill-[#FF6B35]" /> in India
          </p>

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
