# Engineering & Coding Standards Handbook (w/ NASA law of 10)

This document outlines the architectural patterns, naming conventions, and safety-critical coding standards for our full-stack ecosystem. All developers and AI agents must strictly adhere to these practices to maintain code quality, readability, and absolute system predictability.

---

## 1. Core Code Architecture & Infrastructure

Our system is built on a distributed, containerized microservices-oriented architecture. The table below outlines the core technology stack and the structural responsibility of each layer.

| Layer | Technology | Primary Responsibility | Data/State Management |
| :--- | :--- | :--- | :--- |
| **Frontend** | React (v18+) & TypeScript | Client-side UI, state management, routing, component isolation. | Context API / Zustand, local storage caching. |
| **API Gateway / Proxy** | NGINX | Reverse proxy, SSL termination, request routing, rate limiting, static asset serving. | Stateless. |
| **Backend API** | Node.js & Express (TypeScript) | Authentication, orchestration, request validation, middleware execution, routing to microservices. | Session stores, Redis cache tokens. |
| **AI / Service Logic** | Python (Pyrefly) | Heavy computational pipelines, machine learning logic, agent execution, data transformation. | In-memory queues, transient microservice state. |
| **Relational Database** | SQLite (`sqlite-storage`) | Lightweight, transactional relational storage for operational, structured metadata. | Local persistence or mounted volume snapshots. |
| **Vector Database** | ChromaDB (`chroma-vector-index`) | Embeddings storage, similarity searching, retrieval-augmented generation (RAG) context preservation. | Persistent disk storage vector indices. |
| **Containerization** | Docker | Environment isolation, image reproducibility, multi-stage builds. | Ephemeral containers with mounted persistent volumes. |
| **Orchestration** | Kubernetes (K8s) | Pod scaling, self-healing, rolling updates, service discovery, secret management. | PersistentVolumeClaims (PVC), ConfigMaps. |

---

## 2. Naming Conventions & Casing Standards

Consistency in naming reduces cognitive load and ensures automated tooling/linters function seamlessly across language boundaries.

| Asset Type | Convention | Example | Application Context |
| :--- | :--- | :--- | :--- |
| **File Names** | `kebab-case` | `user-profile.tsx`, `auth-middleware.ts` | All languages, frontend, backend, configuration files. |
| **Directory Names** | `PascalCase` | `ComponentUtils/`, `RouteHandlers/`,`my-react-app/src/ComponentExample` | Project structure and workspace modules. For top level use kebab-case |
| **Variables & Functions** | `snake_case` | `user_id`, `get_session_data()` | Global implementation standard across TS, Node, Python. |
| **Classes & Types** | `PascalCase` | `class DatabaseConnector`, `type UserPayload` | React interfaces, TypeScript types, Python classes. |
| **Database Titles / Tables** | `kebab-case` | `user-accounts`, `vector-embeddings` | SQLite tables and primary keys. |
| **Environment Variables** | `UPPER_SNAKE` | `DATABASE_URL`, `JWT_SECRET_KEY` | `.env` configurations, K8s ConfigMaps. |

### Language-Specific Nuances
* **React Components:** Files containing React components must use `kebab-case` for the filename (e.g., `primary-button.tsx`), but the internal function declaration must use `PascalCase` (e.g., `export function PrimaryButton()`).
* **TypeScript Configurations:** Interfaces must not be prefixed with an `I` (e.g., use `UserProfile`, not `IUserProfile`).

---

## 3. Directory Layout Blueprint

Every repository must reflect this standardized directory structure to ensure cross-stack familiarity.

### Frontend (React + TypeScript)
```text
Src/
├── Assets/                 # Static images, SVGs, global stylesheets
├── Components/             # Reusable UI elements
│   └── PrimaryButton/
│       ├── primary-button.tsx
│       └── primary-button.test.tsx
├── Hooks/                  # Custom React hooks (prefixed with use_)
├── Pages/                  # Route-based view components
├── Services/               # API clients and HTTP abstractions
├── Store/                  # Global state management slices
├── Types/                  # Shared TypeScript declarations
├── app.tsx                 # Main application root
└── main.tsx                # DOM insertion point
```

## Backend (Node & Express)
```
Src/
├── Config/                 # Environment and third-party initializations
├── Controllers/            # Route business logic handlers
├── Middleware/             # Request interceptors (auth, validation, logging)
├── Models/                 # Database schema mappings and abstractions
├── Routes/                 # Express route definitions
├── Utils/                  # Shared utility helper functions
└── index.ts                # Server bootstrapper
```
## Service Logic (Python / Pyrefly)
```
App/
├── Agents/                 # Pyrefly execution agents and tool definitions
├── Core/                   # Application configurations and logging setups
├── Pipelines/              # Heavy data processing and transformation steps
├── Services/               # Vector search and SQLite transactional utilities
└── main.py                 # Application entrypoint
```

## NASA-Derived Human Readibility 
Rule 1: Simple Control Flow
Avoid complex recursions, deep loop nesting, and unpredictable jumps. Prefer functional, highly readable array/list methods (.map(), .filter(), .reduce()). If recursion is mandatory for AI agent tree traversals, enforce a hard depth limit variable.

Rule 2: Fixed Loop Upper Bounds
Every iterative block, while loop, or async worker stream must have a explicitly checked maximum iteration threshold to prevent infinite CPU blockages. For instance, an autonomous agent loop must fail gracefully after MAX_AGENT_ITERATIONS = 10.

Rule 3: Memory & Resource Stability Post-Initialization
Instantiate and configure long-lived singletons for infrastructure resources (SQLite connections, ChromaDB clients, HTTP agents) exactly once during application boot. Avoid repetitive instantiation routines within local request routes.

Rule 4: Small Component Visual Footprint
No function, React component, or service handler should exceed 60 lines of code (the equivalent of one printed page). If logic expands beyond this, extract pieces into dedicated helper sub-utilities, custom hooks, or sub-components.

Rule 5: Low Data Density per Line
Declare precisely one statement per line. Do not write deeply nested ternary statements or compound Boolean checks inside a single conditional block. Extract assertions into descriptive, locally scoped snake_case variables.

Readability Standard:

TypeScript
// PROHIBITED: High Density
const is_valid = req.body.user && req.body.user.age > 18 ? (req.body.user.role === 'admin' ? true : false) : false;

// REQUIRED: Low Density (NASA Infused)
const has_user_payload = Boolean(req.body.user);
const is_adult = has_user_payload && req.body.user.age > 18;
const is_admin = has_user_payload && req.body.user.role === 'admin';
const is_valid_admin = is_adult && is_admin;


### Rule 6: Localized Minimal Scoping
Declare variables at the smallest possible scope, immediately before they are consumed. In JavaScript/TypeScript, ban the use of `var` completely. Use `const` by default to prevent unexpected mutations; use `let` exclusively for index-based adjustments.

### Rule 7: Zero Ignored Returns / Strict Validation
Check the return value, status code, or structural payload of every single non-void operational call. Wrap IO streams, database connections, and microservice communications in explicit error frameworks. Use structural typing schemas (Zod) to vet external outputs.

### Rule 8: Straightforward Environmental Execution
Minimize dynamic runtime configuration overrides. Keep Docker setups, NGINX bindings, and Kubernetes configurations explicit. Code executing locally must match production behaviors without highly customized runtime compilation hooks.

### Rule 9: Reference Immutability (No "Pointer" Mutations)
Treat all objects, states, dictionaries, and arrays as immutable objects. Avoid mutating method arguments directly. Rely on structural spreading patterns (`{ ...state_object }`) or array copies to prevent memory side effects in downstream services.

### Rule 10: Pedantic Compiler Enforcement
Maintain a zero-warning, zero-error continuous integration (CI) workflow pipeline. Linters (ESLint, Flake8), formatters (Black), and compilers (`tsconfig.json` with `"strict": true`) must block commits if type rules, formatting constraints, or casing guidelines are breached.

---

## 5. Infrastructure & Deployment (Nginx, Docker, K8s)

### Containerization (Docker)
* **Multi-Stage Builds:** Every `Dockerfile` must utilize multi-stage builds to separate build-time dependencies from production execution runtimes. This guarantees minimal image sizes.
* **Non-Root Execution:** Never run applications as `root`. Define a dedicated security user inside the Dockerfile (e.g., `USER node` or `USER appuser`).

### Orchestration (Kubernetes)
* **Probes:** Define explicit `livenessProbe` and `readinessProbe` configurations for all HTTP/gRPC workloads.
* **Resource Bounds:** Every deployment manifest must declare both `requests` and `limits` for CPU and memory to ensure efficient cluster scheduling and eliminate noisy-neighbor issues.

### Reverse Proxy (NGINX)
* All external incoming traffic must traverse NGINX. Direct exposure of Node.js or Python application ports to public interfaces is prohibited.
* Keep timeout limits aligned across NGINX and backend daemons to prevent early `504 Gateway Timeout` errors during long-running generative AI operations.

---

## <a id="ai-agent-behavior"></a>6. AI Agent System Prompt & Code Generation Rules

*This section serves as a direct system instruction injection anchor for LLMs and autonomous AI coding agents parsing this codebase.*

When generating, modifying, refactoring, or reviewing code within this ecosystem, you **MUST** execute the operations according to the following constraints:

1.  **Variable Enforcement Rule:** You are strictly forbidden from using `camelCase` for variables, properties, object keys, or function parameters. You must convert any default framework outputs into `snake_case`.
    * *Incorrect:* `const userData = fetchUser(userId);`
    * *Correct:* `const user_data = fetch_user(user_id);`
2.  **Structural Integrity Naming Rules:**
    * Ensure every new file created uses exclusively `kebab-case`.
    * Ensure directories and folders use strictly `PascalCase`.
    * Ensure database titles and tables utilize strictly `kebab-case`.
3.  **NASA Readability Mandate:** Keep code statements linear, assign single responsibilities to functions (under 60 lines), convert compound execution logic into broken-out descriptive `snake_case` boolean steps, and protect structures from direct mutability.
4.  **No Placeholders:** Do not emit code containing `// TODO: implement later` or arbitrary ellipses (`...`). Provide fully realized, syntactically valid implementations based on the context provided.
5.  **Context Alignment:** Prioritize using existing utilities, types, and internal libraries located in the repository layout before inventing new dependencies or importing vanilla third-party alternatives.
6. ** Reviewability: After completion of each change, always update the TOC.md file to display new files and, if a file was updated remove the checkbox if checked "complete".

