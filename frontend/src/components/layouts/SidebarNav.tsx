import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Database,
  GitBranch,
  ShieldCheck,
  Sparkles,
  FileText,
  Bell,
  Settings,
  Download,
  BarChart3,
  Cog,
  ChevronRight,
  ChevronDown,
  Wand2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores'
import { useAuth } from '@/hooks'
import { sidebarRoutes } from '@/lib/routes'
import { useState } from 'react'

const iconMap: Record<string, any> = {
  LayoutDashboard,
  Database,
  GitBranch,
  Wand2,
  ShieldCheck,
  Sparkles,
  FileText,
  Bell,
  Settings,
  Download,
  BarChart3,
  Cog,
}

export function SidebarNav() {
  const { sidebarCollapsed } = useUIStore()
  const { hasAnyRole, user } = useAuth()
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (path: string) => {
    setExpandedSections(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    )
  }

  const canAccessRoute = (roles?: string[]) => {
    // Show all routes if no roles required
    if (!roles || roles.length === 0) return true
    // Show all routes if not authenticated (for development)
    if (!user) return true
    // Check roles if authenticated
    return hasAnyRole(roles as any)
  }

  return (
    <aside
      style={{
        backgroundColor: '#012F35',
        color: 'white',
        height: '100vh',
        transition: 'all 0.3s',
        display: 'flex',
        flexDirection: 'column',
        width: sidebarCollapsed ? '64px' : '256px',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '16px', borderBottom: '1px solid #1B4E54' }}>
        <h1
          style={{
            fontFamily: 'Bw Gradual, Segoe UI, system-ui, sans-serif',
            fontWeight: 'bold',
            fontSize: sidebarCollapsed ? '14px' : '20px',
          }}
        >
          {sidebarCollapsed ? 'SDQ' : 'StarDQ 2.0'}
        </h1>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', paddingTop: '16px', paddingBottom: '16px' }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 8px' }}>
          {sidebarRoutes.map(route => {
            if (!canAccessRoute(route.roles)) return null

            const Icon = route.icon ? iconMap[route.icon] : null
            const hasChildren = route.children && route.children.length > 0
            const isExpanded = expandedSections.includes(route.path)

            return (
              <li key={route.path}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleSection(route.path)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background-color 0.2s',
                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1B4E54'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {Icon && <Icon size={20} />}
                      {!sidebarCollapsed && (
                        <>
                          <span style={{ flex: 1 }}>{route.label}</span>
                          {isExpanded ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </>
                      )}
                    </button>
                    {isExpanded && !sidebarCollapsed && (
                      <ul style={{ marginLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {route.children?.map(child => {
                          if (!canAccessRoute(child.roles)) return null
                          return (
                            <li key={child.path}>
                              <NavLink
                                to={child.path}
                                style={({ isActive }) => ({
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  padding: '8px 12px',
                                  borderRadius: '8px',
                                  backgroundColor: isActive ? '#007787' : 'transparent',
                                  color: 'white',
                                  textDecoration: 'none',
                                  fontSize: '14px',
                                  transition: 'background-color 0.2s',
                                  fontWeight: isActive ? '600' : '400',
                                })}
                              >
                                {child.label}
                              </NavLink>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={route.path}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? '#007787' : 'transparent',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s',
                      fontWeight: isActive ? '600' : '400',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    })}
                    title={sidebarCollapsed ? route.label : undefined}
                  >
                    {Icon && <Icon size={20} />}
                    {!sidebarCollapsed && <span>{route.label}</span>}
                  </NavLink>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
