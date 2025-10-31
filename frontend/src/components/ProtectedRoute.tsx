import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import type { Permission, Role } from '@/types'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions?: Permission[]
  requiredRoles?: Role[]
  requireAll?: boolean // If true, user must have ALL permissions/roles; if false, just one
  redirectTo?: string
}

/**
 * Protects routes based on authentication and authorization
 */
export function ProtectedRoute({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  requireAll = false,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, hasPermission, hasRole } = useAuth()

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requireAll
      ? requiredPermissions.every(p => hasPermission(p))
      : requiredPermissions.some(p => hasPermission(p))

    if (!hasRequiredPermissions) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  // Check roles
  if (requiredRoles.length > 0) {
    const hasRequiredRoles = requireAll
      ? requiredRoles.every(r => hasRole(r))
      : requiredRoles.some(r => hasRole(r))

    if (!hasRequiredRoles) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}
