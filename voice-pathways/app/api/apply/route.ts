import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    const chosenName = String(payload?.chosenName ?? '').trim()
    const legalName = String(payload?.legalName ?? '').trim()
    const email = String(payload?.email ?? '').trim()
    const age = String(payload?.age ?? '').trim()
    const previousTraining = String(payload?.previousTraining ?? '').trim()
    const barriers = String(payload?.barriers ?? '').trim()
    const goals = String(payload?.goals ?? '').trim()

    if (!chosenName || !email || !goals) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const toEmail = process.env.BUSINESS_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL

    if (!toEmail || !fromEmail) {
      return NextResponse.json(
        { error: 'Email is not configured on the server.' },
        { status: 500 }
      )
    }

    const subject = `New Voice Pathways Application — ${chosenName}`

    const text = [
      `New Application Received`,
      ``,
      `Chosen Name: ${chosenName}`,
      `Legal Name: ${legalName || '(not provided)'}`,
      `Email: ${email}`,
      `Age: ${age || '(not provided)'}`,
      ``,
      `Previous Vocal Training:`,
      `${previousTraining || '(not provided)'}`,
      ``,
      `Barriers to Training:`,
      `${barriers || '(not provided)'}`,
      ``,
      `Goals:`,
      `${goals}`,
      ``,
      `— sent from VoicePathways.com`,
    ].join('\n')

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email, // lets you hit “Reply” directly to the applicant
      subject,
      text,
    })

    if (error) {
      console.error('Resend send error:', error)
      return NextResponse.json(
        { error: 'Email failed to send.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Apply route exception:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
