'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

export default function VoicePathways() {
  // Testimonials
  const [approvedTestimonials, setApprovedTestimonials] = useState<
    Array<{ id: string; name: string | null; message: string; created_at: string }>
  >([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [tName, setTName] = useState('')
  const [tMessage, setTMessage] = useState('')
  const [tLoading, setTLoading] = useState(false)
  const [tSubmitted, setTSubmitted] = useState(false)
  const [tError, setTError] = useState<string | null>(null)

  // Services (mobile expand)
  const [openService, setOpenService] = useState<string | null>(null)

  // FAQ (accordion)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  // Margin logo opacity (fade in as you scroll)
  const { scrollYProgress } = useScroll()
  const marginMotifOpacity = useTransform(scrollYProgress, [0, 0.08, 0.45, 1], [0, 0, 0.65, 0.95])

  // Application
  const [aLoading, setALoading] = useState(false)
  const appFormRef = useRef<HTMLFormElement | null>(null)
  const aSubmittingRef = useRef(false)
  const aAttemptRef = useRef(0)
  const aHasSucceededRef = useRef(false)
  const [aSubmitted, setASubmitted] = useState(false)
  const [aError, setAError] = useState<string | null>(null)

  const fetchApprovedTestimonials = useMemo(
    () =>
      async () => {
        const { data, error } = await supabase
          .from('testimonials')
          .select('id,name,message,created_at')
          .eq('approved', true)
          .order('created_at', { ascending: false })

        if (!error) {
          setApprovedTestimonials(data ?? [])
          setCurrentTestimonial(0)
        }
      },
    []
  )

  useEffect(() => {
    fetchApprovedTestimonials()
  }, [fetchApprovedTestimonials])

  // Cycle through approved testimonials, if any
  useEffect(() => {
    if (!approvedTestimonials.length) return
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % approvedTestimonials.length)
    }, 6500)
    return () => clearInterval(interval)
  }, [approvedTestimonials])

  function pickDisplayName(name: string | null) {
    const trimmed = (name || '').trim()
    return trimmed ? trimmed : 'Anonymous'
  }

  return (
    <>
            <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#fcfafc] via-[#f6f2f7] to-white text-gray-800">
      {/* soft ambient glow (pearl) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-rose-200/18 blur-3xl" />
        <div className="absolute top-40 right-[-140px] h-[480px] w-[480px] rounded-full bg-sky-200/20 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-160px] h-[560px] w-[560px] rounded-full bg-violet-200/16 blur-3xl" />
        <div className="absolute inset-0 bg-white/35" />
      </div>
      <header className="relative px-4 sm:px-6 pt-6 pb-4 text-center flex flex-col items-center gap-2">
        {/* subtle header sheen */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
        <nav className="mt-1 max-w-full flex items-center justify-start sm:justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-sm text-gray-700/80 rounded-full border border-white/60 bg-white/40 px-4 sm:px-5 py-2 shadow-sm backdrop-blur overflow-x-auto">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#apply" className="hover:underline">Apply</a>
          <a href="#testimonials" className="hover:underline">Testimonials</a>
          <a
            href="https://patreon.com/VoicePathways"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-3 py-1 shadow-sm backdrop-blur hover:bg-white/55 transition"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-pink-300">
              <path
                d="M10 17s-6-3.7-8.4-7.5C.2 7 1.5 4.3 4.2 3.6c1.7-.4 3.3.2 4.3 1.4 1-1.2 2.6-1.8 4.3-1.4 2.7.7 4 3.4 2.6 5.9C16 13.3 10 17 10 17z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <span className="font-medium">Patreon</span>
          </a>
          <a
            href="https://discord.gg/HPP3stEZCg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 shadow-sm bg-gradient-to-r from-sky-200 to-pink-200 text-gray-800 hover:from-sky-300 hover:to-pink-300 transition"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-gray-700/80">
              <path
                d="M4 4.5h12c1.1 0 2 .9 2 2V13c0 1.1-.9 2-2 2H9l-3.6 2.2c-.6.3-1.4-.1-1.4-.9V15H4c-1.1 0-2-.9-2-2V6.5c0-1.1.9-2 2-2z"
                fill="currentColor"
                opacity="0.9"
              />
              <path d="M6.3 8.4h7.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <path d="M6.3 10.7h5.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
            </svg>
            <span className="font-medium">Discord</span>
          </a>
        </nav>

        <img
          src="/logo.png"
          alt="Voice Pathways logo"
          className="h-36 sm:h-48 w-auto -mb-1 mt-2 opacity-95 drop-shadow-sm"
        />

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-wide font-['Playfair_Display']">
          Voice Pathways
        </h1>
        <p className="mt-2 text-base tracking-wide text-gray-600">
          “The journey toward your inner voice begins now.”
        </p>
      </header>
      {/* Margin motifs (stationary): rotated logos stay fixed while page scrolls behind */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 hidden lg:flex w-72 xl:w-80 z-0 items-center justify-center overflow-visible"
        style={{ opacity: marginMotifOpacity }}
      >
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <div className="h-80 w-80 rounded-full bg-gradient-to-br from-sky-200/35 to-pink-200/35 blur-3xl" />
          <div className="absolute h-56 w-56 rounded-full bg-white/30 blur-2xl" />
        </div>
        <img
          src="/logo.png"
          alt=""
          className="h-64 sm:h-72 w-auto max-w-none drop-shadow-md"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
          draggable={false}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 right-0 hidden lg:flex w-72 xl:w-80 z-0 items-center justify-center overflow-visible"
        style={{ opacity: marginMotifOpacity }}
      >
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <div className="h-80 w-80 rounded-full bg-gradient-to-br from-pink-200/35 to-sky-200/35 blur-3xl" />
          <div className="absolute h-56 w-56 rounded-full bg-white/30 blur-2xl" />
        </div>
        <img
          src="/logo.png"
          alt=""
          className="h-64 sm:h-72 w-auto max-w-none drop-shadow-md"
          style={{ transform: 'rotate(270deg)', transformOrigin: 'center' }}
          draggable={false}
        />
      </motion.div>

      <main id="home" className="relative max-w-5xl mx-auto grid gap-12 sm:gap-16 px-4 sm:px-6 py-8 sm:py-10 z-10">
        {/* Welcome */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold">Welcome</h2>
              <p className="mt-2">
                Welcome to Voice Pathways – your personal voice coaches, where your voice is treated with care, intention, and respect. Here, your journey is never rushed, judged, or forced into a mold. Instead, it is guided with clarity, compassion, and purpose.
                <br />
                <br />
                Voice Pathways offers targeted vocal feminization instruction, without the fluff. Our focus is on helping you reach your goals as quickly and efficiently as possible, while minimizing discomfort along the way. Every lesson is thoughtfully designed to support your growth, reinforce your unique identity, and help you feel more at home in your voice.
                <br />
                <br />
                We offer a range of lesson formats to meet you where you are — from your first evaluation, to focused training sessions, to continued artistic exploration. Lessons are available in paid format, and on Sundays, completely free while training slots are available.
                <br />
                <br />
                It is our sincere pleasure to walk beside you on this journey, offering the care, encouragement, and gentle guidance you deserve, as you step into your new voice, with confidence!
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* SEO Authority Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold">Professional Online Vocal Feminization Training</h2>
              <p className="mt-2 text-gray-700">
                Voice Pathways provides structured, results-focused <strong>vocal feminization training</strong> for women seeking a natural, confident voice. Our program combines resonance shaping, speech pattern refinement, pitch stabilization, and expressive control into a cohesive method designed for real-world use.
                <br /><br />
                Whether you are beginning your journey into <strong>MTF voice training</strong> or refining an already passing voice, our approach emphasizes sustainability, vocal health, and long-term confidence. Every lesson is delivered online, making professional <strong>transgender voice coaching</strong> accessible worldwide.
                <br /><br />
                Our goal is not only to help you achieve a passing voice, but to help you develop a voice that feels authentically yours — natural, expressive, and aligned with your identity.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center">
          <svg className="h-10 w-full max-w-2xl" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20 C15 5 30 35 45 20 S75 5 90 20 S120 35 135 20 S165 5 180 20 S210 35 225 20 S255 5 270 20 S285 30 300 20" stroke="#FBCFE8" strokeWidth="1.5" fill="none" />
            <path d="M0 20 C15 15 30 25 45 20 S75 15 90 20 S120 25 135 20 S165 15 180 20 S210 25 225 20 S255 15 270 20 S285 25 300 20" stroke="#E9D5FF" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* Services */}
        <motion.section
          id="services"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {[
            {
              title: 'Introduction / Evaluation',
              desc: 'An initial assessment to gauge and understand your voice as it is, and to prescribe a training plan for your future lessons.'
            },
            {
              title: '45 Minute Lessons',
              desc: 'A one hour time-slot will be allocated to accommodate your 45 minute lesson, leaving 15 minutes to wrap up, schedule your next appointment, and assign homework.'
            },
            {
              title: 'Extended Lessons',
              desc: 'Extended Lessons are available as needed, should you require more support and guidance.'
            },
            {
              title: 'Singing Lessons',
              desc: 'For graduated clients, singing lessons are available to further develop the artistic side of your new voice.'
            },
            {
              title: 'Homework / Practice',
              desc: 'Throughout lessons you will be assigned vocal exercises to practice and refine your voice along the various stages of development.'
            },
            {
              title: 'Ongoing Care',
              desc: "During your time with Voice Pathways, you'll be encouraged to exchange voice clips for ongoing feedback and supportive guidance."
            }
          ].map((item) => {
            const isOpen = openService === item.title

            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                animate={{ y: isOpen ? -3 : 0 }}
              >
                <Card
                  className={
                    "rounded-2xl shadow group hover:shadow-xl transition border border-white/60 bg-white/70 backdrop-blur " +
                    (isOpen ? 'ring-1 ring-pink-200/60' : '')
                  }
                  onClick={() => {
                    // Touch devices: tap card to toggle details
                    if (typeof window !== 'undefined') {
                      const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
                      if (isTouch) {
                        setOpenService((prev) => (prev === item.title ? null : item.title))
                      }
                    }
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold flex items-center justify-center gap-2">
                      {item.title}
                      {/* Tiny chevron (mobile only) */}
                      <svg
                        className={
                          'md:hidden h-4 w-4 transition-transform duration-300 text-gray-500/80 ' +
                          (isOpen ? 'rotate-180' : 'rotate-0')
                        }
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </h3>

                    {/* Desktop: hover reveal */}
                    <p className="mt-2 text-sm text-gray-600 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300 overflow-hidden hidden md:block">
                      {item.desc}
                    </p>

                    {/* Mobile: tap reveal (animated) */}
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.p
                          key="details"
                          className="mt-2 text-sm text-gray-600 md:hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28 }}
                        >
                          {item.desc}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center">
          <svg className="h-7 w-full max-w-xl" viewBox="0 0 210 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14h75c15 0 22-10 30-10s15 10 30 10h75" stroke="#FBCFE8" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* About */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold">About Us</h2>
              <p className="mt-2 text-gray-700">
                Voice Pathways is dedicated to compassionate, results-focused voice coaching. Our approach blends technique, care, and clear guidance to help you feel confident and supported at every step.
                <br />
                <br />
                With over seven years of experience teaching voice, we have worked with students from across the globe and supported a wide range of dialects and accents. This diversity has shaped a flexible, personalized approach that meets you where you are and honors your personal goals.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Community */}
        <motion.section
          id="community"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-semibold">Join Our Community</h2>
              <p className="mt-2 text-gray-700">
                Connect with fellow learners, ask questions, share wins, and receive gentle support as you practice. Our Discord is a cozy space for encouragement and accountability, and Patreon is where I share deeper tutorials, demonstrations, and clip reviews.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://discord.gg/HPP3stEZCg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 shadow-lg bg-gradient-to-r from-sky-200 to-pink-200 text-gray-800 hover:from-sky-300 hover:to-pink-300 transition active:scale-[0.98]"
                >
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 text-gray-700/80">
                    <path
                      d="M4 4.5h12c1.1 0 2 .9 2 2V13c0 1.1-.9 2-2 2H9l-3.6 2.2c-.6.3-1.4-.1-1.4-.9V15H4c-1.1 0-2-.9-2-2V6.5c0-1.1.9-2 2-2z"
                      fill="currentColor"
                      opacity="0.9"
                    />
                    <path d="M6.3 8.4h7.4" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                    <path d="M6.3 10.7h5.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                  <span className="font-medium">Join Discord</span>
                </a>

                <a
                  href="https://patreon.com/VoicePathways"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 shadow-lg border border-white/60 bg-white/45 backdrop-blur hover:bg-white/60 transition active:scale-[0.98]"
                >
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 text-pink-300">
                    <path
                      d="M10 17s-6-3.7-8.4-7.5C.2 7 1.5 4.3 4.2 3.6c1.7-.4 3.3.2 4.3 1.4 1-1.2 2.6-1.8 4.3-1.4 2.7.7 4 3.4 2.6 5.9C16 13.3 10 17 10 17z"
                      fill="currentColor"
                      opacity="0.9"
                    />
                  </svg>
                  <span className="font-medium">Support on Patreon</span>
                </a>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                (Discord access may require verification — thank you for helping us keep the space safe and supportive.)
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* FAQ */}
        <motion.section
          id="faq"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {(() => {
            const faqItems: Array<{
              q: string
              // JSX answer for the page
              a: ReactNode
              // Plain-text answer for schema
              schemaA: string
            }> = [
              {
                q: 'How long does vocal feminization take?',
                a: (
                  <>
                    The full vocal feminization process typically takes between <strong>4–8 weeks</strong>, depending on lesson frequency, practice consistency, and ongoing feedback.
                    <br />
                    <br />
                    Students who take lessons more frequently — ideally twice per week — tend to progress much faster than those spacing lessons farther apart. Those who ask questions, submit voice clips for review, and actively engage with feedback often complete the process sooner.
                    <br />
                    <br />
                    Our goal is to help you reach your fully formed voice as efficiently as possible while still maintaining a safe and sustainable learning pace. When lessons are spaced too far apart, what might otherwise take weeks can instead take months.
                  </>
                ),
                schemaA:
                  'The full vocal feminization process typically takes between 4–8 weeks, depending on lesson frequency, practice consistency, and ongoing feedback. Students who take lessons more frequently — ideally twice per week — tend to progress faster. Those who actively engage with feedback often complete the process sooner. Lessons spaced too far apart can significantly slow progress.'
              },
              {
                q: 'Do I need surgery to feminize my voice?',
                a: (
                  <>
                    No, surgery is not required to achieve full vocal feminization. Structured training can exceed even the best results achievable with surgery alone. Surgery primarily affects baseline pitch and aspects of vocal tract size, but it does not address the full range of skills that create a naturally feminized voice — such as resonance shaping, speech patterns, articulation, inflection, and expressive control.
                    <br />
                    <br />
                    Training carries no surgical risk, requires no recovery time, and is significantly more affordable. Many individuals who undergo vocal surgery still require vocal training afterward to refine their results. Additionally, some surgical procedures may impact singing ability — whereas vocal training preserves and even enhances it. With proper guidance and practice, you can learn to speak and sing comfortably in your preferred gender without surgical intervention.
                  </>
                ),
                schemaA:
                  'No. Total vocal feminization through structured training can exceed the best results achievable with surgery alone. Surgery mainly affects baseline pitch and aspects of vocal tract size, but it does not address skills like resonance shaping, speech patterns, articulation, inflection, and expressive control. Training has no surgical risk or recovery time and is typically more affordable. Many people still need training after surgery to refine results, and some procedures can impact singing — whereas training preserves and can enhance it.'
              },
              {
                q: 'Are lessons available online?',
                a: (
                  <>Yes, all coaching is conducted online and accessible worldwide, allowing students across the globe to receive personalized guidance and support.</>
                ),
                schemaA:
                  'Yes. All coaching is available online, allowing students across the globe to receive personalized guidance and support.'
              },
              {
                q: 'Is vocal feminization safe?',
                a: (
                  <>Yes, vocal feminization is safe when approached with healthy technique and proper guidance. Lessons emphasize vocal sustainability, minimizing strain, and building habits that feel natural and comfortable in everyday speech.</>
                ),
                schemaA:
                  'Yes — when approached with healthy technique and proper guidance. Lessons emphasize vocal sustainability, minimizing strain, and building habits that feel natural and comfortable in everyday speech.'
              },
              {
                q: 'How many lessons will I need?',
                a: (
                  <>
                    The number of lessons depends entirely on where you are starting. Students beginning with no prior experience typically graduate within <strong>10–15 lessons</strong>.
                    <br />
                    <br />
                    If you already have a partially passing voice, most students require closer to <strong>8–10 lessons</strong> to refine and stabilize it. For those who are already consistently passing but wish to elevate their voice further — improving nuance, confidence, and artistic expression — as few as <strong>3–5 lessons</strong> may be needed.
                    <br />
                    <br />
                    Every voice is different. Our goal is not simply to reach “passing,” but to help you develop a voice you feel proud of — one that feels natural, sustainable, and fully aligned with who you are.
                  </>
                ),
                schemaA:
                  'It depends on where you are starting. Students with no prior experience typically graduate within 10–15 lessons. If you already have a partially passing voice, many students need closer to 8–10 lessons to refine and stabilize it. If you are already consistently passing and want greater nuance and expression, as few as 3–5 lessons may be needed. The goal is not only to reach passing, but to develop a voice that feels natural, sustainable, and aligned with you.'
              },
              {
                q: 'How do I access the free lessons on Sundays?',
                a: (
                  <>
                    To access our free Sunday lessons, simply join our Discord community or submit an application through the website. Free training slots are offered while availability lasts, and Discord is where announcements and coordination take place.
                    <br />
                    <br />
                    If you're looking for additional structured content outside of live lessons, you can also explore the Patreon platform, where tutorials, demonstrations, and guided practice materials are available at varying tiers.
                  </>
                ),
                schemaA:
                  'To access free Sunday lessons, join the Discord community or submit an application through the website. Free training slots are offered while availability lasts, and Discord is where announcements and coordination take place. For additional structured content, Patreon offers tutorials, demonstrations, and guided practice materials at varying tiers.'
              },
              {
                q: 'I’m not comfortable learning in a 1-on-1 format. Do you offer self-study options?',
                a: (
                  <>
                    Yes. The Patreon tutorial series covers the full Voice Pathways curriculum in a self-study format. Lessons are structured clearly and progressively, allowing you to move at your own pace in a private and comfortable setting.
                    <br />
                    <br />
                    The series is updated periodically with refined instruction, additional demonstrations, and expanded vocal exercises to increase your chances of success. Whether you prefer guided coaching or independent practice, you’ll have options that respect your comfort level and learning style.
                  </>
                ),
                schemaA:
                  'Yes. Patreon includes the Voice Pathways curriculum in a self-study format with clear, progressive lessons you can follow at your own pace. The series is updated with refined instruction, additional demonstrations, and expanded vocal exercises. You can choose guided coaching or independent practice based on your comfort level and learning style.'
              },
              {
                q: 'Are minors eligible for lessons as well?',
                a: (
                  <>
                    Yes. We do offer lessons for minors. Our approach remains supportive, structured, and age-appropriate, with careful attention to vocal health and emotional well-being throughout the process.
                    <br />
                    <br />
                    Our Discord community is thoughtfully organized to include a separate space for minors, allowing younger students to connect, share experiences, and discuss their progress in a setting that is distinct from adult participants. Safety, respect, and healthy boundaries are always prioritized.
                  </>
                ),
                schemaA:
                  'Yes. Lessons are available for minors with an age-appropriate approach and attention to vocal health and emotional well-being. The Discord community includes a separate space for minors distinct from adult participants, with safety, respect, and boundaries prioritized.'
              },
              {
                q: 'I have a learning disability. Can I still take lessons?',
                a: (
                  <>
                    Yes. Students with learning disabilities are fully welcome and supported. The Voice Pathways curriculum has been intentionally developed to be flexible and adaptable, using a wide range of techniques and exercises that approach the same vocal goals from multiple angles.
                    <br />
                    <br />
                    If one method does not resonate with you, it can be substituted with alternatives targeting the same underlying skill. Your learning style matters, and we are committed to meeting you where you are so that you can progress comfortably and confidently.
                  </>
                ),
                schemaA:
                  'Yes. The curriculum is flexible and adaptable, using a wide range of techniques and exercises that approach the same vocal goals from multiple angles. If one method does not fit, it can be substituted with alternatives targeting the same underlying skill so you can progress comfortably and confidently.'
              },
              {
                q: 'I don’t have a webcam. Will I need one for lessons?',
                a: (
                  <>
                    No. A webcam is entirely optional for lessons. The only essential equipment is a properly functioning microphone and Discord set up correctly so that your audio can be heard clearly.
                    <br />
                    <br />
                    If you would like to use a webcam, we are happy to match your enthusiasm — but visual presence is not required for successful vocal training. Clear audio quality is far more important than video.
                  </>
                ),
                schemaA:
                  'No. A webcam is optional. The only essential equipment is a properly functioning microphone and Discord set up correctly so your audio can be heard clearly. Video is not required for successful vocal training; clear audio quality is far more important.'
              }
            ]

            // FAQ schema (helps Google understand Q&A without changing visuals)
            const faqSchema = {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((it) => ({
                '@type': 'Question',
                name: it.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: it.schemaA
                }
              }))
            }

            return (
              <>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

                <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-center">Frequently Asked Questions</h2>
                    <div className="mt-6 grid gap-3">
                      {faqItems.map((item) => {
                        const isOpen = openFaq === item.q
                        return (
                          <div key={item.q} className="rounded-2xl border border-white/60 bg-white/60 backdrop-blur">
                            <button
                              type="button"
                              className="w-full text-left p-4 flex items-center justify-between gap-3"
                              onClick={() => setOpenFaq((prev) => (prev === item.q ? null : item.q))}
                              aria-expanded={isOpen}
                            >
                              <span className="font-semibold">{item.q}</span>
                              <motion.span
                                aria-hidden="true"
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                                className="shrink-0 text-gray-500/80"
                              >
                                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </motion.span>
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen ? (
                                <motion.div
                                  key="content"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.28 }}
                                  className="px-4 pb-4"
                                >
                                  <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </>
            )
          })()}
        </motion.section>

        {/* Application */}
        <motion.section
          id="apply"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-center">Application</h2>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Prices will be included in our email responses to your application.
              </p>

              <form
                ref={appFormRef}
                className="mt-6 grid gap-3 max-w-md mx-auto"
                onSubmit={async (e) => {
                  e.preventDefault()

                  // Use the ref instead of the event (avoids `e.currentTarget` becoming null entirely)
                  const form = appFormRef.current
                  if (!form) {
                    setASubmitted(false)
                    setAError('Hmm—something went wrong sending your application. Please try again in a moment.')
                    return
                  }

                  // Prevent any accidental duplicate submits (including framework retries)
                  if (aSubmittingRef.current) return
                  aSubmittingRef.current = true

                  // Track the latest submit attempt so stale responses can't set mixed UI state
                  aAttemptRef.current += 1
                  const attemptId = aAttemptRef.current

                  // Clear messages for this new attempt
                  aHasSucceededRef.current = false
                  setASubmitted(false)
                  setAError(null)

                  const formData = new FormData(form)
                  const payload = Object.fromEntries(formData.entries())

                  try {
                    setALoading(true)

                    const res = await fetch('/api/apply', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    })

                    if (!res.ok) {
                      const data = await res.json().catch(() => null)
                      if (attemptId === aAttemptRef.current && !aHasSucceededRef.current) {
                        setASubmitted(false)
                        setAError(
                          data?.error ||
                            'Hmm—something went wrong sending your application. Please try again in a moment.'
                        )
                      }
                      return
                    }

                    // Success
                    if (attemptId === aAttemptRef.current) {
                      aHasSucceededRef.current = true
                      setAError(null)
                      setASubmitted(true)
                      try {
                        form.reset()
                      } catch (err) {
                        console.warn('Form reset failed:', err)
                      }
                    }
                  } catch (err) {
                    console.error('Application submit exception:', err)
                    if (attemptId === aAttemptRef.current && !aHasSucceededRef.current) {
                      setASubmitted(false)
                      setAError(
                        'Hmm—something went wrong sending your application. Please try again in a moment.'
                      )
                    }
                  } finally {
                    if (attemptId === aAttemptRef.current) {
                      setALoading(false)
                    }
                    aSubmittingRef.current = false
                  }
                }}
              >
                <input className="border p-2 rounded" placeholder="Chosen Name" name="chosenName" required />
                <input className="border p-2 rounded" placeholder="Legal Name (optional)" name="legalName" />
                <input className="border p-2 rounded" placeholder="Email" name="email" type="email" required />
                <input className="border p-2 rounded" placeholder="Age" name="age" />
                <textarea className="border p-2 rounded" placeholder="Previous vocal training (if any)" name="previousTraining" />
                <textarea className="border p-2 rounded" placeholder="Barriers to training (time, anxiety, etc.)" name="barriers" />
                <textarea className="border p-2 rounded" placeholder="Tell me about your goals" name="goals" required />

                <Button
                  type="submit"
                  className="rounded-full px-6 py-2 shadow-lg bg-gradient-to-r from-sky-200 to-pink-200 text-gray-800 hover:from-sky-300 hover:to-pink-300 transition"
                  disabled={aLoading}
                >
                  {aLoading ? 'Sending…' : 'Send Application'}
                </Button>

                {aSubmitted ? (
                  <p className="text-sm text-center text-emerald-700">Your application has been sent. Thank you.</p>
                ) : null}

                {aError && !aSubmitted ? (
                  <p className="text-sm text-center text-rose-700">{aError}</p>
                ) : null}
              </form>
            </CardContent>
          </Card>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          id="testimonials"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70 border border-white/60">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-center">Community Reflections</h2>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Share a short reflection from your experience. Submissions are reviewed before appearing publicly.
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2 items-start">
                <div className="rounded-2xl bg-white/60 border p-5">
                  <h3 className="font-semibold">Currently Featured</h3>

                  {approvedTestimonials.length ? (
                    <motion.div
                      key={approvedTestimonials[currentTestimonial]?.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className="mt-3"
                    >
                      <p className="text-sm text-gray-700 leading-relaxed">“{approvedTestimonials[currentTestimonial]?.message}”</p>
                      <p className="mt-3 text-xs text-gray-500">— {pickDisplayName(approvedTestimonials[currentTestimonial]?.name)}</p>
                    </motion.div>
                  ) : (
                    <p className="mt-3 text-sm text-gray-500">Be the first to upload your testimonial!</p>
                  )}

                  <p className="mt-4 text-xs text-gray-500">
                    
                  </p>
                </div>

                <div className="rounded-2xl bg-white/60 border p-5">
                  <h3 className="font-semibold">Submit a Testimonial</h3>

                  <form
                    className="mt-4 grid gap-3"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setTSubmitted(false)
                      setTError(null)

                      const trimmedMessage = tMessage.trim()
                      if (!trimmedMessage) {
                        setTError('Please enter a testimonial message before submitting.')
                        return
                      }

                      try {
                        setTLoading(true)
                        const { error } = await supabase.from('testimonials').insert({
                          name: tName.trim() || null,
                          message: trimmedMessage,
                          approved: false
                        })

                        if (error) {
                          setTError('Hmm—something went wrong submitting your testimonial. Please try again in a moment.')
                          console.error('Supabase insert error:', error)
                          return
                        }

                        setTSubmitted(true)
                        setTName('')
                        setTMessage('')
                        fetchApprovedTestimonials()
                      } catch (err) {
                        console.error('Testimonial submit exception:', err)
                        setTError('Hmm—something went wrong submitting your testimonial. Please try again in a moment.')
                      } finally {
                        setTLoading(false)
                      }
                    }}
                  >
                    <input
                      className="border p-2 rounded"
                      placeholder="Name (optional)"
                      value={tName}
                      onChange={(e) => setTName(e.target.value)}
                    />
                    <textarea
                      className="border p-2 rounded min-h-[120px]"
                      placeholder="Your testimonial"
                      value={tMessage}
                      onChange={(e) => setTMessage(e.target.value)}
                      required
                    />

                    <Button
                      type="submit"
                      className="rounded-full px-6 py-2 shadow-lg bg-gradient-to-r from-sky-200 to-pink-200 text-gray-800 hover:from-sky-300 hover:to-pink-300 transition"
                      disabled={tLoading}
                    >
                      {tLoading ? 'Submitting…' : 'Submit Testimonial'}
                    </Button>

                    {tSubmitted ? (
                      <p className="text-sm text-center text-emerald-700">Thank you! Your Testimonial will appear shortly!</p>
                    ) : null}

                    {tError ? (
                      <p className="text-sm text-center text-rose-700">{tError}</p>
                    ) : null}
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <footer className="mt-20 text-center p-6 flex flex-col items-center gap-4 text-sm text-gray-600">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-700/80 rounded-full border border-white/60 bg-white/40 px-5 py-2 shadow-sm backdrop-blur">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#apply" className="hover:underline">Apply</a>
          <a href="#testimonials" className="hover:underline">Testimonials</a>
          <a
            href="https://patreon.com/VoicePathways"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-3 py-1 shadow-sm backdrop-blur hover:bg-white/55 transition"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-pink-300">
              <path
                d="M10 17s-6-3.7-8.4-7.5C.2 7 1.5 4.3 4.2 3.6c1.7-.4 3.3.2 4.3 1.4 1-1.2 2.6-1.8 4.3-1.4 2.7.7 4 3.4 2.6 5.9C16 13.3 10 17 10 17z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <span className="font-medium">Patreon</span>
          </a>
          <a
            href="https://discord.gg/HPP3stEZCg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 shadow-sm bg-gradient-to-r from-sky-200 to-pink-200 text-gray-800 hover:from-sky-300 hover:to-pink-300 transition"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-gray-700/80">
              <path
                d="M4 4.5h12c1.1 0 2 .9 2 2V13c0 1.1-.9 2-2 2H9l-3.6 2.2c-.6.3-1.4-.1-1.4-.9V15H4c-1.1 0-2-.9-2-2V6.5c0-1.1.9-2 2-2z"
                fill="currentColor"
                opacity="0.9"
              />
              <path d="M6.3 8.4h7.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <path d="M6.3 10.7h5.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
            </svg>
            <span className="font-medium">Discord</span>
          </a>
        </nav>
        <div>© Voice Pathways</div>
      </footer>
    </div>
    </>
  )
}
