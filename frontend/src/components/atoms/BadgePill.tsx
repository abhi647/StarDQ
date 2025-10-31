import type { Badge } from '@/types'

export interface BadgePillProps extends React.HTMLAttributes<HTMLSpanElement> {
  badge: Badge
  size?: 'sm' | 'md' | 'lg'
}

const badgeStyles: Record<Badge, { bg: string; color: string }> = {
  Bronze: { bg: '#FFC994', color: '#012F35' },
  Silver: { bg: '#A8DCDB', color: '#012F35' },
  Gold: { bg: '#007787', color: 'white' },
}

const sizeStyles = {
  sm: { padding: '2px 8px', fontSize: '10px' },
  md: { padding: '4px 12px', fontSize: '12px' },
  lg: { padding: '6px 16px', fontSize: '14px' },
}

export function BadgePill({ badge, size = 'md', style, ...props }: BadgePillProps) {
  const badgeStyle = badgeStyles[badge]
  const sizeStyle = sizeStyles[size]

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '9999px',
        fontWeight: '600',
        transition: 'all 0.2s',
        backgroundColor: badgeStyle.bg,
        color: badgeStyle.color,
        ...sizeStyle,
        ...style,
      }}
      {...props}
    >
      {badge}
    </span>
  )
}
