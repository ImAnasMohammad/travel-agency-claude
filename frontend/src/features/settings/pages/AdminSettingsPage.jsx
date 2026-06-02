/*
 *  FileName:-     AdminSettingsPage.jsx
 *  Description:-  Admin platform settings page with general, notifications, platform controls, and security sections
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Globe, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../apis/settingApi';

const SectionCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-50">
      <div className="w-8 h-8 bg-[#0B4F6C]/10 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#0B4F6C]" />
      </div>
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

const FieldGroup = ({ label, children, hint }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400">{hint}</p>}
  </div>
);

const inputClass = "w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]";

const Toggle = ({ value, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!value)}
    className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-[#0B4F6C]' : 'bg-gray-200'}`}
  >
    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const DEFAULT_SETTINGS = {
  general: { siteName: 'WanderLux', siteUrl: 'https://wanderlux.com', supportEmail: 'support@wanderlux.com', timezone: 'Asia/Kolkata', currency: 'INR' },
  notifications: { emailOnBooking: true, emailOnPayment: true, emailOnCancellation: true, smsAlerts: false },
  maintenance: { maintenanceMode: false, registrationOpen: true, bookingEnabled: true },
  security: { sessionTimeoutMinutes: 60, maxLoginAttempts: 5, passwordMinLength: 8, allowedIps: [] },
};

const AdminSettingsPage = () => {
  const { data: remoteSettings, isLoading: isFetching } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateSettingsMutation();

  const [general, setGeneral] = useState(DEFAULT_SETTINGS.general);
  const [notifications, setNotifications] = useState(DEFAULT_SETTINGS.notifications);
  const [maintenance, setMaintenance] = useState(DEFAULT_SETTINGS.maintenance);
  const [security, setSecurity] = useState(DEFAULT_SETTINGS.security);

  // Populate form with server data on load
  useEffect(() => {
    if (remoteSettings) {
      if (remoteSettings.general) setGeneral({ ...DEFAULT_SETTINGS.general, ...remoteSettings.general });
      if (remoteSettings.notifications) setNotifications({ ...DEFAULT_SETTINGS.notifications, ...remoteSettings.notifications });
      if (remoteSettings.maintenance) setMaintenance({ ...DEFAULT_SETTINGS.maintenance, ...remoteSettings.maintenance });
      if (remoteSettings.security) setSecurity({ ...DEFAULT_SETTINGS.security, ...remoteSettings.security });
    }
  }, [remoteSettings]);

  const handleSave = async () => {
    try {
      await updateSettings({ general, notifications, maintenance, security }).unwrap();
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings. Please try again.');
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0B4F6C] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-sm text-gray-500">Configure global platform behavior and preferences</p>
        </div>
        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#093d56] transition-colors disabled:opacity-60"
        >
          {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* General Settings */}
        <SectionCard title="General Settings" icon={Globe}>
          <div className="space-y-4">
            <FieldGroup label="Site Name">
              <input value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })} className={inputClass} />
            </FieldGroup>
            <FieldGroup label="Site URL">
              <input value={general.siteUrl} onChange={(e) => setGeneral({ ...general, siteUrl: e.target.value })} className={inputClass} />
            </FieldGroup>
            <FieldGroup label="Support Email">
              <input value={general.supportEmail} onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })} className={inputClass} />
            </FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <FieldGroup label="Timezone">
                <select value={general.timezone} onChange={(e) => setGeneral({ ...general, timezone: e.target.value })} className={inputClass}>
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                </select>
              </FieldGroup>
              <FieldGroup label="Currency">
                <select value={general.currency} onChange={(e) => setGeneral({ ...general, currency: e.target.value })} className={inputClass}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </FieldGroup>
            </div>
          </div>
        </SectionCard>

        {/* Email Notifications */}
        <SectionCard title="Email Notifications" icon={Bell}>
          <div className="space-y-4">
            {[
              { key: 'emailOnBooking', label: 'New Booking', desc: 'Send email when a booking is created' },
              { key: 'emailOnPayment', label: 'Payment Received', desc: 'Send email when payment is confirmed' },
              { key: 'emailOnCancellation', label: 'Cancellations', desc: 'Send email when booking is cancelled' },
              { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Send SMS for critical notifications' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <Toggle value={notifications[item.key]} onChange={(v) => setNotifications({ ...notifications, [item.key]: v })} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Platform Controls */}
        <SectionCard title="Platform Controls" icon={Settings}>
          <div className="space-y-4">
            {[
              { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Take the site offline for maintenance', danger: true },
              { key: 'registrationOpen', label: 'User Registration', desc: 'Allow new users to register' },
              { key: 'bookingEnabled', label: 'Booking System', desc: 'Enable or disable all bookings' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className={`text-sm font-medium ${item.danger && maintenance[item.key] ? 'text-red-600' : 'text-gray-800'}`}>{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <Toggle value={maintenance[item.key]} onChange={(v) => setMaintenance({ ...maintenance, [item.key]: v })} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Security */}
        <SectionCard title="Security" icon={Shield}>
          <div className="space-y-4">
            <FieldGroup label="Session Timeout (minutes)" hint="Auto-logout inactive sessions">
              <input
                type="number"
                value={security.sessionTimeoutMinutes}
                onChange={(e) => setSecurity({ ...security, sessionTimeoutMinutes: Number(e.target.value) })}
                min={15} max={1440}
                className={inputClass}
              />
            </FieldGroup>
            <FieldGroup label="Max Login Attempts" hint="Lock account after N failed attempts">
              <input
                type="number"
                value={security.maxLoginAttempts}
                onChange={(e) => setSecurity({ ...security, maxLoginAttempts: Number(e.target.value) })}
                min={3} max={20}
                className={inputClass}
              />
            </FieldGroup>
            <FieldGroup label="Password Min Length">
              <input
                type="number"
                value={security.passwordMinLength}
                onChange={(e) => setSecurity({ ...security, passwordMinLength: Number(e.target.value) })}
                min={6} max={32}
                className={inputClass}
              />
            </FieldGroup>
            <FieldGroup label="Allowed IP Addresses (comma-separated)" hint="Leave empty to allow all">
              <input
                value={security.allowedIps?.join(', ') || ''}
                onChange={(e) => setSecurity({ ...security, allowedIps: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                placeholder="e.g. 192.168.1.1, 10.0.0.1"
                className={inputClass}
              />
            </FieldGroup>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
