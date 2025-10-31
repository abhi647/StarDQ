import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Badge } from '@/types'

export interface TrustIconProps {
  badge: Badge
  className?: string
  size?: number
}

export function TrustIcon({ badge, className, size = 24 }: TrustIconProps) {
  const iconProps = {
    size,
    className: cn(className),
  }

  switch (badge) {
    case 'Gold':
      return <ShieldCheck {...iconProps} className={cn('text-accent', iconProps.className)} />
    case 'Silver':
      return <Shield {...iconProps} className={cn('text-muted', iconProps.className)} />
    case 'Bronze':
      return <ShieldAlert {...iconProps} className={cn('text-warning', iconProps.className)} />
  }
}
