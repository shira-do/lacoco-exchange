# La Coco Crypto Exchange

## I. Overview

### 1. Backend APIs:

- URL: http://localhost:3000
- GET /api/tokens
- GET /api/tokens/prices
- GET /api/tokens/prices/{pair} with {pair} is "BTC-ETH"

### 2. Frontend:

- URL: http://localhost:3001

## II. Setup and run

### 1. Backend:

- Requirements:

  - nodejs v21.5.0
  - npm 10.2.4
  - docker 24.0.7
  - docker-compose v2.23.3

- Setup

```bash
# Running docker-compose with PostgresSQL
docker-compose up -d

# Go to server folder
cd ./server

# Create .env file
cp .env.example .env

# Install dependencies
npm install
```

- Then, update .env with correct COIN_GECKO_API_KEY

```bash
# Start server
npm run start:dev
```

### 2. Frontend:

- Requirements:

  - nodejs v21.5.0
  - npm 10.2.4

- Setup and run

```bash
cd ./web

# Install dependencies
npm install

# Start
npm run dev
```

- Open browser and access http://localhost:3001
