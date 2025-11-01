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
  GitBranch,
  Target,
  AlertCircle,
  FileWarning,
  Copy,
  Zap
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

  // Mock data for quality trends (last 7 days)
  const qualityTrends = [
    { day: 'Mon', score: 87.2 },
    { day: 'Tue', score: 88.5 },
    { day: 'Wed', score: 89.1 },
    { day: 'Thu', score: 88.8 },
    { day: 'Fri', score: 90.3 },
    { day: 'Sat', score: 91.2 },
    { day: 'Sun', score: (avgQualityScore * 100) }
  ]

  // Mock issue distribution data
  const issueDistribution = [
    { type: 'Missing Values', count: 245, color: '#ef4444', percent: 32 },
    { type: 'Invalid Format', count: 189, color: '#FFA500', percent: 25 },
    { type: 'Duplicates', count: 156, color: '#00B3CA', percent: 20 },
    { type: 'Outliers', count: 98, color: '#007787', percent: 13 },
    { type: 'Inconsistencies', count: 76, color: '#1B4E54', percent: 10 }
  ]

  // Calculate domain health
  const domainHealth = datasets.reduce((acc, dataset) => {
    if (!acc[dataset.domain]) {
      acc[dataset.domain] = { count: 0, totalScore: 0 }
    }
    acc[dataset.domain].count++
    acc[dataset.domain].totalScore += dataset.qualityScore
    return acc
  }, {} as Record<string, { count: number; totalScore: number }>)

  const domainHealthArray = Object.entries(domainHealth).map(([domain, data]) => ({
    domain,
    avgScore: (data.totalScore / data.count) * 100,
    count: data.count
  })).sort((a, b) => b.avgScore - a.avgScore)

  // Calculate overall data completeness
  const avgCompleteness = datasets.length > 0
    ? datasets.reduce((acc, d) => acc + d.profile.completeness, 0) / datasets.length
    : 0
  const avgValidity = datasets.length > 0
    ? datasets.reduce((acc, d) => acc + d.profile.validity, 0) / datasets.length
    : 0
  const avgUniqueness = datasets.length > 0
    ? datasets.reduce((acc, d) => acc + d.profile.uniqueness, 0) / datasets.length
    : 0

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

      {/* Quality Trends Chart */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #E2E8F0',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '4px' }}>
              Quality Score Trends
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              Last 7 days performance overview
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} style={{ color: '#10b981' }} />
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>
              +{(qualityTrends[6].score - qualityTrends[0].score).toFixed(1)}%
            </span>
          </div>
        </div>
        <div style={{ height: '240px', display: 'flex', gap: '8px', alignItems: 'flex-end', paddingTop: '20px' }}>
          {qualityTrends.map((d, i) => {
            const barHeight = (d.score / 100) * 180
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#007787', minHeight: '16px' }}>
                  {d.score.toFixed(1)}%
                </div>
                <div style={{ width: '100%', position: 'relative', height: '180px', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '100%',
                    height: `${barHeight}px`,
                    backgroundColor: i === qualityTrends.length - 1 ? '#007787' : '#00B3CA',
                    borderRadius: '8px 8px 0 0',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 -2px 8px rgba(0, 179, 202, 0.2)'
                  }} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>
                  {d.day}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Data Quality Metrics Gauges */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Completeness Gauge */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Target size={20} style={{ color: '#10b981' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#012F35' }}>Completeness</h3>
          </div>
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#10b981"
                strokeWidth="10"
                strokeDasharray={`${avgCompleteness * 314} 314`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#012F35' }}>
                {(avgCompleteness * 100).toFixed(0)}%
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginTop: '12px' }}>
            Average data completeness across all datasets
          </p>
        </div>

        {/* Validity Gauge */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <CheckCircle size={20} style={{ color: '#00B3CA' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#012F35' }}>Validity</h3>
          </div>
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#00B3CA"
                strokeWidth="10"
                strokeDasharray={`${avgValidity * 314} 314`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#012F35' }}>
                {(avgValidity * 100).toFixed(0)}%
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginTop: '12px' }}>
            Average data validity across all datasets
          </p>
        </div>

        {/* Uniqueness Gauge */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Zap size={20} style={{ color: '#FFA500' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#012F35' }}>Uniqueness</h3>
          </div>
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#FFA500"
                strokeWidth="10"
                strokeDasharray={`${avgUniqueness * 314} 314`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#012F35' }}>
                {(avgUniqueness * 100).toFixed(0)}%
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginTop: '12px' }}>
            Average data uniqueness across all datasets
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Issue Distribution */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
            Issue Distribution
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {issueDistribution.map((issue, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '3px',
                      backgroundColor: issue.color
                    }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#012F35' }}>
                      {issue.type}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      {issue.count} issues
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: issue.color }}>
                      {issue.percent}%
                    </span>
                  </div>
                </div>
                <div style={{ position: 'relative', height: '8px', backgroundColor: '#F8F9FA', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${issue.percent}%`,
                    backgroundColor: issue.color,
                    borderRadius: '4px',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            ))}
            <div style={{
              marginTop: '8px',
              padding: '16px',
              backgroundColor: '#F8F9FA',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#012F35' }}>
                {issueDistribution.reduce((sum, i) => sum + i.count, 0)}
              </div>
              <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Total Issues Detected</div>
            </div>
          </div>
        </div>

        {/* Domain Health Overview */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '20px' }}>
            Domain Health Overview
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {domainHealthArray.length > 0 ? domainHealthArray.map((domain, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Database size={16} style={{ color: '#007787' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#012F35' }}>
                      {domain.domain}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      ({domain.count} datasets)
                    </span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: domain.avgScore >= 90 ? '#10b981' : domain.avgScore >= 75 ? '#FFA500' : '#ef4444' }}>
                    {domain.avgScore.toFixed(1)}%
                  </span>
                </div>
                <div style={{ position: 'relative', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${domain.avgScore}%`,
                    backgroundColor: domain.avgScore >= 90 ? '#10b981' : domain.avgScore >= 75 ? '#FFA500' : '#ef4444',
                    transition: 'width 0.3s ease',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '32px', color: '#64748B' }}>
                No domain data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quality Distribution & Recent Activity */}
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
