# Jaypurloom REST API Reference Documentation

Base URL: `http://localhost:3001/api/v1`
Interactive Swagger OpenAPI Docs: `http://localhost:3001/api/docs`

---

## 🔐 Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register new customer with email/phone/password | No |
| `POST` | `/auth/login` | Login with email and password (returns JWT & user details) | No |
| `POST` | `/auth/google-login` | Google OAuth simulated or real login verification | No |
| `POST` | `/auth/send-otp` | Send 6-digit verification code to phone/email | No |
| `POST` | `/auth/verify-otp` | Verify OTP code and return JWT access token | No |
| `POST` | `/auth/forgot-password` | Send password reset recovery link / token | No |

---

## 👗 Products Catalog (`/api/v1/products`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | List paginated products with query filters (`category`, `fabric`, `minPrice`, `maxPrice`, `color`, `size`, `sort`) | No |
| `GET` | `/products/:slug` | Get detailed product specifications, variants, reviews, and similar items | No |
| `POST` | `/products` | Create a new product with multi-variant SKUs, pricing, and stock | **Admin** |
| `PUT` | `/products/:id` | Update product attributes, pricing, or stock threshold | **Admin** |
| `DELETE` | `/products/:id` | Soft/hard delete product from catalog | **Admin** |
| `POST` | `/products/bulk-upload` | Import product list via simulated Excel/CSV JSON array | **Admin** |

---

## 📂 Categories (`/api/v1/categories`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/categories` | Get hierarchical tree of categories (`Women`, `Bedsheets`, `Collections`) | No |
| `POST` | `/categories` | Create new category / subcategory | **Admin** |
| `PUT` | `/categories/:id` | Update category details or banner image | **Admin** |

---

## 🛒 Orders & Checkout (`/api/v1/orders`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/orders` | Place new order, validate stock, compute GST, and initiate payment | Customer / Guest |
| `GET` | `/orders/my-orders` | Get logged-in customer's order history (`Placed` to `Delivered`) | Customer |
| `GET` | `/orders/:id` | Get comprehensive order snapshot, line items, and courier tracking | Customer / Admin |
| `GET` | `/orders/admin/all` | Admin list of all platform orders with status filter | **Admin** |
| `PATCH` | `/orders/:id/status` | Update status (`Confirmed` ➔ `Packed` ➔ `Shipped` ➔ `Delivered`) | **Admin** |
| `POST` | `/orders/:id/return` | Submit return / refund request with reason and photos | Customer |

---

## 🎟️ Coupons (`/api/v1/coupons`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/coupons/validate` | Validate code against cart total & rules (`WELCOME10`, `FESTIVE20`) | No |
| `GET` | `/coupons` | List all active promo codes and rules | **Admin** |
| `POST` | `/coupons` | Create new flat/percentage coupon code | **Admin** |

---

## ⭐ Reviews & Ratings (`/api/v1/reviews`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/reviews/product/:productId` | List approved customer ratings and photo reviews | No |
| `POST` | `/reviews` | Submit new star rating, comment, and customer photos | Customer |
| `PATCH` | `/reviews/:id/approve` | Moderate and approve review for public display | **Admin** |

---

## 📦 Inventory & Reports (`/api/v1/inventory`, `/api/v1/reports`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/inventory/low-stock` | Get real-time alerts for variants `< 5` items in stock | **Admin** |
| `PATCH` | `/inventory/adjust` | Manual inventory stock adjustment log | **Admin** |
| `GET` | `/reports/sales-summary` | Daily/Monthly/Yearly revenue and order counts breakdown | **Admin** |
| `GET` | `/reports/top-products` | Top selling ethnic wear and bedsheet bestsellers | **Admin** |
| `GET` | `/reports/gst-report` | Tax report breakdown (12% textile / 18% home furnishing) | **Admin** |

---

## 🤖 AI Natural Language Stylist (`/api/v1/ai`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/ai/stylist-search` | Natural prompt analysis ("Looking for a gold Anarkali under ₹4000") returning matching products | No |

---

## 🖼️ Upload (`/api/v1/upload`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/upload/image` | Upload single/multiple product or review images (Cloudinary / local fallback) | Any |
