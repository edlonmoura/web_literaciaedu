import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  institution: string
  role: string
  email: string
  phone: string
  message: string
}

const MAX_LENGTHS = {
  name: 100,
  institution: 150,
  role: 100,
  email: 254,
  phone: 20,
  message: 2000,
} as const

const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 5
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true
  }

  record.count++
  return false
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function sanitizeSubject(str: string): string {
  return str.replace(/[\r\n]/g, '').substring(0, 200)
}

function trimAndLimit(value: string, maxLength: number): string {
  return (value || '').trim().substring(0, maxLength)
}

function buildEmailHtml(data: ContactFormData): string {
  const safe = {
    name: escapeHtml(data.name),
    institution: escapeHtml(data.institution),
    role: escapeHtml(data.role),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    message: escapeHtml(data.message),
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f4f7f9;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7f9;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
              <tr>
                <td style="background:linear-gradient(135deg,#056B6E,#06B7A7);padding:32px 40px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">LITERACIA EDU</h1>
                  <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-weight:400;">Novo contato pelo site</p>
                </td>
              </tr>
              <tr>
                <td style="padding:36px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-bottom:24px;">
                        <p style="margin:0 0 6px;color:#0B1E21;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Nome</p>
                        <p style="margin:0;color:#0B1E21;font-size:15px;">${safe.name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom:24px;">
                        <p style="margin:0 0 6px;color:#0B1E21;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Instituição</p>
                        <p style="margin:0;color:#0B1E21;font-size:15px;">${safe.institution}</p>
                      </td>
                    </tr>
                    ${data.role ? `
                    <tr>
                      <td style="padding-bottom:24px;">
                        <p style="margin:0 0 6px;color:#0B1E21;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Cargo</p>
                        <p style="margin:0;color:#0B1E21;font-size:15px;">${safe.role}</p>
                      </td>
                    </tr>` : ''}
                    <tr>
                      <td style="padding-bottom:24px;">
                        <p style="margin:0 0 6px;color:#0B1E21;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">E-mail</p>
                        <p style="margin:0;"><a href="mailto:${safe.email}" style="color:#056B6E;font-size:15px;text-decoration:none;">${safe.email}</a></p>
                      </td>
                    </tr>
                    ${data.phone ? `
                    <tr>
                      <td style="padding-bottom:24px;">
                        <p style="margin:0 0 6px;color:#0B1E21;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Telefone</p>
                        <p style="margin:0;color:#0B1E21;font-size:15px;">${safe.phone}</p>
                      </td>
                    </tr>` : ''}
                    <tr>
                      <td style="padding-bottom:8px;">
                        <p style="margin:0 0 6px;color:#0B1E21;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Mensagem</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 20px;background-color:#F5F9FA;border-radius:10px;border:1px solid #e2e8f0;">
                        <p style="margin:0;color:#0B1E21;font-size:14px;line-height:1.7;white-space:pre-wrap;">${safe.message}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 40px;background-color:#f8fafb;border-top:1px solid #e8edf0;text-align:center;">
                  <p style="margin:0;color:#94a3b8;font-size:11px;">Enviado via formulário de contato — literaciaedu.com.br</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  const rateLimitKey = getRateLimitKey(request)

  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    const rawBody: ContactFormData = await request.json()

    const body: ContactFormData = {
      name: trimAndLimit(rawBody.name, MAX_LENGTHS.name),
      institution: trimAndLimit(rawBody.institution, MAX_LENGTHS.institution),
      role: trimAndLimit(rawBody.role, MAX_LENGTHS.role),
      email: trimAndLimit(rawBody.email, MAX_LENGTHS.email),
      phone: trimAndLimit(rawBody.phone, MAX_LENGTHS.phone),
      message: trimAndLimit(rawBody.message, MAX_LENGTHS.message),
    }

    if (!body.name || !body.institution || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const safeSubject = sanitizeSubject(`Novo contato de ${body.name} — ${body.institution}`)

    const { error } = await resend.emails.send({
      from: 'Literacia Edu <onboarding@resend.dev>',
      to: 'karoline@literaciaedu.com',
      replyTo: body.email,
      subject: safeSubject,
      html: buildEmailHtml(body),
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
