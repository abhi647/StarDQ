import { Shield, Plus, Search, Filter, Code, Play, Clock } from 'lucide-react'

const mockRuleTemplates = [
  { id: '1', name: 'Email Format Validation', type: 'Validity', category: 'Format', usage: 45 },
  { id: '2', name: 'Not Null Check', type: 'Completeness', category: 'Required', usage: 120 },
  { id: '3', name: 'Phone Number Format', type: 'Validity', category: 'Format', usage: 38 },
  { id: '4', name: 'Date Range Validation', type: 'Validity', category: 'Range', usage: 67 },
  { id: '5', name: 'Duplicate Detection', type: 'Uniqueness', category: 'Constraint', usage: 89 },
  { id: '6', name: 'Numeric Range Check', type: 'Validity', category: 'Range', usage: 54 }
]

export function RuleStudio() {
  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#F8F9FA',
      minHeight: '100vh'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
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
            Create and manage data quality validation rules
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {mockRuleTemplates.map(rule => (
          <div
            key={rule.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E2E8F0',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                backgroundColor: '#E7F9F5',
                padding: '10px',
                borderRadius: '8px'
              }}>
                <Shield size={20} style={{ color: '#007787' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#012F35', marginBottom: '4px' }}>
                  {rule.name}
                </h3>
                <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                  <span style={{
                    padding: '2px 8px',
                    backgroundColor: '#F8F9FA',
                    borderRadius: '4px',
                    color: '#64748B'
                  }}>
                    {rule.type}
                  </span>
                  <span style={{
                    padding: '2px 8px',
                    backgroundColor: '#F8F9FA',
                    borderRadius: '4px',
                    color: '#64748B'
                  }}>
                    {rule.category}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
              Used in <strong>{rule.usage}</strong> datasets
            </div>
            <button style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#F8F9FA',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#007787',
              cursor: 'pointer'
            }}>
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
