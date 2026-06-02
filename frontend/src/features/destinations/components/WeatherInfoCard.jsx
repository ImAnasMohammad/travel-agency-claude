/*
 *  FileName:-     WeatherInfoCard.jsx
 *  Description:-  Monthly temperature chart and best time to visit information card
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { Cloud, Sun, Droplets, Wind, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MONTH_COLORS = {
  Jan: '#00B4D8', Feb: '#00B4D8', Mar: '#0B4F6C',
  Apr: '#0B4F6C', May: '#FFD166', Jun: '#FF6B35',
  Jul: '#FF6B35', Aug: '#FF6B35', Sep: '#FFD166',
  Oct: '#0B4F6C', Nov: '#00B4D8', Dec: '#00B4D8',
};

const WeatherInfoCard = ({ weatherInfo }) => {
  if (!weatherInfo) return null;

  const { monthlyTemp = [], bestMonths = [], humidity, avgTemp, description, rainyMonths = [] } = weatherInfo;

  const maxTemp = Math.max(...monthlyTemp.map((m) => m.high || m.temp || 0), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Sun size={18} className="text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold text-black tracking-tight">Weather & Climate</h3>
              <p className="text-xs text-gray-500 font-light">Monthly temperature guide</p>
            </div>
          </div>
          {avgTemp && (
            <div className="text-right">
              <p className="text-2xl font-bold text-black">{avgTemp}°C</p>
              <p className="text-xs text-gray-400 font-light">avg temp</p>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Chart */}
      {monthlyTemp.length > 0 && (
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-end gap-1.5 h-28">
            {MONTHS.map((month, i) => {
              const data = monthlyTemp[i] || {};
              const temp = data.high || data.temp || 0;
              const heightPct = Math.max(10, (temp / maxTemp) * 100);
              const isBest = bestMonths.includes(month) || bestMonths.includes(i + 1);
              const isRainy = rainyMonths.includes(month) || rainyMonths.includes(i + 1);

              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1 group cursor-default">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap absolute -translate-y-full -translate-x-1/2 pointer-events-none z-10">
                    {temp}°C
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPct}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.5, ease: 'easeOut' }}
                    className={`w-full rounded-t-md relative transition-opacity ${isRainy ? 'opacity-50' : ''}`}
                    style={{ backgroundColor: isBest ? '#0B4F6C' : MONTH_COLORS[month] }}
                  >
                    {isRainy && (
                      <div className="absolute top-0 left-0 right-0 flex justify-center">
                        <Droplets size={8} className="text-blue-400" />
                      </div>
                    )}
                  </motion.div>
                  <span className={`text-[10px] font-medium ${isBest ? 'text-black' : 'text-gray-400'}`}>{month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#0B4F6C]" />
              <span className="text-xs text-gray-500 font-light">Best time</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#00B4D8] opacity-50" />
              <span className="text-xs text-gray-500 font-light">Rainy season</span>
            </div>
          </div>
        </div>
      )}

      {/* Info Row */}
      <div className="p-6">
        {bestMonths.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Best Time to Visit</p>
            <div className="flex flex-wrap gap-2">
              {bestMonths.map((m) => (
                <span key={m} className="px-2.5 py-1 bg-[#0B4F6C] text-white text-xs font-medium rounded-full">{m}</span>
              ))}
            </div>
          </div>
        )}

        {description && (
          <p className="text-sm text-gray-500 font-light leading-relaxed">{description}</p>
        )}

        {humidity && (
          <div className="flex items-center gap-2 mt-3">
            <Droplets size={13} className="text-blue-400" />
            <span className="text-xs text-gray-500 font-light">Average humidity: {humidity}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WeatherInfoCard;
