import { cn } from '@/lib/utils'
import type { HealthStatus } from '@/types'

export interface HealthDotProps {
  status: HealthStatus
  label?: string
  showLabel?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const statusStyles: Record<HealthStatus, string> = {
  healthy: 'bg-green-500',
  degraded: 'bg-yellow-500',
  down: 'bg-red-500',
}

const statusLabels: Record<HealthStatus, string> = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
}

const sizeStyles = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
}

export function HealthDot({
  status,
  label,
  showLabel = false,
  className,
  size = 'md',
}: HealthDotProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn('rounded-full animate-pulse', statusStyles[status], sizeStyles[size])}
        aria-label={label || statusLabels[status]}
      />
      {showLabel && (
        <span className="text-sm text-muted-foreground">{label || statusLabels[status]}</span>
      )}
    </div>
  )
}
