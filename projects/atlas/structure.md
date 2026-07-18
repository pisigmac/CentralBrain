---
created: 2026-07-18T20:00:30.970889+00:00
id: 927037f0ced6
modified: 2026-07-18T20:00:30.970889+00:00
source: daemon
status: active
tags:
  - source
type: structure
---

# Source Structure: atlas

**Root:** `.`

```
./
  AGENTS.md
  Dockerfile
  README.md
  docker-compose.yml
  frontend/
    app.js
    index.html
    styles.css
  docs/
    API.md
    ARCHITECTURE.md
  backend/
    pytest.ini
    requirements.txt
    backend/tests/
      __init__.py
      conftest.py
      test_agents.py
      test_api.py
      test_connectors.py
      test_extraction_and_search.py
      test_graph_engine.py
    backend/app/
      __init__.py
      agents.py
      auth.py
      database.py
      deps.py
      extraction.py
      graph_engine.py
      main.py
      reasoning.py
      schemas.py
      search_engine.py
      twin.py
  scripts/
    backup.sh
    ingest_lot.py
    start_all.sh
    stop_all.sh
  data/
    atlas.db
    atlas.db-shm
    atlas.db-wal
```
