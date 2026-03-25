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