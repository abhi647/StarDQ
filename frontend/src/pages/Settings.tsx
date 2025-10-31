import { Settings as SettingsIcon, User, Bell, Database, Shield, Palette } from 'lucide-react'

export function Settings() {
  const settingsSections = [
    { title: 'Profile Settings', description: 'Update your personal information and preferences', icon: User },
    { title: 'Notification Preferences', description: 'Configure alert and email notifications', icon: Bell },
    { title: 'Data Connections', description: 'Manage database connections and API keys', icon: Database },
    { title: 'Security & Access', description: 'Control access permissions and authentication', icon: Shield },
    { title: 'Theme & Appearance', description: 'Customize the look and feel of StarDQ', icon: Palette }
  ]

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
        Settings
      </h1>
      <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '32px' }}>
        Manage your application settings and preferences
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {settingsSections.map((section, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
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
            <div style={{
              backgroundColor: '#E7F9F5',
              padding: '12px',
              borderRadius: '10px',
              width: 'fit-content',
              marginBottom: '16px'
            }}>
              <section.icon size={24} style={{ color: '#007787' }} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', marginBottom: '8px' }}>
              {section.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
