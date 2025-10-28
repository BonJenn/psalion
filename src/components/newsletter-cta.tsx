'use client'

import { useState } from 'react'
import { saveNewsletterEmail } from '@/lib/sanity-server'
import { usePathname } from 'next/navigation'

export default function NewsletterCTA({ source = '/mentions' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()
  const isBespoke = pathname === '/bespoke-services'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }
    setSubmitting(true)
    const res = await saveNewsletterEmail({ email, sourcePage: source })
    setSubmitting(false)
    if (res.ok) {
      setSuccess(true)
      setEmail('')
    } else {
      setError('Something went wrong. Please try again later.')
    }
  }

  return (
    <section className={`${isBespoke ? 'pt-0 md:pt-4 pb-12 md:pb-20 -mt-10 md:-mt-6' : 'pt-4 md:pt-6 pb-16 md:pb-24'} bg-gray-50`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-none">
          <div className={`flex flex-col items-start justify-center gap-2 lg:gap-3 ${isBespoke ? 'py-4 lg:py-6' : 'py-8 lg:py-12'} max-w-6xl mx-auto`}>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-[0.95] text-left">
              Receive the latest overview,
            </h3>
            <div className="w-full flex flex-wrap items-end gap-2">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-[0.95]">
                trends, and insights.
              </h3>
              <div className="flex-1 min-w-[240px]">
                {success ? (
                  <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-300 leading-[0.95] select-none">Thank you!</div>
                ) : (
                  <form onSubmit={onSubmit} className="flex items-end pb-0 gap-2 md:gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address here"
                      className="flex-1 bg-transparent text-gray-300 text-2xl sm:text-3xl md:text-5xl font-bold leading-[0.95] outline-none placeholder:text-gray-300 placeholder:font-bold relative top-[2px] md:top-[3px]"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-12 h-12 rounded-md bg-gray-900 text-white flex items-center justify-center hover:bg-black disabled:opacity-60"
                      aria-label="Submit"
                    >
                      <span className="inline-block -translate-x-px">›</span>
                    </button>
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


