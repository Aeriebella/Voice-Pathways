import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn More: Vocal Feminization | Voice Pathways',
  description:
    'A clear, compassionate overview of vocal feminization—what it is, what it involves, and how Voice Pathways approaches sustainable, results-focused voice training.',
}

export default function VocalFeminizationLearnPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#fcfafc] via-[#f6f2f7] to-white text-gray-800">
      {/* soft ambient glow (pearl) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-rose-200/18 blur-3xl" />
        <div className="absolute top-40 right-[-140px] h-[480px] w-[480px] rounded-full bg-sky-200/20 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-160px] h-[560px] w-[560px] rounded-full bg-violet-200/16 blur-3xl" />
        <div className="absolute inset-0 bg-white/35" />
      </div>

      <header className="relative px-4 sm:px-6 pt-6 pb-4 text-center flex flex-col items-center gap-2">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent"
        />

        {/* Nav pill (matches homepage vibe) */}
        <nav className="mt-1 max-w-full flex items-center justify-start sm:justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-sm text-gray-700/80 rounded-full border border-white/60 bg-white/40 px-4 sm:px-5 py-2 shadow-sm backdrop-blur overflow-x-auto">
          <a href="/#home" className="hover:underline">
            Home
          </a>
          <a href="/#services" className="hover:underline">
            Services
          </a>
          <a href="/#about" className="hover:underline">
            About
          </a>
          <span className="font-semibold text-gray-800">Learn More</span>
          <a href="/#apply" className="hover:underline">
            Get in Touch
          </a>
          <a href="/#testimonials" className="hover:underline">
            Testimonials
          </a>
        </nav>

        <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-wide font-['Playfair_Display']">
          Learn More
        </h1>
        <p className="mt-2 text-base tracking-wide text-gray-600 max-w-2xl">
          An elegant overview of vocal feminization—what it is, what it involves, and what you can realistically expect.
        </p>
      </header>

      <main className="relative max-w-5xl mx-auto grid gap-10 sm:gap-12 px-4 sm:px-6 py-8 sm:py-10 z-10">
        <section className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">What is Vocal Feminization?</h2>

            <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Vocal feminization is the process of developing a voice that aligns with your identity through structured,
                sustainable training. While many people assume the process is “pitch training,” a natural feminine voice is
                shaped by several factors working together—especially resonance, speech patterning, articulation, and
                expressive delivery.
              </p>

              <p>
                At Voice Pathways, the goal is not to force your voice into a mold. Training is designed to help you build
                a voice that feels authentic, comfortable, and usable in real life—something you can rely on when you’re
                relaxed, emotional, excited, or tired.
              </p>

              <p>
                With the right guidance and consistent practice, vocal feminization can be achieved entirely through
                training. We emphasize vocal health, efficiency, and confidence—so progress feels supported, not punishing.
              </p>
            </div>

            {/* soundwave divider */}
            <div className="mt-8 flex justify-center">
              <svg
                className="h-10 w-full max-w-2xl"
                viewBox="0 0 300 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 20 C15 5 30 35 45 20 S75 5 90 20 S120 35 135 20 S165 5 180 20 S210 35 225 20 S255 5 270 20 S285 30 300 20"
                  stroke="#FBCFE8"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M0 20 C15 15 30 25 45 20 S75 15 90 20 S120 25 135 20 S165 15 180 20 S210 25 225 20 S255 15 270 20 S285 25 300 20"
                  stroke="#E9D5FF"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.6"
                />
              </svg>
            </div>

            <h3 className="mt-8 text-xl font-semibold">What to Expect</h3>
            <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Most students begin with an introduction and evaluation so we can understand your current voice and define
                a training plan. From there, lessons focus on the specific skills that create a naturally feminine sound—
                built in a way that’s stable, repeatable, and comfortable over time.
              </p>

              <p className="text-sm text-gray-600">
                If you’d like to take the next step, you can reach out through the{' '}
                <a href="/#apply" className="underline decoration-pink-200 underline-offset-4 hover:decoration-pink-300">
                  Get in Touch
                </a>{' '}
                section on the main page—whenever it feels right for you.
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center p-6 flex flex-col items-center gap-4 text-sm text-gray-600">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-700/80 rounded-full border border-white/60 bg-white/40 px-5 py-2 shadow-sm backdrop-blur">
            <a href="/#home" className="hover:underline">
              Home
            </a>
            <a href="/#services" className="hover:underline">
              Services
            </a>
            <a href="/#about" className="hover:underline">
              About
            </a>
            <span className="font-semibold text-gray-800">Learn More</span>
            <a href="/#apply" className="hover:underline">
              Get in Touch
            </a>
            <a href="/#testimonials" className="hover:underline">
              Testimonials
            </a>
          </nav>
          <div>© Voice Pathways</div>
        </footer>
      </main>
    </div>
  )
}
