'use client'

import { animate, AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE } from './motion'

const WORDS = ['Design', 'Build', 'Ship', 'Neo']

export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const controls = animate(0, 100, {
      duration: reduce ? 0.2 : 2.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setVisible(false), reduce ? 0 : 250),
    })
    return () => controls.stop()
  }, [])

  const word = WORDS[Math.min(WORDS.length - 1, Math.floor(count / (100 / WORDS.length)))]

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-paper p-6 text-ink md:p-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <div className="flex justify-between font-display text-sm tracking-[0.3em] uppercase">
            <span>Neo Nisen Palathingal</span>
            <span>Portfolio ©{new Date().getFullYear()}</span>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={word}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.45, ease: EASE }}
                className="font-serif text-5xl italic md:text-7xl"
              >
                {word}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="mb-4 h-px flex-1 bg-ink/15">
              <div className="h-full bg-ink" style={{ width: `${count}%` }} />
            </div>
            <span className="font-display text-[22vw] leading-[0.8] tabular-nums md:text-[14vw]">
              {String(count).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
