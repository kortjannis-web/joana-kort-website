import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'dark' | 'outline' | 'light' | 'outline-light' | 'text'
type Size = 'md' | 'lg' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.005em] transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-[var(--ease-soft)] active:scale-[0.985] active:duration-150 disabled:pointer-events-none disabled:opacity-50 select-none'

const variants: Record<Variant, string> = {
  primary: 'btn-cta',
  dark: 'btn-cta',
  outline: 'border border-espresso-800/30 text-espresso-800 hover:border-espresso-800 hover:bg-espresso-800/[0.04]',
  light: 'bg-white text-espresso-900 hover:bg-caramel-50',
  'outline-light': 'border border-white/40 text-white hover:border-white hover:bg-white/[0.06]',
  text: 'rounded-none px-0 text-espresso-800 underline decoration-caramel-500/60 underline-offset-[0.28em] hover:text-caramel-800 hover:decoration-caramel-600',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-4 text-[0.875rem]',
  md: 'min-h-12 px-6 text-[0.9375rem]',
  lg: 'min-h-14 px-7 text-base',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], variant === 'text' ? 'min-h-11 text-[0.9375rem]' : sizes[size], className)
}

type LinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function ButtonLink({ variant = 'primary', size = 'md', className, children, href, ...rest }: LinkProps) {
  const cls = buttonClass(variant, size, className)
  const h = typeof href === 'string' ? href : ''
  if (h.startsWith('http') || h.startsWith('tel:') || h.startsWith('mailto:')) {
    const external = h.startsWith('http')
    return (
      <a href={h} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  )
}

type BtnProps = ComponentProps<'button'> & { variant?: Variant; size?: Size }

export function Button({ variant = 'primary', size = 'md', className, ...rest }: BtnProps) {
  return <button className={buttonClass(variant, size, className)} {...rest} />
}
