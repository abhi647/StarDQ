import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDatasetsStore } from '@/stores'
import { BadgePill, HealthDot } from '@/components/atoms'
import {
  ArrowLeft,
  Database,
  Calendar,
  User,
  TrendingUp,
  BarChart3,
  Table,
  GitBranch,
  Shield,
  Download,
  Play,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'

// Mock column data
const mockColumns = [
  { name: 'customer_id', type: 'INTEGER', nullCount: 0, uniqueCount: 10000, completeness: 1.0, validity: 1.0 },
  { name: 'email', type: 'VARCHAR', nullCount: 45, uniqueCount: 9955, completeness: 0.9955, validity: 0.98 },
  { name: 'phone', type: 'VARCHAR', nullCount: 120, uniqueCount: 9880, completeness: 0.988, validity: 0.95 },
  { name: 'created_at', type: 'TIMESTAMP', nullCount: 0, uniqueCount: 8500, completeness: 1.0, validity: 1.0 },
  { name: 'status', type: 'VARCHAR', nullCount: 5, uniqueCount: 3, completeness: 0.9995, validity: 0.99 },
]

export function DatasetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { datasets } = useDatasetsStore()
  const [activeTab, setActiveTab] = useState<'overview' | 'columns' | 'quality' | 'lineage' | 'rules'>('overview')

  const dataset = datasets.find(d => d.id === id)

  if (!dataset) {
    return (
      <div style={{
        padding: '48px',
        textAlign: 'center',
        backgroundColor: '#F8F9FA',
        minHeight: '100vh'
      }}>
        <Database size={64} style={{ color: '#A8DCDB', margin: '0 auto 20px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
          Dataset Not Found
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
          The dataset you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/data-catalog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: '#007787',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          <ArrowLeft size={18} />
          Back to Data Catalog
        </Link>
      </div>
    )
  }

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#F8F9FA',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#007787',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Database size={32} style={{ color: '#007787' }} />
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#012F35',
                  margin: 0
                }}>
                  {dataset.name}
                </h1>
                <BadgePill badge={dataset.badge} />
                <HealthDot status="healthy" size="md" showLabel />
              </div>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>
                {dataset.description}
              </p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
                  <User size={14} />
                  <span>Owner: <strong style={{ color: '#012F35' }}>{dataset.owner}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
                  <Calendar size={14} />
                  <span>Updated: <strong style={{ color: '#012F35' }}>{new Date(dataset.lastModified).toLocaleDateString()}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
                  <Database size={14} />
                  <span>Domain: <strong style={{ color: '#012F35' }}>{dataset.domain}</strong></span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                backgroundColor: '#F8F9FA',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#012F35',
                cursor: 'pointer'
              }}>
                <Download size={16} />
                Export
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                backgroundColor: '#00B3CA',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                color: 'white',
                cursor: 'pointer'
              }}>
                <Play size={16} />
                Run DQ Check
              </button>
              <button style={{
                padding: '10px 16px',
                backgroundColor: '#F8F9FA',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#012F35',
                cursor: 'pointer'
              }}>
                <Edit size={16} />
              </button>
            </div>
          </div>

          {/* Quality Score Bar */}
          <div style={{
            padding: '16px',
            backgroundColor: '#F8F9FA',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#012F35' }}>
                Overall Quality Score
              </span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#007787' }}>
                {Math.round(dataset.qualityScore * 100)}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#E2E8F0',
              borderRadius: '5px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${dataset.qualityScore * 100}%`,
                height: '100%',
                backgroundColor: dataset.qualityScore >= 0.9 ? '#10b981' : dataset.qualityScore >= 0.75 ? '#FFA500' : '#ef4444',
                transition: 'width 0.5s'
              }} />
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E2E8F0' }}>
            {[
              { id: 'overview', label: 'Overview', icon: Info },
              { id: 'columns', label: 'Columns', icon: Table },
              { id: 'quality', label: 'Quality Metrics', icon: BarChart3 },
              { id: 'lineage', label: 'Lineage', icon: GitBranch },
              { id: 'rules', label: 'Quality Rules', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: `3px solid ${activeTab === tab.id ? '#007787' : 'transparent'}`,
                  color: activeTab === tab.id ? '#007787' : '#64748B',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              {[
                { label: 'Total Rows', value: dataset.profile.totalRows.toLocaleString(), icon: Table, color: '#00B3CA' },
                { label: 'Total Columns', value: dataset.profile.totalColumns, icon: BarChart3, color: '#007787' },
                { label: 'Missing Values', value: dataset.profile.missingValues.toLocaleString(), icon: AlertTriangle, color: '#FFA500' },
                { label: 'Unique Keys', value: Math.round(dataset.profile.uniqueness * dataset.profile.totalRows).toLocaleString(), icon: CheckCircle, color: '#10b981' }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#64748B' }}>{stat.label}</span>
                    <div style={{
                      backgroundColor: `${stat.color}20`,
                      padding: '8px',
                      borderRadius: '6px'
                    }}>
                      <stat.icon size={18} style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#012F35' }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Dimensions */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #E2E8F0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
                Quality Dimensions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Completeness', value: dataset.profile.completeness, description: 'Percentage of non-null values' },
                  { label: 'Validity', value: dataset.profile.validity, description: 'Percentage of values matching expected format' },
                  { label: 'Uniqueness', value: dataset.profile.uniqueness, description: 'Percentage of unique values in key columns' }
                ].map((dimension, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#012F35' }}>
                          {dimension.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>
                          {dimension.description}
                        </div>
                      </div>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#007787' }}>
                        {Math.round(dimension.value * 100)}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#E2E8F0',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${dimension.value * 100}%`,
                        height: '100%',
                        backgroundColor: dimension.value >= 0.9 ? '#10b981' : dimension.value >= 0.75 ? '#FFA500' : '#ef4444',
                        transition: 'width 0.5s'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent DQ Checks */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #E2E8F0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', marginBottom: '16px' }}>
                Recent Quality Checks
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Email Validation', status: 'passed', time: '2 hours ago', issues: 0 },
                  { name: 'Null Check - Key Columns', status: 'passed', time: '5 hours ago', issues: 0 },
                  { name: 'Phone Format Check', status: 'warning', time: '1 day ago', issues: 45 },
                  { name: 'Duplicate Detection', status: 'passed', time: '1 day ago', issues: 0 }
                ].map((check, idx) => (
                  <div key={idx} style={{
                    padding: '14px',
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#012F35', marginBottom: '4px' }}>
                        {check.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>
                        {check.time}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {check.status === 'passed' ? (
                        <div style={{
                          padding: '4px 12px',
                          backgroundColor: '#F0FDF4',
                          border: '1px solid #10b981',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#10b981'
                        }}>
                          Passed
                        </div>
                      ) : (
                        <div style={{
                          padding: '4px 12px',
                          backgroundColor: '#FFF4ED',
                          border: '1px solid #FFA500',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#FFA500'
                        }}>
                          {check.issues} Issues
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - AI Insights */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '2px solid #E7F9F5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Sparkles size={20} style={{ color: '#00B3CA' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35' }}>
                  AI Insights
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    type: 'suggestion',
                    title: 'Improve Email Validity',
                    description: 'Consider adding a regex validation rule for email format. Current validity: 98%',
                    action: 'Create Rule'
                  },
                  {
                    type: 'warning',
                    title: 'Phone Number Inconsistency',
                    description: '120 records have missing phone numbers. Consider making this field optional or implementing auto-fill.',
                    action: 'View Details'
                  },
                  {
                    type: 'info',
                    title: 'High Data Quality',
                    description: 'This dataset maintains excellent quality standards. No critical issues detected.',
                    action: null
                  }
                ].map((insight, idx) => (
                  <div key={idx} style={{
                    padding: '16px',
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px',
                    borderLeft: `3px solid ${
                      insight.type === 'suggestion' ? '#00B3CA' :
                      insight.type === 'warning' ? '#FFA500' : '#10b981'
                    }`
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', marginBottom: '8px' }}>
                      {insight.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px', lineHeight: '1.5' }}>
                      {insight.description}
                    </div>
                    {insight.action && (
                      <button style={{
                        padding: '6px 12px',
                        backgroundColor: '#007787',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}>
                        {insight.action}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'columns' && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #E2E8F0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
            Column Profiling
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748B' }}>Column Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748B' }}>Data Type</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748B' }}>Null Count</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748B' }}>Unique Values</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748B' }}>Completeness</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748B' }}>Validity</th>
                </tr>
              </thead>
              <tbody>
                {mockColumns.map((col, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#012F35' }}>
                      {col.name}
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#64748B' }}>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: '#F8F9FA',
                        borderRadius: '4px',
                        fontFamily: 'monospace'
                      }}>
                        {col.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#012F35', textAlign: 'right' }}>
                      {col.nullCount.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#012F35', textAlign: 'right' }}>
                      {col.uniqueCount.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 10px',
                        backgroundColor: col.completeness >= 0.95 ? '#F0FDF4' : '#FFF4ED',
                        color: col.completeness >= 0.95 ? '#10b981' : '#FFA500',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        {Math.round(col.completeness * 100)}%
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 10px',
                        backgroundColor: col.validity >= 0.95 ? '#F0FDF4' : '#FFF4ED',
                        color: col.validity >= 0.95 ? '#10b981' : '#FFA500',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        {Math.round(col.validity * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'quality' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {[
            { title: 'Completeness Trend', description: 'Track missing values over time', color: '#10b981' },
            { title: 'Validity Trend', description: 'Monitor data format compliance', color: '#00B3CA' },
            { title: 'Uniqueness Trend', description: 'Duplicate detection patterns', color: '#007787' },
            { title: 'Overall Quality', description: 'Composite quality score trend', color: '#FFA500' }
          ].map((chart, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #E2E8F0'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#012F35', marginBottom: '8px' }}>
                {chart.title}
              </h4>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
                {chart.description}
              </p>
              <div style={{
                height: '200px',
                backgroundColor: '#F8F9FA',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                fontSize: '14px'
              }}>
                Chart visualization (integrate with charting library)
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'lineage' && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #E2E8F0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
            Data Lineage
          </h3>
          <div style={{
            height: '400px',
            backgroundColor: '#F8F9FA',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B'
          }}>
            <GitBranch size={48} style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>
              Lineage Graph Visualization
            </p>
            <p style={{ fontSize: '14px' }}>
              Integrate with React Flow or similar library
            </p>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35' }}>
              Applied Quality Rules
            </h3>
            <button style={{
              padding: '10px 16px',
              backgroundColor: '#007787',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              + Add Rule
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Email Format Validation', type: 'Validity', status: 'active', lastRun: '2 hours ago' },
              { name: 'Not Null Check - Primary Keys', type: 'Completeness', status: 'active', lastRun: '5 hours ago' },
              { name: 'Phone Number Format', type: 'Validity', status: 'active', lastRun: '1 day ago' },
              { name: 'Duplicate Check - Customer ID', type: 'Uniqueness', status: 'active', lastRun: '1 day ago' }
            ].map((rule, idx) => (
              <div key={idx} style={{
                padding: '16px',
                backgroundColor: '#F8F9FA',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#012F35', marginBottom: '4px' }}>
                    {rule.name}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748B' }}>
                    <span>Type: <strong>{rule.type}</strong></span>
                    <span>•</span>
                    <span>Last run: {rule.lastRun}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#F0FDF4',
                    color: '#10b981',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Active
                  </span>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
