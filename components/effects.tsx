'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

/** Text that rolls up to reveal an accent copy of itself on hover. */
export function RollText({
  children,
  className,
  hoverClass = 'text-accent',
}: {
  children: string
  className?: string
  hoverClass?: string
}) {
  return (
    <span className={`group/roll relative inline-flex overflow-hidden leading-[1.15] ${className ?? ''}`}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className={`absolute inset-0 block translate-y-full ${hoverClass} transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover/roll:translate-y-0`}
      >
        {children}
      </span>
    </span>
  )
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/** Decodes itself from random glyphs when it enters view, and again on hover. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const inView = useInView(ref, { once: true })

  const run = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    let frame = 0
    const total = 16
    timer.current = setInterval(() => {
      frame++
      setOut(
        Array.from(text)
          .map((c, i) => (c === ' ' || i < (frame / total) * text.length ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      )
      if (frame >= total && timer.current) {
        clearInterval(timer.current)
        setOut(text)
      }
    }, 40)
  }, [text])

  useEffect(() => {
    if (inView) run()
  }, [inView, run])
  useEffect(() => () => void (timer.current && clearInterval(timer.current)), [])

  return (
    <span ref={ref} onMouseEnter={run} className={className}>
      {out}
    </span>
  )
}

/** Wrapper that leans toward the pointer while hovered. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className ?? ''}`}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
