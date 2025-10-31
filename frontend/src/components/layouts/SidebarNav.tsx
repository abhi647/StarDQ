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
      className={cn(
        'bg-primary text-primary-foreground h-screen transition-all duration-300 flex flex-col',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-secondary">
        <h1 className={cn('font-heading font-bold', sidebarCollapsed ? 'text-sm' : 'text-xl')}>
          {sidebarCollapsed ? 'SDQ' : 'StarDQ 2.0'}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
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
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left',
                        sidebarCollapsed && 'justify-center'
                      )}
                    >
                      {Icon && <Icon size={20} />}
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1">{route.label}</span>
                          {isExpanded ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </>
                      )}
                    </button>
                    {isExpanded && !sidebarCollapsed && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {route.children?.map(child => {
                          if (!canAccessRoute(child.roles)) return null
                          return (
                            <li key={child.path}>
                              <NavLink
                                to={child.path}
                                className={({ isActive }) =>
                                  cn(
                                    'flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm',
                                    isActive && 'bg-accent font-semibold'
                                  )
                                }
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
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors',
                        isActive && 'bg-accent font-semibold',
                        sidebarCollapsed && 'justify-center'
                      )
                    }
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
