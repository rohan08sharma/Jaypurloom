# Jaypurloom — Premium Enterprise E-Commerce Platform

**Jaypurloom** is an enterprise-grade, production-ready, luxury e-commerce platform crafted specifically for **Premium Women's Ethnic Wear & Home Furnishing** (Suit Sets, Anarkali Suits, Kurta Sets, Dress Materials, Dupattas, and Luxury King/Queen Cotton Bedsheets).

Featuring a bespoke design aesthetic inspired by luxury Indian ethnic fashion brands, Jaypurloom combines **Playfair Display** editorial typography, **Poppins** geometric body text, rich **Royal Maroon (`#6B1D2F`)** & **Gold (`#D4AF37`)** palettes, smooth micro-interactions, AI-driven personal styling, and enterprise scalability.

---

## 🏛️ Architecture Overview

The application is structured into two clean, scalable core modules:

- **Frontend (`/frontend`)**: Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend (`/backend`)**: NestJS, TypeScript, PostgreSQL, Prisma ORM, Swagger OpenAPI Docs (`/api/docs`), JWT & Google OAuth, and Razorpay/UPI payment workflows.
- **DevOps & Proxy**: Root `docker-compose.yml` with PostgreSQL 16 container, multi-stage production Docker containers, and Nginx reverse proxy.

---

## ✨ Features & Capabilities

### 🛍️ Customer Experience & Shopping
- **Announcement Bar & Mega Menu**: Multi-column hierarchy across `Women` (Suit Sets, Kurta Sets, Anarkali, Printed, Dupatta, Bottom Wear), `Bedsheets` (King, Queen, Double, Single, Cotton), and `Collections` (Summer, Winter, Festive, Wedding, Office Wear).
- **Product Details (`/products/[slug]`)**: 
  - **360° Interactive Rotation Viewer** & **Magnifier Zoom**
  - **Embedded Product Video Modal**
  - **Live Stock Checker & Delivery Pincode ETA Calculator**
  - **Complete the Look / Frequently Bought Together Bundles**
  - **Rich Tabs**: Fabric Details, Wash Care, Technical Specifications, and Customer Q&A
- **Smart Discovery**:
  - **AI Natural Language Stylist (`/ai-stylist`)**: Ask questions like *"I need a maroon silk Anarkali under ₹5,000 for a reception"* to get tailored recommendations.
  - **Voice & Image Search Integration**
  - **Side-by-Side Product Comparison (`/compare`)**
- **Cart & Multi-Step Checkout**:
  - Gift wrapping toggle (+₹99 with personalized card)
  - Live Coupon validation (`FESTIVE20`, `WELCOME10`, `ROYAL15`) with instant GST breakdown
  - Multi-step checkout supporting **Razorpay**, **UPI with instant QR validation**, **Credit/Debit Card**, **Net Banking**, **Digital Wallet**, and **Cash on Delivery**.
- **Customer Dashboard (`/account`)**:
  - Order timeline tracking (`Placed` ➔ `Confirmed` ➔ `Packed` ➔ `Shipped` ➔ `Delivered`)
  - One-click Return and Refund initiation
  - Address book, Coupons wallet, Digital Wallet balance, and Profile security.
- **Dark Mode & Multi-Language (`English / Hindi`)**: Seamless luxury theme and localization switching.

### ⚙️ Enterprise Admin Portal (`/admin`)
- **Real-time Analytics Dashboard**: Daily/Monthly revenue metrics, order velocity counters, and Low Stock Alerts table (`< 5` units).
- **Product & Inventory Management**: Multi-variant SKU/barcode generator, GST rate customization, SEO tag optimization, plus **Bulk Excel/CSV Upload simulator**.
- **Order Processing**: Live status progression with automated tracking notifications and printable PDF invoice generation.
- **Marketing & Reports**: Coupon creator, review moderation, and downloadable GST tax exports.

---

## 🚀 Quick Start (Zero Setup & Dual-Mode Fallback)

To ensure smooth testing without external cloud accounts (Razorpay, Cloudinary, or AWS S3), Jaypurloom operates with a **Zero-Friction Dual-Mode Architecture**:
- If API keys are provided in `.env`, real cloud APIs execute.
- If running with default keys, **high-fidelity local fallbacks and simulated QR payments/local uploads** automatically engage so every checkout and upload completes seamlessly!

### Option 1: Docker Compose (Recommended)
Make sure Docker Desktop is running, then run:
```bash
docker-compose up --build -d
```
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001/api/v1](http://localhost:3001/api/v1)
- **Swagger API Docs**: [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
- **Nginx Reverse Proxy**: [http://localhost](http://localhost)

### Option 2: Local Development (PowerShell / Terminal)
1. **Database**: Ensure PostgreSQL is running on `localhost:5432` with database `jaypurloom_db`.
2. **Backend**:
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm run seed
   npm run start:dev
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 🔑 Default Test Accounts

After running `npm run seed` (or starting via Docker), the following accounts are ready:

| Role | Email | Password | Access Area |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@jaypurloom.com` | `Admin@12345` | `/admin` (Full Admin Portal) |
| **Customer** | `rohan@jaypurloom.com` | `Customer@123` | `/account` & Shopping Checkout |

---

## 🎁 Sample Coupon Codes

- `WELCOME10`: Flat 10% discount on first order (Min ₹1,000)
- `FESTIVE20`: Flat 20% discount on all suit sets and bedsheets (Min ₹2,500)
- `ROYAL15`: Flat 15% discount across the store

---

## 📁 Repository Structure

```
Jaypurloom/
├── frontend/             # Next.js 14 App Router, Tailwind CSS, Framer Motion
├── backend/              # NestJS, Prisma ORM, PostgreSQL, Swagger API
├── nginx/                # Production reverse proxy configs
├── docker-compose.yml    # Root Docker container orchestration
├── API_DOCUMENTATION.md  # Comprehensive REST API endpoint reference
└── README.md             # This document
```