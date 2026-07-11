---
created: 2026-07-11T18:17:00.691229+00:00
id: a3f7d2868a8a
modified: 2026-07-11T18:17:00.691229+00:00
source: daemon
status: active
tags:
  - readme
type: overview
---

# 🧠 AgentDrive

**Project:** `AgentDrive`

**Path:** `AgentDrive`

**Description:** **Give your AI Agents a Git-Native, Infinite Memory Drive.**

## README

# 🧠 AgentDrive

**Give your AI Agents a Git-Native, Infinite Memory Drive.**

Say goodbye to black-box vector databases and locked-in memory platforms. **AgentDrive** turns your local filesystem into a highly structured, self-updating, markdown-based memory system. Whether you use Claude, Cursor, OpenAI, or a custom script, your agents can seamlessly read, write, and reason over an ever-evolving context that lives right alongside your code.

---

## Quick Start

### One-Command Install

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

### Adopting Existing Projects

You can run `vault init` safely inside projects that already have code and a `.git` repository! Here is what happens:
- It detects your existing `.git` repo and gracefully creates a new `dev` branch for AI agents to write to.
- It safely scaffolds the `.vault/` configuration and templates.
- **Tip:** `vault init` commits these setup files automatically. Ensure your working tree is clean before running it to avoid bundling uncommitted changes into the initialization commit.
- **Auto-Summarization:** The vault won't scan your codebase immediately on init. Instead, a background daemon will automatically wake up and summarize your tech stack, folder structure, open TODOs, and health status **the very next time you make a commit**. 
- To force an immediate summarization without waiting for a commit, simply run:
  ```bash
  vault daemon
  ```

### The Central Brain Architecture (Multi-Repo)

If you have multiple projects and don't want to clutter them with `.vault/` folders, you can use the Central Brain architecture.

1. **Create the Brain:** Pick a central folder (e.g., `~/AgentDriveBrain`) and run `vault init`.
2. **Link your Projects:** Navigate to your pure code repositories and run `vault link --brain ~/AgentDriveBrain`.

This drops a tiny `AGENTS.md` redirect file in your codebase that instructs AI agents to read context from the Central Brain. Every time you commit, the local daemon wakes up and routes all the generated context directly into your Brain repository!

[Read the full Architecture Reference here.](docs/central_brain_architecture.md)

### What You Get

```
vault/
├── AGENTS.md                 # Root governance (all providers read this)
├── projects/                   # Active work
├── people/                     # Contacts (never archived)
├── meetings/                   # Meeting notes
├── decisions/                  # Architecture decisions
├── goals/                      # OKRs and objectives
├── resources/                  # Bookmarks, articles
├── experiments/                # Ephemeral prototypes
├── threads/                    # Conversation histories
├── reviews/                    # Retrospectives
├── templates/                  # Markdown templates
├── .vault/
│   ├── skills/                 # Executable agent skills
│   ├── registry/               # Capability registry
│   ├── staging/                # Pending writes (dev branch)
│   ├── archive/                # Hidden — 120-day+ files
│   ├── index/                  # Search indices
│   └── schemas/                # Validation schemas
└── .github/workflows/
    └── auto-archive.yml        # Weekly maintenance
```

---

## Core Concepts

### 1. Git Branching for Agent Safety

All agent writes go to `dev`. Human approval merges to `main`.

```
User prompt → Agent writes → Staged to dev → PR raised → Human merges → main
```

```bash
vault stage path/to/file.md "# New content" --agent claude
vault promote                    # Merge dev → main
```

### 2. Contextual Directories

Your life is organized into 10+ contextual buckets. Each has its own archive rules, templates, and frontmatter requirements.

| Directory | Purpose | Arch

_(truncated — see full README in project root)_
