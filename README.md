# WHMCS Middleware Architecture Demo

Clean separation between frontend and WHMCS backend using Next.js 14 App Router.

## Architecture Overview

```
Frontend (React)
    ↓
API Route (/api/products) ← Middleware Layer
    ↓
Normalization Layer
    ↓
WHMCS API (mocked)
```

## Key Components

- **lib/whmcsMock.ts** - Simulates messy WHMCS API response
- **lib/normalizeProducts.ts** - Transforms WHMCS data into clean structure
- **app/api/products/route.ts** - Middleware API route (where caching would live)
- **app/dedicated-servers/page.tsx** - Frontend page consuming clean API
- **components/ProductCard.tsx** - Product display component
- **components/Filters.tsx** - Location and stock filtering

## Why This Architecture?

1. **Decoupling** - Frontend never touches raw WHMCS structure
2. **Caching** - API route is perfect place for Redis/memory cache
3. **Flexibility** - Change WHMCS structure without breaking frontend
4. **Testing** - Easy to mock normalized data vs messy WHMCS responses

## Running Locally

```bash
npm install
npm run dev
```

Visit: http://localhost:3000/dedicated-servers

## Production Considerations

In production, the API route would:
- Call real WHMCS API with authentication
- Implement Redis caching (5-10 min TTL)
- Handle rate limiting
- Log errors and monitor performance
- Potentially move filtering server-side

## What's NOT Included

- Real WHMCS integration
- Authentication
- Checkout flow
- Payment processing

This is an architectural proof-of-concept demonstrating clean separation of concerns.
