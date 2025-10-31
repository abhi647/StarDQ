import { cn } from '@/lib/utils'
import type { Role } from '@/types'

export interface RoleTagProps {
  role: Role
  className?: string
}

const roleLabels: Record<Role, string> = {
  it_admin: 'IT Admin',
  data_steward: 'Data Steward',
  business_analyst: 'Business Analyst',
  viewer: 'Viewer',
  auditor: 'Auditor',
  exec: 'Executive',
}

const roleStyles: Record<Role, string> = {
  it_admin: 'bg-primary text-primary-foreground',
  data_steward: 'bg-accent text-accent-foreground',
  business_analyst: 'bg-info text-white',
  viewer: 'bg-muted text-muted-foreground',
  auditor: 'bg-secondary text-secondary-foreground',
  exec: 'bg-danger text-danger-foreground',
}

export function RoleTag({ role, className }: RoleTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
        roleStyles[role],
        className
      )}
    >
      {roleLabels[role]}
    </span>
  )
}
