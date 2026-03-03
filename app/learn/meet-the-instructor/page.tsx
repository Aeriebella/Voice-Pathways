import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meet the Instructor | Voice Pathways',
  description:
    'Meet Felicity, founder of Voice Pathways — a results-focused vocal feminization instructor with years of dedicated experience, global students, and a compassionate, structured approach.',
}

export default function MeetTheInstructorPage() {
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

        {/* Nav pill (matches your site style) */}
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
          <a href="/learn/vocal-feminization" className="hover:underline">
            Learn More
          </a>
          <span className="font-semibold text-gray-800">Meet the Instructor</span>
          <a href="/#apply" className="hover:underline">
            Get in Touch
          </a>
          <a href="/#testimonials" className="hover:underline">
            Testimonials
          </a>
        </nav>

        {/* Logo (same vibe as other pages) */}
        <img
          src="/logo.png"
          alt="Voice Pathways logo"
          className="h-28 sm:h-32 w-auto mt-3 opacity-95 drop-shadow-sm"
          draggable={false}
        />

        <h1 className="mt-1 text-3xl sm:text-5xl font-semibold tracking-wide font-['Playfair_Display']">
          Meet the Instructor
        </h1>

        <p className="mt-2 text-base tracking-wide text-gray-600 max-w-2xl">
          A little more about the person behind Voice Pathways — the approach, the experience, and the care that shapes
          every lesson.
        </p>
      </header>

      <main className="relative max-w-5xl mx-auto grid gap-10 sm:gap-12 px-4 sm:px-6 py-8 sm:py-10 z-10">
        {/* Portrait + quick facts */}
        <section className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
          <div className="p-6 sm:p-8 grid gap-8 md:grid-cols-[260px,1fr] items-start">
            {/* Portrait placeholder */}
            <div className="mx-auto w-full max-w-[260px]">
              <div className="relative aspect-square rounded-2xl border border-white/60 bg-white/55 shadow-sm overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-sky-200/35 to-pink-200/35"
                />
                <div aria-hidden="true" className="absolute inset-0 blur-2xl opacity-70 bg-white/40" />
                <div className="relative h-full w-full flex items-center justify-center text-center p-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Portrait Coming Soon</p>
                    <p className="mt-1 text-xs text-gray-600">
                      You can replace this block with a photo anytime.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-500 text-center">
                (Optional) Add a short caption here later — eg. “Felicity, Founder & Instructor”
              </p>
            </div>

            {/* Intro / summary */}
            <div>
              <h2 className="text-2xl font-semibold">Felicity</h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Voice Pathways was founded by Felicity — a vocal feminization instructor with over seventeen years immersed
                in voice study and more than seven years dedicated specifically to gender-affirming vocal training.
              </p>

              <p className="mt-4 text-gray-700 leading-relaxed">
                Her work is rooted in technical precision, vocal health, and emotional understanding. Every student is
                approached not as a case to be corrected, but as a voice waiting to be aligned.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Teaching experience', value: '7+ years' },
                  { label: 'Voice study', value: '17+ years immersed' },
                  { label: 'Students', value: 'Worldwide, diverse backgrounds' },
                  { label: 'Approach', value: 'Structured, supportive, results-focused' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/60 bg-white/60 backdrop-blur p-4"
                  >
                    <p className="text-gray-500">{item.label}</p>
                    <p className="font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider (soundwave) */}
        <div className="flex justify-center">
          <svg className="h-10 w-full max-w-2xl" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        {/* Experience */}
        <section className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Experience & Specialization</h2>
            <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Felicity’s work centers on structured vocal feminization training for transgender women and individuals
                seeking a more aligned vocal identity. Over the years, she has taught students across the globe and worked
                with a wide range of dialects, accents, and starting points — from complete beginners to students refining
                an already passing voice.
              </p>
              <p>
                The methodology emphasizes the practical skills that produce a natural, reliable result: resonance shaping,
                pitch stabilization, speech pattern refinement, articulation, and expressive control — built with vocal
                sustainability in mind.
              </p>
              <p className="text-sm text-gray-600">
                The goal is not imitation. The goal is integration — a voice that feels like you.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Teaching Philosophy</h2>
            <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Vocal feminization is not simply about raising pitch. It is about developing a voice that feels natural,
                sustainable, and authentically yours — one you can rely on in everyday life.
              </p>
              <p>
                The Voice Pathways approach avoids unnecessary fluff and focuses on clear, efficient progress. Lessons are
                structured, targeted, and supportive — designed to help you move forward quickly while still respecting
                comfort, technique, and vocal health.
              </p>
              <p>
                For many students, achieving a passing voice is the first milestone. But passing is not the destination.
                The deeper work is refinement: developing a voice you feel proud of — one that feels aligned, expressive,
                and truly your own.
              </p>
            </div>
          </div>
        </section>

        {/* Personal note */}
        <section className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">A Personal Note</h2>
            <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Voice training is deeply personal. It touches identity, confidence, and self-expression — and it is never
                taken lightly here.
              </p>
              <p>
                Students are encouraged to ask questions, experiment bravely, and move at a pace that balances ambition
                with sustainability. Whether you are beginning your journey or refining years of work, you will be met
                with clarity, professionalism, and respect.
              </p>
              <p className="font-medium text-gray-800">
                This work is not about changing who you are. It is about revealing who you have always been.
              </p>

              <p className="text-sm text-gray-600">
                When you feel ready, you’re welcome to reach out through the{' '}
                <a
                  href="/#apply"
                  className="underline decoration-pink-200 underline-offset-4 hover:decoration-pink-300"
                >
                  Get in Touch
                </a>{' '}
                section — no pressure, just a clear next step.
              </p>
            </div>
          </div>
        </section>

        {/* Footer nav */}
        <footer className="text-center p-6 flex flex-col items-center gap-4 text-sm text-gray-600">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-700/80 rounded-full border border-white/60 bg-white/40 px-5 py-2 shadow-sm backdrop-blur">
            <a href="/#home" className="hover:underline">
              Home
            </a>
            <a href="/learn/vocal-feminization" className="hover:underline">
              Learn More
            </a>
            <a href="/learn/meet-the-instructor" className="hover:underline font-semibold text-gray-800">
              Meet the Instructor
            </a>
            <a href="/#apply" className="hover:underline">
              Get in Touch
            </a>
          </nav>
          <div>© Voice Pathways</div>
        </footer>
      </main>
    </div>
  )
}