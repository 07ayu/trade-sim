# TradeSim

A real-time paper trading simulator that models how backend trading systems actually work — order ingestion, price-time priority matching, event-driven state propagation, and live portfolio tracking. Built as a system design project, not a CRUD app.

---

## What This Is

TradeSim lets multiple users place limit orders on simulated stock symbols. A price simulator runs server-side, mutating 10 symbols every 3 seconds. Orders flow through a full event-driven pipeline: validated against real-time balances, matched in an in-memory order book using price-time priority, and settled into a ledger — all pushed live to clients over WebSocket.

No real market data. No real money. The goal was to understand how trading infrastructure behaves under real-world constraints.

---

## Architecture

**Pattern:** Modular monolith (NestJS), internally event-driven via Redis Pub/Sub

```
Client (React)
    │   REST (HTTP + cookies)     WebSocket (Socket.IO)
    ▼                                      ▼
NestJS Backend
    ├── AuthModule        JWT auth, httpOnly cookie sessions
    ├── OrdersModule      Order ingestion + REST endpoints
    ├── RiskModule        Pre-trade validation (balance + holdings)
    ├── MatchingModule    In-memory order book + matching engine
    ├── LedgerModule      In-memory balance/holdings tracker
    ├── PnlModule         Real-time P&L calculator
    ├── PriceModule       Live simulated price feed consumer
    ├── GatewayModule     WebSocket gateway for real-time push
    └── Infrastructure
        ├── RedisModule   Publisher + subscriber clients (separate connections)
        └── DatabaseModule  MongoDB via Mongoose
```

### Redis Channel Topology

| Channel | Published by | Consumed by |
|---|---|---|
| `price_update` | Price simulator (`main.ts`, 3s interval) | `PriceSubscriber` → WebSocket broadcast |
| `order_created` | `OrderPublisher` | `MatchingSubscriber` → matching engine |
| `trade_executed` | `MatchingSubscriber` | `LedgerSubscriber` → in-memory ledger |

---

## End-to-End Order Lifecycle

```
POST /orders
    │
    ├─► RiskService.validateOrder()       checks in-memory ledger (cash/holdings)
    ├─► orderModel.create()               persist to MongoDB
    ├─► gateway.emit('order_status_update') WebSocket → private user room
    └─► redis.publish('order_created')
                │
                ▼
        MatchingSubscriber
                │
                ├─► matchingService.addOrder()   price-time priority matching
                ├─► gateway.emit('orderbook_update')  broadcast market depth
                └─► For each trade:
                    ├─► tradeModel.create()       persist to MongoDB
                    └─► redis.publish('trade_executed')
                                │
                                ▼
                        LedgerSubscriber
                                └─► ledgerService.applyTrade()   update in-memory state
```

---

## Core Modules

### Matching Engine

The heart of the system. Runs a per-symbol in-memory order book (`Map<symbol, { bids, asks }>`).

- **Algorithm:** Price-time priority
  - BUY orders fill from the cheapest available ask upward
  - SELL orders fill from the highest available bid downward
- Supports **partial fills** — `remainingQuantity` is tracked and persisted back to MongoDB after each match
- On restart, the order book is **rebuilt from MongoDB** by replaying all `PENDING` and `PARTIALLY_FILLED` orders

### Ledger Engine

Tracks every user's cash balance and holdings entirely in-memory.

- **No dedicated balances collection** — state is reconstructed on startup by replaying all `Trade` documents in chronological order
- Updated in real-time via the `trade_executed` Redis channel
- New users start with ₹10,000 virtual cash
- A system account (`u0`) is seeded with liquidity for AAPL and TSLA

### Risk Engine

Synchronous pre-trade validation before any order is persisted or published:

- **BUY:** `cash >= quantity × price`
- **SELL:** `holdings[symbol].qty >= quantity`
- Throws `400 Bad Request` with a descriptive message on failure

### Price Simulator

Runs directly in `bootstrap()` — not a separate service. Every 3 seconds, 1–5 of the 10 symbols are randomly selected and their price is mutated by ±0.1%. Updates are published to Redis and broadcast to all WebSocket clients.

**Symbols:** `AAPL, TSLA, RELIANCE, INFY, TCS, HDFC, WIPRO, BAJFIN, AXISBANK, ITC`

### WebSocket Gateway (Socket.IO)

| Event | Scope | Payload |
|---|---|---|
| `price_update` | All clients | `{ symbol, price }` |
| `orderbook_update` | All clients | `{ symbol, depth: { bids, asks } }` |
| `order_status_update` | Private room (`user_<id>`) | `{ message, symbol, status }` |

Auth on WebSocket connection: JWT is read from the `user_token` httpOnly cookie in the handshake headers, verified manually (NestJS guards don't wire cleanly to Socket.IO connection lifecycle).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend framework | NestJS v11 (TypeScript) |
| Database | MongoDB (Mongoose) |
| Event bus | Redis Pub/Sub (`node-redis` v4, TLS) |
| Real-time | Socket.IO |
| Auth | JWT (httpOnly cookies, `passport-jwt`) |
| Password hashing | bcrypt (12 rounds, Mongoose pre-save hook) |

---

## API Surface

**Auth (`/auth`)**

| Method | Route | Description |
|---|---|---|
| POST | `/signup` | Register, sets JWT cookie |
| POST | `/login` | Authenticate, sets JWT cookie |
| POST | `/logout` | Clears cookie |
| POST | `/refresh` | Validates existing JWT, returns user data |

**Orders, balances, and P&L** — protected by JWT guard, interact through the order pipeline described above.

---

## Environment Variables

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://...
REDIS_URL=rediss://...
JWT_SECRET=your_secret_here
```

---

## Known Limitations

This is a simulator, not a production system. Honest assessment:

| Limitation | Impact |
|---|---|
| Redis Pub/Sub has no persistence | A crash loses in-flight events; no replay |
| In-memory order book and ledger | Lost on restart (rebuilt from DB, but mid-write crash could cause brief inconsistency) |
| No refresh token rotation | JWT doesn't expire/rotate once set |
| System account seeds only AAPL + TSLA | SELL orders on other symbols require another user to have bought first |
| Price simulator in `main.ts` | Can't be toggled, tested, or scaled independently |

---

## What This Project Demonstrates

- **Event-driven system design** — modules communicate via Redis channels, not direct service calls
- **Matching algorithm implementation** — price-time priority with partial fill tracking
- **State reconstruction from event log** — the ledger is effectively an event-sourced read model, rebuilt by replaying trades
- **Real-time architecture** — WebSocket rooms, private vs. broadcast events, connection-level auth
- **Separation of concerns** — risk, matching, ledger, and price are independent subsystems with defined boundaries

---

## Future Work

- Replace Redis Pub/Sub with Redis Streams or Kafka for durable, replayable event log
- Persist ledger state to avoid full replay on every restart
- Add market orders and stop-loss order types
- Extend system account seeding to all 10 symbols
- Observability: structured logging, metrics, tracing
- Load testing with concurrent order bursts

---

## Local Setup

```bash
git clone https://github.com/07ayu/trade-sim
cd trade-sim
npm install
cp .env.example .env   # fill in your values
npm run start:dev
```
