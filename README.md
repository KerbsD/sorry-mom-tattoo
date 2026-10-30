# SMT Landing

Public site for Sorry Mom Tattoo: portfolio gallery, merch store, and design
catalog. Built with Next.js (App Router). Product data comes from the `smt-be`
public API.

## Requirements

- Node.js 20 or newer
- The `smt-be` API running locally (defaults to `http://localhost:3000`)

## Setup

```bash
npm install
cp .env.example .env.local   # then adjust if your API is not on port 3000
npm run dev                  # http://localhost:3002
```

## Environment variables

| Variable              | Required | Description                                                                        |
| --------------------- | -------- | ---------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Yes      | Origin of the public `smt-be` API. Falls back to `http://localhost:3000` if unset. |

Catalog reads happen on the server. Booking creation and availability reads
happen in the browser, so the landing origin must also be listed in the API's
`CORS_ORIGINS` setting. For local development that means:

```dotenv
CORS_ORIGINS=http://localhost:3001,http://localhost:3002
```

## How data is loaded

- Portfolio items are fetched on the server when `/portfolio` renders.
- `src/app/layout.tsx` fetches merch and designs once with `getCatalog()` and
  shares them with the store pages and the cart through `CatalogProvider`.
- Responses are revalidated in the background every 60 seconds
  (`export const revalidate = 60`). In development each request is uncached so
  admin edits show up immediately.
- If the API is unreachable the site still renders, with empty portfolio and
  store sections instead of an error page.
- The booking form posts to the public `POST /bookings` endpoint and reads
  taken days from `GET /bookings/availability` in the browser. The calendar
  disables days held by a pending or confirmed booking.

## Deployment

Set `NEXT_PUBLIC_API_URL` in the host's environment settings (for Vercel:
Project Settings → Environment Variables) to the deployed API origin. Uploads
served from Supabase Storage are allowed through `images.remotePatterns` in
`next.config.ts`.
