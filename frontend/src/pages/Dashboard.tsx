import { BadgePill, KPIStat, HealthDot } from '@/components/atoms'
import { useDatasetsStore, useAlertsStore, useAuthStore } from '@/stores'
import {
  TrendingUp,
  TrendingDown,
  Database,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  Sparkles,
  ArrowRight,
  Clock,
  Shield,
  GitBranch
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { datasets } = useDatasetsStore()
  const { alerts, unreadCount } = useAlertsStore()
  const { user } = useAuthStore()

  // Calculate stats
  const totalDatasets = datasets.length
  const goldDatasets = datasets.filter(d => d.badge === 'Gold').length
  const silverDatasets = datasets.filter(d => d.badge === 'Silver').length
  const bronzeDatasets = datasets.filter(d => d.badge === 'Bronze').length

  // Calculate quality metrics
  const avgQualityScore = datasets.length > 0
    ? datasets.reduce((acc, d) => acc + d.qualityScore, 0) / datasets.length
    : 0
  const healthyDatasets = datasets.filter(d => d.qualityScore >= 0.9).length
  const criticalAlerts = alerts.filter(a => a.severity === 'high' && !a.ackBy).length

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#F8F9FA',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#012F35',
              marginBottom: '8px',
              fontFamily: 'Bw Gradual, Segoe UI, system-ui, sans-serif'
            }}>
              Welcome back, {user?.name || 'Guest'}
            </h1>
            <p style={{ fontSize: '16px', color: '#1B4E54' }}>
              Here's what's happening with your data quality today
            </p>
          </div>
          <div style={{
            backgroundColor: '#E7F9F5',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Activity size={20} style={{ color: '#00B3CA' }} />
            <div>
              <div style={{ fontSize: '12px', color: '#1B4E54' }}>System Status</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#00B3CA' }}>All Systems Operational</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {/* Total Datasets */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>Total Datasets</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#012F35', marginBottom: '8px' }}>
                {totalDatasets}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={16} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '500' }}>+12%</span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>from last month</span>
              </div>
            </div>
            <div style={{
              backgroundColor: '#E7F9F5',
              padding: '12px',
              borderRadius: '10px'
            }}>
              <Database size={24} style={{ color: '#00B3CA' }} />
            </div>
          </div>
        </div>

        {/* Average Quality Score */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>Avg Quality Score</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#012F35', marginBottom: '8px' }}>
                {(avgQualityScore * 100).toFixed(1)}%
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={16} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '500' }}>+5.2%</span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>from last week</span>
              </div>
            </div>
            <div style={{
              backgroundColor: '#FFF4E6',
              padding: '12px',
              borderRadius: '10px'
            }}>
              <BarChart3 size={24} style={{ color: '#FFA500' }} />
            </div>
          </div>
        </div>

        {/* Healthy Datasets */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>Healthy Datasets</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#012F35', marginBottom: '8px' }}>
                {healthyDatasets}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={16} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '500' }}>
                  {datasets.length > 0 ? Math.round((healthyDatasets / datasets.length) * 100) : 0}% of total
                </span>
              </div>
            </div>
            <div style={{
              backgroundColor: '#F0FDF4',
              padding: '12px',
              borderRadius: '10px'
            }}>
              <Shield size={24} style={{ color: '#10b981' }} />
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>Critical Alerts</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#012F35', marginBottom: '8px' }}>
                {criticalAlerts}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {criticalAlerts === 0 ? (
                  <>
                    <CheckCircle size={16} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '500' }}>No critical issues</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={16} style={{ color: '#ef4444' }} />
                    <span style={{ fontSize: '14px', color: '#ef4444', fontWeight: '500' }}>Requires attention</span>
                  </>
                )}
              </div>
            </div>
            <div style={{
              backgroundColor: criticalAlerts > 0 ? '#FEE2E2' : '#F0FDF4',
              padding: '12px',
              borderRadius: '10px'
            }}>
              <AlertTriangle size={24} style={{ color: criticalAlerts > 0 ? '#ef4444' : '#10b981' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Quality Distribution */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
            Dataset Quality Distribution
          </h2>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                backgroundColor: '#FFF8E1',
                padding: '16px',
                borderRadius: '8px',
                border: '2px solid #FFD700'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <BadgePill badge="Gold" size="sm" />
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#012F35', marginTop: '8px' }}>
                      {goldDatasets}
                    </div>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFD700' }}>
                    {datasets.length > 0 ? Math.round((goldDatasets / datasets.length) * 100) : 0}%
                  </div>
                </div>
              </div>
              <div style={{
                backgroundColor: '#F5F5F5',
                padding: '16px',
                borderRadius: '8px',
                border: '2px solid #C0C0C0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <BadgePill badge="Silver" size="sm" />
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#012F35', marginTop: '8px' }}>
                      {silverDatasets}
                    </div>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#A8DCDB' }}>
                    {datasets.length > 0 ? Math.round((silverDatasets / datasets.length) * 100) : 0}%
                  </div>
                </div>
              </div>
              <div style={{
                backgroundColor: '#FFF0E6',
                padding: '16px',
                borderRadius: '8px',
                border: '2px solid #CD7F32'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <BadgePill badge="Bronze" size="sm" />
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#012F35', marginTop: '8px' }}>
                      {bronzeDatasets}
                    </div>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFC994' }}>
                    {datasets.length > 0 ? Math.round((bronzeDatasets / datasets.length) * 100) : 0}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
            Recent Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { time: '5 min ago', action: 'Quality check completed', dataset: 'Customer Data', icon: CheckCircle, color: '#10b981' },
              { time: '1 hour ago', action: 'New dataset added', dataset: 'Sales Transactions', icon: Database, color: '#00B3CA' },
              { time: '3 hours ago', action: 'Pipeline executed', dataset: 'Product Catalog', icon: GitBranch, color: '#007787' },
              { time: '5 hours ago', action: 'Alert acknowledged', dataset: 'Order History', icon: AlertTriangle, color: '#FFA500' },
            ].map((activity, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                backgroundColor: '#F8F9FA',
                borderRadius: '8px',
                borderLeft: `3px solid ${activity.color}`
              }}>
                <activity.icon size={20} style={{ color: activity.color, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#012F35' }}>
                    {activity.action}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {activity.dataset}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={10} />
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Datasets Overview */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #E2E8F0',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35' }}>
            Top Datasets
          </h2>
          <Link to="/data-catalog" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#007787',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>
        {datasets.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {datasets.slice(0, 5).map(dataset => (
              <Link
                key={dataset.id}
                to={`/datasets/${dataset.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: '#F8F9FA',
                  border: '1px solid #E2E8F0',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E7F9F5'
                  e.currentTarget.style.borderColor = '#00B3CA'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8F9FA'
                  e.currentTarget.style.borderColor = '#E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <Database size={20} style={{ color: '#007787' }} />
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#012F35' }}>
                      {dataset.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>
                      {dataset.domain} • {dataset.profile.totalRows.toLocaleString()} rows • Updated {new Date(dataset.lastModified).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007787' }}>
                      {Math.round(dataset.qualityScore * 100)}%
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Quality Score</div>
                  </div>
                  <BadgePill badge={dataset.badge} />
                  <HealthDot status="healthy" size="md" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '48px',
            backgroundColor: '#F8F9FA',
            borderRadius: '8px'
          }}>
            <Database size={48} style={{ color: '#A8DCDB', margin: '0 auto 16px' }} />
            <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '8px' }}>
              No datasets available yet
            </p>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>
              Start by connecting a data source to begin monitoring quality
            </p>
          </div>
        )}
      </div>

      {/* Bottom Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Alerts */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35' }}>
              Recent Alerts
            </h2>
            <Link to="/monitoring-alerts" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#007787',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>
          {alerts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {alerts.slice(0, 4).map(alert => (
                <div
                  key={alert.id}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    backgroundColor: alert.ackBy ? '#F8F9FA' : '#FFF4ED',
                    border: `1px solid ${alert.ackBy ? '#E2E8F0' : '#FED7AA'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: alert.severity === 'high' ? '#FEE2E2' : alert.severity === 'medium' ? '#FFF4ED' : '#E0F2FE',
                      color: alert.severity === 'high' ? '#DC2626' : alert.severity === 'medium' ? '#EA580C' : '#0284C7'
                    }}>
                      {alert.severity.toUpperCase()}
                    </span>
                    {!alert.ackBy && (
                      <span style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#FEE2E2',
                        color: '#DC2626',
                        fontWeight: '600'
                      }}>
                        NEW
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: '#012F35', marginBottom: '8px', lineHeight: '1.5' }}>
                    {alert.message}
                  </p>
                  <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '32px',
              backgroundColor: '#F0FDF4',
              borderRadius: '8px'
            }}>
              <CheckCircle size={40} style={{ color: '#10b981', margin: '0 auto 12px' }} />
              <p style={{ fontSize: '14px', color: '#64748B' }}>
                No alerts at the moment. All systems running smoothly!
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/data-catalog" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#007787',
              color: 'white',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Database size={20} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>Connect Data Source</div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>Add new datasets to StarDQ</div>
                </div>
              </div>
              <ArrowRight size={20} />
            </Link>

            <Link to="/dqa-pipeline" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#00B3CA',
              color: 'white',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <GitBranch size={20} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>Run DQ Pipeline</div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>Execute data quality checks</div>
                </div>
              </div>
              <ArrowRight size={20} />
            </Link>

            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#1B4E54',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              width: '100%',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => {}}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Sparkles size={20} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>AI Insights</div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>Get AI-powered recommendations</div>
                </div>
              </div>
              <ArrowRight size={20} />
            </button>

            <Link to="/rule-studio" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#F8F9FA',
              color: '#012F35',
              border: '1px solid #E2E8F0',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E7F9F5'
              e.currentTarget.style.borderColor = '#00B3CA'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F8F9FA'
              e.currentTarget.style.borderColor = '#E2E8F0'
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shield size={20} style={{ color: '#007787' }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>Build Quality Rules</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Create custom validation rules</div>
                </div>
              </div>
              <ArrowRight size={20} style={{ color: '#007787' }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
