import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { Badge } from '@/types'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        bronze: 'bg-warning text-warning-foreground',
        silver: 'bg-muted text-muted-foreground',
        gold: 'bg-accent text-accent-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'bronze',
      size: 'md',
    },
  }
)

export interface BadgePillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  badge: Badge
}

const badgeToVariant: Record<Badge, 'bronze' | 'silver' | 'gold'> = {
  Bronze: 'bronze',
  Silver: 'silver',
  Gold: 'gold',
}

export function BadgePill({ badge, size, className, ...props }: BadgePillProps) {
  const variant = badgeToVariant[badge]

  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {badge}
    </span>
  )
}
