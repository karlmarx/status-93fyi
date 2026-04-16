import type { ServiceStatus } from '@/lib/types'

export function OverallBadge({ services }: { services: ServiceStatus[] }) {
  const hasDown = services.some((s) => s.status === 'down')
  const hasDegraded = services.some((s) => s.status === 'degraded')

  if (hasDown) {
    return (
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        Service Outage
      </span>
    )
  }

  if (hasDegraded) {
    return (
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        Degraded Performance
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse motion-reduce:animate-none" />
      All Systems Operational
    </span>
  )
}
