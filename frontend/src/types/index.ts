/**
 * StarDQ 2.0 Type Definitions
 */

// ============================================================================
// Common Types
// ============================================================================

export type UUID = string

export type Timestamp = string

// ============================================================================
// Badge & Data Quality Types
// ============================================================================

export type Badge = 'Bronze' | 'Silver' | 'Gold'

export type BadgeVariant = 'bronze' | 'silver' | 'gold'

export interface DQKPIs {
  completeness: number // 0-1
  validity: number // 0-1
  uniqueness: number // 0-1
  freshness: number // 0-1
  weightedScore: number // 0-1
}

// ============================================================================
// Domain & Dataset Types
// ============================================================================

export type Domain = 'Sales' | 'Marketing' | 'Ops' | 'Finance' | 'HR' | 'Support' | 'Other'

export interface Dataset {
  id: UUID
  name: string
  domain: Domain
  description?: string
  schema: Record<string, any>
  profile: ProfileSummary
  badge: Badge
  qualityScore: number // 0-1
  lineage?: string // graph_ref
  owner: UUID // user_ref
  createdAt: Timestamp
  updatedAt: Timestamp
  lastModified: Timestamp
}

export interface ProfileSummary {
  totalRows: number
  totalColumns: number
  completeness: number // 0-1
  validity: number // 0-1
  uniqueness: number // 0-1
  missingValues: number
  nullRate: Record<string, number> // column -> rate
  dupRate: number
  outliers: string[] // column names
  patterns: Record<string, string> // column -> pattern
}

// ============================================================================
// Rules & DQ Jobs
// ============================================================================

export type RuleActionType =
  | 'normalize_phone'
  | 'normalize_email'
  | 'merge'
  | 'mask'
  | 'validate'
  | 'standardize'
  | 'enrich'

export interface Ruleset {
  id: UUID
  name: string
  dsl: string // YAML
  version: string // semver
  createdBy: UUID
  createdAt: Timestamp
}

export type DQJobStatus = 'queued' | 'running' | 'completed' | 'failed'

export interface DQJob {
  id: UUID
  datasetId: UUID
  status: DQJobStatus
  kpiDiff: Partial<DQKPIs>
  logsRef: string
  startedAt: Timestamp
  finishedAt?: Timestamp
}

// ============================================================================
// Alerts & Notifications
// ============================================================================

export type AlertType =
  | 'connection_failed'
  | 'pii_violation'
  | 'freshness_drop'
  | 'uniqueness_drop'
  | 'policy_breach'

export type AlertSeverity = 'low' | 'medium' | 'high'

export interface Alert {
  id: UUID
  type: AlertType
  severity: AlertSeverity
  datasetId: UUID
  message: string
  createdAt: Timestamp
  ackBy?: UUID | null
}

// ============================================================================
// User & RBAC Types
// ============================================================================

export type Role =
  | 'it_admin'
  | 'data_steward'
  | 'business_analyst'
  | 'viewer'
  | 'auditor'
  | 'exec'

export interface User {
  id: UUID
  email: string
  name: string
  role: Role
  avatar?: string
  createdAt: Timestamp
}

export type Permission =
  | 'tenant.manage'
  | 'users.manage'
  | 'connectors.manage'
  | 'policies.manage'
  | 'audit.read'
  | 'rules.create'
  | 'rules.update'
  | 'dq.run'
  | 'sla.manage'
  | 'alerts.manage'
  | 'exports.read'
  | 'datasets.read'
  | 'dq.preview'
  | 'dq.apply_safe'
  | 'export.run'
  | 'dashboards.read'
  | 'compliance.read'
  | 'exec.summary.read'

// ============================================================================
// AI Copilot Types
// ============================================================================

export type CopilotSuggestionType =
  | 'profiling_insight'
  | 'rule_generation'
  | 'auto_fix'
  | 'deduplication'
  | 'normalization'
  | 'masking'

export type RiskLevel = 'low' | 'medium' | 'high'

export interface CopilotSuggestion {
  id: UUID
  type: CopilotSuggestionType
  title: string
  description: string
  riskLevel: RiskLevel
  autoExecutable: boolean
  code?: string // transformation code
  diff?: {
    before: any[]
    after: any[]
  }
  confidence: number // 0-1
  createdAt: Timestamp
}

export interface CopilotMessage {
  id: UUID
  role: 'user' | 'assistant'
  content: string
  suggestions?: CopilotSuggestion[]
  timestamp: Timestamp
}

// ============================================================================
// Health & Status Types
// ============================================================================

export type HealthStatus = 'healthy' | 'degraded' | 'down'

export interface ConnectorHealth {
  id: UUID
  name: string
  type: string
  status: HealthStatus
  lastCheckAt: Timestamp
  errorMessage?: string
}

// ============================================================================
// Export Types
// ============================================================================

export type ExportFormat = 'excel' | 'csv' | 'snowflake' | 'tableau' | 'powerbi'

export interface ExportJob {
  id: UUID
  datasetId: UUID
  format: ExportFormat
  status: 'pending' | 'processing' | 'completed' | 'failed'
  downloadUrl?: string
  createdAt: Timestamp
  completedAt?: Timestamp
}

// ============================================================================
// Lineage Types
// ============================================================================

export interface LineageNode {
  id: UUID
  label: string
  type: 'source' | 'transformation' | 'destination'
}

export interface LineageEdge {
  from: UUID
  to: UUID
  label?: string
}

export interface LineageGraph {
  nodes: LineageNode[]
  edges: LineageEdge[]
}
