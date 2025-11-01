import { Menu, Bell, User, Sparkles, LogOut } from 'lucide-react'
import { useUIStore, useAlertsStore, useAuthStore } from '@/stores'
import { RoleTag } from '@/components/atoms'

export function Topbar() {
  const { toggleSidebar, toggleCopilot, copilotOpen } = useUIStore()
  const { unreadCount } = useAlertsStore()
  const { user, logout } = useAuthStore()

  return (
    <header style={{
      backgroundColor: '#F8F9FA',
      borderBottom: '1px solid #E2E8F0',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px'
    }}>
      {/* Left section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={toggleSidebar}
          style={{
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
            color: '#012F35'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E2E8F0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Right section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* AI Copilot Toggle */}
        <button
          onClick={toggleCopilot}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: copilotOpen ? '#007787' : 'transparent',
            color: copilotOpen ? 'white' : '#64748B'
          }}
          onMouseEnter={(e) => {
            if (!copilotOpen) e.currentTarget.style.backgroundColor = '#E2E8F0'
          }}
          onMouseLeave={(e) => {
            if (!copilotOpen) e.currentTarget.style.backgroundColor = 'transparent'
          }}
          aria-label="Toggle AI Copilot"
        >
          <Sparkles size={18} />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>AI Copilot</span>
        </button>

        {/* Alerts */}
        <button
          style={{
            position: 'relative',
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
            color: '#012F35'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E2E8F0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          aria-label={`Alerts (${unreadCount} unread)`}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#ef4444',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              borderRadius: '50%',
              height: '20px',
              width: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#012F35' }}>{user.name}</span>
                <RoleTag role={user.role} />
              </div>
              <button
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                  color: '#012F35'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E2E8F0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="User menu"
              >
                <User size={20} />
              </button>
              <button
                onClick={logout}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                  color: '#ef4444'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#64748B' }}>Guest User</span>
              <button
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                  color: '#012F35'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E2E8F0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="User menu"
              >
                <User size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
