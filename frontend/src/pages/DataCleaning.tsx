import { useState } from 'react'
import {
  Wand2,
  Sparkles,
  Play,
  Copy,
  Check,
  AlertTriangle,
  TrendingUp,
  Database,
  FileCode,
  Eye,
  Settings,
  Filter,
  Search,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  BarChart3,
  FileText,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react'

interface Dataset {
  id: string
  name: string
  rowCount: number
  columnCount: number
}

interface ColumnProfile {
  name: string
  type: string
  nullCount: number
  nullPercent: number
  uniqueCount: number
  uniquePercent: number
  validCount: number
  invalidCount: number
  issues: string[]
}

interface DataIssue {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: 'missing' | 'invalid' | 'duplicate' | 'outlier' | 'format' | 'inconsistency'
  column: string
  description: string
  affectedRows: number
  affectedPercent: number
  suggestedFix: string
  autoFixable: boolean
}

interface CleaningOperation {
  id: string
  name: string
  type: 'standardization' | 'validation' | 'imputation' | 'deduplication' | 'transformation' | 'outlier_removal'
  description: string
  affectedColumns: string[]
  affectedRows: number
  status: 'pending' | 'running' | 'completed' | 'failed'
  aiGenerated: boolean
  code: string
  priority: 'high' | 'medium' | 'low'
  impact: {
    before: { valid: number; invalid: number; missing: number }
    after: { valid: number; invalid: number; missing: number }
  }
  executionTime?: number
  error?: string
}

const mockDatasets: Dataset[] = [
  { id: '1', name: 'Customer Data', rowCount: 10000, columnCount: 15 },
  { id: '2', name: 'Order History', rowCount: 45000, columnCount: 12 },
  { id: '3', name: 'Product Catalog', rowCount: 5000, columnCount: 20 },
  { id: '4', name: 'Transaction Log', rowCount: 120000, columnCount: 18 }
]

const mockColumnProfiles: ColumnProfile[] = [
  {
    name: 'email',
    type: 'VARCHAR',
    nullCount: 45,
    nullPercent: 0.45,
    uniqueCount: 9955,
    uniquePercent: 99.55,
    validCount: 9505,
    invalidCount: 450,
    issues: ['Invalid format (450)', 'Missing values (45)']
  },
  {
    name: 'phone',
    type: 'VARCHAR',
    nullCount: 120,
    nullPercent: 1.2,
    uniqueCount: 9880,
    uniquePercent: 98.8,
    validCount: 9180,
    invalidCount: 700,
    issues: ['Inconsistent format (700)', 'Missing values (120)']
  },
  {
    name: 'date_of_birth',
    type: 'DATE',
    nullCount: 350,
    nullPercent: 3.5,
    uniqueCount: 8500,
    uniquePercent: 85.0,
    validCount: 9450,
    invalidCount: 200,
    issues: ['Future dates (150)', 'Invalid format (50)', 'Missing values (350)']
  },
  {
    name: 'customer_id',
    type: 'INTEGER',
    nullCount: 0,
    nullPercent: 0,
    uniqueCount: 9755,
    uniquePercent: 97.55,
    validCount: 9755,
    invalidCount: 0,
    issues: ['Duplicates (245)']
  },
  {
    name: 'status',
    type: 'VARCHAR',
    nullCount: 0,
    nullPercent: 0,
    uniqueCount: 8,
    uniquePercent: 0.08,
    validCount: 9850,
    invalidCount: 150,
    issues: ['Inconsistent values (150)']
  }
]

const mockDataIssues: DataIssue[] = [
  {
    id: '1',
    severity: 'high',
    type: 'invalid',
    column: 'phone',
    description: 'Phone numbers have inconsistent formatting',
    affectedRows: 700,
    affectedPercent: 7.0,
    suggestedFix: 'Standardize to (XXX) XXX-XXXX format',
    autoFixable: true
  },
  {
    id: '2',
    severity: 'critical',
    type: 'invalid',
    column: 'email',
    description: 'Email addresses contain invalid characters or missing @ symbol',
    affectedRows: 450,
    affectedPercent: 4.5,
    suggestedFix: 'Apply RFC 5322 email validation and flag invalid entries',
    autoFixable: false
  },
  {
    id: '3',
    severity: 'medium',
    type: 'missing',
    column: 'date_of_birth',
    description: 'Missing date of birth values',
    affectedRows: 350,
    affectedPercent: 3.5,
    suggestedFix: 'Fill with median date or leave as NULL',
    autoFixable: true
  },
  {
    id: '4',
    severity: 'high',
    type: 'duplicate',
    column: 'customer_id',
    description: 'Duplicate customer records detected',
    affectedRows: 245,
    affectedPercent: 2.45,
    suggestedFix: 'Remove duplicates, keep first occurrence',
    autoFixable: true
  },
  {
    id: '5',
    severity: 'medium',
    type: 'format',
    column: 'status',
    description: 'Status values have inconsistent casing',
    affectedRows: 150,
    affectedPercent: 1.5,
    suggestedFix: 'Normalize to uppercase',
    autoFixable: true
  },
  {
    id: '6',
    severity: 'high',
    type: 'invalid',
    column: 'date_of_birth',
    description: 'Future dates detected in date_of_birth',
    affectedRows: 150,
    affectedPercent: 1.5,
    suggestedFix: 'Flag as invalid or set to NULL',
    autoFixable: true
  },
  {
    id: '7',
    severity: 'low',
    type: 'missing',
    column: 'phone',
    description: 'Missing phone number values',
    affectedRows: 120,
    affectedPercent: 1.2,
    suggestedFix: 'Leave as NULL or request from customer',
    autoFixable: false
  }
]

const mockOperations: CleaningOperation[] = [
  {
    id: '1',
    name: 'Standardize Email Format',
    type: 'standardization',
    description: 'Convert emails to lowercase and trim whitespace',
    affectedColumns: ['email'],
    affectedRows: 10000,
    status: 'completed',
    aiGenerated: true,
    priority: 'medium',
    code: `import pandas as pd
import numpy as np

# Standardize email format
df['email'] = df['email'].str.lower().str.strip()
df['email'] = df['email'].replace('', np.nan)

print(f"Standardized {len(df)} email addresses")`,
    impact: {
      before: { valid: 9500, invalid: 450, missing: 50 },
      after: { valid: 9550, invalid: 400, missing: 50 }
    },
    executionTime: 245
  },
  {
    id: '2',
    name: 'Validate & Standardize Phone Numbers',
    type: 'validation',
    description: 'Validate phone format and standardize to (XXX) XXX-XXXX',
    affectedColumns: ['phone'],
    affectedRows: 10000,
    status: 'pending',
    aiGenerated: true,
    priority: 'high',
    code: `import re

def standardize_phone(phone):
    """Standardize phone to (XXX) XXX-XXXX format"""
    if pd.isna(phone):
        return np.nan

    # Remove all non-digits
    digits = re.sub(r'\\D', '', str(phone))

    # Validate length
    if len(digits) == 10:
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    else:
        return np.nan

df['phone'] = df['phone'].apply(standardize_phone)
print(f"Standardized {df['phone'].notna().sum()} phone numbers")`,
    impact: {
      before: { valid: 9180, invalid: 700, missing: 120 },
      after: { valid: 9880, invalid: 0, missing: 120 }
    }
  },
  {
    id: '3',
    name: 'Fill Missing Dates with Median',
    type: 'imputation',
    description: 'Impute missing date_of_birth with median value',
    affectedColumns: ['date_of_birth'],
    affectedRows: 350,
    status: 'pending',
    aiGenerated: true,
    priority: 'medium',
    code: `from datetime import datetime
import pandas as pd

# Convert to datetime
df['date_of_birth'] = pd.to_datetime(df['date_of_birth'], errors='coerce')

# Calculate median date
median_date = df['date_of_birth'].median()

# Fill missing values
df['date_of_birth'].fillna(median_date, inplace=True)

print(f"Filled {350} missing date values with {median_date}")`,
    impact: {
      before: { valid: 9450, invalid: 200, missing: 350 },
      after: { valid: 9800, invalid: 200, missing: 0 }
    }
  },
  {
    id: '4',
    name: 'Remove Duplicate Customer Records',
    type: 'deduplication',
    description: 'Remove duplicate records based on customer_id, keep first',
    affectedColumns: ['customer_id'],
    affectedRows: 245,
    status: 'pending',
    aiGenerated: true,
    priority: 'high',
    code: `# Identify duplicates
duplicates = df[df.duplicated(subset=['customer_id'], keep='first')]
print(f"Found {len(duplicates)} duplicate records")

# Show duplicate customer_ids
duplicate_ids = duplicates['customer_id'].unique()
print(f"Duplicate customer IDs: {duplicate_ids[:10]}...")

# Remove duplicates, keep first occurrence
df_cleaned = df.drop_duplicates(subset=['customer_id'], keep='first')

print(f"Removed {len(df) - len(df_cleaned)} records")
print(f"Dataset size: {len(df)} → {len(df_cleaned)}")`,
    impact: {
      before: { valid: 10245, invalid: 0, missing: 0 },
      after: { valid: 10000, invalid: 0, missing: 0 }
    }
  },
  {
    id: '5',
    name: 'Normalize Status Values',
    type: 'transformation',
    description: 'Standardize status column to uppercase with mapping',
    affectedColumns: ['status'],
    affectedRows: 10000,
    status: 'pending',
    aiGenerated: true,
    priority: 'low',
    code: `# Define status mapping for consistency
status_mapping = {
    'active': 'ACTIVE',
    'Active': 'ACTIVE',
    'ACTIVE': 'ACTIVE',
    'inactive': 'INACTIVE',
    'Inactive': 'INACTIVE',
    'INACTIVE': 'INACTIVE',
    'pending': 'PENDING',
    'Pending': 'PENDING',
    'PENDING': 'PENDING'
}

# Apply mapping, unknown values become 'UNKNOWN'
df['status'] = df['status'].map(status_mapping).fillna('UNKNOWN')

# Show distribution
print("Status distribution:")
print(df['status'].value_counts())`,
    impact: {
      before: { valid: 9850, invalid: 150, missing: 0 },
      after: { valid: 10000, invalid: 0, missing: 0 }
    }
  },
  {
    id: '6',
    name: 'Remove Future Dates',
    type: 'outlier_removal',
    description: 'Flag future dates in date_of_birth as invalid (set to NULL)',
    affectedColumns: ['date_of_birth'],
    affectedRows: 150,
    status: 'pending',
    aiGenerated: true,
    priority: 'high',
    code: `from datetime import datetime
import pandas as pd

# Convert to datetime
df['date_of_birth'] = pd.to_datetime(df['date_of_birth'], errors='coerce')

# Get current date
current_date = datetime.now()

# Find future dates
future_dates_mask = df['date_of_birth'] > current_date
future_count = future_dates_mask.sum()

# Set future dates to NaN
df.loc[future_dates_mask, 'date_of_birth'] = np.nan

print(f"Flagged {future_count} future dates as invalid")
print(f"Valid dates remaining: {df['date_of_birth'].notna().sum()}")`,
    impact: {
      before: { valid: 9450, invalid: 200, missing: 350 },
      after: { valid: 9450, invalid: 0, missing: 550 }
    }
  }
]

export function DataCleaning() {
  const [selectedDataset, setSelectedDataset] = useState<Dataset>(mockDatasets[0])
  const [activeTab, setActiveTab] = useState<'issues' | 'operations' | 'columns'>('issues')
  const [selectedOperation, setSelectedOperation] = useState<CleaningOperation | null>(null)
  const [selectedIssue, setSelectedIssue] = useState<DataIssue | null>(null)
  const [operations, setOperations] = useState<CleaningOperation[]>(mockOperations)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [filterSeverity, setFilterSeverity] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const calculateImprovement = (op: CleaningOperation) => {
    const beforeValid = (op.impact.before.valid /
      (op.impact.before.valid + op.impact.before.invalid + op.impact.before.missing)) * 100
    const afterValid = (op.impact.after.valid /
      (op.impact.after.valid + op.impact.after.invalid + op.impact.after.missing)) * 100
    return (afterValid - beforeValid).toFixed(1)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ef4444'
      case 'high': return '#FFA500'
      case 'medium': return '#f59e0b'
      case 'low': return '#00B3CA'
      default: return '#64748B'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'standardization': return Wand2
      case 'validation': return FileCode
      case 'imputation': return TrendingUp
      case 'deduplication': return Database
      case 'transformation': return Settings
      case 'outlier_removal': return Filter
      default: return FileText
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#FFA500'
      case 'low': return '#00B3CA'
      default: return '#64748B'
    }
  }

  const filteredIssues = mockDataIssues.filter(issue => {
    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) return false
    if (filterType !== 'all' && issue.type !== filterType) return false
    return true
  })

  const criticalIssues = mockDataIssues.filter(i => i.severity === 'critical').length
  const autoFixableIssues = mockDataIssues.filter(i => i.autoFixable).length
  const completedOps = operations.filter(o => o.status === 'completed').length
  const pendingOps = operations.filter(o => o.status === 'pending').length

  const handleAutoClean = () => {
    // Generate cleaning operations for all auto-fixable issues
    const autoFixableOps = operations.filter(op =>
      mockDataIssues.some(issue => issue.autoFixable && issue.column === op.affectedColumns[0])
    )
    alert(`AI Auto-Clean: Generating ${autoFixableOps.length} cleaning operations for auto-fixable issues...`)
  }

  const handleExecuteOperation = (opId: string) => {
    setOperations(ops => ops.map(op =>
      op.id === opId ? { ...op, status: 'running' as const } : op
    ))

    // Simulate execution
    setTimeout(() => {
      setOperations(ops => ops.map(op =>
        op.id === opId ? {
          ...op,
          status: 'completed' as const,
          executionTime: Math.floor(Math.random() * 500) + 100
        } : op
      ))
    }, 2000)
  }

  const handleExecuteAll = () => {
    const pendingOps = operations.filter(op => op.status === 'pending')
    pendingOps.forEach(op => handleExecuteOperation(op.id))
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 64px)',
      backgroundColor: '#F8F9FA'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        backgroundColor: 'white',
        borderBottom: '2px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#012F35',
              marginBottom: '8px',
              fontFamily: 'Bw Gradual, Segoe UI, system-ui, sans-serif'
            }}>
              AI Data Cleaning
            </h1>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              Automated data quality improvement with AI-powered recommendations
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowPreview(!showPreview)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: showPreview ? '#007787' : '#E7F9F5',
                color: showPreview ? 'white' : '#007787',
                border: showPreview ? 'none' : '1px solid #00B3CA',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Eye size={18} />
              {showPreview ? 'Exit Preview' : 'Preview Changes'}
            </button>
            <button
              onClick={handleAutoClean}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: '#FFA500',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={18} />
              AI Auto-Clean
            </button>
            <button
              onClick={handleExecuteAll}
              disabled={pendingOps === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: pendingOps === 0 ? '#E2E8F0' : '#007787',
                color: pendingOps === 0 ? '#94A3B8' : 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: pendingOps === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <Play size={18} />
              Execute All ({pendingOps})
            </button>
          </div>
        </div>

        {/* Dataset Selector & Stats */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px', display: 'block' }}>
              Select Dataset
            </label>
            <select
              value={selectedDataset.id}
              onChange={(e) => setSelectedDataset(mockDatasets.find(d => d.id === e.target.value)!)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {mockDatasets.map(dataset => (
                <option key={dataset.id} value={dataset.id}>
                  {dataset.name} ({dataset.rowCount.toLocaleString()} rows, {dataset.columnCount} columns)
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', flex: 2 }}>
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#FEF2F2',
              borderRadius: '8px',
              border: '2px solid #ef4444'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Critical Issues</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>
                {criticalIssues}
              </div>
            </div>
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#FFF7ED',
              borderRadius: '8px',
              border: '2px solid #FFA500'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Total Issues</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFA500' }}>
                {filteredIssues.length}
              </div>
            </div>
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#F0FDF4',
              borderRadius: '8px',
              border: '2px solid #10b981'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Auto-Fixable</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
                {autoFixableIssues}
              </div>
            </div>
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#E7F9F5',
              borderRadius: '8px',
              border: '2px solid #007787'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Completed</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007787' }}>
                {completedOps}/{operations.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Panel - Tabs */}
        <div style={{
          width: selectedOperation || selectedIssue ? '45%' : '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s'
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '4px',
            padding: '16px 24px 0 24px',
            backgroundColor: '#F8F9FA',
            borderBottom: '2px solid #E2E8F0'
          }}>
            {(['issues', 'operations', 'columns'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setSelectedOperation(null)
                  setSelectedIssue(null)
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: activeTab === tab ? 'white' : 'transparent',
                  color: activeTab === tab ? '#007787' : '#64748B',
                  border: 'none',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '3px solid #007787' : 'none',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
                {tab === 'issues' && ` (${filteredIssues.length})`}
                {tab === 'operations' && ` (${operations.length})`}
                {tab === 'columns' && ` (${mockColumnProfiles.length})`}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {/* Issues Tab */}
            {activeTab === 'issues' && (
              <div>
                {/* Filters */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Types</option>
                    <option value="missing">Missing</option>
                    <option value="invalid">Invalid</option>
                    <option value="duplicate">Duplicate</option>
                    <option value="outlier">Outlier</option>
                    <option value="format">Format</option>
                  </select>
                </div>

                {/* Issue Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {filteredIssues.map(issue => (
                    <div
                      key={issue.id}
                      onClick={() => setSelectedIssue(issue)}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        padding: '16px',
                        border: selectedIssue?.id === issue.id ? `2px solid ${getSeverityColor(issue.severity)}` : '1px solid #E2E8F0',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedIssue?.id !== issue.id) {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{
                              padding: '3px 10px',
                              backgroundColor: `${getSeverityColor(issue.severity)}20`,
                              color: getSeverityColor(issue.severity),
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '700',
                              textTransform: 'uppercase'
                            }}>
                              {issue.severity}
                            </span>
                            <span style={{
                              padding: '3px 10px',
                              backgroundColor: '#F8F9FA',
                              color: '#64748B',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '600',
                              textTransform: 'uppercase'
                            }}>
                              {issue.type}
                            </span>
                            {issue.autoFixable && (
                              <span style={{
                                padding: '3px 10px',
                                backgroundColor: '#F0FDF4',
                                color: '#10b981',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <Zap size={10} />
                                AUTO-FIX
                              </span>
                            )}
                          </div>
                          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#012F35', marginBottom: '6px' }}>
                            {issue.column}
                          </h3>
                          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
                            {issue.description}
                          </p>
                          <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                            <div>
                              <span style={{ color: '#64748B' }}>Affected: </span>
                              <span style={{ fontWeight: '600', color: '#012F35' }}>
                                {issue.affectedRows.toLocaleString()} rows ({issue.affectedPercent}%)
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={20} style={{ color: '#64748B' }} />
                      </div>
                      <div style={{
                        padding: '10px 12px',
                        backgroundColor: '#F8F9FA',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#007787',
                        fontWeight: '500'
                      }}>
                        💡 {issue.suggestedFix}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Operations Tab */}
            {activeTab === 'operations' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {operations.map(op => {
                  const TypeIcon = getTypeIcon(op.type)
                  return (
                    <div
                      key={op.id}
                      onClick={() => setSelectedOperation(op)}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        padding: '16px',
                        border: selectedOperation?.id === op.id ? '2px solid #007787' : '1px solid #E2E8F0',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedOperation?.id !== op.id) {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                        <div style={{
                          backgroundColor: '#E7F9F5',
                          padding: '10px',
                          borderRadius: '8px',
                          height: 'fit-content'
                        }}>
                          <TypeIcon size={20} style={{ color: '#007787' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                              {op.name}
                            </h3>
                            {op.aiGenerated && (
                              <Sparkles size={14} style={{ color: '#FFA500' }} />
                            )}
                            <span style={{
                              padding: '2px 8px',
                              backgroundColor: `${getPriorityColor(op.priority)}20`,
                              color: getPriorityColor(op.priority),
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '700',
                              textTransform: 'uppercase'
                            }}>
                              {op.priority}
                            </span>
                          </div>
                          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                            {op.description}
                          </p>
                        </div>
                        <div style={{
                          padding: '6px 12px',
                          backgroundColor:
                            op.status === 'completed' ? '#F0FDF4' :
                            op.status === 'running' ? '#FFF7ED' :
                            op.status === 'failed' ? '#FEF2F2' :
                            '#F8F9FA',
                          color:
                            op.status === 'completed' ? '#10b981' :
                            op.status === 'running' ? '#FFA500' :
                            op.status === 'failed' ? '#ef4444' :
                            '#64748B',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          height: 'fit-content',
                          textTransform: 'capitalize',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          {op.status === 'completed' && <CheckCircle2 size={12} />}
                          {op.status === 'running' && <RefreshCw size={12} style={{ animation: 'spin 1s linear infinite' }} />}
                          {op.status === 'failed' && <XCircle size={12} />}
                          {op.status}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                        <div style={{
                          padding: '8px',
                          backgroundColor: '#F8F9FA',
                          borderRadius: '6px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Affected</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#012F35' }}>
                            {op.affectedRows.toLocaleString()}
                          </div>
                        </div>
                        <div style={{
                          padding: '8px',
                          backgroundColor: '#F8F9FA',
                          borderRadius: '6px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Improvement</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#10b981' }}>
                            +{calculateImprovement(op)}%
                          </div>
                        </div>
                        <div style={{
                          padding: '8px',
                          backgroundColor: '#F8F9FA',
                          borderRadius: '6px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Time</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748B' }}>
                            {op.executionTime ? `${op.executionTime}ms` : '-'}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        {op.status === 'pending' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleExecuteOperation(op.id)
                            }}
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              backgroundColor: '#007787',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <Play size={14} />
                            Execute
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedOperation(op)
                          }}
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            backgroundColor: '#F8F9FA',
                            color: '#007787',
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <Eye size={14} />
                          View Code
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Columns Tab */}
            {activeTab === 'columns' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {mockColumnProfiles.map(col => (
                  <div
                    key={col.name}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '16px',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#012F35', marginBottom: '4px' }}>
                          {col.name}
                        </h3>
                        <span style={{
                          padding: '2px 8px',
                          backgroundColor: '#F8F9FA',
                          color: '#64748B',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          {col.type}
                        </span>
                      </div>
                      {col.issues.length > 0 && (
                        <span style={{
                          padding: '4px 10px',
                          backgroundColor: '#FEF2F2',
                          color: '#ef4444',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          {col.issues.length} Issue{col.issues.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ padding: '8px', backgroundColor: '#F8F9FA', borderRadius: '6px' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Completeness</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: col.nullPercent > 5 ? '#ef4444' : '#10b981' }}>
                          {(100 - col.nullPercent).toFixed(1)}%
                        </div>
                      </div>
                      <div style={{ padding: '8px', backgroundColor: '#F8F9FA', borderRadius: '6px' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Uniqueness</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#007787' }}>
                          {col.uniquePercent.toFixed(1)}%
                        </div>
                      </div>
                      <div style={{ padding: '8px', backgroundColor: '#F8F9FA', borderRadius: '6px' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Valid</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#10b981' }}>
                          {col.validCount.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ padding: '8px', backgroundColor: '#F8F9FA', borderRadius: '6px' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Invalid</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: col.invalidCount > 0 ? '#ef4444' : '#64748B' }}>
                          {col.invalidCount.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {col.issues.length > 0 && (
                      <div style={{
                        padding: '10px 12px',
                        backgroundColor: '#FFF7ED',
                        borderRadius: '6px',
                        border: '1px solid #FFA500'
                      }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: '#FFA500', marginBottom: '6px' }}>
                          DETECTED ISSUES
                        </div>
                        {col.issues.map((issue, idx) => (
                          <div key={idx} style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>
                            • {issue}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Details */}
        {(selectedOperation || selectedIssue) && (
          <div style={{
            width: '55%',
            backgroundColor: 'white',
            borderLeft: '2px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {selectedOperation && (
              <>
                {/* Operation Details Header */}
                <div style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #E2E8F0',
                  backgroundColor: '#F8F9FA'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#012F35', marginBottom: '8px' }}>
                        {selectedOperation.name}
                      </h2>
                      <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                        {selectedOperation.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedOperation(null)}
                      style={{
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748B',
                        fontSize: '20px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Operation Details Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                  {/* Impact Analysis */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
                      Impact Analysis
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px', fontWeight: '600' }}>
                          Before Cleaning
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{
                            padding: '8px 12px',
                            backgroundColor: '#F0FDF4',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <span style={{ fontSize: '13px', color: '#64748B' }}>Valid</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>
                              {selectedOperation.impact.before.valid.toLocaleString()}
                            </span>
                          </div>
                          <div style={{
                            padding: '8px 12px',
                            backgroundColor: '#FEF2F2',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <span style={{ fontSize: '13px', color: '#64748B' }}>Invalid</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#ef4444' }}>
                              {selectedOperation.impact.before.invalid.toLocaleString()}
                            </span>
                          </div>
                          <div style={{
                            padding: '8px 12px',
                            backgroundColor: '#FFF7ED',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <span style={{ fontSize: '13px', color: '#64748B' }}>Missing</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#FFA500' }}>
                              {selectedOperation.impact.before.missing.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px', fontWeight: '600' }}>
                          After Cleaning
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{
                            padding: '8px 12px',
                            backgroundColor: '#F0FDF4',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <span style={{ fontSize: '13px', color: '#64748B' }}>Valid</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>
                              {selectedOperation.impact.after.valid.toLocaleString()}
                            </span>
                          </div>
                          <div style={{
                            padding: '8px 12px',
                            backgroundColor: '#FEF2F2',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <span style={{ fontSize: '13px', color: '#64748B' }}>Invalid</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#ef4444' }}>
                              {selectedOperation.impact.after.invalid.toLocaleString()}
                            </span>
                          </div>
                          <div style={{
                            padding: '8px 12px',
                            backgroundColor: '#FFF7ED',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <span style={{ fontSize: '13px', color: '#64748B' }}>Missing</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#FFA500' }}>
                              {selectedOperation.impact.after.missing.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Improvement Badge */}
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#E7F9F5',
                      borderRadius: '8px',
                      border: '2px solid #00B3CA',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007787', marginBottom: '4px' }}>
                        +{calculateImprovement(selectedOperation)}%
                      </div>
                      <div style={{ fontSize: '13px', color: '#007787' }}>
                        Quality Improvement
                      </div>
                    </div>
                  </div>

                  {/* Code Preview */}
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
                      Generated Code (Python/Pandas)
                    </h3>
                    <div style={{
                      backgroundColor: '#1e1e1e',
                      borderRadius: '8px',
                      padding: '16px',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      color: '#d4d4d4',
                      position: 'relative',
                      overflow: 'auto'
                    }}>
                      <button
                        onClick={() => handleCopyCode(selectedOperation.code)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '6px 12px',
                          backgroundColor: copiedCode === selectedOperation.code ? '#10b981' : '#374151',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {copiedCode === selectedOperation.code ? (
                          <>
                            <Check size={14} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                      <pre style={{ margin: 0, marginTop: '24px' }}>
                        <code>{selectedOperation.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedIssue && (
              <>
                {/* Issue Details Header */}
                <div style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #E2E8F0',
                  backgroundColor: '#F8F9FA'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#012F35', margin: 0 }}>
                          {selectedIssue.column}
                        </h2>
                        <span style={{
                          padding: '4px 12px',
                          backgroundColor: `${getSeverityColor(selectedIssue.severity)}20`,
                          color: getSeverityColor(selectedIssue.severity),
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          textTransform: 'uppercase'
                        }}>
                          {selectedIssue.severity}
                        </span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                        {selectedIssue.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedIssue(null)}
                      style={{
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748B',
                        fontSize: '20px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Issue Details Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
                      Issue Statistics
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#FEF2F2',
                        borderRadius: '8px',
                        border: '2px solid #ef4444'
                      }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', marginBottom: '4px' }}>
                          {selectedIssue.affectedRows.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>
                          Affected Rows
                        </div>
                      </div>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#FFF7ED',
                        borderRadius: '8px',
                        border: '2px solid #FFA500'
                      }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFA500', marginBottom: '4px' }}>
                          {selectedIssue.affectedPercent}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>
                          Of Total Dataset
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: '16px',
                    backgroundColor: '#E7F9F5',
                    borderRadius: '10px',
                    border: '2px solid #00B3CA',
                    marginBottom: '24px'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#007787', marginBottom: '8px' }}>
                      💡 AI SUGGESTED FIX
                    </div>
                    <div style={{ fontSize: '14px', color: '#012F35' }}>
                      {selectedIssue.suggestedFix}
                    </div>
                  </div>

                  {selectedIssue.autoFixable && (
                    <button style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: '#007787',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <Zap size={18} />
                      Apply Auto-Fix
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
