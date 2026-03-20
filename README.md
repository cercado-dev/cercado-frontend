# Cercado Frontend

Standalone SvelteKit frontend application for the Cercado e-commerce management platform. This frontend connects to the [cercado-api](https://github.com/cercado-dev/cercado-api) backend via REST API.

## Overview

Modern, responsive web interface built with SvelteKit, TypeScript, and Tailwind CSS. Features Keycloak authentication and deploys to Cloudflare Pages.

## Tech Stack

- **SvelteKit 2** - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Cloudflare Pages** - Hosting & deployment
- **Keycloak** - Authentication (OIDC)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Update the following values:
- `PUBLIC_KEYCLOAK_URL` - Your Keycloak server URL
- `PUBLIC_KEYCLOAK_REALM` - Your Keycloak realm name
- `PUBLIC_KEYCLOAK_CLIENT_ID` - Your Keycloak client ID
- `PUBLIC_API_URL` - Your API URL (default: https://localhost:8443)

### 3. Run Development Server

```bash
npm run dev

# or open in browser automatically
npm run dev -- --open
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Keycloak Setup

### Create Client in Keycloak

1. Login to Keycloak Admin Console
2. Select your realm
3. Go to **Clients** → **Create Client**
4. Configure:
   - **Client ID**: `cercado-frontend`
   - **Client Protocol**: `openid-connect`
   - **Access Type**: `public`
   - **Valid Redirect URIs**:
     - `http://localhost:5173/auth/callback` (development)
     - `https://your-domain.pages.dev/auth/callback` (production)
   - **Web Origins**: `*` (or specify your domains)
5. Save

## Building for Production

```bash
npm run build
```

The built files will be in `.svelte-kit/cloudflare`.

Preview the production build:

```bash
npm run preview
```

## Deploying to Cloudflare Pages

### Option 1: Wrangler CLI

```bash
npm install -g wrangler
wrangler login
npm run build
npx wrangler pages deploy .svelte-kit/cloudflare
```

### Option 2: Cloudflare Dashboard

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click **Create a project**
3. Connect your Git repository
4. Configure build settings:
   - **Framework preset**: SvelteKit
   - **Build command**: `npm run build`
   - **Build output directory**: `.svelte-kit/cloudflare`
5. Add environment variables:
   - `PUBLIC_KEYCLOAK_URL`
   - `PUBLIC_KEYCLOAK_REALM`
   - `PUBLIC_KEYCLOAK_CLIENT_ID`
   - `PUBLIC_API_URL`
6. Deploy!

### Option 3: GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: cercado-frontend
          directory: .svelte-kit/cloudflare
```

## Project Structure

```
cercado-frontend/
├── src/
│   ├── lib/
│   │   ├── auth.ts           # Auth store & utilities
│   │   ├── keycloak.ts       # Keycloak OIDC integration
│   │   └── api.ts            # API client
│   ├── routes/
│   │   ├── +layout.svelte    # Root layout with nav
│   │   ├── +page.svelte      # Home page
│   │   ├── login/            # Login redirect
│   │   ├── auth/callback/    # OAuth callback
│   │   ├── dashboard/        # Dashboard
│   │   ├── products/         # Products page
│   │   ├── orders/           # Orders page
│   │   └── stores/           # Stores page
│   ├── app.css               # Tailwind imports
│   └── app.html              # HTML template
├── static/                    # Static assets
├── svelte.config.js          # SvelteKit config
├── tailwind.config.js        # Tailwind config
├── wrangler.toml             # Cloudflare config
└── package.json
```

## Features

- ✅ Keycloak OIDC authentication flow
- ✅ Token storage in localStorage
- ✅ Automatic token refresh
- ✅ Protected routes
- ✅ API client with auth headers
- ✅ Responsive Tailwind UI
- ✅ Cloudflare Pages adapter
- ✅ TypeScript throughout

## Development

### Type Checking

```bash
npm run check
```

### Watch Mode

```bash
npm run check:watch
```

## API Integration

This frontend application communicates with the **[cercado-api](https://github.com/cercado-dev/cercado-api)** backend. The API URL is configured via the `PUBLIC_API_URL` environment variable.

### Backend Repository
Clone and run the backend API:
```bash
git clone https://github.com/cercado-dev/cercado-api.git
# Follow setup instructions in the cercado-api README
```

### API Endpoints

Example endpoints used by the frontend (configured in `src/lib/api.ts`):
- `GET /api/products` - List products
- `GET /api/orders` - List orders
- `POST /api/orders/sync` - Sync orders
- `GET /api/stores` - List stores

Update the API client as your backend endpoints evolve.

## Troubleshooting

### CORS Issues

Ensure the **[cercado-api](https://github.com/cercado-dev/cercado-api)** backend has CORS configured to allow requests from your frontend domain:
- Development: `http://localhost:5173`
- Production: `https://your-domain.pages.dev`

The backend API should include these origins in its CORS configuration.

### Keycloak Redirect Issues

Check that your redirect URIs in Keycloak match your actual URLs.

### Environment Variables Not Working

On Cloudflare Pages, environment variables must be prefixed with `PUBLIC_` to be exposed to the browser.

## License

MIT
