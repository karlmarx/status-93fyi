'use client'

import { useEffect, useState, useCallback } from 'react'
import { ServiceRow } from '@/components/ServiceRow'
import { ServiceRowSkeleton } from '@/components/ServiceRowSkeleton'
import { OverallBadge } from '@/components/OverallBadge'
import { IncidentHistory } from '@/components/IncidentHistory'
import { incidents } from '@/lib/incidents'
import type { StatusResponse } from '@/lib/types'

export default function StatusPage() {
  const [data, setData] = useState<StatusResponse | null>(null)
  const [secondsAgo, setSecondsAgo] = useState(0)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/status')
      if (!res.ok) throw new Error('non-ok response')
      const json: StatusResponse = await res.json()
      setData(json)
      setSecondsAgo(0)
      setError(false)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch + 60s polling
  useEffect(() => {
    fetchStatus()
    const poll = setInterval(fetchStatus, 60_000)
    return () => clearInterval(poll)
  }, [fetchStatus])

  // "X seconds ago" ticker — resets when data changes
  useEffect(() => {
    if (!data) return
    const ticker = setInterval(() => setSecondsAgo((s) => s + 1), 1000)
    return () => clearInterval(ticker)
  }, [data])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0f0808' }}>
      <div className="max-w-2xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="mb-10 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            System Status
          </h1>
          {data ? (
            <OverallBadge services={data.services} />
          ) : (
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 text-gray-500 border border-white/5"
              aria-live="polite"
            >
              <span className="w-2 h-2 rounded-full bg-gray-500" />
              Checking services…
            </span>
          )}
        </div>

        {/* Services table */}
        <div
          className="rounded-xl overflow-hidden border border-white/5"
          style={{ backgroundColor: '#1a0f0f' }}
        >
          <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Services
            </span>
            {data && (
              <span className="text-xs text-gray-700 font-mono tabular-nums">
                Updated {secondsAgo}s ago
              </span>
            )}
          </div>

          {error && (
            <p className="px-6 py-4 text-sm text-red-400">
              Failed to fetch status. Retrying in 60s.
            </p>
          )}

          {!data && loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <ServiceRowSkeleton key={i} />
              ))
            : data?.services.map((s) => (
                <ServiceRow key={s.name} service={s} />
              ))}
        </div>

        {/* Incident history */}
        <IncidentHistory incidents={incidents} />

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-gray-700 font-mono">
          93.fyi ecosystem
        </footer>
      </div>
    </main>
  )
}
