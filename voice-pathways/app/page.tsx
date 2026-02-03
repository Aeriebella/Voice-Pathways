'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function VoicePathways() {
  const { scrollY } = useScroll()
  const leftY = useTransform(scrollY, [0, 3000], [0, -220])
  const leftDrift = useTransform(scrollY, [0, 3000], [0, 18])
  const leftBg = useTransform(scrollY, [0, 3000], [0, -60])
  const rightY = useTransform(scrollY, [0, 3000], [0, -200])
  const rightDrift = useTransform(scrollY, [0, 3000], [0, -16])
  const rightBg = useTransform(scrollY, [0, 3000], [0, -50])

  // Testimonials (moderated)
  const [tName, setTName] = useState('')
  const [tMessage, setTMessage] = useState('')
  const [tSubmitted, setTSubmitted] = useState(false)
  const [tLoading, setTLoading] = useState(false)
  const [tError, setTError] = useState<string | null>(null)

  // Application (email)
  const [aLoading, setALoading] = useState(false)
  const [aSubmitted, setASubmitted] = useState(false)
  const [aError, setAError] = useState<string | null>(null)

  const [approvedTestimonials, setApprovedTestimonials] = useState<
    { id: number; name: string | null; message: string; created_at: string }[]
  >([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const fetchApprovedTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('id,name,message,created_at')
      .eq('approved', true)
      .order('created_at', { ascending: false })

    if (!error) {
      setApprovedTestimonials(data ?? [])
      setCurrentTestimonial(0)
    }
  }

  useEffect(() => {
    fetchApprovedTestimonials()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (approvedTestimonials.length < 2) return
    const interval = setInterval(() => {
      setCurrentTestimonial((i) => (i + 1) % approvedTestimonials.length)
    }, 6500)
    return () => clearInterval(interval)
  }, [approvedTestimonials])
function LivingVine({
  side,
  scrollY,
}: {
  side: 'left' | 'right'
  scrollY: any
}) {
  // Gradient drift: makes the gradient feel like it’s flowing through the plant
  const gradDrift = useTransform(scrollY, (v: number) =>
    `translate(0 ${-(v * 0.08)})`
  )

  // Glow “breathes” slightly with scroll (noticeable but not neon)
  const glow = useTransform(scrollY, [0, 1200], [0.55, 0.85])

  // Slight parallax offset for the blossom layer
  const blossomDrift = useTransform(scrollY, (v: number) =>
    `translate(${side === 'left' ? v * 0.02 : -(v * 0.02)} ${v * 0.015})`
  )

  // Flip vine geometry for right side
  const flip = side === 'right' ? 'scale(-1,1) translate(-160,0)' : ''

  return (
    <svg viewBox="0 0 160 2400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* stem gradient: one side inverted for playful contrast */}
        <motion.linearGradient
          id={`stemGrad-${side}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
          gradientTransform={gradDrift}
        >
          <stop offset="0%" stopColor={side === 'left' ? '#7DD3FC' : '#F9A8D4'} />
          <stop offset="100%" stopColor={side === 'left' ? '#F9A8D4' : '#7DD3FC'} />
        </motion.linearGradient>

        {/* leaf + petal gradients */}
        <motion.linearGradient
          id={`leafGrad-${side}`}
          x1="0"
          y1="1"
          x2="1"
          y2="0"
          gradientTransform={gradDrift}
        >
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#FBCFE8" />
        </motion.linearGradient>

        <motion.linearGradient
          id={`petalGrad-${side}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientTransform={gradDrift}
        >
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#F9A8D4" />
        </motion.linearGradient>

        {/* noticeable but soft glow */}
        <filter id={`glow-${side}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={flip}>
        {/* tapered “growing” stem: thick low, thinner high */}
        <path
          d="M86 0c20 160-28 280-14 460 14 190-40 320-14 520 26 200 58 340 34 520-24 170-56 300-34 470 20 170 64 300 36 510"
          stroke={`url(#stemGrad-${side})`}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M86 0c20 160-28 280-14 460 14 190-40 320-14 520 26 200 58 340 34 520-24 170-56 300-34 470 20 170 64 300 36 510"
          stroke={`url(#stemGrad-${side})`}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />

        {/* Leaves feel attached: asymmetry + gentle vein-like cut */}
        <motion.g style={{ opacity: glow }} filter={`url(#glow-${side})`}>
          {[
            { x: 62, y: 220, s: 1.05 },
            { x: 92, y: 420, s: 0.95 },
            { x: 66, y: 680, s: 1.1 },
            { x: 96, y: 940, s: 1.0 },
            { x: 70, y: 1220, s: 1.15 },
            { x: 94, y: 1480, s: 1.05 },
            { x: 68, y: 1760, s: 1.2 },
            { x: 96, y: 2060, s: 1.0 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
              <path
                d="M0 0c-26 18-34 46-16 80 34 2 60-20 70-56C42 10 24 0 0 0z"
                fill={`url(#leafGrad-${side})`}
                opacity="0.9"
              />
              <path
                d="M14 18c-10 18-6 34 10 48"
                stroke="#ffffff"
                strokeOpacity="0.18"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          ))}
        </motion.g>

        {/* Blossoms + buds: clustered + petal shapes (not balloons) */}
        <motion.g transform={blossomDrift} style={{ opacity: glow }} filter={`url(#glow-${side})`}>
          {[
            { x: 88, y: 300, r: 1.0 },
            { x: 76, y: 520, r: 0.9 },
            { x: 92, y: 820, r: 1.05 },
            { x: 78, y: 1100, r: 0.95 },
            { x: 92, y: 1380, r: 1.0 },
            { x: 78, y: 1660, r: 1.1 },
            { x: 90, y: 1980, r: 1.0 },
            { x: 76, y: 2220, r: 0.9 },
          ].map((b, i) => (
            <g key={i} transform={`translate(${b.x} ${b.y}) scale(${b.r})`}>
              {/* 5-petal blossom */}
              <g fill={`url(#petalGrad-${side})`} opacity="0.95">
                <path d="M0 -14c10-2 16 8 10 16-8 10-22 6-22-6 0-4 4-8 12-10z" />
                <path d="M14 0c2 10-8 16-16 10-10-8-6-22 6-22 4 0 8 4 10 12z" />
                <path d="M0 14c-10 2-16-8-10-16 8-10 22-6 22 6 0 4-4 8-12 10z" />
                <path d="M-14 0c-2-10 8-16 16-10 10 8 6 22-6 22-4 0-8-4-10-12z" />
                <path d="M10 -10c8 4 8 16 0 20-10 6-22-2-22-10 0-10 14-16 22-10z" opacity="0.85" />
              </g>
              <circle cx="0" cy="0" r="4" fill="#FBCFE8" opacity="0.9" />
              {/* small bud to make it feel botanical */}
              <circle cx="18" cy="8" r="5" fill="#BAE6FD" opacity="0.75" />
            </g>
          ))}
        </motion.g>
      </g>
    </svg>
  )
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-violet-50 to-white text-gray-800">
      <header className="p-6 text-center flex flex-col items-center gap-1">
        <nav className="mt-1 flex gap-6 text-sm text-gray-600">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#apply" className="hover:underline">Apply</a>
        </nav>
        <img src="/logo.png" alt="Voice Pathways logo" className="h-48 w-auto mb-1 opacity-90" />
        <h1 className="text-7xl font-semibold tracking-wide font-['Playfair_Display']">Voice Pathways</h1>
        <p className="mt-2 text-base tracking-wide text-gray-600">“The journey toward your inner voice begins now.”</p>
      </header>

      <main id="home" className="relative max-w-5xl mx-auto grid gap-16 p-6 z-10">
        {/* Living botanical margins */}
<motion.div
  aria-hidden="true"
  className="pointer-events-none fixed top-0 bottom-0 left-0 w-20 sm:w-24 z-0"
  style={{ y: leftY, x: leftDrift }}
>
  <LivingVine side="left" scrollY={scrollY} />
</motion.div>

<motion.div
  aria-hidden="true"
  className="pointer-events-none fixed top-0 bottom-0 right-0 w-20 sm:w-24 z-0"
  style={{ y: rightY, x: rightDrift }}
>
  <LivingVine side="right" scrollY={scrollY} />
</motion.div>


        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70">
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

        <div className="flex justify-center">
          <svg width="300" height="40" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20 C15 5 30 35 45 20 S75 5 90 20 S120 35 135 20 S165 5 180 20 S210 35 225 20 S255 5 270 20 S285 30 300 20" stroke="#FBCFE8" strokeWidth="1.5" fill="none" />
            <path d="M0 20 C15 15 30 25 45 20 S75 15 90 20 S120 25 135 20 S165 15 180 20 S210 25 225 20 S255 15 270 20 S285 25 300 20" stroke="#E9D5FF" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
        </div>

        <motion.section id="services" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Introduction / Evaluation', desc: 'An initial assessment to gauge and understand your voice as it is, and to prescribe a training plan for your future lessons.' },
            { title: '45 Minute Lessons', desc: 'A one hour time-slot will be allocated to accommodate your 45 minute lesson, leaving 15 minutes to wrap up, schedule your next appointment, and assign homework.' },
            { title: 'Extended Lessons', desc: 'Extended Lessons are available as needed, should you require more support and guidance.' },
            { title: 'Singing Lessons', desc: 'For graduated clients, singing lessons are available to further develop the artistic side of your new voice.' },
            { title: 'Homework / Practice', desc: 'Throughout lessons you will be assigned vocal exercises to practice and refine your voice along the various stages of development.' },
            { title: 'Ongoing Care', desc: "During your time with Voice Pathways, you'll be encouraged to exchange voice clips for ongoing feedback and supportive guidance." }
          ].map((item) => (
            <motion.div key={item.title} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
              <Card className="rounded-2xl shadow group hover:shadow-xl transition">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        <div className="flex justify-center">
          <svg width="210" height="28" viewBox="0 0 210 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14h75c15 0 22-10 30-10s15 10 30 10h75" stroke="#FBCFE8" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <motion.section id="about" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70">
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

        <motion.section id="testimonials" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-100/40 via-transparent to-violet-100/40 pointer-events-none" />
            <CardContent className="p-6 relative">
              <h2 className="text-2xl font-semibold text-center">Community Reflections</h2>
              <p className="mt-2 text-sm text-gray-600 text-center">Shared experiences from those who have walked their voice journey with us.</p>

              {approvedTestimonials.length > 0 ? (
                <motion.div
                  key={approvedTestimonials[currentTestimonial]?.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-6 text-center text-sm text-gray-700 italic"
                >
                  “{approvedTestimonials[currentTestimonial].message}”
                  <div className="mt-2 text-xs text-gray-500 not-italic">— {approvedTestimonials[currentTestimonial].name || 'Anonymous'}</div>
                </motion.div>
              ) : (
                <div className="mt-6 text-center text-sm text-gray-600 italic">
                  No testimonials have been shared yet. Be the first to add your voice to the Voice Pathways community.
                </div>
              )}

              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium text-center">Share Your Experience</h3>
                <p className="mt-1 text-xs text-gray-600 text-center">Testimonials may be shared publicly with your consent.</p>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setTError(null)
                    setTSubmitted(false)

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
                  className="mt-4 grid gap-3 max-w-md mx-auto"
                >
                  <input
                    className="border p-2 rounded"
                    placeholder="Name or Initials"
                    value={tName}
                    onChange={(e) => setTName(e.target.value)}
                  />
                  <textarea
                    className="border p-2 rounded"
                    placeholder="Your testimonial"
                    value={tMessage}
                    onChange={(e) => setTMessage(e.target.value)}
                    required
                  />
                  <Button type="submit" className="rounded-full px-6 py-2 shadow" disabled={tLoading}>
                    {tLoading ? 'Submitting…' : 'Submit Testimonial'}
                  </Button>

                  {tError && <p className="text-xs text-red-600 text-center">{tError}</p>}
                  {tSubmitted && !tError && (
                    <p className="text-xs text-green-600 text-center">Thank you! Your Testimonial will appear shortly!</p>
                  )}
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section id="apply" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card className="rounded-2xl shadow-xl backdrop-blur bg-white/70">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-center">Application</h2>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Prices will be included in our email responses to your application.
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setAError(null)
                  setASubmitted(false)

                  const formData = new FormData(e.currentTarget)
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
                      setAError(data?.error || 'Hmm—something went wrong sending your application. Please try again in a moment.')
                      return
                    }

                    setASubmitted(true)
                    e.currentTarget.reset()
                  } catch (err) {
                    console.error('Application submit exception:', err)
                    setAError('Hmm—something went wrong sending your application. Please try again in a moment.')
                  } finally {
                    setALoading(false)
                  }
                }}
                className="mt-6 grid gap-3 max-w-md mx-auto"
              >
                <input className="border p-2 rounded" placeholder="Chosen Name" name="chosenName" required />
                <input className="border p-2 rounded" placeholder="Legal Name (optional)" name="legalName" />
                <input className="border p-2 rounded" placeholder="Email" name="email" type="email" required />
                <input className="border p-2 rounded" placeholder="Age" name="age" />
                <textarea className="border p-2 rounded" placeholder="Previous vocal training (if any)" name="previousTraining" />
                <textarea className="border p-2 rounded" placeholder="Barriers to training (time, anxiety, etc.)" name="barriers" />
                <textarea className="border p-2 rounded" placeholder="Tell me about your goals" name="goals" required />

                <Button type="submit" className="rounded-full px-6 py-2 shadow-lg" disabled={aLoading}>
                  {aLoading ? 'Sending…' : 'Send Application'}
                </Button>

                {aError && <p className="text-xs text-red-600 text-center">{aError}</p>}
                {aSubmitted && !aError && (
                  <p className="text-xs text-green-600 text-center">
                    Thank you! Your application has been sent. I’ll reply by email with next steps.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <footer className="text-center p-4 text-sm">© Voice Pathways</footer>
    </div>
  )
}

