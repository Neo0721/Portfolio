'use client'

import { motion, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { projects, site } from '@/lib/site'
import { EASE, Eyebrow, RevealText } from './motion'

type Project = (typeof projects)[number]

/** Generative cover art — stands in until real screenshots are added. */
function Cover({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 20,
  })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })
  const px = useTransform(mx, (v) => `${(v + 0.5) * 100}%`)
  const py = useTransform(my, (v) => `${(v + 0.5) * 100}%`)
  const shine = useMotionTemplate`radial-gradient(420px circle at ${px} ${py}, rgba(255,255,255,0.35), transparent 55%)`
  // Observe an unclipped wrapper: a fully clipped element never registers as in view
  const wrap = useRef<HTMLDivElement>(null)
  const inView = useInView(wrap, { once: true, amount: 0.3 })

  return (
    <div ref={wrap}>
      <motion.div
        ref={ref}
        data-cursor="View"
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect()
          mx.set((e.clientX - r.left) / r.width - 0.5)
          my.set((e.clientY - r.top) / r.height - 0.5)
        }}
        onPointerLeave={() => {
          mx.set(0)
          my.set(0)
        }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        initial={{ clipPath: 'inset(100% 0% 0% 0% round 1rem)' }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0% round 1rem)' } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[16/10]"
      >
        <motion.div
          initial={{ scale: 1.4 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 1.8, ease: EASE }}
          className="absolute inset-0"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.hue} transition-transform duration-[1.4s] ease-out group-hover:scale-110`}
          />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: shine }}
        />
        <div className="animate-drift absolute -top-1/4 -left-1/4 h-[80%] w-[80%] rounded-full bg-white/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <span className="absolute -right-4 -bottom-[0.18em] font-display text-[40vw] leading-none text-white/15 transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-6 group-hover:text-white/25 md:text-[22vw]">
          {project.number}
        </span>
        <span className="absolute top-6 left-6 font-serif text-4xl text-white italic transition-transform duration-700 group-hover:translate-x-3 md:text-6xl">
          {project.short}
        </span>
        <div className="absolute top-6 right-6 flex gap-2">
          {project.tech.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full bg-black/25 px-3 py-1 text-xs text-white backdrop-blur">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function Card({ project }: { project: Project }) {
  return (
    <article className="flex w-full shrink-0 flex-col gap-8 md:w-[62vw]">
      <Cover project={project} />
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">Project {project.number}</p>
          <h3 className="mt-3 font-display text-5xl leading-[0.9] uppercase md:text-6xl">
            <RevealText text={project.title} hover />
          </h3>
        </div>
        <div className="space-y-4 text-muted md:col-span-5">
          <p className="text-paper/90">{project.description}</p>
          <p className="text-sm">{project.role}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-paper/80">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return desktop
}

export function Projects() {
  const desktop = useIsDesktop()
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    if (!desktop || !track.current) return
    const measure = () => setDistance(track.current!.scrollWidth - window.innerWidth)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [desktop])

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const skewX = useSpring(useTransform(velocity, [-2500, 2500], [7, -7], { clamp: true }), { stiffness: 300, damping: 40 })

  const header = (
    <div className="flex w-full shrink-0 flex-col justify-between md:w-[38vw] md:pr-10">
      <div>
        <Eyebrow index="03">Selected work</Eyebrow>
        <h2 className="mt-10 font-display text-[18vw] leading-[0.82] uppercase md:text-[9vw]">
          <RevealText text="Missions" />
          <br />
          <span className="font-serif tracking-tight normal-case italic text-accent">
            <RevealText text="I'm proud of" delay={0.15} />
          </span>
        </h2>
      </div>
      <p className="mt-8 max-w-xs text-muted">A few things I&apos;ve designed, built and shipped. {desktop && 'Keep scrolling →'}</p>
    </div>
  )

  const outro = (
    <a
      href={site.socials.find((s) => s.name === 'GitHub')?.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Open"
      className="group flex aspect-square w-full shrink-0 flex-col items-center justify-center rounded-2xl border border-line text-center transition-colors duration-700 hover:bg-accent hover:text-ink md:w-[30vw]"
    >
      <span className="font-serif text-3xl italic">More on</span>
      <span className="font-display text-[18vw] leading-none uppercase md:text-[7vw]">GitHub</span>
      <span className="mt-4 text-3xl transition-transform duration-700 group-hover:translate-x-3 group-hover:-rotate-45">→</span>
    </a>
  )

  if (!desktop) {
    return (
      <section id="projects" ref={section} className="relative bg-ink px-6 py-32">
        {header}
        <div className="mt-16 space-y-24">
          {projects.map((p) => (
            <Card key={p.number} project={p} />
          ))}
          {outro}
        </div>
      </section>
    )
  }

  return (
    <section id="projects" ref={section} className="relative bg-ink" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={track} style={{ x, skewX }} className="flex items-center gap-[6vw] px-10 pt-16">
          {header}
          {projects.map((p) => (
            <Card key={p.number} project={p} />
          ))}
          {outro}
        </motion.div>
        <div className="absolute inset-x-10 bottom-8 h-px bg-line">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-accent" />
        </div>
      </div>
    </section>
  )
}
