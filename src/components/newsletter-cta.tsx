'use client'

import { useState } from 'react'
import { saveNewsletterEmail } from '@/lib/sanity-server'

export default function NewsletterCTA({ source = '/mentions' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    <section className="pt-8 pb-32 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-none">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-12 lg:py-16 max-w-4xl mx-auto">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Receive the latest overview,
                <br />
                trends, and insights.
              </h3>
            </div>
            <div className="w-full max-w-sm sm:max-w-md">
              {success ? (
                <div className="text-xl sm:text-2xl md:text-4xl font-semibold text-gray-300 select-none">Thank you!</div>
              ) : (
                <form onSubmit={onSubmit} className="flex items-center border-b border-gray-300 pb-4 gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address here"
                    className="flex-1 bg-transparent placeholder-gray-300 text-gray-900 text-lg sm:text-xl md:text-3xl outline-none"
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
    </section>
  )
}


