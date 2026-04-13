TradeSim — Real-Time Trading System Simulator

TradeSim is a real-time stock trading simulator designed to replicate the core behavior of modern trading systems, focusing on order matching, concurrency, and event-driven architecture.

This is not a UI-based trading demo.
It is a backend system design project that models how trading engines process orders under real-time, multi-user conditions.

🧠 Core Idea

Build a system that handles:

Multiple users placing orders simultaneously
Deterministic order execution
Real-time state updates across the system
🏗️ Architecture Overview

Architecture Type: Modular Monolith (NestJS)

The system is divided into independent logical modules:

Order Engine → Validates and ingests orders
Matching Engine → Executes trades using price-time priority
Portfolio Engine → Tracks holdings, balances, and PnL
Price Engine → Simulates dynamic market prices

All modules communicate via an event-driven system using Redis Pub/Sub, enabling loose coupling and asynchronous processing.

🔄 Data Flow
User places order
→ Order Engine validates request
→ Event published (Redis)
→ Matching Engine consumes event
→ Trade execution (partial/full)
→ Portfolio Engine updates user state
→ WebSocket pushes updates to client
⚙️ Key Features
🧮 Matching Engine (Core Logic)
Implements price-time priority
Supports:
Partial fills
Order prioritization
Maintains logical ordering using priority structures
📡 Real-Time System
Built using WebSockets
Live updates for:
Orders
Trades
Portfolio
Price changes

No polling. Fully reactive system.

🔄 Event-Driven Communication
Uses Redis Pub/Sub
Enables:
Decoupled module interaction
Asynchronous execution
Replaces direct service calls with event-based flow
💰 Portfolio & PnL Engine
Tracks:
Holdings
Balance
Profit/Loss
Updates dynamically after each trade execution
📈 Price Simulation Engine
Generates dynamic stock prices
Simulates market movement within the system
🔥 What Makes TradeSim Different
1. Real Matching Engine

Most student projects directly execute trades.

TradeSim implements:

Price-time priority
Partial order execution
2. End-to-End Real-Time Flow

Not just UI updates — full system pipeline:

Order → Match → Portfolio → UI (real-time)
3. Event-Driven System Design
Uses Redis for async communication
Demonstrates system-level thinking beyond CRUD
4. Modular System Decomposition

Clear separation of concerns:

Order handling
Matching logic
Portfolio calculation
5. Concurrency Awareness

Designed with:

Multiple users
Order conflicts
Execution sequencing
⚠️ Current Limitations (Honest Evaluation)

TradeSim is a system simulation, not a production-grade trading system.

Redis Pub/Sub is not persistent
No guaranteed delivery or replay
In-memory order book
Limited fault tolerance
No strict concurrency guarantees under failure
🚀 Future Improvements
Add event persistence (Redis Streams / Kafka-like system)
Implement order replay & recovery
Improve concurrency guarantees
Add load testing & benchmarking
Introduce observability (logs + metrics)
🛠️ Tech Stack
Backend: NestJS (Node.js)
Real-Time: WebSockets
Event System: Redis Pub/Sub
Database: (Add your DB here, e.g., MongoDB / PostgreSQL)
📊 Key Learnings
Designing event-driven systems
Implementing matching algorithms
Handling real-time state synchronization
Thinking in terms of system architecture, not just APIs
🎯 Resume Description

Built a real-time trading simulator with a price-time priority matching engine, partial order execution, and event-driven architecture using NestJS, Redis, and WebSockets.

📌 Final Note

TradeSim is not built to imitate a UI.
It is built to explore how backend trading systems behave under real-world constraints.
