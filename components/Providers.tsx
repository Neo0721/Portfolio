'use client'

import Lenis from 'lenis'
import { motion, MotionConfig, useScroll, useSpring } from 'framer-motion'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Preloader } from './Preloader'
import { Cursor } from './Cursor'

type Ctx = { loaded: boolean; lenis: Lenis | null }
const SiteCtx = createContext<Ctx>({ loaded: false, lenis: null })

export const useSite = () => useContext(SiteCtx)

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[85] h-[2px] origin-left bg-accent" aria-hidden />
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafId = useRef(0)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: 0, duration: 1.8 },
    })
    instance.stop()
    const raf = (time: number) => {
      instance.raf(time)
      rafId.current = requestAnimationFrame(raf)
    }
    rafId.current = requestAnimationFrame(raf)
    setLenis(instance)
    return () => {
      cancelAnimationFrame(rafId.current)
      instance.destroy()
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = loaded ? '' : 'hidden'
    if (loaded) lenis?.start()
  }, [loaded, lenis])

  return (
    <MotionConfig reducedMotion="user">
      <SiteCtx.Provider value={{ loaded, lenis }}>
        <Preloader onDone={() => setLoaded(true)} />
        <Cursor />
        <ScrollProgress />
        <div className="grain" aria-hidden />
        {children}
      </SiteCtx.Provider>
    </MotionConfig>
  )
}
