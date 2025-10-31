import { cn, formatNumber, formatPercentage } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface KPIStatProps {
  label: string
  value: number
  trend?: number // percentage change, e.g., 0.15 for +15%
  format?: 'number' | 'percentage'
  className?: string
}

export function KPIStat({ label, value, trend, format = 'number', className }: KPIStatProps) {
  const formattedValue = format === 'percentage' ? formatPercentage(value) : formatNumber(value)

  const trendValue = trend !== undefined ? formatPercentage(Math.abs(trend), 1) : null
  const trendDirection = trend && trend > 0 ? 'up' : trend && trend < 0 ? 'down' : 'neutral'

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{formattedValue}</span>
        {trendValue && (
          <div
            className={cn('flex items-center gap-0.5 text-xs font-medium', {
              'text-green-600': trendDirection === 'up',
              'text-red-600': trendDirection === 'down',
              'text-gray-500': trendDirection === 'neutral',
            })}
          >
            {trendDirection === 'up' && <TrendingUp className="h-3 w-3" />}
            {trendDirection === 'down' && <TrendingDown className="h-3 w-3" />}
            {trendDirection === 'neutral' && <Minus className="h-3 w-3" />}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  )
}
