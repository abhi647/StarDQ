import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Role, Permission } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  permissions: Permission[]
  login: (user: User, permissions: Permission[]) => void
  logout: () => void
  hasPermission: (permission: Permission) => boolean
  hasRole: (role: Role) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      permissions: [],

      login: (user, permissions) => {
        set({ user, isAuthenticated: true, permissions })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, permissions: [] })
      },

      hasPermission: (permission: Permission) => {
        return get().permissions.includes(permission)
      },

      hasRole: (role: Role) => {
        return get().user?.role === role
      },
    }),
    {
      name: 'stardq-auth',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        permissions: state.permissions,
      }),
    }
  )
)
