import { NextResponse } from 'next/server'
import type { ServiceStatus } from '@/lib/types'

export const revalidate = 30

const SERVICES = [
  { name: 'TrickAdvisor', url: 'https://trickadvisor.cc' },
  { name: 'nwbfit', url: 'https://nfit.93.fyi' },
  { name: 'nwb-yoga', url: 'https://nyoga.93.fyi' },
  { name: 'nwb-plan API', url: 'https://trickadvisor-api.vercel.app/health' },
  { name: '93.fyi', url: 'https://93.fyi' },
]

async function checkService(name: string, url: string): Promise<ServiceStatus> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)
  const start = Date.now()

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-store',
    })
    const latencyMs = Date.now() - start
    clearTimeout(timeoutId)

    let status: 'up' | 'degraded' | 'down'
    if (response.status >= 500) {
      status = 'down'
    } else if (response.status >= 400 || latencyMs >= 3000) {
      status = 'degraded'
    } else if (latencyMs >= 1000) {
      status = 'degraded'
    } else {
      status = 'up'
    }

    return { name, url, status, latencyMs, checkedAt: new Date().toISOString() }
  } catch {
    clearTimeout(timeoutId)
    return {
      name,
      url,
      status: 'down',
      latencyMs: 5000,
      checkedAt: new Date().toISOString(),
    }
  }
}

export async function GET() {
  const services = await Promise.all(
    SERVICES.map((s) => checkService(s.name, s.url))
  )
  return NextResponse.json({ services })
}
