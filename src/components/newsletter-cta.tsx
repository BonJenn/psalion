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

  // Load and render Turnstile
  useEffect(() => {
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
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setAttempted(true)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }
    if (!captchaToken) {
      setError('Please complete the captcha')
      return
    }
    setSubmitting(true)
    const payload: any = { email, sourcePage: source, captchaToken }
    const res = await saveNewsletterEmail(payload)
    setSubmitting(false)
    if (res.ok) {
      setSuccess(true)
      setEmail('')
    } else {
      setError('Something went wrong. Please try again later.')
    }
  }

  return (
    <section className={`py-0 bg-gray-50 ${isBespoke ? '-mt-40 sm:-mt-48 md:mt-0' : ''}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className={`bg-gradient-to-b from-gray-50 to-gray-100 rounded-none ${isBespoke ? 'min-h-[140px]' : 'min-h-[260px]'} md:min-h-[340px] flex items-center`}>
          <div className={`flex flex-col items-start justify-center gap-2 lg:gap-3 max-w-6xl mx-auto text-left w-full`}>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-[0.95] text-left">
              Receive the latest overview,
            </h3>
            <div className="w-full flex flex-wrap items-end gap-2 justify-start">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-[0.95] text-left">
                trends, and insights.
              </h3>
              <div className="flex-1 min-w-[240px] max-w-[640px]">
                {success ? (
                  <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-300 leading-[0.95] select-none">Thank you!</div>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col items-start pb-0 gap-2 md:gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address here"
                      className="flex-1 bg-transparent text-gray-300 text-2xl sm:text-3xl md:text-5xl font-bold leading-[0.95] outline-none placeholder:text-gray-300 placeholder:font-bold relative top-[2px] md:top-[3px]"
                      aria-label="Email address"
                    />
                    <div className="w-full flex items-center gap-2">
                      <div className="flex-1">
                        <div ref={turnstileContainerRef} className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}></div>
                        {attempted && !captchaToken && (
                          <p className="text-xs text-red-500 mt-1">Please complete the captcha.</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={submitting || !captchaToken}
                        className="w-12 h-12 rounded-md bg-gray-900 text-white flex items-center justify-center hover:bg-black disabled:opacity-60"
                        aria-label="Submit"
                      >
                        <span className="inline-block -translate-x-px">›</span>
                      </button>
                    </div>
                  </form>
                )}
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


