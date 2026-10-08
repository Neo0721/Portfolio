'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { site } from '@/lib/site'
import { Eyebrow, FadeIn, RevealText } from './motion'

/** Circular button that leans toward the pointer. */
function Magnetic({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.35)
        y.set((e.clientY - r.top - r.height / 2) * 0.35)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      {...(props as object)}
    >
      {children}
    </motion.button>
  )
}

const field =
  'peer w-full border-b border-line bg-transparent pt-6 pb-3 text-xl text-paper outline-none transition-colors placeholder-transparent focus:border-accent'
const label =
  'pointer-events-none absolute top-0 left-0 font-display text-sm tracking-[0.25em] text-muted uppercase transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-accent'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // No backend yet: hand the message to the visitor's email app, pre-filled.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-6 py-32 md:px-10 md:py-48">
      <Eyebrow index="05">Contact</Eyebrow>

      <h2 className="mt-10 font-display text-[24vw] leading-[0.8] uppercase md:text-[15vw]">
        <RevealText text="Let's" by="char" />{' '}
        <span className="font-serif tracking-tight normal-case italic text-accent">
          <RevealText text="talk" by="char" delay={0.2} />
        </span>
      </h2>

      <div className="mt-24 grid gap-20 md:grid-cols-12">
        <FadeIn className="md:col-span-7">
          <form onSubmit={onSubmit} className="space-y-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="relative">
                <input id="name" name="name" required placeholder="Name" value={form.name} onChange={onChange} className={field} />
                <label htmlFor="name" className={label}>Your name</label>
              </div>
              <div className="relative">
                <input id="email" name="email" type="email" required placeholder="Email" value={form.email} onChange={onChange} className={field} />
                <label htmlFor="email" className={label}>Your email</label>
              </div>
            </div>
            <div className="relative">
              <textarea id="message" name="message" required rows={4} placeholder="Message" value={form.message} onChange={onChange} className={`${field} resize-none`} />
              <label htmlFor="message" className={label}>Tell me about your project</label>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <Magnetic
                type="submit"
                className="flex h-36 w-36 items-center justify-center rounded-full bg-accent font-display text-lg tracking-[0.2em] text-ink uppercase transition-colors duration-500 hover:bg-paper md:h-44 md:w-44"
              >
                Send →
              </Magnetic>
              {sent && <p className="max-w-xs text-sm text-muted">Your email app should have opened with the message ready to send.</p>}
            </div>
          </form>
        </FadeIn>

        <FadeIn delay={0.15} className="space-y-12 md:col-span-4 md:col-start-9">
          <div>
            <p className="font-display text-sm tracking-[0.3em] text-muted uppercase">Email</p>
            <a href={`mailto:${site.email}`} className="mt-3 block text-lg break-words transition-colors hover:text-accent lg:text-2xl">
              {site.email}
            </a>
          </div>
          <div>
            <p className="font-display text-sm tracking-[0.3em] text-muted uppercase">Based in</p>
            <p className="mt-3 text-2xl">{site.location}</p>
          </div>
          <div>
            <p className="font-display text-sm tracking-[0.3em] text-muted uppercase">Elsewhere</p>
            <div className="mt-3 flex flex-col gap-2">
              {site.socials.slice(0, 2).map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-2xl">
                  <span className="h-px w-0 bg-accent transition-all duration-500 group-hover:w-8" />
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
