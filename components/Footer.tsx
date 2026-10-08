'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { nav, site } from '@/lib/site'
import { useSite } from './Providers'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { lenis } = useSite()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['60%', '0%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-ink px-6 pt-20 pb-6 md:px-10">
      <div className="flex flex-col justify-between gap-12 md:flex-row">
        <div className="flex gap-16 font-display text-sm tracking-[0.25em] uppercase">
          <div className="flex flex-col gap-2">
            {nav.map((n) => (
              <a key={n.name} href={n.href} className="text-muted transition-colors hover:text-paper">
                {n.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {site.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-paper">
                {s.name}
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2.5 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
          className="self-start font-display text-sm tracking-[0.25em] text-muted uppercase transition-colors hover:text-accent"
        >
          Back to top ↑
        </button>
      </div>

      <motion.p
        style={{ y, opacity }}
        className="mt-20 text-center font-display text-[25vw] leading-[0.75] tracking-tight uppercase select-none"
        aria-hidden
      >
        Neo Nisen
      </motion.p>

      <div className="mt-6 flex flex-col justify-between gap-2 text-xs tracking-[0.2em] text-muted uppercase md:flex-row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{site.role}</span>
      </div>
    </footer>
  )
}
