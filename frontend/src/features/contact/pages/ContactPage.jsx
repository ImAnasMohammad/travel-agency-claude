/*
 *  FileName:-     ContactPage.jsx
 *  Description:-  Contact page with form, map placeholder, and address/phone/email info cards
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle,
  Facebook, Instagram, Twitter, Youtube, Linkedin,
  HeadphonesIcon, Globe, ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object({
  firstName: yup.string().min(2).required('First name is required'),
  lastName: yup.string().min(2).required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().min(10, 'Enter a valid phone number').required('Phone is required'),
  subject: yup.string().required('Please select a subject'),
  message: yup.string().min(20, 'Message must be at least 20 characters').required('Message is required'),
  newsletter: yup.boolean(),
});

const SUBJECTS = [
  'Package Enquiry',
  'Booking Support',
  'Custom Itinerary Request',
  'Corporate Travel',
  'Agent/Vendor Partnership',
  'Complaint/Feedback',
  'Other',
];

const FAQ_ITEMS = [
  { q: 'How do I book a tour package?', a: 'Browse our packages, select your preferred one, choose dates and group size, then proceed to booking. Our team will confirm within 24 hours.' },
  { q: 'What is your cancellation policy?', a: 'Cancellations made 30+ days before travel date get 90% refund. 15-30 days: 70%. 7-15 days: 50%. Less than 7 days: 20% refund.' },
  { q: 'Do you offer custom itineraries?', a: 'Absolutely! Fill out our custom itinerary form or contact us directly. Our destination experts will craft a personalized plan within 48 hours.' },
  { q: 'Is travel insurance included?', a: 'Travel insurance is not included by default but strongly recommended. We can arrange it as an add-on at checkout or through our partner insurers.' },
];

const OFFICES = [
  { city: 'Bangalore (HQ)', address: '4th Floor, MG Road Tower, MG Road, Bengaluru - 560001', phone: '+91-80-4567-8900', email: 'bangalore@wanderlust.in', hours: 'Mon–Sat: 9AM–7PM' },
  { city: 'Mumbai', address: '201, Nariman Point Business Center, Mumbai - 400021', phone: '+91-22-4567-8901', email: 'mumbai@wanderlust.in', hours: 'Mon–Sat: 9AM–7PM' },
  { city: 'Delhi', address: 'C-47, Connaught Place, New Delhi - 110001', phone: '+91-11-4567-8902', email: 'delhi@wanderlust.in', hours: 'Mon–Sat: 9AM–7PM' },
];

const SOCIALS = [
  { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:text-blue-600' },
  { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-600' },
  { icon: Twitter, label: 'Twitter/X', href: '#', color: 'hover:text-sky-500' },
  { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:text-red-600' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-700' },
];

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] transition-all bg-white";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', newsletter: false },
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    reset();
    toast.success('Message sent! We\'ll respond within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] text-white py-16 sm:py-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-5 left-10 w-48 h-48 rounded-full bg-[#00B4D8] blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <MessageCircle className="w-4 h-4" /> Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">We'd Love to Hear From You</h1>
            <p className="text-white/80 text-lg">Whether you have a question, need a custom itinerary, or just want to say hello — our team is here to help.</p>
          </motion.div>
        </div>
      </div>

      {/* Quick Contact Bars */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Phone, label: 'Call Us', value: '+91-80-4567-8900', sub: 'Mon–Sat: 9AM–7PM', color: 'from-[#0B4F6C] to-[#00B4D8]', action: 'tel:+918045678900' },
            { icon: Mail, label: 'Email Us', value: 'hello@wanderlust.in', sub: 'Reply within 24 hours', color: 'from-emerald-500 to-teal-500', action: 'mailto:hello@wanderlust.in' },
            { icon: HeadphonesIcon, label: 'Live Chat', value: 'Start Chatting', sub: 'Instant support available', color: 'from-purple-500 to-violet-500', action: '#' },
          ].map(({ icon: Icon, label, value, sub, color, action }) => (
            <motion.a
              key={label}
              href={action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg p-5 flex items-center gap-4 hover:shadow-xl hover:-translate-y-0.5 transition-all`}
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-80">{label}</p>
                <p className="text-base font-bold">{value}</p>
                <p className="text-xs opacity-70">{sub}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Main Content: Form + Map */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mt-1">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600 text-sm mb-6">Thank you for reaching out. Our team will respond to your inquiry within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">First Name *</label>
                    <input {...register('firstName')} className={inputClass} placeholder="Arjun" />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Last Name *</label>
                    <input {...register('lastName')} className={inputClass} placeholder="Sharma" />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
                    <input type="email" {...register('email')} className={inputClass} placeholder="arjun@email.com" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number *</label>
                    <input {...register('phone')} className={inputClass} placeholder="+91-9876543210" />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject *</label>
                  <select {...register('subject')} className={`${inputClass} cursor-pointer`}>
                    <option value="">Select a subject</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your Message *</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your travel plans, questions, or how we can help..."
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                </div>

                {/* Newsletter */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" {...register('newsletter')} className="w-4 h-4 rounded border-gray-300 text-[#0B4F6C] focus:ring-[#0B4F6C] mt-0.5" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    Subscribe to our newsletter for exclusive travel deals and destination guides
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8] text-white text-sm font-bold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending your message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map + Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100" style={{ height: 280 }}>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.5846,12.9716,77.6046,12.9816&layer=mapnik&marker=12.9766,77.5946"
                className="w-full h-full border-0"
                title="Our Location"
                loading="lazy"
              />
            </div>

            {/* Office Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#0B4F6C] px-5 py-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Our Offices
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {OFFICES.slice(0, 1).map((office) => (
                  <div key={office.city} className="p-5">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">{office.city}</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="text-xs text-[#0B4F6C] hover:underline font-medium">{office.phone}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-xs text-[#0B4F6C] hover:underline font-medium">{office.email}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-gray-50/50">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Also available in:</p>
                  <div className="flex gap-2 flex-wrap">
                    {OFFICES.slice(1).map((o) => <span key={o.city} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-full text-gray-600">{o.city}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} title={label} className={`w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 ${color} hover:border-current transition-all hover:scale-110`}>
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm mt-2">Can't find your answer? Contact us directly.</p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => (
              <motion.div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
