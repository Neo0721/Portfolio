'use client'

import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { skills } from '@/lib/site'
import { Marquee } from './Marquee'
import { Eyebrow, RevealText } from './motion'

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-ink py-32 md:py-48">
      <div className="px-6 md:px-10">
        <Eyebrow index="02">Skills</Eyebrow>
        <h2 className="mt-10 max-w-5xl font-display text-[15vw] leading-[0.85] uppercase md:text-[8vw]">
          <RevealText text="My skills." />{' '}
          <span className="font-serif tracking-tight normal-case italic text-accent">
            <RevealText text="my superpowers" delay={0.2} />
          </span>
        </h2>
      </div>

      <div className="mt-24 space-y-4 md:mt-32">
        {skills.map((group, i) => (
          <div key={group.category} className="group/row border-y border-line py-4 transition-colors duration-500 hover:bg-ink-2">
            <Marquee baseVelocity={i % 2 === 0 ? -2 : 2}>
              <span className="mx-8 font-serif text-2xl text-accent italic md:text-3xl">{group.category}</span>
              {group.items.map((s) => (
                <span key={s} className="flex items-center">
                  <span
                    className={`inline-block font-display text-[16vw] leading-none uppercase transition-all duration-500 hover:skew-x-[-8deg] hover:text-accent hover:[-webkit-text-stroke-color:transparent] md:text-[9vw] ${
                      i === 1 ? 'text-outline' : 'text-paper'
                    }`}
                  >
                    {s}
                  </span>
                  <span className="mx-8 inline-block h-3 w-3 rotate-45 bg-accent transition-transform duration-700 group-hover/row:rotate-[225deg] md:h-4 md:w-4" />
                </span>
              ))}
            </Marquee>
          </div>
        ))}
      </div>

      <div className="mt-24 flex flex-col gap-10 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <p className="font-display text-[30vw] leading-[0.8] text-paper md:text-[16vw]">
          <CountUp to={15} suffix="+" />
        </p>
        <p className="max-w-sm pb-4 text-lg text-muted">
          Projects and academic builds completed — from campus platforms to AI-powered tools, each one a lesson in shipping.
        </p>
      </div>
    </section>
  )
}
