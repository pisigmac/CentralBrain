---
created: 2026-07-18T20:00:44.929407+00:00
id: ae594251e45c
modified: 2026-07-18T20:00:44.929407+00:00
source: daemon
status: active
tags:
  - readme
type: overview
---

# ⚡ AgentOS

**Project:** `AgentOS`

**Path:** `AgentOS`

**Description:** > A production-grade autonomous agent platform featuring verifiable trust ledgers, strict budget constraints, and a stunning command dashboard.

## README

# ⚡ AgentOS

> A production-grade autonomous agent platform featuring verifiable trust ledgers, strict budget constraints, and a stunning command dashboard.

**AgentOS** is a modern, production-grade operating system designed to manage, orchestrate, and monitor autonomous AI agents at scale. Built with security and transparency in mind, it provides the robust infrastructure needed to take LLM-powered agents from experimental scripts to enterprise-ready deployments.

Rather than letting agents run wild, AgentOS enforces strict operational boundaries. It tracks every decision an agent makes, maintains a cryptographic-style trust ledger of agent success rates, and enforces hard budgetary constraints—ensuring that your autonomous workforce is always verifiable, cost-effective, and aligned with your standing goals.

---

## ✨ Key Features

* 🛡️ **Verifiable Trust Ledger:** Monitors individual agent skills and calculates historical pass/fail rates so you know exactly which AI capabilities are reliable for production.
* 💰 **Strict Budget Enforcement:** Native cost-tracking that instantly pauses runaway agents the moment they hit your predefined daily API budget.
* 🎯 **Standing Goal Verification:** Define strict invariants and operational goals. The system continuously audits agents against these predicates to ensure total alignment.
* 📊 **Stunning Command Center:** A beautiful, dark-mode glassmorphic Next.js dashboard providing real-time telemetry into agent run timelines, active budgets, and system health.
* 🚀 **Async & Scalable:** Powered by a high-performance FastAPI/Uvicorn backend, Async PostgreSQL (`asyncpg`), and Redis for lightning-fast orchestration. 

---

## 🛠️ Technology Stack

**Frontend Command Center:**
* Next.js 14 (App Router)
* React & Tailwind CSS
* Radix UI & Recharts
* Glassmorphic Dark Mode UI

**Backend Orchestration:**
* Python & FastAPI
* Uvicorn (Async ASGI server)
* SQLAlchemy (with `asyncpg`) & Alembic (Migrations)
* Redis (State management and caching)
* Pytest (Testing suite)

**Infrastructure:**
* Fully Dockerized (multi-container environment)
* Automated Makefile workflows

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* `make` (Usually pre-installed on Linux/macOS)

### 1. One-Line Installation (Recommended)
The fastest way to install AgentOS, set up the CLI, and spin up the Docker containers is by running our automated installer in your terminal:

```bash
curl -sSf https://raw.githubusercontent.com/pisigmac/AgentOS/main/install.sh | bash
```

Once completed, simply run `source ~/.bashrc` to activate the `agent` CLI command globally.

### 2. Manual Installation
If you prefer to install manually:
```bash
git clone https://github.com/pisigmac/AgentOS.git
cd AgentOS
./scripts/start_all.sh
```
Once the startup script finishes successfully, the services will be running on unique, non-conflicting ports.
Open your web browser and navigate to:
* **Frontend Dashboard:** [http://localhost:13000](http://localhost:13000)
* **Backend API Documentation:** [http://localhost:18000/docs](http://localhost:18000/docs)

### 3. Shutting Down
To gracefully stop all services, tear down the containers, and clean up the environment, run:
```bash
./stop_all.sh
```

---

## 💻 Makefile Commands
If you prefer running individual commands manually instead of using `start_all.sh`, the project includes a comprehensive `Makefile`:

* `make up` - Spin up all Docker containers in the background.
* `make down` - Stop and remove all containers.
* `make test` - Run the backend Pytest suite within the Docker container.
* `make lint` - Run `flake8` and `black` on the backend codebase.
* `make migrate msg="your message"` - Autogenerate Alembic database migrations.
* `make seed` - Seed the database with initial dashboard data.
* `make health` - Ping the backend health check endpoint.
* `make logs` - View the live output of the backend logs.

---

## 🤝 Contributing
Contributions are always welcome! Feel free to open an issue or submit a Pull Request if you have ideas on how to improve the operating system.

