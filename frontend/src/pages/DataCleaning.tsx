import { useState } from 'react'
import {
  Wand2,
  Database,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Download,
  Upload,
  Code,
  Eye,
  Sparkles,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react'

interface CleaningOperation {
  id: string
  name: string
  type: 'standardization' | 'validation' | 'imputation' | 'deduplication' | 'transformation'
  description: string
  affectedColumns: string[]
  affectedRows: number
  status: 'pending' | 'running' | 'completed' | 'failed'
  aiGenerated: boolean
  code: string
  impact: {
    before: { valid: number; invalid: number; missing: number }
    after: { valid: number; invalid: number; missing: number }
  }
}

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
    code: `df['email'] = df['email'].str.lower().str.strip()
df['email'] = df['email'].replace('', np.nan)`,
    impact: {
      before: { valid: 9500, invalid: 450, missing: 50 },
      after: { valid: 9550, invalid: 400, missing: 50 }
    }
  },
  {
    id: '2',
    name: 'Validate Phone Numbers',
    type: 'validation',
    description: 'Check phone number format and flag invalid entries',
    affectedColumns: ['phone'],
    affectedRows: 10000,
    status: 'running',
    aiGenerated: true,
    code: `import re

def validate_phone(phone):
    pattern = r'^\\(\\d{3}\\) \\d{3}-\\d{4}$'
    return bool(re.match(pattern, str(phone)))

df['phone_valid'] = df['phone'].apply(validate_phone)
df.loc[~df['phone_valid'], 'phone'] = np.nan`,
    impact: {
      before: { valid: 9200, invalid: 680, missing: 120 },
      after: { valid: 9200, invalid: 0, missing: 800 }
    }
  },
  {
    id: '3',
    name: 'Fill Missing Dates',
    type: 'imputation',
    description: 'Impute missing dates with median value',
    affectedColumns: ['created_at', 'updated_at'],
    affectedRows: 350,
    status: 'pending',
    aiGenerated: true,
    code: `from datetime import datetime

for col in ['created_at', 'updated_at']:
    median_date = df[col].median()
    df[col].fillna(median_date, inplace=True)`,
    impact: {
      before: { valid: 9650, invalid: 0, missing: 350 },
      after: { valid: 10000, invalid: 0, missing: 0 }
    }
  },
  {
    id: '4',
    name: 'Remove Duplicate Records',
    type: 'deduplication',
    description: 'Remove duplicate customer records based on email',
    affectedColumns: ['customer_id', 'email'],
    affectedRows: 245,
    status: 'pending',
    aiGenerated: false,
    code: `# Find duplicates
duplicates = df[df.duplicated(subset=['email'], keep='first')]
print(f"Found {len(duplicates)} duplicate records")

# Remove duplicates, keep first occurrence
df.drop_duplicates(subset=['email'], keep='first', inplace=True)
print(f"Removed {len(duplicates)} records")`,
    impact: {
      before: { valid: 10245, invalid: 0, missing: 0 },
      after: { valid: 10000, invalid: 0, missing: 0 }
    }
  },
  {
    id: '5',
    name: 'Normalize Status Values',
    type: 'transformation',
    description: 'Standardize status column to uppercase',
    affectedColumns: ['status'],
    affectedRows: 10000,
    status: 'pending',
    aiGenerated: true,
    code: `# Map variations to standard values
status_mapping = {
    'active': 'ACTIVE',
    'Active': 'ACTIVE',
    'ACTIVE': 'ACTIVE',
    'inactive': 'INACTIVE',
    'Inactive': 'INACTIVE',
    'pending': 'PENDING'
}

df['status'] = df['status'].map(status_mapping).fillna('UNKNOWN')`,
    impact: {
      before: { valid: 9850, invalid: 150, missing: 0 },
      after: { valid: 10000, invalid: 0, missing: 0 }
    }
  }
]

export function DataCleaning() {
  const [operations] = useState<CleaningOperation[]>(mockOperations)
  const [selectedOp, setSelectedOp] = useState<CleaningOperation | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const stats = {
    total: operations.length,
    pending: operations.filter(o => o.status === 'pending').length,
    running: operations.filter(o => o.status === 'running').length,
    completed: operations.filter(o => o.status === 'completed').length,
    aiGenerated: operations.filter(o => o.aiGenerated).length
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'standardization': return '#00B3CA'
      case 'validation': return '#007787'
      case 'imputation': return '#10b981'
      case 'deduplication': return '#FFA500'
      case 'transformation': return '#9333EA'
      default: return '#64748B'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'standardization': return Wand2
      case 'validation': return CheckCircle
      case 'imputation': return TrendingUp
      case 'deduplication': return RefreshCw
      case 'transformation': return Code
      default: return Database
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981'
      case 'running': return '#00B3CA'
      case 'pending': return '#FFA500'
      case 'failed': return '#ef4444'
      default: return '#64748B'
    }
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const calculateImprovement = (op: CleaningOperation) => {
    const beforeValid = (op.impact.before.valid / (op.impact.before.valid + op.impact.before.invalid + op.impact.before.missing)) * 100
    const afterValid = (op.impact.after.valid / (op.impact.after.valid + op.impact.after.invalid + op.impact.after.missing)) * 100
    return (afterValid - beforeValid).toFixed(1)
  }

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#F8F9FA',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#012F35',
              marginBottom: '8px',
              fontFamily: 'Bw Gradual, Segoe UI, system-ui, sans-serif'
            }}>
              Data Cleaning Workflow
            </h1>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              AI-powered data cleaning with before/after impact analysis
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: '#F8F9FA',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#012F35',
              cursor: 'pointer'
            }}>
              <Upload size={18} />
              Import Dataset
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: '#9333EA',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              <Sparkles size={18} />
              AI Auto-Clean
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Total Operations', value: stats.total, icon: Database, color: '#007787' },
            { label: 'Pending', value: stats.pending, icon: AlertTriangle, color: '#FFA500' },
            { label: 'Running', value: stats.running, icon: RefreshCw, color: '#00B3CA' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle, color: '#10b981' },
            { label: 'AI Generated', value: stats.aiGenerated, icon: Sparkles, color: '#9333EA' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                backgroundColor: `${stat.color}20`,
                padding: '10px',
                borderRadius: '8px'
              }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#012F35' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operations List */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedOp ? '1fr 1fr' : '1fr', gap: '24px' }}>
        {/* Left Column - Operations */}
        <div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E2E8F0'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
              Cleaning Operations Queue
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {operations.map(op => {
                const TypeIcon = getTypeIcon(op.type)
                const improvement = calculateImprovement(op)

                return (
                  <div
                    key={op.id}
                    onClick={() => setSelectedOp(op)}
                    style={{
                      padding: '16px',
                      borderRadius: '10px',
                      border: `2px solid ${selectedOp?.id === op.id ? '#007787' : '#E2E8F0'}`,
                      backgroundColor: selectedOp?.id === op.id ? '#E7F9F5' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedOp?.id !== op.id) {
                        e.currentTarget.style.borderColor = '#00B3CA'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedOp?.id !== op.id) {
                        e.currentTarget.style.borderColor = '#E2E8F0'
                      }
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        backgroundColor: `${getTypeColor(op.type)}20`,
                        padding: '10px',
                        borderRadius: '8px',
                        height: 'fit-content'
                      }}>
                        <TypeIcon size={20} style={{ color: getTypeColor(op.type) }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                            {op.name}
                          </h4>
                          {op.aiGenerated && (
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '10px',
                              fontWeight: '600',
                              backgroundColor: '#F3E8FF',
                              color: '#9333EA',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Sparkles size={10} />
                              AI
                            </span>
                          )}
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '10px',
                            fontWeight: '600',
                            backgroundColor: `${getStatusColor(op.status)}20`,
                            color: getStatusColor(op.status),
                            textTransform: 'uppercase'
                          }}>
                            {op.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#64748B', margin: 0, marginBottom: '12px' }}>
                          {op.description}
                        </p>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#64748B' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Database size={12} />
                            <span>{op.affectedColumns.join(', ')}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FileText size={12} />
                            <span>{op.affectedRows.toLocaleString()} rows</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <TrendingUp size={12} />
                            <span style={{ color: parseFloat(improvement) > 0 ? '#10b981' : '#64748B', fontWeight: '600' }}>
                              +{improvement}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                      {op.status === 'pending' && (
                        <button style={{
                          flex: 1,
                          padding: '6px 12px',
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
                        }}>
                          <Play size={14} />
                          Execute
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowPreview(true)
                          setSelectedOp(op)
                        }}
                        style={{
                          flex: 1,
                          padding: '6px 12px',
                          backgroundColor: '#F8F9FA',
                          border: '1px solid #E2E8F0',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: '#012F35',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Eye size={14} />
                        Preview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopyCode(op.code)
                        }}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: copiedCode === op.code ? '#10b981' : '#F8F9FA',
                          border: '1px solid #E2E8F0',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: copiedCode === op.code ? 'white' : '#64748B',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {copiedCode === op.code ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        {selectedOp && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Code Preview */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                  Generated Code
                </h3>
                <button
                  onClick={() => handleCopyCode(selectedOp.code)}
                  style={{
                    padding: '6px 14px',
                    backgroundColor: copiedCode === selectedOp.code ? '#10b981' : '#007787',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {copiedCode === selectedOp.code ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
              <div style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#d4d4d4',
                overflow: 'auto',
                maxHeight: '300px'
              }}>
                <pre style={{ margin: 0 }}>
                  <code>{selectedOp.code}</code>
                </pre>
              </div>
            </div>

            {/* Impact Analysis */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #E2E8F0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
                Impact Analysis
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Before */}
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#64748B', marginBottom: '12px' }}>
                    Before Cleaning
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#F0FDF4',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '13px', color: '#166534', fontWeight: '500' }}>Valid</span>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#166534' }}>
                        {selectedOp.impact.before.valid.toLocaleString()}
                      </span>
                    </div>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#FEF2F2',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '13px', color: '#991B1B', fontWeight: '500' }}>Invalid</span>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#991B1B' }}>
                        {selectedOp.impact.before.invalid.toLocaleString()}
                      </span>
                    </div>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#FFF7ED',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '13px', color: '#9A3412', fontWeight: '500' }}>Missing</span>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#9A3412' }}>
                        {selectedOp.impact.before.missing.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#64748B', marginBottom: '12px' }}>
                    After Cleaning
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#F0FDF4',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: selectedOp.impact.after.valid > selectedOp.impact.before.valid ? '2px solid #10b981' : 'none'
                    }}>
                      <span style={{ fontSize: '13px', color: '#166534', fontWeight: '500' }}>Valid</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#166534' }}>
                          {selectedOp.impact.after.valid.toLocaleString()}
                        </span>
                        {selectedOp.impact.after.valid > selectedOp.impact.before.valid && (
                          <TrendingUp size={16} style={{ color: '#10b981' }} />
                        )}
                      </div>
                    </div>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#FEF2F2',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '13px', color: '#991B1B', fontWeight: '500' }}>Invalid</span>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#991B1B' }}>
                        {selectedOp.impact.after.invalid.toLocaleString()}
                      </span>
                    </div>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#FFF7ED',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '13px', color: '#9A3412', fontWeight: '500' }}>Missing</span>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#9A3412' }}>
                        {selectedOp.impact.after.missing.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Improvement Summary */}
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#E7F9F5',
                borderRadius: '8px',
                border: '2px solid #00B3CA'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    backgroundColor: '#00B3CA',
                    padding: '10px',
                    borderRadius: '8px'
                  }}>
                    <TrendingUp size={20} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#007787', fontWeight: '500', marginBottom: '2px' }}>
                      Quality Improvement
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007787' }}>
                      +{calculateImprovement(selectedOp)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
