import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  sidebarCollapsed: boolean
  copilotOpen: boolean
  theme: 'light' | 'dark' | 'system'
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleCopilot: () => void
  setCopilotOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

export const useUIStore = create<UIState>()(
  persist(
    set => ({
      sidebarCollapsed: false,
      copilotOpen: false,
      theme: 'light',

      toggleSidebar: () => {
        set(state => ({ sidebarCollapsed: !state.sidebarCollapsed }))
      },

      setSidebarCollapsed: collapsed => {
        set({ sidebarCollapsed: collapsed })
      },

      toggleCopilot: () => {
        set(state => ({ copilotOpen: !state.copilotOpen }))
      },

      setCopilotOpen: open => {
        set({ copilotOpen: open })
      },

      setTheme: theme => {
        set({ theme })
      },
    }),
    {
      name: 'stardq-ui',
    }
  )
)
