import { ReactNode } from 'react'
import { SidebarNav } from './SidebarNav'
import { Topbar } from './Topbar'
import { useUIStore } from '@/stores'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { sidebarCollapsed, copilotOpen } = useUIStore()

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main
          className={cn(
            'flex-1 overflow-y-auto bg-background transition-all duration-300',
            copilotOpen && 'mr-96'
          )}
        >
          {children}
        </main>
      </div>

      {/* AI Copilot Sidebar (conditionally rendered) */}
      {copilotOpen && (
        <aside className="w-96 bg-surface border-l border-border overflow-y-auto">
          <div className="p-6">
            <h2 className="text-h2 font-heading mb-4">AI Copilot</h2>
            <p className="text-muted-foreground text-sm">
              Ask questions about your data quality or get AI-powered suggestions for cleaning and
              improvements.
            </p>
            <div className="mt-6">
              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <p className="text-sm text-info-foreground">
                  <strong>Coming soon:</strong> Interactive chat, rule suggestions, and auto-fix
                  recommendations powered by OpenAI GPT-4.
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}
