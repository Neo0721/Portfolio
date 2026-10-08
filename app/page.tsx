import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Marquee } from '@/components/Marquee'

function Band({ words }: { words: string[] }) {
  return (
    <div className="relative z-20 -my-16 overflow-hidden py-12">
      <div className="-mx-4 -rotate-2 bg-accent py-5 text-ink">
        <Marquee baseVelocity={-3}>
          {words.map((w) => (
            <span key={w} className="flex items-center font-display text-5xl uppercase md:text-7xl">
              <span className="mx-8">{w}</span>
              <span className="font-serif text-4xl">✺</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Providers>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Band words={['Open to internships', 'Backend systems', 'Full stack', 'Mumbai, India']} />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </Providers>
  )
}
