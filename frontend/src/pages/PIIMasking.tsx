import { ShieldCheck, Database, Eye, EyeOff, Key } from 'lucide-react'

export function PIIMasking() {
  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#F8F9FA',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#012F35',
        marginBottom: '8px',
        fontFamily: 'Bw Gradual, Segoe UI, system-ui, sans-serif'
      }}>
        PII Masking
      </h1>
      <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '32px' }}>
        Protect sensitive data with automated PII detection and masking
      </p>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '48px',
        border: '1px solid #E2E8F0',
        textAlign: 'center'
      }}>
        <ShieldCheck size={64} style={{ color: '#007787', margin: '0 auto 20px' }} />
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
          PII Masking Feature
        </h3>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          This page will contain PII detection rules, masking policies, and data anonymization features.
        </p>
      </div>
    </div>
  )
}
