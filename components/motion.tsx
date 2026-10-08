'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Shared "expo in-out" curve used across the site for that slow, cinematic feel
export const EASE = [0.76, 0, 0.24, 1] as const
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

/** Text that slides up from behind a mask, one line or word group at a time. */
export function RevealText({
  text,
  className,
  delay = 0,
  by = 'word',
  play,
}: {
  text: string
  className?: string
  delay?: number
  by?: 'word' | 'char'
  play?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const show = play ?? inView
  const parts = by === 'word' ? text.split(' ') : Array.from(text)

  return (
    <span ref={ref} className={`${by === 'char' ? 'whitespace-nowrap' : ''} ${className ?? ''}`} aria-label={text}>
      {parts.map((part, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%', rotate: 4 }}
            animate={show ? { y: '0%', rotate: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: delay + i * (by === 'word' ? 0.06 : 0.035) }}
          >
            {part === ' ' ? ' ' : part}
          </motion.span>
          {by === 'word' && i < parts.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}

/** Simple fade-and-rise when scrolled into view. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.2, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Small uppercase section label with an index number. */
export function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <FadeIn y={12} className="flex items-center gap-4 font-display text-sm tracking-[0.3em] text-muted uppercase">
      <span className="text-accent">({index})</span>
      <span className="h-px w-10 bg-line" />
      {children}
    </FadeIn>
  )
}
