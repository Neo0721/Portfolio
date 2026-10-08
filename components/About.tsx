'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { about } from '@/lib/site'
import { Eyebrow, FadeIn, RevealText } from './motion'

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

const CARD_STYLES = [
  'bg-ink text-paper',
  'bg-accent text-ink',
  'bg-[#1b1b1b] text-paper',
]

/** One pillar card; it pins, and shrinks back as the next card slides over it. */
function StackCard({
  i,
  total,
  progress,
  title,
  text,
}: {
  i: number
  total: number
  progress: MotionValue<number>
  title: string
  text: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const innerScale = useTransform(enter, [0, 1], [1.4, 1])
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.06])
  const rotate = useTransform(enter, [0, 1], [i % 2 ? 4 : -4, 0])

  return (
    <div ref={ref} className="sticky top-0 flex h-screen items-center justify-center">
      <motion.article
        style={{ scale, rotate, top: `calc(-6vh + ${i * 28}px)` }}
        className={`group relative flex h-[62vh] w-full origin-top flex-col justify-between overflow-hidden rounded-[2rem] p-8 md:p-14 ${CARD_STYLES[i % CARD_STYLES.length]}`}
      >
        <div className="flex items-start justify-between">
          <span className="font-serif text-3xl italic md:text-5xl">0{i + 1}</span>
          <span className="font-display text-sm tracking-[0.3em] uppercase opacity-60">Pillar</span>
        </div>
        <motion.h3
          style={{ scale: innerScale }}
          className="origin-bottom-left font-display text-[13vw] leading-[0.8] uppercase transition-transform duration-700 md:text-[11vw]"
        >
          {title}
        </motion.h3>
        <p className="max-w-md text-lg opacity-75 md:text-xl">{text}</p>
        {/* Hover sheen */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1.2s] ease-out group-hover:translate-x-full" />
      </motion.article>
    </div>
  )
}

export function About() {
  const { education, languages, traits, interests, pillars } = about
  const stack = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start start', 'end end'] })

  return (
    <section id="about" className="relative z-10 bg-paper px-6 py-32 text-ink md:px-10 md:py-48">
      <div className="mb-16">
        <Eyebrow index="01" light>
          About
        </Eyebrow>
      </div>

      <ScrollParagraph text={about.statement} />

      {/* Stacking pillar cards */}
      <div ref={stack} className="relative mt-32">
        {pillars.map((p, i) => (
          <StackCard key={p.title} i={i} total={pillars.length} progress={scrollYProgress} title={p.title} text={p.text} />
        ))}
      </div>

      {/* Details */}
      <div className="mt-32 grid grid-cols-1 gap-16 md:grid-cols-12">
        <FadeIn className="md:col-span-5">
          <p className="font-display text-sm tracking-[0.3em] text-ink/50 uppercase">Education</p>
          <p className="mt-6 font-display text-6xl uppercase md:text-7xl">
            <RevealText text={education.degree} hover />
          </p>
          <p className="mt-2 font-serif text-2xl italic">{education.year}</p>
          <div className="mt-10 flex gap-16">
            {[
              ['SSC', education.ssc],
              ['HSC', education.hsc],
            ].map(([k, v]) => (
              <div key={k} className="group">
                <p className="font-display text-sm tracking-[0.3em] text-ink/50 uppercase">{k}</p>
                <p className="font-display text-5xl text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                  {v}
                </p>
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
                    className="relative overflow-hidden rounded-full border border-ink/20 px-5 py-2 text-sm transition-colors duration-500 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-full before:bg-ink before:transition-transform before:duration-500 before:ease-[cubic-bezier(.76,0,.24,1)] hover:text-paper hover:before:translate-y-0 isolate"
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
