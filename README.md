# WanderLux — Full-Stack Travel Agency

## Quick Start

### 1. Start MongoDB
Make sure MongoDB is running locally on port 27017.

### 2. Backend
```bash
cd backend
npm install
# Edit .env with your MongoDB URI (default: mongodb://localhost:27017/travel-agency)
npm run seed      # Seed database with sample data
npm run dev       # Start backend on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev       # Start frontend on http://localhost:3000
```

---

## Admin Login
- **Email:** admin@wanderlux.com
- **Password:** Admin@1234
- **URL:** http://localhost:3000/admin

## User Login (sample)
- **Email:** rahul.sharma@example.com
- **Password:** User@1234

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Redux Toolkit, React Router v6 |
| Styling | Tailwind CSS, Framer Motion |
| Icons | Lucide React |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT (access + refresh tokens) |
| Payments | Razorpay integration ready |

## Features (19 Modules)
- Authentication (login, register, OTP, forgot/reset password)
- User Profiles & Passport Details
- Destinations (10 destinations seeded)
- Categories (6 categories seeded)
- Packages (10 packages seeded with full itineraries)
- Itineraries with AI Builder
- Booking (5-step checkout flow)
- Payments (Card, UPI, EMI, Net Banking)
- Coupons
- Reviews & Ratings
- Wishlists
- Loyalty Points & Tiers
- Notifications
- Address Management
- Travel Document Vault
- Live Trip Tracking
- Vendor Management
- Agent Portal
- Admin Dashboard with Charts
"# travel-agency-claude" 
