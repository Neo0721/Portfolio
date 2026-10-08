'use client'

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'
import { useRef } from 'react'

/**
 * Infinite marquee whose speed (and direction) reacts to how fast you scroll.
 */
export function Marquee({
  children,
  baseVelocity = 3,
  className,
}: {
  children: React.ReactNode
  baseVelocity?: number
  className?: string
}) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const dir = useRef(1)
  const hoverFactor = useSpring(1, { stiffness: 80, damping: 20 })

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * hoverFactor.get() * (delta / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    baseX.set(baseX.get() + move)
  })

  return (
    <div
      className={`flex overflow-hidden whitespace-nowrap ${className ?? ''}`}
      onPointerEnter={() => hoverFactor.set(0.15)}
      onPointerLeave={() => hoverFactor.set(1)}
    >
      <motion.div className="flex flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
