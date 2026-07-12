---
created: 2026-07-12T15:53:53.066216+00:00
id: d337071ae84d
modified: 2026-07-12T15:53:53.066216+00:00
source: daemon
status: active
tags:
  - readme
type: overview
---

# Atlas — AI Memory Operating System

**Project:** `atlas`

**Path:** `atlas`

**Description:** > "A knowledge graph that thinks with you."

## README

# Atlas — AI Memory Operating System

> "A knowledge graph that thinks with you."

Atlas is a personal, AI-native knowledge graph. Instead of storing notes in
folders, it captures ideas, people, projects, and decisions as **nodes**,
connects them with typed **relationships**, and lets you ask questions
against the whole graph with **Graph RAG** — retrieval that reasons over
connections, not just keyword matches.

This build implements all four phases from the product brief (V1–V4), plus
a follow-up hardening pass: a real test suite, opt-in per-workspace auth,
FTS5-backed search, extraction confidence scores, multi-turn chat, a
staleness agent, five more ingestion connectors, time-travel graph queries,
Docker packaging, and automated backups.

![status](https://img.shields.io/badge/status-V1--V4%20%2B%20hardening-brightgreen)
![tests](https://img.shields.io/badge/tests-49%20passing-brightgreen)

---

## Quickstart

```bash
git clone <this repo>   # or unzip the delivered archive
cd atlas
./scripts/start_all.sh
```

Then open **http://localhost:8000**.

To stop:

```bash
./scripts/stop_all.sh
```

`start_all.sh` creates a Python virtual environment, installs dependencies,
and boots the backend, which also serves the frontend. No Docker, no
external database, no API key required to try it.

**Docker alternative:**
```bash
docker compose up -d --build
```

### Optional environment variables

```bash
export ANTHROPIC_API_KEY=sk-ant-...   # LLM extraction + Graph RAG chat + digital twin summaries
export GITHUB_TOKEN=ghp_...           # raises the GitHub connector's rate limit from 60/hr to 5,000/hr
export ATLAS_WEBHOOK_URL=https://...  # POSTed to whenever an agent run produces new suggestions
./scripts/start_all.sh
```

Every AI-driven feature still works via heuristics/templates without
`ANTHROPIC_API_KEY` — it just gets meaningfully better with a key set.

### Running the test suite

```bash
cd backend
source ../.venv/bin/activate   # after at least one ./scripts/start_all.sh run
pip install -r requirements.txt
pytest -q
```

49 tests across the graph engine, extraction, search, agents, connectors,
and the full API surface (via `TestClient`), each running against an
isolated temp SQLite database — see `backend/tests/`.

### Backups

```bash
./scripts/backup.sh
```

Snapshots the SQLite database and exports a memory pack per workspace into
`backups/<timestamp>/`. Add it to cron for nightly backups — see the
comment at the top of the script.

---

## What's built, by phase

### V1 — Core memory OS
- Memory Ingestion (`/api/memory/ingest`): raw note → entities → graph
- Knowledge Graph Engine: SQLite + networkx, full CRUD, path-finding, subgraphs, merge/dedupe
- AI Reasoning Engine: Graph RAG — hybrid retrieval → 1-hop expansion → LLM or deterministic answer
- Search Engine: keyword, TF-IDF semantic, graph-neighborhood, temporal, hybrid
- Visualization Engine: live D3 force-directed graph, color-coded by type

### V2 — Connectors, structured capture, timeline
- **GitHub connector** (`/api/connectors/github`): live calls to the public GitHub REST API — pulls repo metadata, primary language, recent commit authors, and open issues into the graph
- **Slack connector** (`/api/connectors/slack`): parses a standard Slack "export workspace data" `.zip` — channels become Conversation nodes, posters become Person nodes, discussed topics get extracted and linked
- **Structured meeting ingestion** (`/api/memory/ingest/meeting`): title + attendees + notes → a Meeting node, Person nodes with `attendedBy` edges, and extracted decisions/ideas linked via `discussedIn`
- **Voice input**: a mic button in the console uses the browser's Web Speech API to transcribe speech directly into the ingest box — no server-side ML needed
- **Timeline** (`/api/graph/timeline` + the Timeline tab): every node in the order it entered the graph

### V3 — Autonomous agents, continuous learning
- **Agent platform** (`/api/agents`): pluggable agents with identity/goals/memory/reflection
  - `DedupAgent` — finds near-duplicate nodes, proposes merges, flags contradictions
  - `RecommendationAgent` — finds semantically related nodes that aren't linked yet, proposes links
  - `DigestAgent` — writes a periodic summary Document node of recent graph activity
- **Human-in-the-loop safety**: Dedup/Recommendation agents never mutate the graph — they queue suggestions that require explicit approve/reject via the API or the Agents tab
- **Scheduler**: agents can run on-demand or on an interval in a background thread (`/api/agents/scheduler/*`)
- **Memory reinforcement**: every node touched by search, chat retrieval, or a UI click gets its `importance` nudged up and `access_count` incremented — the schema also carries a `decay` field on memories as an extension point

### V4 — Multi-tenancy, digital twin, memory marketplace primitive
- **Workspaces** (`/api/workspaces`): every table is workspace-scoped; a team ("Organization Brain") is just another `workspace_id` with its own isolated graph, selected via the `X-Workspace-Id` header or the workspace picker in the console
- **Digital Twin** (`/api/twin/{person_label}`): aggregates everything the graph knows about a Person node — their projects, decisions, conversations — into a persona digest, written by Claude if a key is set or assembled as a structured rollup otherwise
- **Memory packs** (`/api/memory/export`, `/api/memory/import`): export a workspace's graph as portable JSON and import it into another workspace — the sharing primitive a memory marketplace would be built on

### What's still out of scope, on purpose
Neo4j/Qdrant-class dedicated databases, Kafka/Celery async pipelines, OAuth-based live Slack/Gmail/Discord APIs, and true SSO/RBAC are not implemented — see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#scaling-beyond-this-build) for exactly where each would slot in and why they weren't needed to deliver the functional behavior of every phase at single-team scale.

---

## Enhancement pass (post-V4 hardening)

A follow-up round on top of the V1–V4 build, addressing the gaps identified
after the initial delivery:

| Area | What was added |
|---|---|
| **Tests** | 49 pytest tests (`backend/tests/`) covering the graph engine, extraction, search, all four agents, all seven connectors, and full API flows via `TestClient` — each against an isolated temp DB. Writing them caught and fixed two real concurrency bugs (see below). |
| **Auth** | Opt-in per-workspace API keys (`POST /api/workspaces/{id}/rotate-key`), enforced via `X-Api-Key`. A workspace with no key stays open — zero config for single-user use. |
| **Dedup quality** | `DedupAgent` now combines label string-similarity with TF-IDF *semantic* similarity, catching duplicates that don't share literal wording (e.g. "Atlas" vs "the memory OS project"). |
| **Confidence scores** | Every extracted entity/relation carries a `confidence` (0–1), from a heuristic strength signal or requested directly from the LLM, stored on the node/edge and shown in the UI. |
| **Multi-turn chat** | `/api/chat` now includes recent conversation turns in the LLM call, so follow-up questions resolve against what was just discussed. |
| **Time-travel** | `GET /api/graph/at?timestamp=` reconstructs the graph as of a past moment using the `valid_from`/`valid_to` fields that were already in the schema; the Graph tab has a time-travel slider. |
| **Full-text search** | Keyword search is now backed by SQLite FTS5 (porter stemming, BM25 ranking) with an automatic fallback to substring scan on SQLite builds without FTS5. |
| **More ingestion sources** | Document upload (PDF/markdown/CSV/txt), Gmail (Google Takeout `.mbox`), Calendar (`.ics`), RSS/Atom (live fetch), and browser history/bookmarks (CSV) — five new connectors alongside GitHub and Slack. |
| **Agents** | Added `StalenessAgent` (flags untouched nodes, never auto-archives). Per-agent interval + enabled config (`/api/agents/config`) instead of one global scheduler interval. Optional webhook notification (`ATLAS_WEBHOOK_URL`) when a run produces new suggestions. |
| **UI/UX** | Node label/summary editing and edge creation directly in the graph view; type/importance filtering; loose type-based clustering in the force layout; time-travel slider; per-agent config panel; five new connector panels; workspace API-key management. |
| **Ops** | `Dockerfile` + `docker-compose.yml` for a one-command containerized path; `scripts/backup.sh` for SQLite snapshots + per-workspace memory-pack export, cron-ready. |

**Bugs the test suite found:** writing `test_api.py` surfaced two real
SQLite concurrency issues — FastAPI's thread-pool execution model means
each request can land on a different thread, and with the original
thread-local-connection setup this could throw `database is locked` under
load. Fixed by enabling WAL mode + a busy timeout, then (when that alone
didn't fully resolve it) switching to autocommit mode so a write can never
leave a transaction open across requests. Both fixes are in
`backend/app/database.py`, and the flaky-test symptom that led to finding
them is now a passing regression test.

---

## Project layout

```
atlas/
  backend/
    app/
      main.py             FastAPI app (lifespan-based startup), mounts routers, serves frontend
      database.py          SQLite schema + migrations, WAL/autocommit connection setup, FTS5 sync
      graph_engine.py       Node/edge CRUD, per-workspace networkx graphs, temporal ops incl.
                            time-travel, reinforcement, dedup candidates, staleness
      extraction.py          Entity/relationship extraction (heuristic + LLM), confidence scoring
      search_engine.py        keyword (FTS5) / semantic (TF-IDF) / graph / temporal / hybrid search,
                              semantic dedup candidates
      reasoning.py             Graph RAG: retrieval + multi-turn answer generation
      twin.py                  Digital twin persona rollups (V4)
      agents.py                Agent platform (dedup/recommendation/digest/staleness) + scheduler
      auth.py                  Per-workspace API key hashing/verification
      deps.py                  Workspace-header resolution dependency
      schemas.py               Pydantic request/response models
      connectors/
        github_connector.py     Live GitHub REST ingestion (V2)
        slack_connector.py       Slack export .zip parser (V2)
        document_connector.py     PDF/markdown/CSV/txt upload ingestion
        gmail_connector.py         Gmail Takeout .mbox parser
        calendar_connector.py       .ics calendar parser
        rss_connector.py             Live RSS/Atom feed ingestion
        history_connector.py          Browser history/bookmarks CSV
      routers/                       memory.py, graph.py, search.py, chat.py, agents.py,
                                     workspaces.py, connectors.py, twin.py
    tests/                           49 pytest tests — conftest.py, test_graph_engine.py,
                                     test_extraction_and_search.py, test_agents.py,
                                     test_connectors.py, test_api.py
    requirements.txt
    pytest.ini
  frontend/
    index.html            Tabbed console: Graph / Timeline / Agents / Connectors / Twin / Workspaces
    app.js                  D3 rendering, filtering/clustering/time-travel, node editing, all API calls
    styles.css                Dark "control room" theme
  scripts/
    start_all.sh
    stop_all.sh
    backup.sh              SQLite snapshot + per-workspace memory-pack export
  docs/
    ARCHITECTURE.md
    API.md
  Dockerfile
  docker-compose.yml
  data/                    SQLite DB lives here (created at runtime, gitignored)
```

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — design decisions, data
  model, how each module maps to the original vision doc, and what was
  deliberately left out and why.
- [`docs/API.md`](docs/API.md) — full REST API reference with example
  requests/responses, covering all phases.
- Interactive API docs are also auto-generated at `http://localhost:8000/docs`
  once the server is running.

## Requirements

- Python 3.10+ (or Docker, as an alternative to the bare-metal path)
- Bash (for the lifecycle scripts)
- A modern browser (frontend uses D3 v7 from a CDN; voice input needs a
  Chrome-family browser for the Web Speech API)
- No external services required. `ANTHROPIC_API_KEY`, `GITHUB_TOKEN`, and
  `ATLAS_WEBHOOK_URL` are optional.


