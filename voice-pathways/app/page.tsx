'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function VoicePathways() {
  const { scrollY } = useScroll()

  // Margin motion
  const leftY = useTransform(scrollY, [0, 3000], [0, -220])
  const leftDrift = useTransform(scrollY, [0, 3000], [0, 18])
  const leftBg = useTransform(scrollY, [0, 3000], [0, -60])
  const rightY = useTransform(scrollY, [0, 3000], [0, -200])
  const rightDrift = useTransform(scrollY, [0, 3000], [0, -16])
  const rightBg = useTransform(scrollY, [0, 3000], [0, -50])

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

  // Application
  const [aLoading, setALoading] = useState(false)
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
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-violet-50 to-white text-gray-800">
      {/* soft ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute top-32 right-[-120px] h-[420px] w-[420px] rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute bottom-[-160px] left-[-140px] h-[520px] w-[520px] rounded-full bg-violet-200/25 blur-3xl" />
      </div>
      <header className="relative px-6 pt-6 pb-4 text-center flex flex-col items-center gap-2">
        {/* subtle header sheen */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
        <nav className="mt-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-700/80 rounded-full border border-white/60 bg-white/40 px-5 py-2 shadow-sm backdrop-blur">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#apply" className="hover:underline">Apply</a>
          <a href="#testimonials" className="hover:underline">Testimonials</a>
        </nav>

        <img
          src="/logo.png"
          alt="Voice Pathways logo"
          className="h-48 w-auto -mb-1 mt-2 opacity-95 drop-shadow-sm"
        />

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-wide font-['Playfair_Display']">
          Voice Pathways
        </h1>
        <p className="mt-2 text-base tracking-wide text-gray-600">
          “The journey toward your inner voice begins now.”
        </p>
      </header>

      <main id="home" className="relative max-w-5xl mx-auto grid gap-16 px-5 sm:px-6 py-10 z-10">
        {/* Margin art (current file: abstract florals) */}
        <motion.div
          aria-hidden="true"
          style={{ y: leftBg }}
          className="pointer-events-none fixed top-0 bottom-0 left-0 w-32 opacity-10 z-0"
        >
          <svg viewBox="0 0 140 900" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M70 0c30 80-30 160-10 260 20 100-40 200-20 320 20 120 10 200 10 320"
              stroke="#7DD3FC"
              strokeWidth="18"
              fill="none"
            />
          </svg>
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ y: leftY, x: leftDrift }}
          transition={{ type: 'spring', stiffness: 25, damping: 18 }}
          className="pointer-events-none fixed top-0 bottom-0 left-0 w-32 opacity-75 z-0"
        >
          <svg viewBox="0 0 160 1000" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="#BAE6FD">
              <path d="M80 80c20 40-30 70-30 110 0 30 30 50 30 50s30-20 30-50c0-40-50-70-30-110z" />
              <path
                d="M95 140c25 35-20 65-20 95 0 25 20 40 20 40s20-15 20-40c0-30-40-60-20-95z"
                fill="#F9A8D4"
                opacity="0.75"
              />
              <path d="M75 250c30 40-20 70-10 110 10 40 40 60 40 60s20-30 10-60c-10-40-50-70-40-110z" opacity="0.7" />
              <path d="M100 420c25 45-30 85-10 130 15 35 45 45 45 45s20-35 5-70c-20-45-65-70-40-105z" opacity="0.8" />
              <path d="M70 580c20 40-25 70-10 110 10 30 35 45 35 45s15-25 5-50c-15-40-50-65-30-105z" opacity="0.65" />
              <path d="M88 720c24 42-28 78-10 120 12 28 38 38 38 38s18-28 6-56c-18-42-56-68-34-102z" opacity="0.75" />
            </g>
          </svg>
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ y: rightBg }}
          className="pointer-events-none fixed top-0 bottom-0 right-0 w-32 opacity-10 z-0"
        >
          <svg viewBox="0 0 140 900" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M70 0c-30 80 30 160 10 260-20 100 40 200 20 320-20 120-10 200-10 320"
              stroke="#F9A8D4"
              strokeWidth="18"
              fill="none"
            />
          </svg>
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ y: rightY, x: rightDrift }}
          transition={{ type: 'spring', stiffness: 22, damping: 20 }}
          className="pointer-events-none fixed top-0 bottom-0 right-0 w-32 opacity-75 z-0"
        >
          <svg viewBox="0 0 160 1000" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="#7DD3FC">
              <path d="M80 100c-20 40 30 70 30 110 0 30-30 50-30 50s-30-20-30-50c0-40 50-70 30-110z" />
              <path
                d="M65 155c-25 35 20 65 20 95 0 25-20 40-20 40s-20-15-20-40c0-30 40-60 20-95z"
                fill="#FBCFE8"
                opacity="0.75"
              />
              <path d="M85 270c-30 40 20 70 10 110-10 40-40 60-40 60s-20-30-10-60c10-40 50-70 40-110z" opacity="0.7" />
              <path d="M60 440c-25 45 30 85 10 130-15 35-45 45-45 45s-20-35-5-70c20-45 65-70 40-105z" opacity="0.8" />
              <path d="M90 600c-20 40 25 70 10 110-10 30-35 45-35 45s-15-25-5-50c15-40 50-65 30-105z" opacity="0.65" />
              <path d="M72 740c-24 42 28 78 10 120-12 28-38 38-38 38s-18-28-6-56c18-42 56-68 34-102z" opacity="0.75" />
            </g>
          </svg>
        </motion.div>

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

        {/* Divider */}
        <div className="flex justify-center">
          <svg className="h-10 w-full max-w-xl" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <Card className="rounded-2xl shadow group hover:shadow-xl transition border border-white/60 bg-white/70 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center">
          <svg className="h-7 w-full max-w-md" viewBox="0 0 210 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                className="mt-6 grid gap-3 max-w-md mx-auto"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setASubmitted(false)
                  setAError(null)

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
                      setAError(
                        data?.error ||
                          'Hmm—something went wrong sending your application. Please try again in a moment.'
                      )
                      return
                    }

                    setASubmitted(true)
                    e.currentTarget.reset()
                  } catch (err) {
                    console.error('Application submit exception:', err)
                    setAError(
                      'Hmm—something went wrong sending your application. Please try again in a moment.'
                    )
                  } finally {
                    setALoading(false)
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

                {aError ? (
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
                    <p className="mt-3 text-sm text-gray-500">No testimonials are currently visible.</p>
                  )}

                  <p className="mt-4 text-xs text-gray-500">
                    (Only approved testimonials are shown. You can approve submissions in Supabase.)
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

      <footer className="text-center p-6 text-sm text-gray-600">© Voice Pathways</footer>
    </div>
  )
}


