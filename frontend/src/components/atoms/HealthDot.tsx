import type { HealthStatus } from '@/types'

export interface HealthDotProps {
  status: HealthStatus
  label?: string
  showLabel?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const statusColors: Record<HealthStatus, string> = {
  healthy: '#10b981',
  degraded: '#eab308',
  down: '#ef4444',
}

const statusLabels: Record<HealthStatus, string> = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
}

const sizes = {
  sm: 8,
  md: 12,
  lg: 16,
}

export function HealthDot({
  status,
  label,
  showLabel = false,
  className,
  size = 'md',
}: HealthDotProps) {
  const dotSize = sizes[size]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className={className}>
      <span
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: '9999px',
          backgroundColor: statusColors[status],
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
        aria-label={label || statusLabels[status]}
      />
      {showLabel && (
        <span style={{ fontSize: '14px', color: '#A8DCDB' }}>
          {label || statusLabels[status]}
        </span>
      )}
    </div>
  )
}
