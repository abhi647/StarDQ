import { useState } from 'react'
import { useAlertsStore, useDatasetsStore } from '@/stores'
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  Download,
  Settings,
  TrendingUp,
  Database,
  Shield,
  FileText
} from 'lucide-react'

export function MonitoringAlerts() {
  const { alerts, unreadCount, acknowledgeAlert } = useAlertsStore()
  const { datasets } = useDatasetsStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [selectedDataset, setSelectedDataset] = useState<string>('all')
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    if (selectedSeverity !== 'all' && alert.severity !== selectedSeverity) return false
    if (selectedDataset !== 'all' && alert.datasetId !== selectedDataset) return false
    if (showOnlyUnread && alert.ackBy) return false
    if (searchQuery && !alert.message.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    total: alerts.length,
    unread: unreadCount,
    high: alerts.filter(a => a.severity === 'high' && !a.ackBy).length,
    medium: alerts.filter(a => a.severity === 'medium' && !a.ackBy).length,
    low: alerts.filter(a => a.severity === 'low' && !a.ackBy).length
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444'
      case 'medium': return '#FFA500'
      case 'low': return '#00B3CA'
      default: return '#64748B'
    }
  }

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#FEE2E2'
      case 'medium': return '#FFF4ED'
      case 'low': return '#E0F2FE'
      default: return '#F8F9FA'
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
              Monitoring & Alerts
            </h1>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              Track and manage data quality alerts across all datasets
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
              <Download size={18} />
              Export
            </button>
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
              <Settings size={18} />
              Configure Alerts
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Total Alerts', value: stats.total, icon: Bell, color: '#007787' },
            { label: 'Unread', value: stats.unread, icon: AlertTriangle, color: '#FFA500' },
            { label: 'Critical', value: stats.high, icon: XCircle, color: '#ef4444' },
            { label: 'Medium', value: stats.medium, icon: AlertTriangle, color: '#FFA500' },
            { label: 'Low', value: stats.low, icon: CheckCircle, color: '#00B3CA' }
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

        {/* Filters & Search */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }}>
          {/* Search Bar */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              flex: 1,
              position: 'relative'
            }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B'
              }} />
              <input
                type="text"
                placeholder="Search alerts by message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#00B3CA'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
              />
            </div>
            <button
              onClick={() => setShowOnlyUnread(!showOnlyUnread)}
              style={{
                padding: '12px 20px',
                backgroundColor: showOnlyUnread ? '#E7F9F5' : 'white',
                border: `1px solid ${showOnlyUnread ? '#00B3CA' : '#E2E8F0'}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: showOnlyUnread ? '#007787' : '#64748B',
                cursor: 'pointer'
              }}
            >
              Unread Only
            </button>
          </div>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>
                Severity:
              </span>
              {['all', 'high', 'medium', 'low'].map(severity => (
                <button
                  key={severity}
                  onClick={() => setSelectedSeverity(severity)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '16px',
                    border: `2px solid ${selectedSeverity === severity ? '#007787' : '#E2E8F0'}`,
                    backgroundColor: selectedSeverity === severity ? '#E7F9F5' : 'white',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: selectedSeverity === severity ? '#007787' : '#64748B',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {severity}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>
                Dataset:
              </span>
              <select
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#012F35',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Datasets</option>
                {datasets.map(dataset => (
                  <option key={dataset.id} value={dataset.id}>{dataset.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Showing <strong style={{ color: '#012F35' }}>{filteredAlerts.length}</strong> of <strong style={{ color: '#012F35' }}>{alerts.length}</strong> alerts
          </p>
          {filteredAlerts.filter(a => !a.ackBy).length > 0 && (
            <button
              onClick={() => {
                filteredAlerts.forEach(alert => {
                  if (!alert.ackBy) acknowledgeAlert(alert.id)
                })
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#F8F9FA',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#007787',
                cursor: 'pointer'
              }}
            >
              Mark All as Read
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredAlerts.map(alert => {
            const dataset = datasets.find(d => d.id === alert.datasetId)
            return (
              <div
                key={alert.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  border: `2px solid ${alert.ackBy ? '#E2E8F0' : getSeverityBgColor(alert.severity)}`,
                  transition: 'all 0.2s',
                  opacity: alert.ackBy ? 0.7 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: getSeverityBgColor(alert.severity),
                        color: getSeverityColor(alert.severity),
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {alert.severity}
                      </span>
                      {!alert.ackBy && (
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626'
                        }}>
                          NEW
                        </span>
                      )}
                      {dataset && (
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: '#F8F9FA',
                          color: '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <Database size={10} />
                          {dataset.name}
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontSize: '15px',
                      color: '#012F35',
                      lineHeight: '1.6',
                      marginBottom: '12px',
                      fontWeight: '500'
                    }}>
                      {alert.message}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748B' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} />
                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                      {alert.ackBy && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
                          <CheckCircle size={14} />
                          <span>Acknowledged by {alert.ackBy}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {!alert.ackBy && (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#E7F9F5',
                          border: '1px solid #00B3CA',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: '#007787',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00B3CA'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E7F9F5'}
                      >
                        Acknowledge
                      </button>
                    )}
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#F8F9FA',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#012F35',
                      cursor: 'pointer'
                    }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '64px',
            textAlign: 'center',
            border: '1px solid #E2E8F0'
          }}>
            <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '8px' }}>
              No alerts found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              {searchQuery || selectedSeverity !== 'all' || selectedDataset !== 'all' || showOnlyUnread
                ? 'No alerts match your filters. Try adjusting your search criteria.'
                : 'All systems are running smoothly. No alerts at this time.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
