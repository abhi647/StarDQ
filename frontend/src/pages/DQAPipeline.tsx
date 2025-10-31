import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GitBranch,
  Play,
  Pause,
  Plus,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Calendar,
  TrendingUp,
  Database,
  Shield,
  FileText,
  ChevronRight
} from 'lucide-react'

// Mock pipeline data
const mockPipelines = [
  {
    id: '1',
    name: 'Customer Data Quality Pipeline',
    description: 'Validates customer data completeness and format',
    status: 'running',
    lastRun: '2024-10-31T10:30:00Z',
    nextRun: '2024-10-31T22:00:00Z',
    successRate: 98.5,
    steps: 5,
    datasets: ['Customer Data', 'Order History']
  },
  {
    id: '2',
    name: 'Product Catalog Validation',
    description: 'Ensures product data consistency across systems',
    status: 'completed',
    lastRun: '2024-10-31T08:00:00Z',
    nextRun: '2024-11-01T08:00:00Z',
    successRate: 100,
    steps: 3,
    datasets: ['Product Catalog']
  },
  {
    id: '3',
    name: 'Sales Data Profiling',
    description: 'Profiles sales transaction data daily',
    status: 'scheduled',
    lastRun: '2024-10-30T23:00:00Z',
    nextRun: '2024-10-31T23:00:00Z',
    successRate: 95.2,
    steps: 4,
    datasets: ['Sales Transactions']
  },
  {
    id: '4',
    name: 'Email Validation Pipeline',
    description: 'Validates email formats and deliverability',
    status: 'failed',
    lastRun: '2024-10-31T06:00:00Z',
    nextRun: '2024-10-31T18:00:00Z',
    successRate: 87.3,
    steps: 2,
    datasets: ['Customer Data']
  }
]

export function DQAPipeline() {
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredPipelines = mockPipelines.filter(
    p => filterStatus === 'all' || p.status === filterStatus
  )

  const stats = {
    total: mockPipelines.length,
    running: mockPipelines.filter(p => p.status === 'running').length,
    scheduled: mockPipelines.filter(p => p.status === 'scheduled').length,
    failed: mockPipelines.filter(p => p.status === 'failed').length,
    avgSuccessRate: mockPipelines.reduce((acc, p) => acc + p.successRate, 0) / mockPipelines.length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return '#00B3CA'
      case 'completed': return '#10b981'
      case 'scheduled': return '#FFA500'
      case 'failed': return '#ef4444'
      default: return '#64748B'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return Play
      case 'completed': return CheckCircle
      case 'scheduled': return Clock
      case 'failed': return AlertCircle
      default: return GitBranch
    }
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
              DQA Pipeline
            </h1>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              Design, execute, and monitor data quality assurance workflows
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
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00B3CA'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007787'}
          >
            <Plus size={18} />
            Create Pipeline
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Total Pipelines', value: stats.total, icon: GitBranch, color: '#007787' },
            { label: 'Running Now', value: stats.running, icon: Play, color: '#00B3CA' },
            { label: 'Scheduled', value: stats.scheduled, icon: Clock, color: '#FFA500' },
            { label: 'Failed', value: stats.failed, icon: AlertCircle, color: '#ef4444' },
            { label: 'Avg Success Rate', value: `${Math.round(stats.avgSuccessRate)}%`, icon: TrendingUp, color: '#10b981' }
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

        {/* Filter Bar */}
        <div style={{
          backgroundColor: 'white',
          padding: '16px 20px',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>
            Filter by Status:
          </span>
          {['all', 'running', 'scheduled', 'completed', 'failed'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${filterStatus === status ? '#007787' : '#E2E8F0'}`,
                backgroundColor: filterStatus === status ? '#E7F9F5' : 'white',
                fontSize: '13px',
                fontWeight: '500',
                color: filterStatus === status ? '#007787' : '#64748B',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredPipelines.map(pipeline => {
          const StatusIcon = getStatusIcon(pipeline.status)
          return (
            <div
              key={pipeline.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #E2E8F0',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                e.currentTarget.style.borderColor = '#00B3CA'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = '#E2E8F0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      backgroundColor: `${getStatusColor(pipeline.status)}20`,
                      padding: '8px',
                      borderRadius: '8px'
                    }}>
                      <StatusIcon size={20} style={{ color: getStatusColor(pipeline.status) }} />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                      {pipeline.name}
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: `${getStatusColor(pipeline.status)}20`,
                      color: getStatusColor(pipeline.status),
                      textTransform: 'capitalize'
                    }}>
                      {pipeline.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>
                    {pipeline.description}
                  </p>
                  <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#64748B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Shield size={14} />
                      <span>{pipeline.steps} steps</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Database size={14} />
                      <span>{pipeline.datasets.length} datasets</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} />
                      <span>Last run: {new Date(pipeline.lastRun).toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} />
                      <span>Next run: {new Date(pipeline.nextRun).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: pipeline.status === 'running' ? '#FFF4ED' : '#E7F9F5',
                    border: `1px solid ${pipeline.status === 'running' ? '#FFA500' : '#00B3CA'}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: pipeline.status === 'running' ? '#FFA500' : '#00B3CA',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {pipeline.status === 'running' ? (
                      <>
                        <Pause size={14} />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        Run
                      </>
                    )}
                  </button>
                  <button style={{
                    padding: '8px 12px',
                    backgroundColor: '#F8F9FA',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    <Edit size={14} style={{ color: '#64748B' }} />
                  </button>
                  <button style={{
                    padding: '8px 12px',
                    backgroundColor: '#F8F9FA',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    <Settings size={14} style={{ color: '#64748B' }} />
                  </button>
                </div>
              </div>

              {/* Success Rate */}
              <div style={{
                padding: '12px',
                backgroundColor: '#F8F9FA',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#64748B' }}>
                  Success Rate
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, marginLeft: '20px' }}>
                  <div style={{
                    flex: 1,
                    height: '8px',
                    backgroundColor: '#E2E8F0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${pipeline.successRate}%`,
                      height: '100%',
                      backgroundColor: pipeline.successRate >= 95 ? '#10b981' : pipeline.successRate >= 85 ? '#FFA500' : '#ef4444',
                      transition: 'width 0.5s'
                    }} />
                  </div>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: pipeline.successRate >= 95 ? '#10b981' : pipeline.successRate >= 85 ? '#FFA500' : '#ef4444',
                    minWidth: '50px',
                    textAlign: 'right'
                  }}>
                    {pipeline.successRate}%
                  </span>
                </div>
              </div>

              {/* Datasets */}
              <div style={{ marginTop: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#64748B', marginBottom: '8px', display: 'block' }}>
                  Datasets:
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {pipeline.datasets.map((dataset, idx) => (
                    <Link
                      key={idx}
                      to={`/datasets/1`}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#E7F9F5',
                        border: '1px solid #00B3CA',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#007787',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00B3CA'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E7F9F5'}
                    >
                      <Database size={12} />
                      {dataset}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredPipelines.length === 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '64px',
          textAlign: 'center',
          border: '1px solid #E2E8F0'
        }}>
          <GitBranch size={64} style={{ color: '#A8DCDB', margin: '0 auto 20px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '8px' }}>
            No pipelines found
          </h3>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
            No pipelines match the selected filter. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  )
}
