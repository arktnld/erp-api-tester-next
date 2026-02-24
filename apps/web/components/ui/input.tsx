import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full px-3 py-2 rounded-md text-sm bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-subtle)] outline-none focus:border-[var(--accent)] transition-colors',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
