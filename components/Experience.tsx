'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { timeline } from '@/lib/site'
import { FadeIn, RevealText } from './motion'

export function Experience() {
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.7', 'end 0.6'] })
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="experience" className="relative bg-paper px-6 py-32 text-ink md:px-10 md:py-48">
      <div className="grid gap-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <FadeIn y={12} className="flex items-center gap-4 font-display text-sm tracking-[0.3em] text-ink/50 uppercase">
              <span className="text-accent">(04)</span>
              <span className="h-px w-10 bg-ink/20" />
              Journey
            </FadeIn>
            <h2 className="mt-10 font-display text-[18vw] leading-[0.82] uppercase md:text-[8vw]">
              <RevealText text="My journey" />
              <br />
              <span className="font-serif tracking-tight normal-case italic text-accent">
                <RevealText text="so far" delay={0.15} />
              </span>
            </h2>
          </div>
        </div>

        <ol ref={list} className="relative md:col-span-6 md:col-start-7">
          <span className="absolute top-0 bottom-0 left-0 w-px bg-ink/15" />
          <motion.span style={{ scaleY: line }} className="absolute top-0 bottom-0 left-0 w-px origin-top bg-accent" />

          {timeline.map((item) => (
            <li key={item.title} className="group relative pb-24 pl-10 last:pb-0 md:pl-16">
              <span className="absolute top-3 -left-[5px] h-[11px] w-[11px] rounded-full border-2 border-paper bg-ink transition-colors duration-500 group-hover:bg-accent" />
              <FadeIn>
                <p className="font-serif text-2xl text-accent italic">{item.year}</p>
                <h3 className="mt-3 font-display text-5xl leading-[0.9] uppercase md:text-6xl">{item.title}</h3>
                <p className="mt-2 font-display text-lg tracking-[0.25em] text-ink/50 uppercase">{item.org}</p>
                <p className="mt-6 max-w-md text-lg text-ink/70">{item.text}</p>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
