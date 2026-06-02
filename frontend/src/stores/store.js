/*
 *  FileName:-     store.js
 *  Description:-  Redux store configuration with all feature slices, RTK Query APIs and middleware
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { configureStore } from '@reduxjs/toolkit';

/* ── Feature Slices ── */
import authReducer from '@/features/auths/slices/authSlice';
import userReducer from '@/features/users/slices/userSlice';
import packageReducer from '@/features/packages/slices/packageSlice';
import destinationReducer from '@/features/destinations/slices/destinationSlice';
import categoryReducer from '@/features/categories/slices/categorySlice';
import bookingReducer from '@/features/bookings/slices/bookingSlice';
import paymentReducer from '@/features/payments/slices/paymentSlice';
import couponReducer from '@/features/coupons/slices/couponSlice';
import reviewReducer from '@/features/reviews/slices/reviewSlice';
import wishlistReducer from '@/features/wishlists/slices/wishlistSlice';
import loyaltyReducer from '@/features/loyalties/slices/loyaltySlice';
import notificationReducer from '@/features/notifications/slices/notificationSlice';
import addressReducer from '@/features/addresses/slices/addressSlice';
import documentReducer from '@/features/documents/slices/documentSlice';
import trackingReducer from '@/features/trackings/slices/trackingSlice';
import itineraryReducer from '@/features/itineraries/slices/itinerarySlice';
import vendorReducer from '@/features/vendors/slices/vendorSlice';
import agentReducer from '@/features/agents/slices/agentSlice';
import dashboardReducer from '@/features/dashboards/slices/dashboardSlice';

/* ── RTK Query API Slices ── */
import { authApi } from '@/features/auths/apis/authApi';
import { userApi } from '@/features/users/apis/userApi';
import { packageApi } from '@/features/packages/apis/packageApi';
import { destinationApi } from '@/features/destinations/apis/destinationApi';
import { categoryApi } from '@/features/categories/apis/categoryApi';
import { bookingApi } from '@/features/bookings/apis/bookingApi';
import { paymentApi } from '@/features/payments/apis/paymentApi';
import { couponApi } from '@/features/coupons/apis/couponApi';
import { reviewApi } from '@/features/reviews/apis/reviewApi';
import { wishlistApi } from '@/features/wishlists/apis/wishlistApi';
import { loyaltyApi } from '@/features/loyalties/apis/loyaltyApi';
import { notificationApi } from '@/features/notifications/apis/notificationApi';
import { addressApi } from '@/features/addresses/apis/addressApi';
import { documentApi } from '@/features/documents/apis/documentApi';
import { trackingApi } from '@/features/trackings/apis/trackingApi';
import { itineraryApi } from '@/features/itineraries/apis/itineraryApi';
import { vendorApi } from '@/features/vendors/apis/vendorApi';
import { agentApi } from '@/features/agents/apis/agentApi';
import { dashboardApi } from '@/features/dashboards/apis/dashboardApi';
import { settingApi } from '@/features/settings/apis/settingApi';

/* ── UI slice (global app state) ── */
import { uiReducer, searchReducer } from './rootReducer';

export const store = configureStore({
  reducer: {
    /* Feature slices */
    auth: authReducer,
    user: userReducer,
    packages: packageReducer,
    destinations: destinationReducer,
    categories: categoryReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    coupons: couponReducer,
    reviews: reviewReducer,
    wishlist: wishlistReducer,
    loyalty: loyaltyReducer,
    notifications: notificationReducer,
    addresses: addressReducer,
    documents: documentReducer,
    tracking: trackingReducer,
    itinerary: itineraryReducer,
    vendors: vendorReducer,
    agents: agentReducer,
    dashboard: dashboardReducer,

    /* Global UI state */
    ui: uiReducer,
    search: searchReducer,

    /* RTK Query API reducers */
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [destinationApi.reducerPath]: destinationApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [loyaltyApi.reducerPath]: loyaltyApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [trackingApi.reducerPath]: trackingApi.reducer,
    [itineraryApi.reducerPath]: itineraryApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['booking.travellerDetails'],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      packageApi.middleware,
      destinationApi.middleware,
      categoryApi.middleware,
      bookingApi.middleware,
      paymentApi.middleware,
      couponApi.middleware,
      reviewApi.middleware,
      wishlistApi.middleware,
      loyaltyApi.middleware,
      notificationApi.middleware,
      addressApi.middleware,
      documentApi.middleware,
      trackingApi.middleware,
      itineraryApi.middleware,
      vendorApi.middleware,
      agentApi.middleware,
      dashboardApi.middleware,
      settingApi.middleware
    ),
  devTools: import.meta.env.DEV,
});

export default store;
