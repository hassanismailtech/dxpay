
# 🩺 DiagnosticsPay 

**Enyata x Interswitch Buildathon 2026**

DiagnosticsPay is a diagnostic billing infrastructure for African hospitals. It provides a single payment orchestration layer allowing doctors to order multiple diagnostic tests, aggregates the bill for the patient to pay once digitally, and automatically splits the funds to the respective providers (labs, imaging centers, and hospitals) via Interswitch.

---

## 📁 Project Structure

To avoid merge conflicts during the 72-hour sprint, we are using a "Two Kingdoms" monorepo structure:
* `/frontend`: Next.js / React application
* `/backend`: Node.js / Express / PostgreSQL application

---

## ⚙️ Backend Local Setup Guide

Follow these steps to get the local Express server and PostgreSQL database running on your machine.

### 1. Prerequisites

* **Node.js** (v18+ recommended)
* **PostgreSQL** (v16+ running locally on port 5432)

### 2. Environment Variables

Navigate to the `/backend` directory and create a `.env` file. Do not commit this file.
```env
PORT=5000
PGUSER=postgres
PGPASSWORD=your_local_postgres_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=dxpay

# Interswitch API Credentials (Sandbox)
INTERSWITCH_CLIENT_ID=your_test_client_id
INTERSWITCH_SECRET_KEY=your_test_secret_key
INTERSWITCH_PASSPORT_ENV=[https://qa.interswitchng.com/passport/oauth/token](https://qa.interswitchng.com/passport/oauth/token)
INTERSWITCH_MERCHANT_CODE=MX6072
```

### 3. Database Initialization

1. Open your local PostgreSQL terminal or GUI (like SQLTools in VS Code).
2. Create the database: `CREATE DATABASE dxpay;`
3. Connect to `dxpay` and run the table creation scripts (Found in `backend/config/schema.sql` or requested from Ayomide).
4. Run the seed data script to populate test providers and diagnostic tests.

### 4. Install & Run

```bash
cd backend
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

---

## 🔌 API Endpoints Documentation

### 1. Create Order

Creates an aggregated bill from multiple diagnostic tests.
* **URL:** `POST /api/orders`
* **Payload:**
  ```json
  {
    "patient_name": "Chukwudi Okafor",
    "test_ids": [1, 2]
  }
  ```
* **Success Response (201):**
  ```json
  {
    "order_id": "ORD-123456-789",
    "total_amount": 12000
  }
  ```

### 2. Generate Invoice & Payment Link

Generates the unique transaction reference needed for the Interswitch Web Checkout.
* **URL:** `POST /api/invoices`
* **Payload:**
  ```json
  {
    "order_id": "ORD-123456-789"
  }
  ```
* **Success Response (201):**
  ```json
  {
    "invoice_id": "TXN-1711270000000-1234",
    "payment_link": "http://localhost:3000/pay/TXN-1711270000000-1234",
    "amount": "12000.00",
    "patient_name": "Chukwudi Okafor"
  }
  ```

### 3. Verify Payment (Interswitch Webhook/Polling)

Verifies the transaction with Interswitch and triggers the **Payment Split Engine** to distribute funds.
* **URL:** `GET /api/payment/verify?transaction_reference=TXN-1711270000000-1234`
* **Success Response (200):**
  ```json
  {
    "payment_status": "successful"
  }
  ```
> **Note on Demo Fallback:** If the Interswitch Sandbox times out, this endpoint is configured to safely mock a "successful" response to ensure the presentation flow does not break.

### 4. Lab Dashboard Analytics

Fetches real-time revenue and transaction data for a specific provider.
* **URL:** `GET /api/dashboard?provider_id=1`
* **Success Response (200):**
  ```json
  {
    "total_revenue": 12000,
    "number_of_tests": 2,
    "transactions": [
      {
        "transaction_id": "TXN-1711270000000-1234",
        "revenue_share": "12000.00",
        "patient_name": "Chukwudi Okafor",
        "created_at": "2026-03-24T10:00:00.000Z"
      }
    ]
  }
  ```

---

## 🔀 Git Workflow & Branching

* Always branch off `main`.
* Prefix branches with your domain: e.g., `backend/split-engine` or `frontend/checkout-ui`.
* Ping the project manager for Pull Request reviews before merging into `main`.