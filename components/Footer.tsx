'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { nav, site } from '@/lib/site'
import { Magnetic, RollText } from './effects'
import { useSite } from './Providers'

/**
 * Sits pinned underneath the page; the content scrolls away like a curtain to
 * reveal it.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { lenis } = useSite()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-40%', '0%'])
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 2.5 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))

  return (
    <footer ref={ref} className="sticky bottom-0 z-0 overflow-hidden bg-accent px-6 pt-24 pb-6 text-ink md:px-10">
      <motion.div style={{ y }}>
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <p className="font-serif text-4xl italic md:text-6xl">Got an idea?</p>
            <a href={`mailto:${site.email}`} className="mt-2 block font-display text-3xl uppercase md:text-5xl">
              <RollText hoverClass="text-paper">{site.email}</RollText>
            </a>
          </div>

          <div className="flex gap-16 font-display text-sm tracking-[0.25em] uppercase">
            <div className="flex flex-col gap-2">
              {nav.map((n) => (
                <a key={n.name} href={n.href}>
                  <RollText hoverClass="text-paper">{n.name}</RollText>
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {site.socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                  <RollText hoverClass="text-paper">{s.name}</RollText>
                </a>
              ))}
            </div>
          </div>

          <Magnetic className="self-start">
            <button
              onClick={toTop}
              data-cursor="Top"
              aria-label="Back to top"
              className="group flex h-24 w-24 items-center justify-center rounded-full border border-ink/40 text-3xl transition-colors duration-500 hover:bg-ink hover:text-accent"
            >
              <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span>
            </button>
          </Magnetic>
        </div>

        <motion.p
          style={{ scale }}
          className="mt-16 origin-bottom text-center font-display text-[25vw] leading-[0.75] tracking-tight uppercase select-none"
          aria-hidden
        >
          Neo Nisen
        </motion.p>

        <div className="mt-6 flex flex-col justify-between gap-2 text-xs tracking-[0.2em] uppercase opacity-70 md:flex-row">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.role}</span>
        </div>
      </motion.div>
    </footer>
  )
}
