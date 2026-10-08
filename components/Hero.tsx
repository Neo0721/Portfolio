'use client'

import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { site } from '@/lib/site'
import { EASE_OUT, RevealText } from './motion'
import { useSite } from './Providers'

export function Hero() {
  const { loaded } = useSite()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // As you scroll away, the two name lines drift apart and the whole stage recedes
  const xLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const xRight = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const radius = useTransform(scrollYProgress, [0, 1], [0, 48])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])

  // Pointer spotlight: lights up a hidden grid and tints the stage around the cursor
  const mx = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 20 })
  const my = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mx}px ${my}px, rgba(255,77,46,0.18), transparent 60%)`
  const gridMask = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, black, transparent 100%)`

  return (
    <section id="top" ref={ref} className="relative h-[180vh] bg-paper">
      <motion.div
        style={{ scale, borderRadius: radius }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          mx.set(e.clientX - r.left)
          my.set(e.clientY - r.top)
        }}
        className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden bg-ink px-6 pt-28 pb-8 md:px-10"
      >
        {/* Drifting accent glow */}
        <motion.div style={{ y: glowY }} className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-drift absolute top-1/4 left-1/3 h-[50vmax] w-[50vmax] rounded-full bg-accent/25 blur-[120px]" />
          <div className="animate-drift absolute right-0 bottom-0 h-[30vmax] w-[30vmax] rounded-full bg-[#6d5bff]/15 blur-[120px] [animation-delay:-9s]" />
        </motion.div>

        {/* Cursor spotlight + revealed grid */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} aria-hidden />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage: gridMask,
            WebkitMaskImage: gridMask,
            backgroundImage:
              'linear-gradient(rgba(237,235,230,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(237,235,230,.14) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <motion.div style={{ opacity }} className="relative flex items-start justify-between gap-6">
          <p className="max-w-xs text-sm leading-relaxed text-muted md:text-base">
            <RevealText play={loaded} delay={0.6} text="I craft clean, efficient web apps and backend systems that solve real-world problems." />
          </p>
          <motion.p
            className="hidden text-right font-serif text-2xl text-paper/80 italic md:block"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : undefined}
            transition={{ duration: 1.5, delay: 1 }}
          >
            Computer Engineering
            <br />
            Student &amp; Developer
          </motion.p>
        </motion.div>

        <h1 className="relative font-display leading-[0.78] tracking-tight uppercase" aria-label={site.name}>
          <motion.span style={{ x: xLeft }} className="block text-[31vw] md:text-[24vw]">
            <RevealText play={loaded} by="char" hover text="Neo" />
          </motion.span>
          <motion.span style={{ x: xRight }} className="block text-right text-[22vw] md:text-[17vw]">
            <span className="mr-[2vw] align-top font-serif text-[6vw] tracking-normal normal-case italic text-accent md:text-[4vw]">
              <RevealText play={loaded} delay={0.5} text="(Nisen)" />
            </span>
            <RevealText play={loaded} by="char" hover delay={0.2} text="Palathingal" />
          </motion.span>
        </h1>

        <motion.div
          style={{ opacity }}
          className="relative flex items-end justify-between font-display text-sm tracking-[0.25em] text-muted uppercase"
          initial={{ y: 30 }}
          animate={loaded ? { y: 0 } : undefined}
          transition={{ duration: 1.2, ease: EASE_OUT, delay: 1.1 }}
        >
          <span className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to internships
          </span>
          <span className="flex items-center gap-3">
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-line">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-paper"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
