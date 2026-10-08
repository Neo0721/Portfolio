'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { about } from '@/lib/site'
import { FadeIn, RevealText } from './motion'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}

/** Paragraph that "reads itself" — each word lights up as you scroll. */
function ScrollParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="flex flex-wrap text-[8vw] leading-[1.05] font-medium tracking-tight md:text-[4.2vw]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

export function About() {
  const { education, languages, traits, interests, pillars } = about

  return (
    <section id="about" className="relative z-10 bg-paper px-6 py-32 text-ink md:px-10 md:py-48">
      <FadeIn y={12} className="mb-16 flex items-center gap-4 font-display text-sm tracking-[0.3em] text-ink/50 uppercase">
        <span className="text-accent">(01)</span>
        <span className="h-px w-10 bg-ink/20" />
        About
      </FadeIn>

      <ScrollParagraph text={about.statement} />

      {/* Pillars */}
      <div className="mt-32 grid grid-cols-1 border-t border-ink/15 md:grid-cols-3">
        {pillars.map((p, i) => (
          <FadeIn
            key={p.title}
            delay={i * 0.12}
            className="group border-b border-ink/15 py-10 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0"
          >
            <span className="font-serif text-xl text-accent italic">0{i + 1}</span>
            <h3 className="mt-6 font-display text-5xl uppercase transition-transform duration-700 group-hover:translate-x-3 md:text-[4.5vw]">
              <RevealText text={p.title} by="char" />
            </h3>
            <p className="mt-4 max-w-xs text-ink/60">{p.text}</p>
          </FadeIn>
        ))}
      </div>

      {/* Details */}
      <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-12">
        <FadeIn className="md:col-span-5">
          <p className="font-display text-sm tracking-[0.3em] text-ink/50 uppercase">Education</p>
          <p className="mt-6 font-display text-6xl uppercase md:text-7xl">{education.degree}</p>
          <p className="mt-2 font-serif text-2xl italic">{education.year}</p>
          <div className="mt-10 flex gap-16">
            {[
              ['SSC', education.ssc],
              ['HSC', education.hsc],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-display text-sm tracking-[0.3em] text-ink/50 uppercase">{k}</p>
                <p className="font-display text-5xl text-accent">{v}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="space-y-10 md:col-span-6 md:col-start-7">
          {[
            ['Languages', languages],
            ['Traits', traits],
            ['What excites me', interests],
          ].map(([label, list]) => (
            <div key={label as string}>
              <p className="mb-4 font-display text-sm tracking-[0.3em] text-ink/50 uppercase">{label}</p>
              <div className="flex flex-wrap gap-2">
                {(list as string[]).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-ink/20 px-5 py-2 text-sm transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
