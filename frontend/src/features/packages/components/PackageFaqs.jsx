/*
 *  FileName:-     PackageFaqs.jsx
 *  Description:-  Accordion FAQ section for package details page with animated expand/collapse
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FaqItem = ({ question, answer, isOpen, onToggle, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className={`border rounded-xl overflow-hidden transition-colors ${isOpen ? 'border-black' : 'border-gray-100 hover:border-gray-200'}`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left"
    >
      <span className={`text-sm font-semibold leading-snug pr-4 ${isOpen ? 'text-black' : 'text-gray-800'}`}>
        {question}
      </span>
      <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${isOpen ? 'bg-black border-black' : 'border-gray-300'}`}>
        {isOpen ? <Minus size={12} className="text-white" /> : <Plus size={12} className="text-gray-600" />}
      </span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 font-light leading-relaxed">{answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const PackageFaqs = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs.length) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle size={18} className="text-[#00B4D8]" />
        <h2 className="text-xl font-bold text-black tracking-tight">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FaqItem
            key={i}
            index={i}
            question={faq.question || faq.q}
            answer={faq.answer || faq.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageFaqs;
