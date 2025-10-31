import { useAuthStore } from '@/stores'
import type { Permission, Role } from '@/types'

/**
 * Hook for authentication and authorization
 */
export function useAuth() {
  const { user, isAuthenticated, permissions, login, logout, hasPermission, hasRole } =
    useAuthStore()

  return {
    user,
    isAuthenticated,
    permissions,
    login,
    logout,
    hasPermission,
    hasRole,
    /**
     * Check if user has any of the specified permissions
     */
    hasAnyPermission: (perms: Permission[]) => {
      return perms.some(p => hasPermission(p))
    },
    /**
     * Check if user has all of the specified permissions
     */
    hasAllPermissions: (perms: Permission[]) => {
      return perms.every(p => hasPermission(p))
    },
    /**
     * Check if user has any of the specified roles
     */
    hasAnyRole: (roles: Role[]) => {
      return roles.some(r => hasRole(r))
    },
  }
}
