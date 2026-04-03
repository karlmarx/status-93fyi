import type { ServiceStatus } from '@/lib/types'

const STATUS_COLOR: Record<ServiceStatus['status'], string> = {
  up: '#22c55e',
  degraded: '#eab308',
  down: '#ef4444',
}

const STATUS_LABEL: Record<ServiceStatus['status'], string> = {
  up: 'Operational',
  degraded: 'Degraded',
  down: 'Down',
}

export function ServiceRow({ service }: { service: ServiceStatus }) {
  const color = STATUS_COLOR[service.status]
  const label = STATUS_LABEL[service.status]
  const time = new Date(service.checkedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="flex items-center justify-between py-4 px-6 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <span
          className={`flex-shrink-0 w-2.5 h-2.5 rounded-full${service.status === 'up' ? ' animate-pulse-green' : ''}`}
          style={{ backgroundColor: color }}
          aria-label={label}
        />
        <span className="text-sm font-medium text-gray-100">{service.name}</span>
      </div>
      <div className="flex items-center gap-5 font-mono text-xs">
        <span style={{ color }}>{label}</span>
        <span className="text-gray-400">{service.latencyMs}ms</span>
        <span className="hidden sm:block text-gray-600">{time}</span>
      </div>
    </div>
  )
}
