# Deployment Guide

To deploy **Haddam.co** to Vercel (or any other provider), you need to configure the following Environment Variables.

## Environment Variables

| Variable Name | Description | Example / Note |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL for your API (if applicable) | `https://api.haddam.co` (Optional for now) |
| `TIGER_DATA_URL` | Helper URL for Tiger Data backend | *(Future Integration)* |
| `NEXT_PUBLIC_STRIPE_KEY`| Stripe Public Key for payments | `pk_test_...` *(Future Integration)* |
| `STRIPE_SECRET_KEY` | Stripe Secret Key for server-side | `sk_test_...` *(Future Integration)* |
| `DATABASE_URL` | Connection string for Postgres/Tiger Data | `postgres://user:pass@host:5432/db` |

## Deployment Steps

1.  **Push to GitHub**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/haddam-co.git
    git branch -M main
    git push -u origin main
    ```

2.  **Import to Vercel**:
    - Go to [Vercel Dashboard](https://vercel.com/new).
    - Import the `haddam-co` repository.
    - Framework Preset: **Next.js**.
    - Root Directory: `./` (default).
    - **Build Command**: `next build` (default).
    - **Output Directory**: `.next` (default - *Note: We reverted `output: 'export'` so it's not `out` anymore*).
    - **Environment Variables**: Add the variables listed above.

3.  **Deploy**: Click **Deploy**.

## Verification
- Visit the deployment URL.
- Test the "Guest Checkout" flow (which simulates an order).
