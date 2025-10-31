# StarDQ 2.0

AI-augmented Data Quality Fabric that profiles, cleans, deduplicates, badges, governs and monitors datasets with human-in-loop controls and role-based dashboards.

## Vision

StarDQ 2.0 provides:
- **Self-serve DQ** for business users
- **AI Copilot** suggestions for fixes, merges and policies (powered by OpenAI GPT-4)
- **Continuous monitoring** and compliance packs
- **Trust badges** with lineage and export to BI tools

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- Zustand (state management)
- React Router v6
- Recharts + D3 (visualizations)
- Framer Motion (animations)

### Backend
- FastAPI (Python)
- PostgreSQL (primary database)
- Neo4j (lineage graph)
- Redis (cache + Celery broker)
- Celery (async task queue)
- Prefect (workflow orchestration)

### AI Copilot
- OpenAI GPT-4-turbo
- RAG for metadata context
- Limited auto-execution for low-risk actions
- Human-in-loop for high-risk operations

### Infrastructure
- Docker + Docker Compose
- Terraform (IaC)
- Kubernetes (optional, production)
- Auth0 (SSO/SAML/OIDC)

## Project Structure

```
StarDQ/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # UI components (atoms, molecules, organisms)
│   │   ├── pages/         # Route pages
│   │   ├── stores/        # Zustand state stores
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and helpers
│   │   └── types/         # TypeScript type definitions
│   └── public/
├── backend/           # FastAPI Python backend
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── core/          # Config, security, RBAC
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic
│   │   └── workers/       # Celery tasks
│   ├── tests/
│   └── requirements.txt
├── docs/              # Documentation
└── scripts/           # Utility scripts

```

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.11+
- Docker and Docker Compose
- OpenAI API key

### Quick Start

1. **Clone and install frontend dependencies:**
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```

2. **Set up backend:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` in both frontend/ and backend/
   - Add your OpenAI API key and other credentials

## Key Features

### For Data Stewards (Ravi)
- Rule Studio with drag-and-drop builder
- AI Copilot for rule suggestions and data cleaning recommendations
- Threshold tuning and deduplication controls
- SLA management and alerting

### For Business Analysts (Asha)
- Data Catalog with profiling and search
- Safe data fixes with preview
- Export with lineage to Excel, Tableau, Power BI, Snowflake

### For IT Admins (Meera)
- SSO/RBAC configuration
- Connector and secrets management
- Policy engine and audit logs

### For Executives (Vikram)
- Executive summary dashboards
- Trust badges and compliance packs
- KPI tracking (bounce rate, data quality metrics)

## AI Copilot Features

The AI Copilot (OpenAI GPT-4) provides:

1. **Data Profiling Insights**: Analyzes statistics and suggests focus areas
2. **Rule Generation**: Recommends validation rules, normalization patterns, and deduplication strategies
3. **Interactive Chat**: Natural language Q&A about data quality
4. **Auto-fix Recommendations**: Proposes transformations with before/after previews

**Execution Model**: Limited auto-execution
- ✅ Auto-executes: Formatting, standardization, null handling (low-risk)
- ⚠️ Requires approval: Deduplication, merges, deletions (high-risk)

## Development Roadmap

- **Phase 1**: Foundation & Frontend Scaffold ✅ (In Progress)
- **Phase 2**: Core Pages with Mock Data
- **Phase 3**: AI Copilot Integration
- **Phase 4**: Backend API & Data Processing
- **Phase 5**: Advanced Features (PII, Governance, Monitoring)
- **Phase 6**: Workflow Orchestration & Production

## Contributing

This project follows a frontend-first development approach. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

Copyright © 2025 Seven Billion Analytics. All rights reserved.
