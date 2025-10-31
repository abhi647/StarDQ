# StarDQ 2.0 Frontend - Project Documentation

## Project Overview
StarDQ 2.0 is an AI-augmented Data Quality Fabric platform built with modern web technologies. This frontend application provides a comprehensive interface for data stewards, analysts, and IT admins to monitor, manage, and improve data quality across the organization.

## Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with inline styles (for reliability)
- **State Management**: Zustand with persist middleware
- **Routing**: React Router v7
- **UI Components**: Custom components with Lucide icons
- **API Client**: TanStack React Query (planned)
- **AI Integration**: OpenAI GPT-4-turbo (planned)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── atoms/           # Basic UI components
│   │   │   ├── BadgePill.tsx
│   │   │   ├── HealthDot.tsx
│   │   │   ├── KPIStat.tsx
│   │   │   └── RoleTag.tsx
│   │   ├── molecules/       # Composite components (planned)
│   │   ├── organisms/       # Complex components (planned)
│   │   └── layouts/         # Layout components
│   │       ├── AppShell.tsx
│   │       ├── SidebarNav.tsx
│   │       └── Topbar.tsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx   ✅ COMPLETE
│   │   ├── DataCatalog.tsx ✅ COMPLETE
│   │   ├── DatasetDetail.tsx ⚠️ IN PROGRESS
│   │   ├── DQAPipeline.tsx
│   │   ├── RuleStudio.tsx
│   │   ├── LineageExplorer.tsx
│   │   ├── MonitoringAlerts.tsx
│   │   └── Reports.tsx
│   ├── stores/             # Zustand state stores
│   │   ├── auth.store.ts
│   │   ├── datasets.store.ts
│   │   ├── alerts.store.ts
│   │   └── ui.store.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.ts
│   ├── lib/                # Utilities and configuration
│   │   ├── routes.ts
│   │   ├── seedData.ts
│   │   ├── env.ts
│   │   └── utils.ts
│   ├── types/              # TypeScript definitions
│   │   └── index.ts
│   └── styles/
│       └── index.css       # Global styles with Tailwind directives
├── public/                 # Static assets
└── package.json

```

## Implementation Status

### ✅ Completed Features

#### 1. **Dashboard Page** (src/pages/Dashboard.tsx)
- **Modern KPI Cards**: 4 metric cards with icons and trends
  - Total Datasets with 12% growth indicator
  - Average Quality Score with 5.2% improvement
  - Healthy Datasets count and percentage
  - Critical Alerts counter
- **Quality Distribution Panel**: Visual breakdown of Gold/Silver/Bronze datasets with percentages
- **Recent Activity Feed**: Timeline of recent actions with colored indicators
- **Top Datasets List**: Clickable dataset cards with quality scores and badges
- **Recent Alerts Section**: Alert cards with severity levels and timestamps
- **Quick Actions**: 4 action buttons linking to main features
- **Responsive Layout**: Grid-based layout with hover effects
- **Real-time Stats**: Live calculations from Zustand stores

#### 2. **Data Catalog Page** (src/pages/DataCatalog.tsx)
- **Search Functionality**: Full-text search across dataset names and domains
- **Advanced Filtering**:
  - Quality Badge filter (Gold/Silver/Bronze)
  - Domain filter with multi-select
  - Filter count badge
  - Clear all filters button
- **Multiple View Modes**:
  - Grid view: Card-based layout with detailed stats
  - List view: Compact table-like layout
- **Sorting Options**: 8 sort configurations
  - Recently Updated / Oldest First
  - Quality: High to Low / Low to High
  - Name: A to Z / Z to A
  - Size: Largest / Smallest First
- **Dataset Cards** (Grid View):
  - Quality score with progress bar
  - Stats grid (rows, columns, completeness, validity)
  - Badge pills and health indicators
  - Last modified timestamp
  - Hover effects with elevation
- **Stats Row**: 4 summary statistics at page top
- **Responsive Design**: Auto-fit grid layout

#### 3. **Layout & Navigation**
- **AppShell** (src/components/layouts/AppShell.tsx):
  - Fixed sidebar + topbar layout
  - Collapsible sidebar with toggle
  - AI Copilot panel (right side, toggleable)
  - Protected routes with RBAC
- **SidebarNav** (src/components/layouts/SidebarNav.tsx):
  - Dark teal theme (#012F35)
  - Expandable sections for nested routes
  - Active route highlighting
  - Icon-only mode when collapsed
  - Role-based route visibility
- **Topbar** (src/components/layouts/Topbar.tsx):
  - AI Copilot toggle button
  - Alerts bell with unread count badge
  - User profile section with role tag
  - Logout button

#### 4. **State Management**
- **Auth Store** (src/stores/auth.store.ts):
  - User session persistence
  - Role-based permissions (6 roles: Admin, Data Steward, Data Engineer, Analyst, Executive, Viewer)
  - Login/logout functionality
  - Permission checking utilities
- **Datasets Store** (src/stores/datasets.store.ts):
  - Mock dataset data (5 sample datasets)
  - Filtering logic (search, badge, domain)
  - Quality score calculations
- **Alerts Store** (src/stores/alerts.store.ts):
  - Alert management with severity levels
  - Unread count tracking
  - Acknowledgment functionality
- **UI Store** (src/stores/ui.store.ts):
  - Sidebar collapsed state
  - AI Copilot open/closed state

#### 5. **Atomic Components**
- **BadgePill** (src/components/atoms/BadgePill.tsx):
  - Bronze: #FFC994 background, dark text
  - Silver: #A8DCDB background, dark text
  - Gold: #007787 background, white text
  - 3 size variants: sm, md, lg
- **HealthDot** (src/components/atoms/HealthDot.tsx):
  - Pulsing animation
  - 3 status colors: healthy (green), degraded (yellow), down (red)
  - Optional label display
- **KPIStat** (src/components/atoms/KPIStat.tsx):
  - Supports number, percentage, currency formats
  - Optional trend indicator
- **RoleTag** (src/components/atoms/RoleTag.tsx):
  - Role-specific colors
  - Compact badge format

### ⚠️ In Progress

#### Dataset Detail Page
- Detailed dataset profiling view
- Column-level statistics
- Data quality dimensions breakdown
- Lineage visualization
- Quality rules applied
- AI recommendations panel

### 📋 Planned Features

#### 3. **DQA Pipeline Page**
- Visual workflow canvas
- Drag-and-drop rule builder
- Pipeline execution status
- Step-by-step results
- Schedule management

#### 4. **Rule Studio**
- Rule template library
- Custom rule builder
- SQL/Pandas/Spark code preview
- Test execution
- Rule versioning

#### 5. **Lineage Explorer**
- Interactive graph visualization
- Upstream/downstream dependencies
- Impact analysis
- Field-level lineage

#### 6. **Monitoring & Alerts**
- Real-time monitoring dashboard
- Alert configuration
- Notification settings
- Alert history and trends

#### 7. **Reports Page**
- Report builder
- Export functionality (PDF, Excel, CSV)
- Scheduled reports
- Report templates

#### 8. **AI Copilot Sidebar**
- Chat interface
- Streaming responses
- Context-aware suggestions
- Function calling for actions
- Code generation
- Auto-fix recommendations

## Color Palette (StarDQ Theme)

```css
/* Primary Colors */
--primary: #012F35        /* Deep Teal - Main brand color */
--secondary: #1B4E54      /* Dark Teal - Sidebar, headers */
--accent: #007787         /* Teal - Active states, CTAs */
--accent-light: #00B3CA   /* Light Teal - Highlights */

/* Neutral Colors */
--background: #FFFFFF     /* White - Page background */
--surface: #F8F9FA        /* Light Gray - Card background */
--muted: #A8DCDB          /* Mint - Borders, dividers */
--beige: #E2DFCC          /* Beige - Alternate backgrounds */

/* Semantic Colors */
--success: #10b981        /* Green - Success states */
--warning: #FFA500        /* Orange - Warning states */
--danger: #AD3B23         /* Red - Error/critical states */
--info: #00B3CA           /* Cyan - Info states */

/* Badge Colors */
--gold: #007787           /* Gold badge */
--silver: #A8DCDB         /* Silver badge */
--bronze: #FFC994         /* Bronze badge */

/* Text Colors */
--text-primary: #012F35
--text-secondary: #1B4E54
--text-muted: #64748B
```

## Key Design Patterns

### 1. Inline Styles Approach
**Why**: Tailwind CSS v4 with PostCSS plugin had inconsistent rendering issues. Inline styles guarantee visual consistency.

**Example**:
```tsx
<div style={{
  backgroundColor: '#012F35',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #E2E8F0'
}}>
  Content
</div>
```

### 2. Hover Effects with Event Handlers
```tsx
<button
  style={{
    backgroundColor: '#007787',
    transition: 'all 0.2s'
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00B3CA'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007787'}
>
  Hover Me
</button>
```

### 3. State Management with Zustand
```tsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Store {
  count: number
  increment: () => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }))
    }),
    { name: 'store-name' }
  )
)
```

### 4. RBAC Permission Checks
```tsx
const { hasAnyRole, hasPermission } = useAuth()

// Show component only for specific roles
{hasAnyRole(['Admin', 'DataSteward']) && <AdminPanel />}

// Check specific permission
{hasPermission('datasets:write') && <CreateButton />}
```

## Data Models

### Dataset
```typescript
interface Dataset {
  id: string
  name: string
  domain: string
  description: string
  owner: string
  qualityScore: number
  badge: 'Gold' | 'Silver' | 'Bronze'
  profile: {
    totalRows: number
    totalColumns: number
    completeness: number
    validity: number
    uniqueness: number
    missingValues: number
  }
  lastModified: string
  createdAt: string
}
```

### Alert
```typescript
interface Alert {
  id: string
  severity: 'low' | 'medium' | 'high'
  message: string
  datasetId: string
  timestamp: string
  ackBy?: string
  ackAt?: string
}
```

### User
```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'DataSteward' | 'DataEngineer' | 'Analyst' | 'Executive' | 'Viewer'
}
```

## Quality Badge Calculation

```typescript
// Weighted scoring
const weights = {
  completeness: 0.4,
  validity: 0.3,
  uniqueness: 0.3
}

const qualityScore =
  profile.completeness * weights.completeness +
  profile.validity * weights.validity +
  profile.uniqueness * weights.uniqueness

// Badge assignment
if (qualityScore >= 0.95) return 'Gold'
if (qualityScore >= 0.75) return 'Silver'
return 'Bronze'
```

## Routing Structure

```typescript
const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/data-catalog', element: <DataCatalog /> },
  { path: '/datasets/:id', element: <DatasetDetail /> },
  { path: '/dqa-pipeline', element: <DQAPipeline /> },
  { path: '/rule-studio', element: <RuleStudio /> },
  { path: '/lineage', element: <LineageExplorer /> },
  { path: '/monitoring-alerts', element: <MonitoringAlerts /> },
  { path: '/reports', element: <Reports /> },
  { path: '/settings', element: <Settings /> }
]
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

## Git Workflow

```bash
# Current status
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add data catalog with search and filters"

# View history
git log --oneline
```

## Known Issues & Solutions

### Issue: Tailwind Classes Not Rendering
**Solution**: Use inline styles instead of Tailwind utility classes for guaranteed rendering.

### Issue: HMR Not Updating Component
**Solution**: Save the file again or restart dev server. Vite HMR is generally reliable.

### Issue: State Not Persisting
**Solution**: Check that Zustand store is using `persist` middleware and storage key is unique.

## Performance Optimizations

1. **useMemo for expensive calculations**:
```tsx
const filteredData = useMemo(() => {
  return data.filter(item => item.score > 0.8)
}, [data])
```

2. **Lazy loading for routes**:
```tsx
const Dashboard = lazy(() => import('./pages/Dashboard'))
```

3. **Virtual scrolling for large lists** (planned with react-window)

## AI Copilot Integration (Planned)

### Architecture
- **Backend API**: `/api/copilot/chat` endpoint
- **OpenAI Model**: GPT-4-turbo with function calling
- **Context**: Dataset metadata, user permissions, recent activity
- **Streaming**: SSE for real-time response updates

### Features
1. **Data Profiling Insights**: Automatic analysis and recommendations
2. **Rule Generation**: AI suggests quality rules based on data patterns
3. **Interactive Chat**: Natural language queries about datasets
4. **Auto-fix Recommendations**: Code generation for data cleaning

### Risk Assessment
- **Low-risk**: Auto-execution allowed (formatting, casing fixes)
- **High-risk**: Requires approval (deletions, value changes)

## Next Steps

1. **Complete Dataset Detail Page**:
   - Column profiling table
   - Quality dimension charts
   - Lineage graph visualization

2. **Build DQA Pipeline Page**:
   - Workflow canvas with React Flow
   - Step configuration modals
   - Execution monitoring

3. **Implement Rule Studio**:
   - Template library grid
   - Rule builder form
   - Code preview with syntax highlighting

4. **AI Copilot Integration**:
   - Chat UI component
   - OpenAI API integration
   - Function calling handlers
   - Auto-fix diff viewer

5. **Backend Integration**:
   - Replace mock data with API calls
   - Implement TanStack Query
   - Error handling and loading states
   - Optimistic updates

## Testing Strategy (Future)

- **Unit Tests**: Vitest for utilities and hooks
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright for critical user flows
- **API Mocking**: MSW for development and testing

## Deployment (Future)

- **Build**: `pnpm build` generates optimized production bundle
- **Hosting**: Vercel, Netlify, or AWS S3 + CloudFront
- **Environment Variables**:
  - `VITE_API_BASE_URL`: Backend API URL
  - `VITE_OPENAI_API_KEY`: OpenAI API key (backend proxy recommended)

## Contributing Guidelines

1. **Code Style**: Follow existing inline styles pattern
2. **Commits**: Use conventional commits (feat, fix, docs, etc.)
3. **Components**: Keep atomic design principles
4. **State**: Use Zustand for global state, useState for local
5. **Types**: Always use TypeScript types, avoid `any`

## Resources

- **Design Reference**: StarDQ PRD document
- **Icons**: Lucide React (https://lucide.dev)
- **Colors**: StarDQ brand guidelines
- **Fonts**: Bw Gradual (headings), Segoe UI (body)

---

**Last Updated**: 2025-10-31
**Version**: 0.2.0 (Dashboard and Data Catalog complete)
**Maintainer**: Claude Code AI Assistant
