import { Menu, Bell, User, Sparkles, LogOut } from 'lucide-react'
import { useUIStore, useAlertsStore, useAuthStore } from '@/stores'
import { RoleTag } from '@/components/atoms'
import { cn } from '@/lib/utils'

export function Topbar() {
  const { toggleSidebar, toggleCopilot, copilotOpen } = useUIStore()
  const { unreadCount } = useAlertsStore()
  const { user, logout } = useAuthStore()

  return (
    <header className="bg-surface border-b border-border h-16 flex items-center justify-between px-6">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-muted rounded-lg transition-colors focus-visible-ring"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* AI Copilot Toggle */}
        <button
          onClick={toggleCopilot}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors focus-visible-ring',
            copilotOpen
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-muted text-muted-foreground'
          )}
          aria-label="Toggle AI Copilot"
        >
          <Sparkles size={18} />
          <span className="text-sm font-medium">AI Copilot</span>
        </button>

        {/* Alerts */}
        <button
          className="relative p-2 hover:bg-muted rounded-lg transition-colors focus-visible-ring"
          aria-label={`Alerts (${unreadCount} unread)`}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-danger text-danger-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{user.name}</span>
                <RoleTag role={user.role} />
              </div>
              <button
                className="p-2 hover:bg-muted rounded-full transition-colors focus-visible-ring"
                aria-label="User menu"
              >
                <User size={20} />
              </button>
              <button
                onClick={logout}
                className="p-2 hover:bg-danger/10 text-danger rounded-lg transition-colors focus-visible-ring"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Guest User</span>
              <button
                className="p-2 hover:bg-muted rounded-full transition-colors focus-visible-ring"
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
