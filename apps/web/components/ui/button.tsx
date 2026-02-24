import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, CSSProperties, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}

const sizeStyles: Record<string, CSSProperties> = {
  sm: { height: 28, padding: '0 10px', fontSize: 12 },
  md: { height: 36, padding: '0 16px', fontSize: 14 },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          {
            'btn-default': variant === 'default',
            'btn-ghost': variant === 'ghost',
            'btn-danger': variant === 'danger',
          },
          className
        )}
        style={{ ...sizeStyles[size], ...style }}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
