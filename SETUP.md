# Quick Setup Guide

## What Was Created

A complete SvelteKit frontend with:
- ✅ Keycloak OIDC authentication
- ✅ Cloudflare Pages adapter configured
- ✅ Tailwind CSS 4 for styling
- ✅ TypeScript support
- ✅ API client for your backend
- ✅ Pages for: Home, Login, Dashboard, Products, Orders, Stores

## Directory Structure

```
frontend/
├── src/
│   ├── lib/
│   │   ├── auth.ts         # Authentication store
│   │   ├── keycloak.ts     # Keycloak integration
│   │   └── api.ts          # API client
│   ├── routes/
│   │   ├── +layout.svelte  # Main layout with navigation
│   │   ├── +page.svelte    # Home page
│   │   ├── login/          # Login flow
│   │   ├── auth/callback/  # OAuth callback handler
│   │   ├── dashboard/      # Dashboard page
│   │   ├── products/       # Products listing
│   │   ├── orders/         # Orders listing
│   │   └── stores/         # Stores listing
│   └── app.css             # Tailwind CSS
├── .env.example            # Environment template
├── wrangler.toml           # Cloudflare config
└── README.md               # Full documentation
```

## Quick Start

1. **Create .env file:**
   ```bash
   cd /Users/brandtclawson/cercado-api/frontend
   cp .env.example .env
   ```

2. **Edit .env with your values:**
   ```env
   PUBLIC_KEYCLOAK_URL=https://your-keycloak.com
   PUBLIC_KEYCLOAK_REALM=cercado
   PUBLIC_KEYCLOAK_CLIENT_ID=cercado-frontend
   PUBLIC_API_URL=https://localhost:8443
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

   Open http://localhost:5173

## Keycloak Configuration Needed

In your Keycloak Admin Console:

1. Create a new client:
   - **Client ID**: `cercado-frontend` (or match your .env)
   - **Client Protocol**: `openid-connect`
   - **Access Type**: `public`

2. Add redirect URIs:
   - Development: `http://localhost:5173/auth/callback`
   - Production: `https://your-domain.pages.dev/auth/callback`

3. Set Web Origins: `*` or specific domains

## API Endpoints Expected

The frontend expects these endpoints (update in `src/lib/api.ts` as needed):

- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order
- `POST /api/orders/sync` - Sync orders from external sources
- `GET /api/stores` - List stores
- `GET /api/stores/:id` - Get store

## Deploying to Cloudflare Pages

### Via Dashboard (Easiest)

1. Push code to GitHub
2. Go to https://dash.cloudflare.com/pages
3. Create project → Connect repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Build output**: `.svelte-kit/cloudflare`
   - **Root directory**: `frontend` (if in monorepo)
5. Add environment variables in dashboard
6. Deploy!

### Via Wrangler CLI

```bash
npm run build
npx wrangler pages deploy .svelte-kit/cloudflare
```

## Common Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run check            # Type check
npm run check:watch      # Type check in watch mode
```

## Next Steps

1. Configure your .env file
2. Set up Keycloak client
3. Update API endpoints in `src/lib/api.ts` to match your backend
4. Customize the UI/styling as needed
5. Deploy to Cloudflare Pages

## Need Help?

- Full docs: See `README.md`
- Keycloak docs: https://www.keycloak.org/docs/latest/securing_apps/
- SvelteKit docs: https://svelte.dev/docs/kit
- Cloudflare Pages: https://developers.cloudflare.com/pages/
