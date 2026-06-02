/*
 *  FileName:-     envConfig.js
 *  Description:-  Centralized environment variable configuration
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const envConfig = {
  // API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),

  // App
  appName: import.meta.env.VITE_APP_NAME || 'WanderLux',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,

  // Auth
  jwtSecretKey: import.meta.env.VITE_JWT_SECRET_KEY || '',
  refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY || '',

  // Maps
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',

  // Payment
  razorpayKeyId: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',

  // File Upload
  maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '5242880', 10),
  allowedFileTypes: (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(','),

  // Feature Flags
  enableChat: import.meta.env.VITE_ENABLE_CHAT === 'true',
  enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',

  // Social Auth
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  facebookAppId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
};

export default envConfig;
