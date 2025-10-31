import { FileText, Download, Calendar, Plus } from 'lucide-react'

export function Reports() {
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
            DQ Reports
          </h1>
          <p style={{ fontSize: '16px', color: '#64748B' }}>
            Generate and manage data quality reports
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
          Create Report
        </button>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '48px',
        border: '1px solid #E2E8F0',
        textAlign: 'center'
      }}>
        <FileText size={64} style={{ color: '#007787', margin: '0 auto 20px' }} />
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
          Data Quality Reports
        </h3>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          This page will contain report templates, scheduled reports, and export functionality.
        </p>
      </div>
    </div>
  )
}
