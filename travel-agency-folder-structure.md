# ✈️ Travel Agency — Complete Folder Structure
> Senior Architect Design | Based on Feature-Based Architecture Rules
> Frontend: React + Redux Toolkit | Backend: Node.js + Express + MongoDB

---

## 🖥️ FRONTEND — src/

```
src/
│
├── apps/
│   ├── users/
│   │   └── UserApp.jsx
│   │
│   └── admins/
│       └── AdminApp.jsx
│
│
├── features/
│   │
│   ├── auths/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── ForgotPasswordForm.jsx
│   │   │   ├── OtpVerificationForm.jsx
│   │   │   └── SocialLoginButtons.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   └── OtpVerificationPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useOtp.js
│   │   │
│   │   ├── services/
│   │   │   └── authService.js
│   │   │
│   │   ├── apis/
│   │   │   └── authApi.js
│   │   │
│   │   ├── slices/
│   │   │   └── authSlice.js
│   │   │
│   │   ├── validations/
│   │   │   └── authValidation.js
│   │   │
│   │   └── utils/
│   │       └── authHelpers.js
│   │
│   │
│   ├── users/
│   │   ├── components/
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── UserAvatar.jsx
│   │   │   ├── ProfileEditForm.jsx
│   │   │   └── PassportDetailsForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── PassportDetailsPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useUser.js
│   │   │
│   │   ├── services/
│   │   │   └── userService.js
│   │   │
│   │   ├── apis/
│   │   │   └── userApi.js
│   │   │
│   │   └── slices/
│   │       └── userSlice.js
│   │
│   │
│   ├── destinations/
│   │   ├── components/
│   │   │   ├── DestinationCard.jsx
│   │   │   ├── DestinationBanner.jsx
│   │   │   ├── DestinationHighlights.jsx
│   │   │   ├── VisaInfoCard.jsx
│   │   │   └── WeatherInfoCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── DestinationsPage.jsx
│   │   │   ├── DestinationDetailsPage.jsx
│   │   │   └── AdminDestinationManagementPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDestinations.js
│   │   │   └── useDestinationDetails.js
│   │   │
│   │   ├── services/
│   │   │   └── destinationService.js
│   │   │
│   │   ├── apis/
│   │   │   └── destinationApi.js
│   │   │
│   │   ├── slices/
│   │   │   └── destinationSlice.js
│   │   │
│   │   └── utils/
│   │       └── destinationHelpers.js
│   │
│   │
│   ├── categories/
│   │   ├── components/
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── CategoryBadge.jsx
│   │   │   └── CategoryForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── CategoryListPage.jsx
│   │   │   └── AdminCategoryManagementPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useCategories.js
│   │   │
│   │   ├── services/
│   │   │   └── categoryService.js
│   │   │
│   │   ├── apis/
│   │   │   └── categoryApi.js
│   │   │
│   │   └── slices/
│   │       └── categorySlice.js
│   │
│   │
│   ├── packages/
│   │   ├── components/
│   │   │   ├── PackageCard.jsx
│   │   │   ├── PackageCardSkeleton.jsx
│   │   │   ├── PackageBanner.jsx
│   │   │   ├── PackageHighlights.jsx
│   │   │   ├── PackageInclusions.jsx
│   │   │   ├── PackageExclusions.jsx
│   │   │   ├── PackageVariantSelector.jsx
│   │   │   ├── PackageDatePicker.jsx
│   │   │   ├── PackagePricingSummary.jsx
│   │   │   ├── PackageFilters.jsx
│   │   │   ├── PackageSortBar.jsx
│   │   │   ├── PackageGallery.jsx
│   │   │   ├── PackageFaqs.jsx
│   │   │   ├── PackageMapView.jsx
│   │   │   ├── PackageForm.jsx
│   │   │   └── FeaturedPackageBanner.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── PackageListPage.jsx
│   │   │   ├── PackageDetailsPage.jsx
│   │   │   ├── PackageSearchResultsPage.jsx
│   │   │   └── AdminPackageManagementPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── usePackages.js
│   │   │   ├── usePackageDetails.js
│   │   │   ├── usePackageFilters.js
│   │   │   └── usePackageSearch.js
│   │   │
│   │   ├── services/
│   │   │   └── packageService.js
│   │   │
│   │   ├── apis/
│   │   │   └── packageApi.js
│   │   │
│   │   ├── slices/
│   │   │   └── packageSlice.js
│   │   │
│   │   ├── validations/
│   │   │   └── packageValidation.js
│   │   │
│   │   ├── constants/
│   │   │   └── packageConstants.js
│   │   │
│   │   └── utils/
│   │       └── packageHelpers.js
│   │
│   │
│   ├── itineraries/
│   │   ├── components/
│   │   │   ├── ItineraryDayCard.jsx
│   │   │   ├── ItineraryTimeline.jsx
│   │   │   ├── ItineraryMealBadge.jsx
│   │   │   ├── ItineraryActivityList.jsx
│   │   │   ├── ItineraryMapView.jsx
│   │   │   └── ItineraryForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── ItineraryPage.jsx
│   │   │   ├── AiItineraryBuilderPage.jsx
│   │   │   └── AdminItineraryManagementPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useItinerary.js
│   │   │   └── useAiItineraryBuilder.js
│   │   │
│   │   ├── services/
│   │   │   └── itineraryService.js
│   │   │
│   │   ├── apis/
│   │   │   └── itineraryApi.js
│   │   │
│   │   └── slices/
│   │       └── itinerarySlice.js
│   │
│   │
│   ├── bookings/
│   │   ├── components/
│   │   │   ├── BookingCard.jsx
│   │   │   ├── BookingStatusBadge.jsx
│   │   │   ├── BookingTimeline.jsx
│   │   │   ├── BookingSummaryCard.jsx
│   │   │   ├── BookingTravellerForm.jsx
│   │   │   ├── BookingTravellerList.jsx
│   │   │   ├── BookingConfirmationCard.jsx
│   │   │   └── BookingFilters.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── BookingCheckoutPage.jsx
│   │   │   ├── BookingTravellerDetailsPage.jsx
│   │   │   ├── BookingReviewPage.jsx
│   │   │   ├── BookingConfirmationPage.jsx
│   │   │   ├── BookingSuccessPage.jsx
│   │   │   ├── MyBookingsPage.jsx
│   │   │   ├── BookingDetailsPage.jsx
│   │   │   └── AdminBookingManagementPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useBookings.js
│   │   │   ├── useBookingCheckout.js
│   │   │   └── useBookingDetails.js
│   │   │
│   │   ├── services/
│   │   │   └── bookingService.js
│   │   │
│   │   ├── apis/
│   │   │   └── bookingApi.js
│   │   │
│   │   ├── slices/
│   │   │   └── bookingSlice.js
│   │   │
│   │   ├── validations/
│   │   │   └── bookingValidation.js
│   │   │
│   │   ├── constants/
│   │   │   └── bookingConstants.js
│   │   │
│   │   └── utils/
│   │       └── bookingHelpers.js
│   │
│   │
│   ├── payments/
│   │   ├── components/
│   │   │   ├── PaymentMethodSelector.jsx
│   │   │   ├── PaymentCardForm.jsx
│   │   │   ├── PaymentUpiForm.jsx
│   │   │   ├── PaymentEmiSelector.jsx
│   │   │   ├── PaymentSummaryCard.jsx
│   │   │   ├── PaymentStatusBadge.jsx
│   │   │   └── SavedPaymentMethods.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── PaymentPage.jsx
│   │   │   ├── PaymentSuccessPage.jsx
│   │   │   ├── PaymentFailedPage.jsx
│   │   │   └── SavedPaymentMethodsPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── usePayments.js
│   │   │   └── useSavedPaymentMethods.js
│   │   │
│   │   ├── services/
│   │   │   └── paymentService.js
│   │   │
│   │   ├── apis/
│   │   │   └── paymentApi.js
│   │   │
│   │   ├── slices/
│   │   │   └── paymentSlice.js
│   │   │
│   │   └── utils/
│   │       └── paymentHelpers.js
│   │
│   │
│   ├── coupons/
│   │   ├── components/
│   │   │   ├── CouponInput.jsx
│   │   │   ├── CouponCard.jsx
│   │   │   └── CouponForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── AdminCouponManagementPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useCoupons.js
│   │   │
│   │   ├── services/
│   │   │   └── couponService.js
│   │   │
│   │   ├── apis/
│   │   │   └── couponApi.js
│   │   │
│   │   └── slices/
│   │       └── couponSlice.js
│   │
│   │
│   ├── reviews/
│   │   ├── components/
│   │   │   ├── ReviewCard.jsx
│   │   │   ├── ReviewForm.jsx
│   │   │   ├── ReviewStarRating.jsx
│   │   │   ├── ReviewMediaUpload.jsx
│   │   │   ├── ReviewSummaryBar.jsx
│   │   │   └── AdminReviewModerationCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── WriteReviewPage.jsx
│   │   │   └── AdminReviewModerationPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useReviews.js
│   │   │
│   │   ├── services/
│   │   │   └── reviewService.js
│   │   │
│   │   ├── apis/
│   │   │   └── reviewApi.js
│   │   │
│   │   └── slices/
│   │       └── reviewSlice.js
│   │
│   │
│   ├── wishlists/
│   │   ├── components/
│   │   │   ├── WishlistButton.jsx
│   │   │   └── WishlistPackageCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── WishlistPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useWishlists.js
│   │   │
│   │   ├── services/
│   │   │   └── wishlistService.js
│   │   │
│   │   ├── apis/
│   │   │   └── wishlistApi.js
│   │   │
│   │   └── slices/
│   │       └── wishlistSlice.js
│   │
│   │
│   ├── loyalties/
│   │   ├── components/
│   │   │   ├── LoyaltyPointsBadge.jsx
│   │   │   ├── LoyaltyTierCard.jsx
│   │   │   ├── LoyaltyTransactionRow.jsx
│   │   │   └── LoyaltyRedeemInput.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── LoyaltyDashboardPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useLoyalties.js
│   │   │
│   │   ├── services/
│   │   │   └── loyaltyService.js
│   │   │
│   │   ├── apis/
│   │   │   └── loyaltyApi.js
│   │   │
│   │   └── slices/
│   │       └── loyaltySlice.js
│   │
│   │
│   ├── notifications/
│   │   ├── components/
│   │   │   ├── NotificationBell.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   └── NotificationItem.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── NotificationsPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useNotifications.js
│   │   │
│   │   ├── services/
│   │   │   └── notificationService.js
│   │   │
│   │   ├── apis/
│   │   │   └── notificationApi.js
│   │   │
│   │   └── slices/
│   │       └── notificationSlice.js
│   │
│   │
│   ├── addresses/
│   │   ├── components/
│   │   │   ├── AddressCard.jsx
│   │   │   └── AddressForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── AddressManagementPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAddresses.js
│   │   │
│   │   ├── services/
│   │   │   └── addressService.js
│   │   │
│   │   ├── apis/
│   │   │   └── addressApi.js
│   │   │
│   │   └── slices/
│   │       └── addressSlice.js
│   │
│   │
│   ├── documents/
│   │   ├── components/
│   │   │   ├── DocumentVaultCard.jsx
│   │   │   ├── DocumentDownloadButton.jsx
│   │   │   └── DocumentStatusBadge.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── TravelDocumentVaultPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useDocuments.js
│   │   │
│   │   ├── services/
│   │   │   └── documentService.js
│   │   │
│   │   ├── apis/
│   │   │   └── documentApi.js
│   │   │
│   │   └── slices/
│   │       └── documentSlice.js
│   │
│   │
│   ├── trackings/
│   │   ├── components/
│   │   │   ├── LiveTripMap.jsx
│   │   │   ├── GuideLocationPin.jsx
│   │   │   └── TripProgressBar.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── LiveTripTrackingPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useTrackings.js
│   │   │
│   │   ├── services/
│   │   │   └── trackingService.js
│   │   │
│   │   ├── apis/
│   │   │   └── trackingApi.js
│   │   │
│   │   └── slices/
│   │       └── trackingSlice.js
│   │
│   │
│   ├── vendors/
│   │   ├── components/
│   │   │   ├── VendorCard.jsx
│   │   │   ├── VendorForm.jsx
│   │   │   └── VendorCommissionSummary.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminVendorManagementPage.jsx
│   │   │   └── VendorDashboardPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useVendors.js
│   │   │
│   │   ├── services/
│   │   │   └── vendorService.js
│   │   │
│   │   ├── apis/
│   │   │   └── vendorApi.js
│   │   │
│   │   └── slices/
│   │       └── vendorSlice.js
│   │
│   │
│   ├── agents/
│   │   ├── components/
│   │   │   ├── AgentBookingCard.jsx
│   │   │   ├── AgentCommissionRow.jsx
│   │   │   └── AgentQuoteForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AgentDashboardPage.jsx
│   │   │   ├── AgentBookingsPage.jsx
│   │   │   └── AgentCommissionsPage.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAgents.js
│   │   │
│   │   ├── services/
│   │   │   └── agentService.js
│   │   │
│   │   ├── apis/
│   │   │   └── agentApi.js
│   │   │
│   │   └── slices/
│   │       └── agentSlice.js
│   │
│   │
│   └── dashboards/
│       ├── components/
│       │   ├── RevenueStatsCard.jsx
│       │   ├── BookingStatsCard.jsx
│       │   ├── TopDestinationsChart.jsx
│       │   ├── OccupancyRateChart.jsx
│       │   └── RecentBookingsTable.jsx
│       │
│       ├── pages/
│       │   └── AdminDashboardPage.jsx
│       │
│       ├── hooks/
│       │   └── useDashboards.js
│       │
│       ├── services/
│       │   └── dashboardService.js
│       │
│       ├── apis/
│       │   └── dashboardApi.js
│       │
│       └── slices/
│           └── dashboardSlice.js
│
│
├── layouts/
│   ├── users/
│   │   ├── UserLayout.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── MobileNavBar.jsx
│   │
│   ├── admins/
│   │   ├── AdminLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Navbar.jsx
│   │
│   └── agents/
│       ├── AgentLayout.jsx
│       └── AgentSidebar.jsx
│
│
├── shareds/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Textarea.jsx
│   │   ├── Select.jsx
│   │   ├── Modal.jsx
│   │   ├── Drawer.jsx
│   │   ├── Loader.jsx
│   │   ├── Spinner.jsx
│   │   ├── Skeleton.jsx
│   │   ├── Pagination.jsx
│   │   ├── Breadcrumb.jsx
│   │   ├── Badge.jsx
│   │   ├── Tooltip.jsx
│   │   ├── Alert.jsx
│   │   ├── Toast.jsx
│   │   ├── Table.jsx
│   │   ├── Tabs.jsx
│   │   ├── Accordion.jsx
│   │   ├── ImageUpload.jsx
│   │   ├── StarRating.jsx
│   │   ├── DateRangePicker.jsx
│   │   ├── SearchBar.jsx
│   │   ├── EmptyState.jsx
│   │   └── ErrorBoundary.jsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   ├── usePagination.js
│   │   ├── useMediaQuery.js
│   │   ├── useInfiniteScroll.js
│   │   └── useClickOutside.js
│   │
│   ├── utils/
│   │   ├── apiClient.js
│   │   ├── errorHandler.js
│   │   ├── formatter.js
│   │   ├── priceCalculator.js
│   │   ├── dateHelpers.js
│   │   └── stringHelpers.js
│   │
│   ├── constants/
│   │   └── appConstants.js
│   │
│   └── services/
│       └── storageService.js
│
│
├── stores/
│   ├── store.js
│   └── rootReducer.js
│
│
├── routes/
│   ├── AppRoutes.jsx
│   ├── ProtectedRoutes.jsx
│   ├── AdminRoutes.jsx
│   ├── AgentRoutes.jsx
│   └── VendorRoutes.jsx
│
│
├── configs/
│   └── envConfig.js
│
│
├── middlewares/
│   └── authMiddleware.js
│
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── videos/
│
│
├── styles/
│   └── global.css
│
│
├── app.jsx
└── main.jsx
```

---

## ⚙️ BACKEND — backend/

```
backend/
│
├── apps/
│   ├── users/
│   │   └── userApp.js
│   │
│   ├── admins/
│   │   └── adminApp.js
│   │
│   └── agents/
│       └── agentApp.js
│
│
├── modules/
│   │
│   ├── auths/
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── repositories/
│   │   │   └── authRepository.js
│   │   ├── models/
│   │   │   └── AuthModel.js
│   │   ├── routes/
│   │   │   └── authRoutes.js
│   │   ├── validations/
│   │   │   └── authValidation.js
│   │   └── utils/
│   │       └── authHelpers.js
│   │
│   │
│   ├── users/
│   │   ├── controllers/
│   │   │   └── userController.js
│   │   ├── services/
│   │   │   └── userService.js
│   │   ├── repositories/
│   │   │   └── userRepository.js
│   │   ├── models/
│   │   │   └── UserModel.js
│   │   ├── routes/
│   │   │   └── userRoutes.js
│   │   └── validations/
│   │       └── userValidation.js
│   │
│   │
│   ├── destinations/
│   │   ├── controllers/
│   │   │   └── destinationController.js
│   │   ├── services/
│   │   │   └── destinationService.js
│   │   ├── repositories/
│   │   │   └── destinationRepository.js
│   │   ├── models/
│   │   │   └── DestinationModel.js
│   │   ├── routes/
│   │   │   └── destinationRoutes.js
│   │   ├── validations/
│   │   │   └── destinationValidation.js
│   │   └── utils/
│   │       └── destinationHelpers.js
│   │
│   │
│   ├── categories/
│   │   ├── controllers/
│   │   │   └── categoryController.js
│   │   ├── services/
│   │   │   └── categoryService.js
│   │   ├── repositories/
│   │   │   └── categoryRepository.js
│   │   ├── models/
│   │   │   └── CategoryModel.js
│   │   ├── routes/
│   │   │   └── categoryRoutes.js
│   │   └── validations/
│   │       └── categoryValidation.js
│   │
│   │
│   ├── packages/
│   │   ├── controllers/
│   │   │   └── packageController.js
│   │   ├── services/
│   │   │   └── packageService.js
│   │   ├── repositories/
│   │   │   └── packageRepository.js
│   │   ├── models/
│   │   │   ├── PackageModel.js
│   │   │   └── PackageVariantModel.js
│   │   ├── routes/
│   │   │   └── packageRoutes.js
│   │   ├── validations/
│   │   │   └── packageValidation.js
│   │   └── utils/
│   │       └── packageHelpers.js
│   │
│   │
│   ├── itineraries/
│   │   ├── controllers/
│   │   │   └── itineraryController.js
│   │   ├── services/
│   │   │   ├── itineraryService.js
│   │   │   └── aiItineraryService.js
│   │   ├── repositories/
│   │   │   └── itineraryRepository.js
│   │   ├── models/
│   │   │   └── ItineraryModel.js
│   │   ├── routes/
│   │   │   └── itineraryRoutes.js
│   │   └── validations/
│   │       └── itineraryValidation.js
│   │
│   │
│   ├── bookings/
│   │   ├── controllers/
│   │   │   └── bookingController.js
│   │   ├── services/
│   │   │   └── bookingService.js
│   │   ├── repositories/
│   │   │   └── bookingRepository.js
│   │   ├── models/
│   │   │   ├── BookingModel.js
│   │   │   └── TravellerDetailModel.js
│   │   ├── routes/
│   │   │   └── bookingRoutes.js
│   │   ├── validations/
│   │   │   └── bookingValidation.js
│   │   └── utils/
│   │       └── bookingHelpers.js
│   │
│   │
│   ├── payments/
│   │   ├── controllers/
│   │   │   └── paymentController.js
│   │   ├── services/
│   │   │   └── paymentService.js
│   │   ├── repositories/
│   │   │   └── paymentRepository.js
│   │   ├── models/
│   │   │   ├── PaymentModel.js
│   │   │   └── SavedCardModel.js
│   │   ├── routes/
│   │   │   └── paymentRoutes.js
│   │   ├── validations/
│   │   │   └── paymentValidation.js
│   │   └── integrations/
│   │       ├── razorpayIntegration.js
│   │       └── stripeIntegration.js
│   │
│   │
│   ├── coupons/
│   │   ├── controllers/
│   │   │   └── couponController.js
│   │   ├── services/
│   │   │   └── couponService.js
│   │   ├── repositories/
│   │   │   └── couponRepository.js
│   │   ├── models/
│   │   │   └── CouponModel.js
│   │   ├── routes/
│   │   │   └── couponRoutes.js
│   │   └── validations/
│   │       └── couponValidation.js
│   │
│   │
│   ├── reviews/
│   │   ├── controllers/
│   │   │   └── reviewController.js
│   │   ├── services/
│   │   │   └── reviewService.js
│   │   ├── repositories/
│   │   │   └── reviewRepository.js
│   │   ├── models/
│   │   │   └── ReviewModel.js
│   │   ├── routes/
│   │   │   └── reviewRoutes.js
│   │   └── validations/
│   │       └── reviewValidation.js
│   │
│   │
│   ├── wishlists/
│   │   ├── controllers/
│   │   │   └── wishlistController.js
│   │   ├── services/
│   │   │   └── wishlistService.js
│   │   ├── repositories/
│   │   │   └── wishlistRepository.js
│   │   ├── models/
│   │   │   └── WishlistModel.js
│   │   ├── routes/
│   │   │   └── wishlistRoutes.js
│   │   └── validations/
│   │       └── wishlistValidation.js
│   │
│   │
│   ├── loyalties/
│   │   ├── controllers/
│   │   │   └── loyaltyController.js
│   │   ├── services/
│   │   │   └── loyaltyService.js
│   │   ├── repositories/
│   │   │   └── loyaltyRepository.js
│   │   ├── models/
│   │   │   └── LoyaltyTransactionModel.js
│   │   ├── routes/
│   │   │   └── loyaltyRoutes.js
│   │   └── utils/
│   │       └── loyaltyHelpers.js
│   │
│   │
│   ├── notifications/
│   │   ├── controllers/
│   │   │   └── notificationController.js
│   │   ├── services/
│   │   │   └── notificationService.js
│   │   ├── repositories/
│   │   │   └── notificationRepository.js
│   │   ├── models/
│   │   │   └── NotificationModel.js
│   │   ├── routes/
│   │   │   └── notificationRoutes.js
│   │   └── integrations/
│   │       ├── emailIntegration.js
│   │       ├── smsIntegration.js
│   │       ├── pushIntegration.js
│   │       └── whatsappIntegration.js
│   │
│   │
│   ├── addresses/
│   │   ├── controllers/
│   │   │   └── addressController.js
│   │   ├── services/
│   │   │   └── addressService.js
│   │   ├── repositories/
│   │   │   └── addressRepository.js
│   │   ├── models/
│   │   │   └── AddressModel.js
│   │   ├── routes/
│   │   │   └── addressRoutes.js
│   │   └── validations/
│   │       └── addressValidation.js
│   │
│   │
│   ├── documents/
│   │   ├── controllers/
│   │   │   └── documentController.js
│   │   ├── services/
│   │   │   └── documentService.js
│   │   ├── repositories/
│   │   │   └── documentRepository.js
│   │   ├── models/
│   │   │   └── TravelDocumentModel.js
│   │   ├── routes/
│   │   │   └── documentRoutes.js
│   │   └── utils/
│   │       └── documentHelpers.js
│   │
│   │
│   ├── trackings/
│   │   ├── controllers/
│   │   │   └── trackingController.js
│   │   ├── services/
│   │   │   └── trackingService.js
│   │   ├── repositories/
│   │   │   └── trackingRepository.js
│   │   ├── models/
│   │   │   └── TrackingModel.js
│   │   ├── routes/
│   │   │   └── trackingRoutes.js
│   │   └── integrations/
│   │       └── mapsIntegration.js
│   │
│   │
│   ├── vendors/
│   │   ├── controllers/
│   │   │   └── vendorController.js
│   │   ├── services/
│   │   │   └── vendorService.js
│   │   ├── repositories/
│   │   │   └── vendorRepository.js
│   │   ├── models/
│   │   │   └── VendorModel.js
│   │   ├── routes/
│   │   │   └── vendorRoutes.js
│   │   ├── validations/
│   │   │   └── vendorValidation.js
│   │   └── integrations/
│   │       └── vendorApiIntegration.js
│   │
│   │
│   ├── agents/
│   │   ├── controllers/
│   │   │   └── agentController.js
│   │   ├── services/
│   │   │   └── agentService.js
│   │   ├── repositories/
│   │   │   └── agentRepository.js
│   │   ├── models/
│   │   │   └── AgentModel.js
│   │   ├── routes/
│   │   │   └── agentRoutes.js
│   │   └── validations/
│   │       └── agentValidation.js
│   │
│   │
│   └── dashboards/
│       ├── controllers/
│       │   └── dashboardController.js
│       ├── services/
│       │   └── dashboardService.js
│       └── routes/
│           └── dashboardRoutes.js
│
│
├── shareds/
│   ├── utils/
│   │   ├── logger.js
│   │   ├── errorHandler.js
│   │   └── responseFormatter.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── rateLimitMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── services/
│   │   ├── tokenService.js
│   │   ├── emailService.js
│   │   ├── smsService.js
│   │   ├── storageService.js
│   │   └── queueService.js
│   │
│   └── constants/
│       └── appConstants.js
│
│
├── databases/
│   └── connection.js
│
│
├── configs/
│   └── envConfig.js
│
│
├── routes/
│   └── indexRoutes.js
│
│
└── server.js
```

---

## 📄 FILE HEADER TEMPLATES

### Component File (PascalCase)
```jsx
/*
 *  FileName:-     PackageCard.jsx
 *  Description:-  This file exports a PackageCard functional component
 *                 that displays a travel package with image, title,
 *                 price, duration, and rating.
 *  Author:-       Author Name
 *  Created-date:- 13-04-2026
 */
```

### Non-Component File (camelCase)
```js
/*
 *  FileName:-     packageService.js
 *  Description:-  This file contains service functions for package
 *                 operations including fetch, filter, and transform.
 *  Author:-       Author Name
 *  Created-date:- 13-04-2026
 */
```

### Function Header
```js
/*
 *  functionName:- getFilteredPackages
 *  Description:-  Filters packages by destination, category, price range and duration
 *  Arguments:-    { destination: string, category: string, minPrice: number, maxPrice: number }
 *  Author:-       Author Name
 *  Created-date:- 13-04-2026
 */
```

---

## 📊 FEATURE COUNT SUMMARY

| Layer        | Features / Modules |
|--------------|--------------------|
| **Frontend** | auths, users, destinations, categories, packages, itineraries, bookings, payments, coupons, reviews, wishlists, loyalties, notifications, addresses, documents, trackings, vendors, agents, dashboards |
| **Backend**  | auths, users, destinations, categories, packages, itineraries, bookings, payments, coupons, reviews, wishlists, loyalties, notifications, addresses, documents, trackings, vendors, agents, dashboards |
| **Total**    | **19 features** (both frontend & backend) |

---

## ✅ NAMING RULES APPLIED

| Rule | Applied |
|------|---------|
| Folder names end with `s` | ✅ packages, bookings, itineraries, loyalties... |
| Folder names all lowercase | ✅ |
| Component files PascalCase | ✅ PackageCard.jsx, BookingTimeline.jsx... |
| Non-component files camelCase | ✅ packageService.js, authHelpers.js... |
| File headers on every file | ✅ FileName, Description, Author, Created-date |
| Function headers with args | ✅ functionName, Description, Arguments, Author, Created-date |
| Variables camelCase | ✅ |
| Boolean variables is/has/can prefix | ✅ isLoading, hasError, isVerified, canEdit... |
```
