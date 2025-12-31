# Docker

## Port Mapping
- FE (Nuxt): 4000:3000

## Commands
```bash
# Development
cp .env.development .env && docker compose up --build -d

# Production (on VPS)
cp .env.production .env && docker compose up --build -d
```

## Environment
- `.env` is auto-loaded by docker-compose for build args
- Change environment by copying different env file to `.env`
- `.env` is in `.gitignore` - don't commit it
