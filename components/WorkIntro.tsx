'use client'

import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Pinned transition into the work section: an accent circle swells from the
 * centre, then an ink circle swallows it so the projects emerge seamlessly.
 */
export function WorkIntro() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const accentR = useTransform(scrollYProgress, [0.05, 0.55], [0, 80])
  const inkR = useTransform(scrollYProgress, [0.7, 1], [0, 80])
  const accentClip = useMotionTemplate`circle(${accentR}% at 50% 50%)`
  const inkClip = useMotionTemplate`circle(${inkR}% at 50% 50%)`
  const textScale = useTransform(scrollYProgress, [0, 0.6], [2.4, 1])
  const textRotate = useTransform(scrollYProgress, [0, 0.6], [-6, 0])
  const subOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.7], [0, 1, 0])

  const title = (className: string) => (
    <motion.h2
      aria-hidden
      style={{ scale: textScale, rotate: textRotate }}
      className={`text-center font-display text-[22vw] leading-[0.8] uppercase md:text-[16vw] ${className}`}
    >
      Selected
      <br />
      <span className="font-serif tracking-tight normal-case italic">work</span>
    </motion.h2>
  )

  return (
    <section ref={ref} className="relative h-[260vh] bg-ink" aria-label="Selected work">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {title('text-outline')}

        <motion.div style={{ clipPath: accentClip }} className="absolute inset-0 flex items-center justify-center bg-accent">
          {title('text-ink')}
          <motion.p
            style={{ opacity: subOpacity }}
            className="absolute bottom-12 font-display text-sm tracking-[0.3em] text-ink uppercase"
          >
            Two builds · scroll to explore
          </motion.p>
        </motion.div>

        <motion.div style={{ clipPath: inkClip }} className="absolute inset-0 bg-ink" />
      </div>
    </section>
  )
}
