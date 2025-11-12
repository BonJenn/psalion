'use client'

import { useEffect, useRef, useState } from 'react'
import { saveNewsletterEmail } from '@/lib/sanity-server'
import { usePathname } from 'next/navigation'

export default function NewsletterCTA({ source = '/mentions' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()
  const isBespoke = pathname === '/bespoke-services'
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [attempted, setAttempted] = useState(false)
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<any>(null)
  const [showCaptcha, setShowCaptcha] = useState(false)

  // Load and render Turnstile only when we decide to show it
  useEffect(() => {
    if (!showCaptcha || success) return
    const render = () => {
      try {
        if (!turnstileContainerRef.current) return
        if ((window as any).turnstile) {
          // @ts-ignore
          widgetIdRef.current = (window as any).turnstile.render(turnstileContainerRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
            callback: (token: string) => setCaptchaToken(token),
            'error-callback': () => setCaptchaToken(''),
            theme: 'light',
          })
        }
      } catch {
        // no-op
      }
    }
    if (typeof window !== 'undefined' && !(window as any).turnstile) {
      const s = document.createElement('script')
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      s.defer = true
      s.onload = render
      document.body.appendChild(s)
      return () => {
        try { document.body.removeChild(s) } catch {}
      }
    } else {
      render()
    }
  }, [showCaptcha, success])

  // When captcha completes, submit automatically if not already submitted
  useEffect(() => {
    const submitAfterCaptcha = async () => {
      if (!captchaToken || submitting || success) return
      setSubmitting(true)
      const payload: any = { email, sourcePage: source, captchaToken }
      const res = await saveNewsletterEmail(payload)
      setSubmitting(false)
      if (res.ok) {
        setSuccess(true)
        setShowCaptcha(false)
        setEmail('')
      } else {
        setError('Something went wrong. Please try again later.')
      }
    }
    submitAfterCaptcha()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaToken])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setAttempted(true)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }
    // If no token yet, reveal captcha and wait for user to solve
    if (!captchaToken) {
      setShowCaptcha(true)
      return
    }
    // If user already has a token (rare), proceed
    try {
      setSubmitting(true)
      const payload: any = { email, sourcePage: source, captchaToken }
      const res = await saveNewsletterEmail(payload)
      setSubmitting(false)
      if (res.ok) {
        setSuccess(true)
        setShowCaptcha(false)
        setEmail('')
      } else {
        setError('Something went wrong. Please try again later.')
      }
    } catch {
      setSubmitting(false)
      setError('Something went wrong. Please try again later.')
    }
  }

  return (
    <section className={`bg-gray-50 ${isBespoke ? '-mt-80 sm:-mt-32 md:mt-0 py-16 md:py-24 relative z-20' : 'py-16 md:py-24'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className={`bg-gradient-to-b from-gray-50 to-gray-100 rounded-none min-h-[300px] md:min-h-[340px] flex items-center justify-center`}>
          <div className={`flex flex-col items-center md:items-start justify-center gap-2 lg:gap-3 max-w-6xl mx-auto text-center md:text-left w-full`}>
            {/* Text + form block (hide on mobile only when captcha is active) */}
            {(!showCaptcha || success) && (
              <>
                <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-[0.95] text-center md:text-left w-full">
                  Receive the latest overview,
                </h3>
                <div className="w-full -mt-1 flex flex-col md:flex-row items-center md:items-start md:items-baseline gap-2 justify-center md:justify-start">
                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-[0.95] text-center md:text-left whitespace-nowrap">
                    trends, and insights.
                  </h3>
                  <div className="w-full md:flex-1 min-w-0 flex flex-col items-center md:items-start">
                    {success ? (
                      <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-gray-300 leading-[0.95] select-none text-center md:text-left">Thank you!</div>
                    ) : (
                      <form onSubmit={onSubmit} className="flex flex-row items-center md:items-baseline justify-center md:justify-start pb-0 gap-2 w-full md:w-auto">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address here."
                          className="flex-1 min-w-0 bg-transparent text-gray-300 text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-[0.95] outline-none placeholder:text-gray-300 placeholder:font-bold text-center md:text-left"
                          aria-label="Email address"
                        />
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-gray-900 text-white flex items-center justify-center hover:bg-black disabled:opacity-60 flex-shrink-0"
                          aria-label="Submit"
                        >
                          <span className="inline-block -translate-x-px">›</span>
                        </button>
                      </form>
                    )}
                    {/* Only show non-captcha errors */}
                    {error && !showCaptcha && <p className="text-sm text-red-600 mt-2 text-center md:text-left">{error}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Captcha-only view (perfectly centered) */}
            {showCaptcha && !success && (
              <div className="w-full flex items-center justify-center">
                <div ref={turnstileContainerRef} className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


