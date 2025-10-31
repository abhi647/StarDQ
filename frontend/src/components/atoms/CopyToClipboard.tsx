import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CopyToClipboardProps {
  text: string
  className?: string
  size?: number
  showText?: boolean
}

export function CopyToClipboard({
  text,
  className,
  size = 16,
  showText = false,
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors focus-visible-ring',
        className
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check size={size} className="text-green-600" />
          {showText && <span className="text-xs">Copied!</span>}
        </>
      ) : (
        <>
          <Copy size={size} />
          {showText && <span className="text-xs">Copy</span>}
        </>
      )}
    </button>
  )
}
