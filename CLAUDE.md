# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**WanderLux** — a full-stack MERN travel booking platform with 19 feature modules, three user roles (user/admin/agent), real-time Socket.io events, and RTK Query throughout the frontend.

## Commands

### Backend (`cd backend`)
```bash
npm run dev       # Start with nodemon on http://localhost:5000
npm start         # Production start
npm run seed      # Seed MongoDB with sample data (10 destinations, 10 packages, users)
```

### Frontend (`cd frontend`)
```bash
npm run dev       # Start Vite dev server on http://localhost:3000
npm run build     # Production build to dist/
npm run lint      # ESLint (zero warnings allowed)
npm run preview   # Preview production build
```

### Prerequisites
- MongoDB must be running on `localhost:27017` before starting the backend.
- Copy `backend/.env.example` → `backend/.env` and `frontend/.env.example` → `frontend/.env` before first run.

### Test credentials (after seeding)
- Admin: `admin@wanderlux.com` / `Admin@1234` → `http://localhost:3000/admin`
- User: `rahul.sharma@example.com` / `User@1234`

## Architecture

### Monorepo layout
```
travel-agency/
├── backend/      # Node/Express API
└── frontend/     # React/Vite SPA
```
No shared package — they are independent npm projects. The Vite dev server proxies `/api` → `http://localhost:5000`.

### Backend — module-scoped layered architecture

Every domain lives under `backend/modules/<domain>/` with five fixed layers:

```
modules/<domain>/
├── models/        # Mongoose schemas
├── repositories/  # DB queries (raw Mongoose calls only)
├── services/      # Business logic (calls repositories)
├── controllers/   # Express handlers (calls services, formats responses)
└── routes/        # Express router
```

All routes are registered in `backend/routes/indexRoutes.js` and mounted at `/api/v1`.

**Shared backend utilities** (`backend/shareds/`):
- `middlewares/authMiddleware.js` — `authenticate`, `optionalAuthenticate`, `requireVerified`
- `middlewares/roleMiddleware.js` — role-based access control
- `middlewares/uploadMiddleware.js` — Multer + Cloudinary
- `utils/responseFormatter.js` — `successResponse`, `createdResponse`, `paginatedResponse`, `errorResponse`, etc. (always use these, never `res.json()` directly)
- `utils/errorHandler.js` — `AppError` class and `asyncWrapper` (wraps async controllers to avoid try/catch boilerplate)
- `utils/logger.js` — Winston with daily rotating files in `backend/logs/`
- `services/tokenService.js` — JWT access/refresh token generation and verification
- `services/emailService.js` — Nodemailer
- `services/storageService.js` — Cloudinary upload/delete

**Socket.io** is initialized in `server.js` and stored on `app.set('io', io)`. Retrieve it in any controller via `req.app.get('io')`. Events: `booking_update`, `tracking_update`, `new_notification`.

### Frontend — feature-first Redux architecture

```
frontend/src/
├── features/<domain>/   # All feature modules
│   ├── apis/            # RTK Query API slice (createApi)
│   ├── slices/          # Redux slice (createSlice)
│   ├── components/      # Feature-specific UI
│   ├── hooks/           # Custom hooks wrapping RTK Query
│   └── pages/           # Route-level page components
├── layouts/
│   ├── users/           # UserLayout (Header + Footer)
│   ├── admins/          # AdminLayout (Navbar + Sidebar)
│   └── agents/          # AgentLayout
├── routes/              # AppRoutes, ProtectedRoutes, AdminRoutes, AgentRoutes
├── stores/              # Redux store (store.js) + rootReducer.js
└── shareds/
    ├── components/      # Reusable UI primitives (Button, Modal, Table, etc.)
    ├── hooks/           # Generic hooks (useDebounce, usePagination, etc.)
    ├── utils/           # apiClient.js, formatter.js, dateHelpers.js
    ├── services/        # storageService.js
    └── constants/       # appConstants.js
```

**State management dual-layer**: each feature has both an RTK Query API slice (for server data / cache) and a Redux slice (for local UI state like multi-step forms). The store registers both.

**Axios client** (`shareds/utils/apiClient.js`) handles JWT Bearer token injection and transparent refresh token rotation (queues concurrent 401s). Tokens are stored in `localStorage`.

**Path aliases** (defined in `vite.config.js`):
- `@` → `src/`
- `@components` → `src/shareds/components`
- `@hooks`, `@utils`, `@constants`, `@services`, `@stores`, `@routes`, `@layouts`

### Authentication & roles

The `Auth` Mongoose model is separate from `User` — `Auth` holds credentials/tokens; `User` holds profile data. The `req.user` object attached by `authMiddleware` contains `{ userId, email, role, isVerified }`.

Roles: `user` | `admin` | `agent`. Frontend route guards: `ProtectedRoutes` (any authenticated role), `AdminRoutes` (admin only), `AgentRoutes` (agent only).

### API response contract

All responses follow this shape (via `responseFormatter.js`):
```json
{ "success": true/false, "message": "...", "data": ..., "timestamp": "..." }
```
Paginated responses include a `pagination` object: `{ total, page, limit, totalPages, hasNextPage, hasPrevPage }`.

### Key domain relationships
- `Booking` → refs `Auth` (user), `Package`, `PackageVariant`, `Coupon`, `Agent`
- `Package` → refs `Destination`, `Category`; has embedded `PackageVariant` sub-documents
- `Booking` bookingId is auto-generated as `BK-YYYYMMDD-XXXXXX` on pre-save

## Environment Variables

**Backend** key vars: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CLOUDINARY_*`, `EMAIL_*`, `RAZORPAY_*`, `CLIENT_URL`

**Frontend** key vars (all prefixed `VITE_`): `VITE_API_BASE_URL` (default `http://localhost:5000/api`), `VITE_RAZORPAY_KEY_ID`, `VITE_GOOGLE_MAPS_API_KEY`
