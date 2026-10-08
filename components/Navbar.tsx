'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { nav, site } from '@/lib/site'
import { EASE } from './motion'
import { RollText, ScrambleText } from './effects'
import { useSite } from './Providers'

function MumbaiTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time} IST</span>
}

export function Navbar() {
  const { loaded, lenis } = useSite()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 200)
  })

  useEffect(() => {
    if (open) lenis?.stop()
    else if (loaded) lenis?.start()
  }, [open, lenis, loaded])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector<HTMLElement>(href)
    if (!el) return
    if (lenis) {
      lenis.start()
      lenis.scrollTo(el, { duration: 2 })
    } else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: '-100%' }}
        animate={{ y: loaded && (!hidden || open) ? '0%' : '-100%' }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[80] ${open ? '' : 'mix-blend-difference'}`}
      >
        <div className={`flex items-center justify-between px-6 py-6 font-display text-sm tracking-[0.25em] uppercase transition-colors duration-500 md:px-10 ${open ? 'text-ink' : 'text-paper'}`}>
          <a href="#top" onClick={go('#top')} className="text-2xl tracking-[0.15em]">
            Neo<span className={open ? '' : 'text-accent'}>.</span>
          </a>
          <div className="hidden items-center gap-10 md:flex">
            <ScrambleText text={site.location} />
            <MumbaiTime />
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="group flex items-center gap-3"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-4 overflow-hidden leading-4">
              <motion.span className="block" animate={{ y: open ? '-100%' : '0%' }} transition={{ duration: 0.5, ease: EASE }}>
                Menu
              </motion.span>
              <motion.span className="absolute top-full left-0 block" animate={{ y: open ? '-100%' : '0%' }} transition={{ duration: 0.5, ease: EASE }}>
                Close
              </motion.span>
            </span>
            <span className="flex flex-col gap-1.5">
              <motion.span className="block h-px w-7 bg-current" animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} />
              <motion.span className="block h-px w-7 bg-current" animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col justify-end bg-accent px-6 pb-10 text-ink md:px-10"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 1, ease: EASE }}
          >
            <nav className="flex flex-col">
              {nav.map((item, i) => (
                <div key={item.name} className="overflow-hidden border-b border-ink/20">
                  <motion.a
                    href={item.href}
                    onClick={go(item.href)}
                    className="group flex items-baseline justify-between py-2"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    <span className="font-display text-[14vw] leading-[0.9] uppercase transition-transform duration-500 group-hover:translate-x-6 md:text-[8vw]">
                      {item.name}
                    </span>
                    <span className="font-serif text-2xl italic">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className="mt-10 flex flex-wrap justify-between gap-6 font-display text-sm tracking-[0.25em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              exit={{ opacity: 0 }}
            >
              <a href={`mailto:${site.email}`}>
                <RollText hoverClass="text-paper">{site.email}</RollText>
              </a>
              <div className="flex gap-6">
                {site.socials.slice(0, 2).map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                    <RollText hoverClass="text-paper">{s.name}</RollText>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
