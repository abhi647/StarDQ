# StarDQ 2.0 - Claude Code Context

## Project Overview

**StarDQ 2.0** is an AI-augmented Data Quality Fabric that profiles, cleans, deduplicates, badges, governs, and monitors datasets with human-in-loop controls and role-based dashboards.

### Vision
- **Self-serve DQ** for business users
- **AI Copilot** (OpenAI GPT-4) for data cleaning suggestions and recommendations
- **Continuous monitoring** and compliance packs
- **Trust badges** (Bronze/Silver/Gold) with lineage and export to BI tools

### Owner
Seven Billion Analytics

---

## Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4 + shadcn/ui components
- **State Management:** Zustand (with persist middleware)
- **Routing:** React Router v7
- **Server State:** TanStack React Query
- **Animations:** Framer Motion
- **Charts:** Recharts + D3.js
- **UI Primitives:** Radix UI
- **Icons:** Lucide React

### Backend (Planned)
- **Framework:** FastAPI (Python)
- **Database Primary:** PostgreSQL
- **Database Graph:** Neo4j (lineage tracking)
- **Cache/Queue:** Redis + Celery
- **Orchestration:** Prefect
- **Object Storage:** S3-compatible
- **Logs:** Elastic + Kibana
- **Auth:** Auth0 (SAML/OIDC)

### AI Copilot
- **LLM Provider:** OpenAI GPT-4-turbo
- **RAG:** Vector store for metadata context
- **Execution:** Limited auto-execution (low-risk auto, high-risk approval required)

### Infrastructure
- **Containers:** Docker + Docker Compose
- **IaC:** Terraform
- **Orchestration:** Kubernetes (optional for production)

---

## Project Structure

```
StarDQ/
├── frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/          # BadgePill, KPIStat, HealthDot, RoleTag, TrustIcon, CopyToClipboard
│   │   │   ├── molecules/      # DatasetCard, AlertItem, TicketRow, UserRow, ConnectorRow, PolicyRow
│   │   │   ├── organisms/      # DataTableVirtualized, RuleCanvas, WorkflowCanvas, CopilotSidebar, etc.
│   │   │   ├── layouts/        # AppShell, SidebarNav, Topbar
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/              # Route pages (Dashboard, DataCatalog, DQAPipeline, etc.)
│   │   ├── stores/             # Zustand stores (auth, datasets, alerts, ui)
│   │   ├── hooks/              # Custom React hooks (useAuth, etc.)
│   │   ├── lib/                # Utils, routes, env config, seed data
│   │   ├── services/           # API client services
│   │   └── types/              # TypeScript type definitions
│   ├── public/
│   ├── .env.example            # Environment variables template
│   ├── .env.local              # Local environment variables (not committed)
│   ├── tailwind.config.js      # Tailwind configuration with StarDQ colors
│   ├── postcss.config.js       # PostCSS with @tailwindcss/postcss
│   ├── vite.config.ts          # Vite configuration with path aliases
│   ├── tsconfig.json           # TypeScript configuration
│   ├── components.json         # shadcn/ui configuration
│   ├── .prettierrc             # Prettier configuration
│   └── package.json            # Dependencies
├── backend/                     # FastAPI backend (to be implemented)
│   ├── app/
│   │   ├── api/                # API routes
│   │   ├── core/               # Config, security, RBAC
│   │   ├── models/             # SQLAlchemy models
│   │   ├── schemas/            # Pydantic schemas
│   │   ├── services/           # Business logic
│   │   └── workers/            # Celery tasks
│   ├── tests/
│   └── requirements.txt
├── docs/                        # Documentation
├── scripts/                     # Utility scripts
├── .gitignore
├── README.md
└── claude.md                    # This file

```

---

## Key Personas & RBAC

### Roles
1. **IT Admin (Meera)** - Tenant management, SSO, connectors, policies, audit
2. **Data Steward (Ravi)** - Rule Studio, threshold tuning, SLA ownership, alerts
3. **Business Analyst (Asha)** - Connect sources, profile datasets, apply fixes, export
4. **Executive (Vikram)** - Executive summary, KPI dashboards, compliance reports
5. **Viewer** - Read-only dashboard access
6. **Auditor** - Compliance and audit log access

### Permissions Mapping
- **IT Admin:** tenant.manage, users.manage, connectors.manage, policies.manage, audit.read
- **Data Steward:** rules.create, rules.update, dq.run, sla.manage, alerts.manage, exports.read
- **Business Analyst:** datasets.read, dq.preview, dq.apply_safe, export.run
- **Viewer:** dashboards.read
- **Auditor:** compliance.read, audit.read
- **Executive:** exec.summary.read

---

## Navigation Structure

### Sidebar Routes
```typescript
/dashboard              - Dashboard (Overview, Data Steward, IT Admin, Business User, System Copilot tabs)
/data-catalog           - Data Catalog with DatasetCard grid and filters
/data-catalog/:id       - Dataset Detail (profiling, schema, lineage)
/dqa-pipeline           - DQA Pipeline workflow canvas
/rule-studio            - Rule Studio drag-and-drop builder
/pii-masking            - PII Masking configuration
/ai-insights            - AI Insights and recommendations
/dq-reports             - DQ Reports and KPI history
/alerts                 - Alerts & Notifications Center
/exports                - Export Center (Excel, Snowflake, Tableau, Power BI)
/starbi                 - StarBI Dashboard launcher
/settings               - User settings

# Admin Section (IT Admin + Auditor only)
/admin/tickets          - Tickets & Approvals
/admin/users            - User Management
/admin/policies         - Access Policies
/admin/connectors       - Connectors & Secrets
/admin/audit            - Audit Logs
```

---

## Data Models (TypeScript)

### Core Types
```typescript
type Badge = 'Bronze' | 'Silver' | 'Gold'
type Domain = 'Sales' | 'Marketing' | 'Ops' | 'Finance' | 'Other'
type Role = 'it_admin' | 'data_steward' | 'business_analyst' | 'viewer' | 'auditor' | 'exec'
type HealthStatus = 'healthy' | 'degraded' | 'down'
type AlertType = 'connection_failed' | 'pii_violation' | 'freshness_drop' | 'uniqueness_drop' | 'policy_breach'
type RiskLevel = 'low' | 'medium' | 'high'
```

### Dataset
```typescript
interface Dataset {
  id: UUID
  name: string
  domain: Domain
  schema: Record<string, any>
  profile: ProfileSummary
  badge: Badge
  lineage?: string
  owner: UUID
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### DQ KPIs
```typescript
interface DQKPIs {
  completeness: number  // 0-1
  validity: number      // 0-1
  uniqueness: number    // 0-1
  freshness: number     // 0-1
  weightedScore: number // 0-1
}
```

### Badge Calculation
- **Weights:** Completeness 40%, Validity 30%, Uniqueness 30%
- **Thresholds:** Silver ≥ 0.75, Gold ≥ 0.9
- **Formula:** `weighted_score = (completeness * 0.4) + (validity * 0.3) + (uniqueness * 0.3)`

### AI Copilot Suggestion
```typescript
interface CopilotSuggestion {
  id: UUID
  type: 'profiling_insight' | 'rule_generation' | 'auto_fix' | 'deduplication' | 'normalization' | 'masking'
  title: string
  description: string
  riskLevel: RiskLevel
  autoExecutable: boolean
  code?: string
  diff?: { before: any[], after: any[] }
  confidence: number // 0-1
  createdAt: Timestamp
}
```

---

## State Management (Zustand Stores)

### Auth Store (`auth.store.ts`)
```typescript
{
  user: User | null
  isAuthenticated: boolean
  permissions: Permission[]
  login(user, permissions)
  logout()
  hasPermission(permission)
  hasRole(role)
}
```

### Datasets Store (`datasets.store.ts`)
```typescript
{
  datasets: Dataset[]
  selectedDataset: Dataset | null
  filters: { domain, badge, search }
  setDatasets(datasets)
  addDataset(dataset)
  updateDataset(id, updates)
  selectDataset(id)
  setFilters(filters)
  getFilteredDatasets()
}
```

### Alerts Store (`alerts.store.ts`)
```typescript
{
  alerts: Alert[]
  unreadCount: number
  filters: { severity, type, acknowledged }
  setAlerts(alerts)
  addAlert(alert)
  acknowledgeAlert(id, userId)
  getFilteredAlerts()
}
```

### UI Store (`ui.store.ts`)
```typescript
{
  sidebarCollapsed: boolean
  copilotOpen: boolean
  theme: 'light' | 'dark' | 'system'
  toggleSidebar()
  toggleCopilot()
  setTheme(theme)
}
```

---

## Color Palette

```css
Primary:    #012F35  (Deep teal)
Secondary:  #1B4E54  (Teal)
Accent:     #007787  (Bright cyan)
Info:       #00B3CA  (Light cyan)
Muted:      #A8DCDB  (Pale teal)
Surface:    #E2DFCC  (Warm beige)
Warning:    #FFC994  (Peach - Bronze badge)
Danger:     #AD3B23  (Red)
Danger Alt: #96364A  (Dark red)
```

### Badge Colors
- **Bronze:** `#FFC994` (Warning)
- **Silver:** `#A8DCDB` (Muted)
- **Gold:** `#007787` (Accent)

---

## Environment Variables

### Frontend (.env.local)
```bash
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000
VITE_AUTH0_DOMAIN=dev-stardq.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://api.stardq.local
VITE_OPENAI_API_KEY=sk-your-key
VITE_FEATURE_COPILOT_BETA=true
VITE_FEATURE_WORKFLOW_CANVAS=true
VITE_FEATURE_NEO4J_LINEAGE=false
```

---

## Development Workflow

### Setup
```bash
# Clone and enter project
cd StarDQ/frontend

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open browser to http://localhost:5173
```

### Available Commands
```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
```

### Seed Data (Development)
Default user: **Ravi Kumar** (Data Steward)
- Email: ravi@example.com
- Permissions: rules.create, rules.update, dq.run, sla.manage, alerts.manage, exports.read, datasets.read

Sample datasets:
1. **Customer Master** (10K rows, Silver badge, Sales domain)
2. **Leads Q4** (25K rows, Bronze badge, Marketing domain)
3. **Financial Transactions** (50K rows, Gold badge, Finance domain)

Sample alerts:
1. PII violation (high severity, unacknowledged)
2. Uniqueness drop (medium severity, unacknowledged)
3. Freshness drop (low severity, acknowledged)

---

## API Endpoints (Backend - To Be Implemented)

### Authentication
- `POST /api/auth/sso/config` - Configure SSO
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/logout` - Logout

### Datasets
- `GET /api/datasets` - List all datasets
- `POST /api/datasets` - Create dataset
- `GET /api/datasets/:id` - Get dataset details
- `PUT /api/datasets/:id` - Update dataset
- `DELETE /api/datasets/:id` - Delete dataset

### Profiling
- `POST /api/ingest/run` - Run ingestion job
- `GET /api/profile/:datasetId` - Get profiling summary
- `GET /api/kpis/:datasetId` - Get DQ KPIs and badge

### AI Copilot
- `POST /api/copilot/suggest` - Get AI suggestions
- `POST /api/copilot/chat` - Chat with AI Copilot
- `POST /api/copilot/execute` - Execute AI recommendation

### Rules
- `GET /api/rules` - List rulesets
- `POST /api/rules/validate` - Validate rules
- `POST /api/rules/save` - Save ruleset template
- `POST /api/dq/apply` - Apply safe fixes

### Exports
- `POST /api/export` - Export dataset (Excel, Snowflake, Tableau, Power BI)
- `GET /api/export/:jobId` - Get export job status

### Monitoring
- `GET /api/monitor/signals` - WebSocket for monitoring signals
- `GET /api/alerts` - List alerts
- `POST /api/alerts/ack` - Acknowledge alert

### Governance
- `POST /api/policy/quarantine` - Quarantine violating rows
- `GET /api/compliance/pack/:datasetId` - Generate compliance pack
- `GET /api/lineage/:datasetId` - Get lineage graph
- `GET /api/audit` - Audit logs (paginated)

---

## AI Copilot Implementation Plan

### Phase 1: UI Components
- ✅ Copilot sidebar toggle in topbar
- ⏳ Interactive chat interface with message history
- ⏳ Suggestion cards with accept/reject actions
- ⏳ Diff preview pane (before/after visualization)
- ⏳ Risk level indicators

### Phase 2: OpenAI Integration
- ⏳ Set up OpenAI SDK with streaming
- ⏳ Implement function calling for actions
- ⏳ Build RAG system for metadata context
- ⏳ Create prompt templates for each suggestion type

### Phase 3: Copilot Features
1. **Data Profiling Insights**
   - Analyze profile stats (null rates, duplicates, outliers)
   - Suggest columns with quality issues
   - Identify patterns and anomalies

2. **Rule Generation**
   - Suggest validation rules based on data patterns
   - Recommend normalization strategies
   - Propose deduplication thresholds

3. **Interactive Chat**
   - Natural language Q&A about datasets
   - Contextual help with DQ operations
   - Explain badge scores and recommendations

4. **Auto-fix Recommendations**
   - Generate transformation scripts
   - Show before/after previews
   - Classify risk level (low/medium/high)

### Phase 4: Execution Engine
- **Low-risk auto-execution:** Formatting, standardization, null handling
- **High-risk approval required:** Deduplication, merges, deletions
- **Audit logging:** All AI actions logged with user approval status
- **Rollback capability:** Version control for data changes

---

## Testing Strategy

### Unit Tests (Vitest)
- Store logic (Zustand)
- Utility functions
- Component logic

### Component Tests (React Testing Library)
- Atomic components
- Form validations
- User interactions

### E2E Tests (Playwright)
- Critical user journeys
- Login → Profile → Apply fixes → Export
- Admin workflows

### Contract Tests (PACT)
- API contract validation between frontend and backend

### Seed Scenarios
- Schema mismatch during ingestion
- High-risk merge approval workflow
- PII violation detection and quarantine
- Badge upgrade after fixes
- Connector health monitoring

---

## Performance Requirements

- **Dashboard TTI:** < 2 seconds
- **Virtualized tables:** Support >1M rows (preview-only)
- **Copilot response time:** < 3 seconds
- **Export throughput:** Handle large datasets efficiently

---

## Security & Compliance

- **Authentication:** Auth0 SSO (SAML/OIDC)
- **Authorization:** JWT with role-based scopes
- **Data Protection:** Secrets in Vault, CSP headers, HTTPS only
- **Standards:** OWASP ASVS compliance
- **Privacy:** PII-safe telemetry, audit logs
- **Row-level security:** PostgreSQL RLS policies

---

## Success Metrics

### Phase 1 MVP
✅ Analyst can connect CRM + CSV, profile runs, Bronze badge visible
✅ Steward can tune dedup thresholds and achieve F1 ≥ 0.92
⏳ Badge upgrades to Silver after fixes; export embeds lineage + badge
⏳ Nightly pipeline executes with human-in-loop gate for risky clusters
⏳ Policy violations trigger quarantine and appear in Alerts Center
⏳ Compliance pack downloadable as PDF with lineage snapshots

### Target KPIs
- **% datasets at Silver/Gold:** ≥ 85%
- **Avg cleaning cycle time:** ≤ 48h
- **PII violation recurrence:** ≤ 2%
- **Merge F1 score:** ≥ 0.92
- **Bounce rate reduction:** ≥ 40%

---

## Current Implementation Status

### ✅ Completed (Phase 1)
- Project scaffolding and build configuration
- Tailwind CSS with StarDQ design system
- All atomic components (6 components)
- Zustand stores (auth, datasets, alerts, ui)
- RBAC hooks and route protection
- AppShell layout with sidebar and topbar
- React Router setup with protected routes
- TypeScript type definitions for all models
- Seed data for development
- Environment configuration

### ⏳ In Progress (Phase 2)
- Dashboard with role-based tabs
- Data Catalog with dataset cards
- Dataset Detail page
- DQA Pipeline workflow canvas
- Rule Studio

### 📋 Next Up (Phase 3-6)
- AI Copilot integration (OpenAI GPT-4)
- Backend API (FastAPI)
- Neo4j lineage tracking
- PII masking and governance
- Monitoring and alerts (WebSocket)
- Workflow orchestration (Prefect)
- Production deployment (Docker + K8s)

---

## Known Issues & Workarounds

### Tailwind CSS v4 PostCSS Integration
**Issue:** Tailwind CSS v4 requires `@tailwindcss/postcss` instead of `tailwindcss` plugin
**Fix:** Install `@tailwindcss/postcss` and update `postcss.config.js`
```bash
pnpm install -D @tailwindcss/postcss
```
```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

---

## Git Workflow

### Commit Message Format
```
<type>: <summary>

<detailed description>

<optional footer with breaking changes, references, etc.>

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Branch Strategy (Recommended)
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches
- `release/*` - Release preparation

---

## Resources & References

### Documentation
- [React 18 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vite.dev/guide/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)

### Design System
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

### AI & ML
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [LangChain](https://docs.langchain.com/)

---

## Contact & Support

**Owner:** Seven Billion Analytics
**Project:** StarDQ 2.0
**Last Updated:** 2025-10-31

For questions or issues, refer to the main README.md or project documentation.
