# Docker Setup for Cercado Frontend

Docker configuration for local development of the Cercado frontend application.

## Quick Start

### Development Mode

1. Make sure your `.env` file is configured:
```bash
cp .env.example .env
# Edit .env with your values
```

2. Start the development server:
```bash
docker compose up
```

The application will be available at http://localhost:5173

### Hot Reload

The Docker setup includes volume mounts for automatic hot reload:
- Changes to `src/` files will automatically refresh
- Changes to `static/` files will be reflected
- Changes to config files may require a restart

## Docker Commands

### Start the application
```bash
docker compose up
```

### Start in detached mode (background)
```bash
docker compose up -d
```

### View logs
```bash
docker compose logs -f
```

### Stop the application
```bash
docker compose down
```

### Rebuild after dependency changes
```bash
docker compose up --build
```

### Remove containers and volumes
```bash
docker compose down -v
```

## Environment Variables

Set these in your `.env` file:

```env
PUBLIC_KEYCLOAK_URL=https://your-keycloak-domain.com
PUBLIC_KEYCLOAK_REALM=your-realm
PUBLIC_KEYCLOAK_CLIENT_ID=your-client-id
PUBLIC_API_URL=http://localhost:8765
```

**Note**: When running both frontend and API in Docker, use the service name or `host.docker.internal` for `PUBLIC_API_URL`:
- Mac/Windows: `http://host.docker.internal:8765`
- Linux: Use `--network host` or create a shared network

## Connecting to Cercado API

### Option 1: API Running Locally (not in Docker)
```env
PUBLIC_API_URL=http://host.docker.internal:8765
```

### Option 2: API in Docker (shared network)
1. Create a shared network:
```bash
docker network create cercado
```

2. Update `docker-compose.yml` to use the network:
```yaml
networks:
  cercado:
    external: true
```

3. Start both API and frontend using the same network

4. Use the API service name:
```env
PUBLIC_API_URL=http://cercado-api:8765
```

## Production Deployment

For production, **use Cloudflare Pages** instead of Docker:
- This app uses `@sveltejs/adapter-cloudflare` optimized for Cloudflare Pages
- Docker is recommended for development only
- See main README.md for Cloudflare Pages deployment instructions

If you need Node.js production deployment:
1. Install adapter-node: `npm install -D @sveltejs/adapter-node`
2. Update `svelte.config.js` to use `adapter-node`
3. Use the production Dockerfile stage

## Troubleshooting

### Port already in use
If port 5173 is already in use, change it in `docker-compose.yml`:
```yaml
ports:
  - "3000:5173"  # Use port 3000 on host
```

### Changes not reflecting
1. Restart the container: `docker compose restart`
2. Rebuild if dependencies changed: `docker compose up --build`

### Cannot connect to API
1. Check `PUBLIC_API_URL` in `.env`
2. Verify API is running
3. Check CORS configuration in API
4. Try `host.docker.internal` for host-network access

### Node modules issues
Remove the volume and rebuild:
```bash
docker compose down -v
docker compose up --build
```

## Development Workflow

1. Start Docker containers: `docker compose up`
2. Edit code in your IDE
3. Browser auto-refreshes on save
4. Check logs: `docker compose logs -f frontend`
5. Stop when done: `docker compose down`

## Files

- `Dockerfile` - Multi-stage Docker build configuration
- `docker-compose.yml` - Development orchestration
- `.dockerignore` - Files excluded from Docker build context
- `.env` - Environment variables (not in git)
- `.env.example` - Template for environment variables
