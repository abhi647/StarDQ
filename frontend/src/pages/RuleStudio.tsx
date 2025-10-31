import { useState } from 'react'
import {
  Shield,
  Plus,
  Search,
  Filter,
  Code,
  Play,
  Clock,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Eye,
  Settings,
  Zap,
  FileCode,
  Database,
  Activity
} from 'lucide-react'

interface Rule {
  id: string
  name: string
  type: 'Completeness' | 'Validity' | 'Uniqueness' | 'Consistency' | 'Accuracy' | 'Timeliness'
  category: string
  description: string
  complexity: 'low' | 'medium' | 'high'
  usage: number
  aiGenerated: boolean
  successRate: number
  avgExecutionTime: number
  code: {
    sql: string
    pandas: string
    spark?: string
  }
  parameters: {
    name: string
    type: string
    required: boolean
    defaultValue?: string
  }[]
  testResults?: {
    passed: number
    failed: number
    total: number
  }
  recommendation?: {
    priority: 'high' | 'medium' | 'low'
    reason: string
    potentialImpact: string
  }
}

const mockRules: Rule[] = [
  {
    id: '1',
    name: 'Email Format Validation',
    type: 'Validity',
    category: 'Format',
    description: 'Validates that email addresses conform to RFC 5322 standard format',
    complexity: 'low',
    usage: 45,
    aiGenerated: false,
    successRate: 97.8,
    avgExecutionTime: 12,
    code: {
      sql: `SELECT *
FROM dataset
WHERE email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$'`,
      pandas: `import re

def validate_email(email):
    pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$'
    return bool(re.match(pattern, str(email)))

df['email_valid'] = df['email'].apply(validate_email)
invalid_emails = df[~df['email_valid']]`
    },
    parameters: [
      { name: 'column', type: 'string', required: true },
      { name: 'allowEmpty', type: 'boolean', required: false, defaultValue: 'false' }
    ],
    testResults: {
      passed: 9550,
      failed: 450,
      total: 10000
    }
  },
  {
    id: '2',
    name: 'Not Null Check',
    type: 'Completeness',
    category: 'Required',
    description: 'Ensures critical fields are populated with non-null values',
    complexity: 'low',
    usage: 120,
    aiGenerated: false,
    successRate: 99.2,
    avgExecutionTime: 5,
    code: {
      sql: `SELECT *
FROM dataset
WHERE {column} IS NULL`,
      pandas: `# Find null values
null_count = df['{column}'].isnull().sum()
null_rows = df[df['{column}'].isnull()]

print(f"Found {null_count} null values in {'{column}'}")`,
      spark: `from pyspark.sql.functions import col

# Find null values
null_df = df.filter(col("{column}").isNull())
null_count = null_df.count()`
    },
    parameters: [
      { name: 'column', type: 'string', required: true },
      { name: 'failOnNull', type: 'boolean', required: false, defaultValue: 'true' }
    ],
    testResults: {
      passed: 9920,
      failed: 80,
      total: 10000
    }
  },
  {
    id: '3',
    name: 'Phone Number Format (US)',
    type: 'Validity',
    category: 'Format',
    description: 'Validates US phone numbers in (XXX) XXX-XXXX format',
    complexity: 'medium',
    usage: 38,
    aiGenerated: true,
    successRate: 94.5,
    avgExecutionTime: 15,
    code: {
      sql: `SELECT *
FROM dataset
WHERE phone NOT REGEXP '^\\(\\d{3}\\) \\d{3}-\\d{4}$'`,
      pandas: `import re

def validate_us_phone(phone):
    pattern = r'^\\(\\d{3}\\) \\d{3}-\\d{4}$'
    return bool(re.match(pattern, str(phone)))

df['phone_valid'] = df['phone'].apply(validate_us_phone)
invalid_phones = df[~df['phone_valid']]

# Auto-fix: Standardize formats
def standardize_phone(phone):
    # Remove all non-digits
    digits = re.sub(r'\\D', '', str(phone))
    if len(digits) == 10:
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    return phone

df['phone_standardized'] = df['phone'].apply(standardize_phone)`
    },
    parameters: [
      { name: 'column', type: 'string', required: true },
      { name: 'autoFix', type: 'boolean', required: false, defaultValue: 'false' }
    ],
    testResults: {
      passed: 9200,
      failed: 800,
      total: 10000
    },
    recommendation: {
      priority: 'high',
      reason: 'Detected 800 phone numbers with inconsistent formatting in Customer dataset',
      potentialImpact: '8% data quality improvement'
    }
  },
  {
    id: '4',
    name: 'Date Range Validation',
    type: 'Validity',
    category: 'Range',
    description: 'Validates that dates fall within a specified range',
    complexity: 'low',
    usage: 67,
    aiGenerated: false,
    successRate: 98.1,
    avgExecutionTime: 8,
    code: {
      sql: `SELECT *
FROM dataset
WHERE {column} NOT BETWEEN '{minDate}' AND '{maxDate}'`,
      pandas: `import pandas as pd

# Convert to datetime if needed
df['{column}'] = pd.to_datetime(df['{column}'], errors='coerce')

# Define range
min_date = pd.to_datetime('{minDate}')
max_date = pd.to_datetime('{maxDate}')

# Find out-of-range dates
out_of_range = df[(df['{column}'] < min_date) | (df['{column}'] > max_date)]
print(f"Found {len(out_of_range)} dates outside range")`,
      spark: `from pyspark.sql.functions import col, to_date

# Convert to date
df = df.withColumn("{column}", to_date(col("{column}")))

# Filter out of range
out_of_range_df = df.filter(
    (col("{column}") < "{minDate}") |
    (col("{column}") > "{maxDate}")
)`
    },
    parameters: [
      { name: 'column', type: 'string', required: true },
      { name: 'minDate', type: 'date', required: true },
      { name: 'maxDate', type: 'date', required: true }
    ],
    testResults: {
      passed: 9810,
      failed: 190,
      total: 10000
    }
  },
  {
    id: '5',
    name: 'Duplicate Detection',
    type: 'Uniqueness',
    category: 'Constraint',
    description: 'Identifies duplicate records based on specified columns',
    complexity: 'medium',
    usage: 89,
    aiGenerated: true,
    successRate: 96.3,
    avgExecutionTime: 45,
    code: {
      sql: `SELECT {columns}, COUNT(*) as duplicate_count
FROM dataset
GROUP BY {columns}
HAVING COUNT(*) > 1`,
      pandas: `# Find duplicates
duplicates = df[df.duplicated(subset=[{columns}], keep=False)]
duplicate_count = duplicates[{columns}].drop_duplicates().shape[0]

print(f"Found {duplicate_count} duplicate groups")
print(f"Total duplicate records: {len(duplicates)}")

# Show duplicate groups
duplicate_groups = df[df.duplicated(subset=[{columns}], keep=False)].sort_values(by=[{columns}])`,
      spark: `from pyspark.sql.functions import col, count

# Find duplicates
duplicate_df = df.groupBy({columns}).agg(
    count("*").alias("duplicate_count")
).filter(col("duplicate_count") > 1)`
    },
    parameters: [
      { name: 'columns', type: 'array', required: true },
      { name: 'keepFirst', type: 'boolean', required: false, defaultValue: 'true' }
    ],
    testResults: {
      passed: 9635,
      failed: 365,
      total: 10000
    },
    recommendation: {
      priority: 'medium',
      reason: 'Found 365 potential duplicate records in Order History dataset',
      potentialImpact: '3.65% deduplication opportunity'
    }
  },
  {
    id: '6',
    name: 'Numeric Range Check',
    type: 'Validity',
    category: 'Range',
    description: 'Validates numeric values fall within acceptable min/max bounds',
    complexity: 'low',
    usage: 54,
    aiGenerated: false,
    successRate: 99.5,
    avgExecutionTime: 6,
    code: {
      sql: `SELECT *
FROM dataset
WHERE {column} NOT BETWEEN {minValue} AND {maxValue}`,
      pandas: `# Find out-of-range values
out_of_range = df[(df['{column}'] < {minValue}) | (df['{column}'] > {maxValue})]

print(f"Out of range values: {len(out_of_range)}")
print(f"Min value found: {df['{column}'].min()}")
print(f"Max value found: {df['{column}'].max()}")`,
      spark: `from pyspark.sql.functions import col

# Find out-of-range values
out_of_range_df = df.filter(
    (col("{column}") < {minValue}) |
    (col("{column}") > {maxValue})
)`
    },
    parameters: [
      { name: 'column', type: 'string', required: true },
      { name: 'minValue', type: 'number', required: true },
      { name: 'maxValue', type: 'number', required: true }
    ],
    testResults: {
      passed: 9950,
      failed: 50,
      total: 10000
    }
  },
  {
    id: '7',
    name: 'Referential Integrity Check',
    type: 'Consistency',
    category: 'Constraint',
    description: 'Ensures foreign key values exist in the referenced table',
    complexity: 'high',
    usage: 32,
    aiGenerated: true,
    successRate: 92.1,
    avgExecutionTime: 120,
    code: {
      sql: `SELECT t1.*
FROM {sourceTable} t1
LEFT JOIN {referenceTable} t2 ON t1.{foreignKey} = t2.{primaryKey}
WHERE t2.{primaryKey} IS NULL`,
      pandas: `# Check referential integrity
source_df = df  # Source table
reference_df = ref_df  # Reference table

# Find orphaned records
merged = source_df.merge(
    reference_df,
    left_on='{foreignKey}',
    right_on='{primaryKey}',
    how='left',
    indicator=True
)

orphaned_records = merged[merged['_merge'] == 'left_only']
print(f"Found {len(orphaned_records)} orphaned records")`,
      spark: `from pyspark.sql.functions import col

# Left anti join to find orphaned records
orphaned_df = source_df.join(
    reference_df,
    source_df["{foreignKey}"] == reference_df["{primaryKey}"],
    "left_anti"
)`
    },
    parameters: [
      { name: 'sourceTable', type: 'string', required: true },
      { name: 'foreignKey', type: 'string', required: true },
      { name: 'referenceTable', type: 'string', required: true },
      { name: 'primaryKey', type: 'string', required: true }
    ],
    testResults: {
      passed: 9210,
      failed: 790,
      total: 10000
    },
    recommendation: {
      priority: 'high',
      reason: 'Detected 790 orphaned foreign key references in Transaction dataset',
      potentialImpact: 'Critical data integrity issue - 7.9% of records affected'
    }
  },
  {
    id: '8',
    name: 'Data Freshness Check',
    type: 'Timeliness',
    category: 'Temporal',
    description: 'Validates that data was updated within acceptable time window',
    complexity: 'medium',
    usage: 28,
    aiGenerated: true,
    successRate: 88.5,
    avgExecutionTime: 10,
    code: {
      sql: `SELECT *
FROM dataset
WHERE {timestampColumn} < DATE_SUB(NOW(), INTERVAL {maxAgeHours} HOUR)`,
      pandas: `import pandas as pd
from datetime import datetime, timedelta

# Calculate staleness
current_time = datetime.now()
max_age = timedelta(hours={maxAgeHours})

df['{timestampColumn}'] = pd.to_datetime(df['{timestampColumn}'])
df['age'] = current_time - df['{timestampColumn}']

stale_records = df[df['age'] > max_age]
print(f"Found {len(stale_records)} stale records (>{maxAgeHours}h old)")
print(f"Oldest record: {df['{timestampColumn}'].min()}")`,
      spark: `from pyspark.sql.functions import col, current_timestamp, expr

# Find stale records
stale_df = df.filter(
    col("{timestampColumn}") < expr(f"current_timestamp() - INTERVAL {maxAgeHours} HOURS")
)`
    },
    parameters: [
      { name: 'timestampColumn', type: 'string', required: true },
      { name: 'maxAgeHours', type: 'number', required: true }
    ],
    testResults: {
      passed: 8850,
      failed: 1150,
      total: 10000
    },
    recommendation: {
      priority: 'medium',
      reason: 'Data staleness detected - 11.5% of records exceed 24h threshold',
      potentialImpact: 'May affect real-time analytics and reporting accuracy'
    }
  }
]

export function RuleStudio() {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all')
  const [showAIRecommendations, setShowAIRecommendations] = useState(true)
  const [codeLanguage, setCodeLanguage] = useState<'sql' | 'pandas' | 'spark'>('pandas')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Completeness': return '#10b981'
      case 'Validity': return '#007787'
      case 'Uniqueness': return '#8b5cf6'
      case 'Consistency': return '#f59e0b'
      case 'Accuracy': return '#ef4444'
      case 'Timeliness': return '#06b6d4'
      default: return '#64748B'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return '#10b981'
      case 'medium': return '#FFA500'
      case 'high': return '#ef4444'
      default: return '#64748B'
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

  const filteredRules = mockRules.filter(rule => {
    if (searchQuery && !rule.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !rule.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedType !== 'all' && rule.type !== selectedType) return false
    if (selectedComplexity !== 'all' && rule.complexity !== selectedComplexity) return false
    return true
  })

  const aiRecommendedRules = mockRules.filter(r => r.recommendation)

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 64px)',
      backgroundColor: '#F8F9FA',
      overflow: 'hidden'
    }}>
      {/* Left Panel - Rule Library */}
      <div style={{
        width: selectedRule ? '45%' : '100%',
        padding: '24px',
        overflowY: 'auto',
        transition: 'width 0.3s'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#012F35',
                marginBottom: '8px',
                fontFamily: 'Bw Gradual, Segoe UI, system-ui, sans-serif'
              }}>
                Rule Studio
              </h1>
              <p style={{ fontSize: '16px', color: '#64748B' }}>
                Create, test, and manage data quality validation rules with AI assistance
              </p>
            </div>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: '#007787',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              <Plus size={18} />
              Create Custom Rule
            </button>
          </div>

          {/* AI Recommendations Banner */}
          {showAIRecommendations && aiRecommendedRules.length > 0 && (
            <div style={{
              padding: '16px',
              backgroundColor: '#FFF7ED',
              border: '2px solid #FFA500',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Sparkles size={20} style={{ color: '#FFA500' }} />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                  AI Recommendations
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
                Found {aiRecommendedRules.length} recommended rules based on your dataset analysis
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {aiRecommendedRules.map(rule => (
                  <button
                    key={rule.id}
                    onClick={() => setSelectedRule(rule)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'white',
                      border: '1px solid #FFA500',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#012F35',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {rule.name}
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: `${getPriorityColor(rule.recommendation!.priority)}20`,
                      color: getPriorityColor(rule.recommendation!.priority),
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>
                      {rule.recommendation!.priority}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B'
              }} />
              <input
                type="text"
                placeholder="Search rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#00B3CA'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="all">All Types</option>
              <option value="Completeness">Completeness</option>
              <option value="Validity">Validity</option>
              <option value="Uniqueness">Uniqueness</option>
              <option value="Consistency">Consistency</option>
              <option value="Accuracy">Accuracy</option>
              <option value="Timeliness">Timeliness</option>
            </select>
            <select
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="all">All Complexity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            <div style={{
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#012F35' }}>
                {filteredRules.length}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Available Rules
              </div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007787' }}>
                {mockRules.filter(r => r.aiGenerated).length}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                AI Generated
              </div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                {(mockRules.reduce((sum, r) => sum + r.successRate, 0) / mockRules.length).toFixed(1)}%
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Avg Success Rate
              </div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFA500' }}>
                {aiRecommendedRules.length}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Recommendations
              </div>
            </div>
          </div>
        </div>

        {/* Rule Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: selectedRule ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {filteredRules.map(rule => (
            <div
              key={rule.id}
              onClick={() => setSelectedRule(rule)}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                border: selectedRule?.id === rule.id ? '2px solid #007787' : '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedRule?.id !== rule.id) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  backgroundColor: `${getTypeColor(rule.type)}20`,
                  padding: '10px',
                  borderRadius: '8px'
                }}>
                  <Shield size={20} style={{ color: getTypeColor(rule.type) }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                      {rule.name}
                    </h3>
                    {rule.aiGenerated && (
                      <Sparkles size={14} style={{ color: '#FFA500' }} />
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', fontSize: '11px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: `${getTypeColor(rule.type)}20`,
                      color: getTypeColor(rule.type),
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>
                      {rule.type}
                    </span>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: `${getComplexityColor(rule.complexity)}20`,
                      color: getComplexityColor(rule.complexity),
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>
                      {rule.complexity}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px', lineHeight: '1.5' }}>
                {rule.description}
              </p>

              {rule.recommendation && (
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: `${getPriorityColor(rule.recommendation.priority)}15`,
                  border: `1px solid ${getPriorityColor(rule.recommendation.priority)}40`,
                  borderRadius: '6px',
                  marginBottom: '12px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: getPriorityColor(rule.recommendation.priority), marginBottom: '4px' }}>
                    AI RECOMMENDATION
                  </div>
                  <div style={{ fontSize: '12px', color: '#012F35', marginBottom: '4px' }}>
                    {rule.recommendation.reason}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    Impact: {rule.recommendation.potentialImpact}
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Success Rate</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>
                    {rule.successRate}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Usage</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#007787' }}>
                    {rule.usage} datasets
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Avg Time</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748B' }}>
                    {rule.avgExecutionTime}ms
                  </div>
                </div>
              </div>

              {rule.testResults && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: '6px',
                      backgroundColor: '#E2E8F0',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${(rule.testResults.passed / rule.testResults.total) * 100}%`,
                        backgroundColor: '#10b981'
                      }} />
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                      {rule.testResults.passed}/{rule.testResults.total} passed
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: selectedRule?.id === rule.id ? '#007787' : '#F8F9FA',
                  color: selectedRule?.id === rule.id ? 'white' : '#007787',
                  border: selectedRule?.id === rule.id ? 'none' : '1px solid #E2E8F0',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                  <Eye size={14} />
                  View Details
                </button>
                <button style={{
                  padding: '8px 12px',
                  backgroundColor: '#E7F9F5',
                  color: '#007787',
                  border: '1px solid #00B3CA',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Play size={14} />
                  Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Rule Details */}
      {selectedRule && (
        <div style={{
          width: '55%',
          backgroundColor: 'white',
          borderLeft: '2px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Details Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#F8F9FA'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#012F35', margin: 0 }}>
                    {selectedRule.name}
                  </h2>
                  {selectedRule.aiGenerated && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#FFF7ED',
                      color: '#FFA500',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Sparkles size={12} />
                      AI Generated
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                  {selectedRule.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedRule(null)}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748B'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{
                padding: '8px 12px',
                backgroundColor: `${getTypeColor(selectedRule.type)}20`,
                borderRadius: '6px'
              }}>
                <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Type</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: getTypeColor(selectedRule.type) }}>
                  {selectedRule.type}
                </div>
              </div>
              <div style={{
                padding: '8px 12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Complexity</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: getComplexityColor(selectedRule.complexity) }}>
                  {selectedRule.complexity}
                </div>
              </div>
              <div style={{
                padding: '8px 12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Success Rate</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>
                  {selectedRule.successRate}%
                </div>
              </div>
              <div style={{
                padding: '8px 12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Avg Exec Time</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748B' }}>
                  {selectedRule.avgExecutionTime}ms
                </div>
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {/* AI Recommendation */}
            {selectedRule.recommendation && (
              <div style={{
                padding: '16px',
                backgroundColor: `${getPriorityColor(selectedRule.recommendation.priority)}10`,
                border: `2px solid ${getPriorityColor(selectedRule.recommendation.priority)}`,
                borderRadius: '10px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Sparkles size={18} style={{ color: getPriorityColor(selectedRule.recommendation.priority) }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                    AI Recommendation
                  </h3>
                  <span style={{
                    padding: '2px 8px',
                    backgroundColor: getPriorityColor(selectedRule.recommendation.priority),
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    {selectedRule.recommendation.priority} Priority
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#012F35', marginBottom: '8px' }}>
                  {selectedRule.recommendation.reason}
                </p>
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#64748B'
                }}>
                  <strong>Potential Impact:</strong> {selectedRule.recommendation.potentialImpact}
                </div>
              </div>
            )}

            {/* Test Results */}
            {selectedRule.testResults && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
                  Latest Test Results
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#F0FDF4',
                    borderRadius: '8px',
                    border: '2px solid #10b981'
                  }}>
                    <CheckCircle2 size={20} style={{ color: '#10b981', marginBottom: '8px' }} />
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                      {selectedRule.testResults.passed}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Passed</div>
                  </div>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#FEF2F2',
                    borderRadius: '8px',
                    border: '2px solid #ef4444'
                  }}>
                    <XCircle size={20} style={{ color: '#ef4444', marginBottom: '8px' }} />
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444' }}>
                      {selectedRule.testResults.failed}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Failed</div>
                  </div>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px',
                    border: '2px solid #E2E8F0'
                  }}>
                    <Activity size={20} style={{ color: '#64748B', marginBottom: '8px' }} />
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#012F35' }}>
                      {selectedRule.testResults.total}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Total</div>
                  </div>
                </div>
              </div>
            )}

            {/* Parameters */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
                Parameters
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedRule.parameters.map((param, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: '#F8F9FA',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#012F35' }}>
                          {param.name}
                        </span>
                        {param.required && (
                          <span style={{
                            marginLeft: '6px',
                            fontSize: '10px',
                            color: '#ef4444',
                            fontWeight: '600'
                          }}>
                            *
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '11px',
                          padding: '2px 6px',
                          backgroundColor: '#007787',
                          color: 'white',
                          borderRadius: '4px',
                          fontWeight: '600'
                        }}>
                          {param.type}
                        </span>
                        {param.defaultValue && (
                          <span style={{ fontSize: '11px', color: '#64748B' }}>
                            default: {param.defaultValue}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Preview */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                  Code Preview
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setCodeLanguage('sql')}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: codeLanguage === 'sql' ? '#007787' : '#F8F9FA',
                      color: codeLanguage === 'sql' ? 'white' : '#64748B',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    SQL
                  </button>
                  <button
                    onClick={() => setCodeLanguage('pandas')}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: codeLanguage === 'pandas' ? '#007787' : '#F8F9FA',
                      color: codeLanguage === 'pandas' ? 'white' : '#64748B',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Pandas
                  </button>
                  {selectedRule.code.spark && (
                    <button
                      onClick={() => setCodeLanguage('spark')}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: codeLanguage === 'spark' ? '#007787' : '#F8F9FA',
                        color: codeLanguage === 'spark' ? 'white' : '#64748B',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Spark
                    </button>
                  )}
                </div>
              </div>
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
                  onClick={() => handleCopyCode(selectedRule.code[codeLanguage] || '')}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '6px 12px',
                    backgroundColor: copiedCode === selectedRule.code[codeLanguage] ? '#10b981' : '#374151',
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
                  {copiedCode === selectedRule.code[codeLanguage] ? (
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
                  <code>{selectedRule.code[codeLanguage]}</code>
                </pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #E2E8F0'
            }}>
              <button style={{
                flex: 1,
                padding: '12px 16px',
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
                <Play size={16} />
                Run Test
              </button>
              <button style={{
                flex: 1,
                padding: '12px 16px',
                backgroundColor: '#E7F9F5',
                color: '#007787',
                border: '1px solid #00B3CA',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <Plus size={16} />
                Add to Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
