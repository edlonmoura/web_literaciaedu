import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  institution: string
  role: string
  email: string
  phone: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.institution || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Log the submission (replace with email service in production)
    console.log('=== NEW CONTACT FORM SUBMISSION ===')
    console.log(`Name: ${body.name}`)
    console.log(`Institution: ${body.institution}`)
    console.log(`Role: ${body.role || 'Not specified'}`)
    console.log(`Email: ${body.email}`)
    console.log(`Phone: ${body.phone || 'Not specified'}`)
    console.log(`Message: ${body.message}`)
    console.log(`Timestamp: ${new Date().toISOString()}`)
    console.log('=====================================')

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // Example with Resend:
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contato@literaciaedu.com.br',
    //   to: 'contato@literaciaedu.com.br',
    //   subject: `Novo contato de ${body.name} - ${body.institution}`,
    //   html: `...`
    // })

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
