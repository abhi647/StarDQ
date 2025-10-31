import { ReactNode } from 'react'
import { SidebarNav } from './SidebarNav'
import { Topbar } from './Topbar'
import { AICopilot } from '../organisms/AICopilot'
import { useUIStore } from '@/stores'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { sidebarCollapsed, copilotOpen } = useUIStore()

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <SidebarNav />

      {/* Main content area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#F8F9FA',
          transition: 'all 0.3s',
          marginRight: copilotOpen ? '480px' : '0'
        }}>
          {children}
        </main>
      </div>

      {/* AI Copilot Sidebar */}
      {copilotOpen && (
        <aside style={{
          width: '480px',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
          boxShadow: '-4px 0 12px rgba(0,0,0,0.1)',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <AICopilot />
        </aside>
      )}
    </div>
  )
}
