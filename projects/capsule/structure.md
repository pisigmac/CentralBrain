---
created: 2026-07-18T20:00:54.527556+00:00
id: b37ad342b0ab
modified: 2026-07-18T20:00:54.527556+00:00
source: daemon
status: active
tags:
  - source
type: structure
---

# Source Structure: capsule

**Root:** `.`

```
./
  AGENTS.md
  Dockerfile
  LICENSE
  README.md
  docker-compose.yml
  install.sh
  pyproject.toml
  services/
    __init__.py
    services/api/
      __init__.py
      dependencies.py
      main.py
      routes.py
    services/parser/
      __init__.py
      parser.py
    services/sync/
      __init__.py
      watcher.py
    services/shared/
      __init__.py
      config.py
      models.py
    services/search/
      __init__.py
      engine.py
  frontend/
    Dockerfile
    README.md
    index.html
    package-lock.json
    package.json
    tsconfig.app.json
    tsconfig.json
    tsconfig.node.json
    vite.config.ts
    frontend/public/
      favicon.svg
      icons.svg
    frontend/src/
      App.tsx
      index.css
      main.tsx
  cli/
    __init__.py
    main.py
  docs/
    AGENTS.md
    ANALYTICS.md
    API.md
    ARCHITECTURE.md
    CHANGELOG.md
    CODEMAP.md
    DATA_RETENTION.md
    DB_SCHEMA.md
    DEPLOY.md
    EMAIL.md
    EMPTY_STATES.md
    ENV.md
    ERRORS.md
    EVENTS.md
    FEATURES.md
    FEATURE_FLAGS.md
    FUTURE.md
    MARKETING.md
    MONITORING.md
    OPENAPI.yaml
    ... (9 more)
  scripts/
    setup.sh
    start_all.sh
    stop_all.sh
  tests/
    __init__.py
    conftest.py
    test_api.py
    test_e2e.py
    test_parser.py
    test_search.py
    test_sync.py
  capsules/
```
