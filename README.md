# 🩺 DiagnosticsPay

**A unified diagnostic billing and payment orchestration layer for African hospitals.**
Built for the **Enyata x Interswitch Buildathon 2026**.

🌐 **Live Demo:** [https://dxpay.vercel.app](https://dxpay.vercel.app/)
⚙️ **Live API Base URL:** [https://dxpay.onrender.com](https://dxpay.onrender.com/)

---

## 💡 The Problem

In many African healthcare facilities, diagnostic services suffer from fragmented payment systems. Patients often move between departments (Labs, Radiology, Pharmacy), paying separately for tests and receiving multiple paper receipts. This creates:

* **Workflow Delays:** Tests cannot start until individual payment confirmations are received.
* **Revenue Leakage:** Manual reconciliation causes missing or untracked payments.
* **Poor Patient Experience:** Long payment queues and financial confusion.

## 🚀 Our Solution: The Orchestration Layer

DiagnosticsPay introduces a **single payment orchestration layer**. Instead of patients paying each diagnostic unit separately, our platform aggregates all ordered diagnostics into **one unified bill**.

1. **Order:** Doctor orders multiple tests via the Terminal.
2. **Aggregate:** System generates a single, unified invoice.
3. **Pay:** Patient pays once digitally via Interswitch.
4. **Split (Core Innovation):** The backend **Payment Split Engine** automatically distributes the funds to the respective providers (e.g., Hematology Lab, Imaging Center, Hospital Admin).

---

## 🛠 Tech Stack & Architecture

We utilized a "Two Kingdoms" monorepo structure to optimize parallel development during the 72-hour sprint.

### **Frontend (`/frontend/diagnosticspay`)**

* **Framework:** Next.js 16.2 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Shadcn UI
* **State Management:** Zustand
* **Deployment:** Vercel

### **Backend (`/backend`)**

* **Framework:** Node.js + Express.js
* **Database:** PostgreSQL (Hosted on Neon.tech)
* **Payment Gateway:** Interswitch APIs
* **Deployment:** Render

---

## ⚙️ Local Setup Guide

To run this project locally for judging or development:

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory. *(Note: Our `db.js` uses a hybrid config. If `DATABASE_URL` is provided, it uses SSL for cloud DBs. Otherwise, it falls back to local variables).*

```env
PORT=5000
DATABASE_URL=your_neon_or_local_postgres_connection_string

# Interswitch API Credentials (Sandbox)
INTERSWITCH_CLIENT_ID=your_test_client_id
INTERSWITCH_SECRET_KEY=your_test_secret_key
INTERSWITCH_PASSPORT_ENV=[https://qa.interswitchng.com/passport/oauth/token](https://qa.interswitchng.com/passport/oauth/token)
INTERSWITCH_MERCHANT_CODE=MX6072
```

Start the server:

```bash
npm start
```

### 2. Frontend Setup

Open a new terminal window:

```bash
cd frontend/diagnosticspay
npm install
```

Create a `.env.local` file in the `/frontend/diagnosticspay` directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:3000` to view the application.

---

## 🔌 Core API Endpoints

Our Express backend exposes 4 optimized endpoints to power the orchestration layer:

### 1. Create Order (`POST /api/orders`)

Creates an aggregated bill from multiple diagnostic tests.

* **Payload:** `{"patient_name": "Chukwudi Okafor", "test_ids": [1, 2]}`
* **Response:** `{"order_id": "ORD-123456-789", "total_amount": 19000}`

### 2. Generate Invoice & Payment Link (`POST /api/invoices`)

Generates the unique transaction reference needed for Web Checkout.

* **Payload:** `{"order_id": "ORD-123456-789"}`
* **Response:** `{"invoice_id": "TXN-1711270000000", "payment_link": "https://dxpay.vercel.app/pay/TXN-1711270000000", "amount": 19000}`

### 3. Verify Payment & Execute Split (`GET /api/payment/verify`)

Verifies the transaction with Interswitch and triggers the **Payment Split Engine** to allocate funds to providers.

* **Query:** `?transaction_reference=TXN-1711270000000`
* **Response:** `{"payment_status": "successful"}` *(Includes a graceful demo fallback if sandbox is unreachable).*

### 4. Lab Dashboard Analytics (`GET /api/dashboard`)

Fetches real-time revenue and transaction data based on successfully split funds.

* **Query:** `?provider_id=1`
* **Response:** Returns aggregated `total_revenue`, `number_of_tests`, and the `transactions` ledger.

---

## 👥 The Team

* **Hassan Ismail** — Product and Frontend Lead
* **Ayomide** — Backend + Data Engineer
* **Simbiat** — Frontend + UX/UI Design
* **Tunji** — Product Manager / Operations

```

***
