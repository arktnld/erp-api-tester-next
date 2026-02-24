import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          {
            'bg-[#6366f1] text-white hover:bg-[#4f46e5]': variant === 'default',
            'text-[#888888] hover:text-[#ededed] hover:bg-[#161616]':
              variant === 'ghost',
            'bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20':
              variant === 'danger',
          },
          {
            'h-7 px-3 text-xs': size === 'sm',
            'h-9 px-4 text-sm': size === 'md',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
