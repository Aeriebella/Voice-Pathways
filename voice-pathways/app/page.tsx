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
        <motion.div aria-hidden="true" style={{ y: leftBg }} className="pointer-events-none fixed top-0 bottom-0 left-0 w-32 opacity-10 z-0">
          <svg viewBox="0 0 140 900" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="#5A1823">
              <path d="M70 0c30 80-30 160-10 260 20 100-40 200-20 320 20 120 10 200 10 320" stroke="#6B1F2B" strokeWidth="6" fill="none" />
            </g>
          </svg>
        </motion.div>

        <motion.div aria-hidden="true" style={{ y: leftY, x: leftDrift }} transition={{ type: 'spring', stiffness: 25, damping: 18 }} className="pointer-events-none fixed top-0 bottom-0 left-0 w-32 opacity-30 z-0">
          <svg viewBox="0 0 160 1000" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="#6B1F2B">
              <path d="M80 80c20 40-30 70-30 110 0 30 30 50 30 50s30-20 30-50c0-40-50-70-30-110z" />
              <path d="M60 240c40 20 40 70 0 90-40-20-40-70 0-90z" fill="#8B2E3E" />
              <path d="M90 400c20 50-30 90-30 140 0 40 30 70 30 70s30-30 30-70c0-50-50-90-30-140z" fill="#7A2432" />
              <path d="M70 650c50 25 50 90 0 120-50-25-50-90 0-120z" fill="#A855F7" opacity="0.35" />
              <circle cx="100" cy="520" r="10" fill="#FBCFE8" opacity="0.6" />
            </g>
          </svg>
        </motion.div>

        <motion.div aria-hidden="true" style={{ y: rightBg }} className="pointer-events-none fixed top-0 bottom-0 right-0 w-32 opacity-10 z-0">
          <svg viewBox="0 0 140 900" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="#5A1823">
              <path d="M70 0c-30 80 30 160 10 260-20 100 40 200 20 320-20 120-10 200-10 320" stroke="#6B1F2B" strokeWidth="6" fill="none" />
            </g>
          </svg>
        </motion.div>

        <motion.div aria-hidden="true" style={{ y: rightY, x: rightDrift }} transition={{ type: 'spring', stiffness: 22, damping: 20 }} className="pointer-events-none fixed top-0 bottom-0 right-0 w-32 opacity-25 z-0">
          <svg viewBox="0 0 160 1000" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="#5A1823">
              <path d="M80 100c-20 40 30 70 30 110 0 30-30 50-30 50s-30-20-30-50c0-40 50-70 30-110z" />
              <path d="M100 300c-40 20-40 70 0 90 40-20 40-70 0-90z" fill="#7A2432" />
              <path d="M60 480c-20 50 30 90 30 140 0 40-30 70-30 70s-30-30-30-70c0-50 50-90 30-140z" fill="#8B2E3E" />
              <path d="M90 720c-50 25-50 90 0 120 50-25 50-90 0-120z" fill="#EC4899" opacity="0.35" />
              <circle cx="50" cy="560" r="10" fill="#FBCFE8" opacity="0.6" />
            </g>
          </svg>
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
                        // Helpful for debugging during testing:
                        console.error('Supabase insert error:', error)
                        return
                      }

                      setTSubmitted(true)
                      setTName('')
                      setTMessage('')
                      // Refresh approved list (new submissions won't appear until approved)
                      fetchApprovedTestimonials()
                    } catch (err) {
                      setTError('Hmm—something went wrong submitting your testimonial. Please try again in a moment.')
                      console.error('Testimonial submit exception:', err)
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
                  {tError && (
                    <p className="text-xs text-red-600 text-center">{tError}</p>
                  )}
                  {tSubmitted && !tError && (
                    <p className="text-xs text-green-600 text-center">Thank you! Your Testimonial will appear shortly!</p>
                  )}
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section id="apply" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-1">Application</h2>
              <p className="mb-2 text-sm text-gray-700">We invite you to share a little about yourself.</p>
              <p className="mb-3 text-sm text-gray-600">Prices will be included in our email responses to your applications.</p>

              <form action="mailto:yourbusiness@email.com" method="post" encType="text/plain" className="grid gap-3">
                <input className="border p-2 rounded" placeholder="Chosen Name" name="Chosen Name" />
                <input className="border p-2 rounded" placeholder="Legal Name (optional)" name="Legal Name" />
                <input className="border p-2 rounded" placeholder="Email" name="Email" />
                <input className="border p-2 rounded" placeholder="Age" name="Age" />
                <textarea className="border p-2 rounded" placeholder="Previous vocal training (if any)" name="Previous Training" />
                <textarea className="border p-2 rounded" placeholder="Barriers to training (time, anxiety, etc.)" name="Barriers" />
                <textarea className="border p-2 rounded" placeholder="Tell me about your goals" name="Goals" />
                <Button type="submit" className="rounded-full px-6 py-2 shadow-lg">
                  Send Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <footer className="text-center p-4 text-sm">© Voice Pathways</footer>
    </div>
  )
}


