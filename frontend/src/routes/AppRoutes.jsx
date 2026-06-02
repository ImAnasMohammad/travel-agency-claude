/*
 *  FileName:-     AppRoutes.jsx
 *  Description:-  Application route configuration with lazy loading and role-based separation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Loader from '@components/Loader';
import ProtectedRoute from './ProtectedRoutes';
import AdminRoute from './AdminRoutes';
import AgentRoute from './AgentRoutes';

/* ============================================================
   Lazy Loaded Layouts
   ============================================================ */
const UserLayout = lazy(() => import('@layouts/users/UserLayout'));
const AdminLayout = lazy(() => import('@layouts/admins/AdminLayout'));
const AgentLayout = lazy(() => import('@layouts/agents/AgentLayout'));

/* ============================================================
   Lazy Loaded User Pages
   ============================================================ */
const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const DestinationsPage = lazy(() => import('@/features/destinations/pages/DestinationsPage'));
const DestinationDetailsPage = lazy(() => import('@/features/destinations/pages/DestinationDetailsPage'));
const PackageListPage = lazy(() => import('@/features/packages/pages/PackageListPage'));
const PackageDetailsPage = lazy(() => import('@/features/packages/pages/PackageDetailsPage'));
const PackageSearchResultsPage = lazy(() => import('@/features/packages/pages/PackageSearchResultsPage'));
const CategoryListPage = lazy(() => import('@/features/categories/pages/CategoryListPage'));
const AboutPage = lazy(() => import('@/features/about/pages/AboutPage'));
const ContactPage = lazy(() => import('@/features/contact/pages/ContactPage'));
const WishlistPage = lazy(() => import('@/features/wishlists/pages/WishlistPage'));
const ProfilePage = lazy(() => import('@/features/users/pages/ProfilePage'));
const SettingsPage = lazy(() => import('@/features/users/pages/SettingsPage'));
const MyBookingsPage = lazy(() => import('@/features/bookings/pages/MyBookingsPage'));
const BookingDetailsPage = lazy(() => import('@/features/bookings/pages/BookingDetailsPage'));
const BookingCheckoutPage = lazy(() => import('@/features/bookings/pages/BookingCheckoutPage'));
const BookingTravellerDetailsPage = lazy(() => import('@/features/bookings/pages/BookingTravellerDetailsPage'));
const BookingReviewPage = lazy(() => import('@/features/bookings/pages/BookingReviewPage'));
const BookingConfirmationPage = lazy(() => import('@/features/bookings/pages/BookingConfirmationPage'));
const BookingSuccessPage = lazy(() => import('@/features/bookings/pages/BookingSuccessPage'));
const PaymentPage = lazy(() => import('@/features/payments/pages/PaymentPage'));
const PaymentSuccessPage = lazy(() => import('@/features/payments/pages/PaymentSuccessPage'));
const PaymentFailedPage = lazy(() => import('@/features/payments/pages/PaymentFailedPage'));
const LoyaltyDashboardPage = lazy(() => import('@/features/loyalties/pages/LoyaltyDashboardPage'));
const NotificationsPage = lazy(() => import('@/features/notifications/pages/NotificationsPage'));
const AddressManagementPage = lazy(() => import('@/features/addresses/pages/AddressManagementPage'));
const TravelDocumentVaultPage = lazy(() => import('@/features/documents/pages/TravelDocumentVaultPage'));
const WriteReviewPage = lazy(() => import('@/features/reviews/pages/WriteReviewPage'));
const ItineraryPage = lazy(() => import('@/features/itineraries/pages/ItineraryPage'));
const AiItineraryBuilderPage = lazy(() => import('@/features/itineraries/pages/AiItineraryBuilderPage'));
const LiveTripTrackingPage = lazy(() => import('@/features/trackings/pages/LiveTripTrackingPage'));

/* ============================================================
   Lazy Loaded Auth Pages
   ============================================================ */
const LoginPage = lazy(() => import('@/features/auths/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auths/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auths/pages/ForgotPasswordPage'));
const OtpVerificationPage = lazy(() => import('@/features/auths/pages/OtpVerificationPage'));
const ResetPasswordPage = lazy(() => import('@/features/auths/pages/ResetPasswordPage'));

/* ============================================================
   Lazy Loaded Admin Pages
   ============================================================ */
const AdminDashboardPage = lazy(() => import('@/features/dashboards/pages/AdminDashboardPage'));
const AdminPackageManagementPage = lazy(() => import('@/features/packages/pages/AdminPackageManagementPage'));
const AdminDestinationManagementPage = lazy(() => import('@/features/destinations/pages/AdminDestinationManagementPage'));
const AdminBookingManagementPage = lazy(() => import('@/features/bookings/pages/AdminBookingManagementPage'));
const AdminUserManagementPage = lazy(() => import('@/features/users/pages/AdminUserManagementPage'));
const AdminReviewModerationPage = lazy(() => import('@/features/reviews/pages/AdminReviewModerationPage'));
const AdminCouponManagementPage = lazy(() => import('@/features/coupons/pages/AdminCouponManagementPage'));
const AdminVendorManagementPage = lazy(() => import('@/features/vendors/pages/AdminVendorManagementPage'));
const AdminItineraryManagementPage = lazy(() => import('@/features/itineraries/pages/AdminItineraryManagementPage'));
const AdminCategoryManagementPage = lazy(() => import('@/features/categories/pages/AdminCategoryManagementPage'));
const AdminAgentManagementPage = lazy(() => import('@/features/agents/pages/AdminAgentManagementPage'));
const AdminReportsPage = lazy(() => import('@/features/reports/pages/AdminReportsPage'));
const AdminSettingsPage = lazy(() => import('@/features/settings/pages/AdminSettingsPage'));

const DealsPage = lazy(() => import('@/features/home/pages/DealsPage'));

/* ============================================================
   Lazy Loaded Agent Pages
   ============================================================ */
const AgentDashboardPage = lazy(() => import('@/features/agents/pages/AgentDashboardPage'));
const AgentBookingsPage = lazy(() => import('@/features/agents/pages/AgentBookingsPage'));
const AgentCommissionsPage = lazy(() => import('@/features/agents/pages/AgentCommissionsPage'));

/* ============================================================
   Lazy Loaded Error Pages
   ============================================================ */
const NotFoundPage = lazy(() => import('@/features/errors/pages/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('@/features/errors/pages/UnauthorizedPage'));

/* ============================================================
   Search redirect: forwards ?q= param to /packages/search
   ============================================================ */
const SearchRedirect = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const q = params.get('q') || '';
  return <Navigate to={`/packages/search${q ? `?q=${encodeURIComponent(q)}` : ''}`} replace />;
};

/* ============================================================
   Suspense wrapper
   ============================================================ */
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

/* ============================================================
   App Routes Component
   ============================================================ */
function AppRoutes() {
  return (
    <SuspenseWrapper>
      <Routes>
        {/* ---- Public User Routes ---- */}
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="destinations/:slug" element={<DestinationDetailsPage />} />
          <Route path="packages" element={<PackageListPage />} />
          <Route path="packages/search" element={<PackageSearchResultsPage />} />
          <Route path="packages/:slug" element={<PackageDetailsPage />} />
          <Route path="deals" element={<DealsPage />} />
          <Route path="search" element={<SearchRedirect />} />
          <Route path="categories" element={<CategoryListPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="itinerary-builder" element={<AiItineraryBuilderPage />} />

          {/* ---- Protected User Routes ---- */}
          <Route element={<ProtectedRoute allowedRoles={['user', 'admin', 'agent']} />}>
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="my-bookings" element={<MyBookingsPage />} />
            <Route path="my-bookings/:id" element={<BookingDetailsPage />} />
            <Route path="book/:packageId" element={<BookingCheckoutPage />} />
            <Route path="book/:bookingId/travellers" element={<BookingTravellerDetailsPage />} />
            <Route path="book/:bookingId/review" element={<BookingReviewPage />} />
            <Route path="book/:bookingId/payment" element={<PaymentPage />} />
            <Route path="book/:bookingId/confirm" element={<BookingConfirmationPage />} />
            <Route path="booking/success" element={<BookingSuccessPage />} />
            <Route path="payment/success" element={<PaymentSuccessPage />} />
            <Route path="payment/failed" element={<PaymentFailedPage />} />
            <Route path="loyalty" element={<LoyaltyDashboardPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="addresses" element={<AddressManagementPage />} />
            <Route path="documents" element={<TravelDocumentVaultPage />} />
            <Route path="review/:packageId" element={<WriteReviewPage />} />
            <Route path="itinerary/:packageId" element={<ItineraryPage />} />
            <Route path="trip-tracking/:bookingId" element={<LiveTripTrackingPage />} />
          </Route>
        </Route>

        {/* ---- Auth Routes ---- */}
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="otp-verification" element={<OtpVerificationPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        {/* ---- Admin Routes ---- */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="packages" element={<AdminPackageManagementPage />} />
          <Route path="packages/new" element={<AdminPackageManagementPage />} />
          <Route path="destinations" element={<AdminDestinationManagementPage />} />
          <Route path="bookings" element={<AdminBookingManagementPage />} />
          <Route path="users" element={<AdminUserManagementPage />} />
          <Route path="reviews" element={<AdminReviewModerationPage />} />
          <Route path="coupons" element={<AdminCouponManagementPage />} />
          <Route path="vendors" element={<AdminVendorManagementPage />} />
          <Route path="itineraries" element={<AdminItineraryManagementPage />} />
          <Route path="categories" element={<AdminCategoryManagementPage />} />
          <Route path="agents" element={<AdminAgentManagementPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* ---- Agent Routes ---- */}
        <Route
          path="/agent"
          element={
            <AgentRoute>
              <AgentLayout />
            </AgentRoute>
          }
        >
          <Route index element={<Navigate to="/agent/dashboard" replace />} />
          <Route path="dashboard" element={<AgentDashboardPage />} />
          <Route path="bookings" element={<AgentBookingsPage />} />
          <Route path="commissions" element={<AgentCommissionsPage />} />
        </Route>

        {/* ---- Short-form auth redirects ---- */}
        <Route path="/register" element={<Navigate to="/auth/register" replace />} />
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />

        {/* ---- Error Routes ---- */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SuspenseWrapper>
  );
}

export default AppRoutes;
