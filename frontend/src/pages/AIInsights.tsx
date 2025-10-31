import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, Database } from 'lucide-react'

export function AIInsights() {
  const insights = [
    {
      type: 'recommendation',
      title: 'Improve Customer Data Quality',
      description: 'Customer email validation can be improved by 15% with additional regex rules',
      impact: 'high',
      affectedDatasets: 2
    },
    {
      type: 'anomaly',
      title: 'Unusual Data Pattern Detected',
      description: 'Sales data shows 30% increase in null values over the past week',
      impact: 'medium',
      affectedDatasets: 1
    },
    {
      type: 'optimization',
      title: 'Pipeline Optimization Opportunity',
      description: 'Consider consolidating 3 similar validation rules into a single reusable rule',
      impact: 'low',
      affectedDatasets: 5
    }
  ]

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#F8F9FA',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#012F35',
          marginBottom: '8px',
          fontFamily: 'Bw Gradual, Segoe UI, system-ui, sans-serif'
        }}>
          AI Insights
        </h1>
        <p style={{ fontSize: '16px', color: '#64748B' }}>
          AI-powered recommendations and anomaly detection for your data quality
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {insights.map((insight, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '2px solid #E7F9F5'
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                backgroundColor: '#E7F9F5',
                padding: '12px',
                borderRadius: '10px',
                height: 'fit-content'
              }}>
                <Sparkles size={24} style={{ color: '#00B3CA' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35' }}>
                    {insight.title}
                  </h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: insight.impact === 'high' ? '#FEE2E2' : insight.impact === 'medium' ? '#FFF4ED' : '#E0F2FE',
                    color: insight.impact === 'high' ? '#DC2626' : insight.impact === 'medium' ? '#EA580C' : '#0284C7'
                  }}>
                    {insight.impact.toUpperCase()} IMPACT
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', lineHeight: '1.6' }}>
                  {insight.description}
                </p>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Database size={14} />
                    Affects {insight.affectedDatasets} dataset{insight.affectedDatasets > 1 ? 's' : ''}
                  </span>
                  <button style={{
                    padding: '6px 16px',
                    backgroundColor: '#007787',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Apply Recommendation
                  </button>
                  <button style={{
                    padding: '6px 16px',
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
          </div>
        ))}
      </div>
    </div>
  )
}
