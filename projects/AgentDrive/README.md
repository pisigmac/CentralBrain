---
created: 2026-07-12T15:14:27.284128+00:00
id: ec5b23e708fd
modified: 2026-07-12T15:14:27.284128+00:00
source: daemon
status: active
tags:
  - readme
type: overview
---

# 1. Install the CLI globally

**Project:** `AgentDrive`

**Path:** `AgentDrive`

**Description:** [![CI](https://github.com/pisigmac/AgentDrive/actions/workflows/agentdrive-auto-pr.yml/badge.svg)](https://github.com/pisigmac/AgentDrive/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/p

## README

<div align="center">

[![CI](https://github.com/pisigmac/AgentDrive/actions/workflows/agentdrive-auto-pr.yml/badge.svg)](https://github.com/pisigmac/AgentDrive/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

<h1>
  <picture>
    <img width="80" height="80" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e0.svg" alt="Brain Logo">
  </picture>
  <br/>
  AgentDrive
</h1>

<h3>Give your AI Agents a Git-Native, Infinite Memory Drive.</h3>

<p>
Say goodbye to black-box vector databases and locked-in memory platforms.<br/>
<b>AgentDrive</b> turns your local filesystem into a highly structured, self-updating,<br/>
markdown-based memory system for Claude, Cursor, and OpenAI.
</p>

</div>

---

### 🧠 The Next Evolution of Agent Context

└ **Git-Native Memory** — All agent writes go to `dev`, keeping `main` perfectly stable.<br>
└ **Central Brain Architecture** — Link endless repositories to a single, global memory vault.<br>
└ **Auto-Harvesting Daemon** — Background processes automatically summarize code changes into context.<br>
└ **Offline-First MCP Server** — Works locally without relying on cloud embeddings.<br>
└ **Built-in Auto-Archive** — Self-maintaining vault that archives stale contexts after 120 days.<br>
└ **Strict Governance** — Enforces root `AGENTS.md` rules for every autonomous action.<br>

<br>
<hr style="border: 0; height: 1px; background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));" />
<br>

### 🚀 Quick Start

One command to initialize AgentDrive globally:

```bash
curl -sSL https://raw.githubusercontent.com/pisigmac/agentdrive/main/setup.sh | bash
```

Or manually:

```bash
# 1. Install the CLI globally
git clone https://github.com/pisigmac/agentdrive.git
cd agentdrive
pip install -e .

# 2. Go to your own project and initialize a vault
cd ~/my-project
vault init
```

<br>
<hr style="border: 0; height: 1px; background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));" />
<br>

### 🌐 The Central Brain Architecture (Multi-Repo)

If you have multiple projects and don't want to clutter them with `.vault/` folders, you can use the Central Brain architecture.

1. **Create the Brain:** Pick a central folder (e.g., `~/AgentDriveBrain`) and run `vault init`.
2. **Link your Projects:** Navigate to your pure code repositories and run `vault link --brain ~/AgentDriveBrain`.

This drops a tiny `AGENTS.md` redirect file in your codebase that instructs AI agents to read context from the Central Brain. Every time you commit, the local daemon wakes up and routes all the generated context directly into your Brain repository!

<br>
<hr style="border: 0; height: 1px; background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));" />
<br>

### 📁 What You Get

A beautifully structured, self-governing memory filesystem out-of-the-box.

```text
vault/
├── AGENTS.md                 # Root governance (all providers read this)
├── projects/                 # Active work
├── people/                   # Contacts (never archived)
├── meetings/                 # Meeting notes
├── decisions/                # Architecture decisions
├── goals/                    # OKRs and objectives
├── resources/                # Bookmarks, articles
├── experiments/              # Ephemeral prototypes
├── threads/                  # Conversation histories
├── reviews/                  # Retrospectives
├── templates/                # Markdown templates
├── .vault/
│   ├── skills/               # Executable agent skills
│   ├── registry/             # Capability registry
│   ├── staging/              # Pending writes (dev branch)
│   ├── arc

_(truncated — see full README in project root)_
