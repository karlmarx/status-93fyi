import type { Incident } from '@/lib/types'

const STATUS_COLOR: Record<Incident['status'], string> = {
  resolved: 'text-green-400',
  monitoring: 'text-yellow-400',
  investigating: 'text-red-400',
}

export function IncidentHistory({ incidents }: { incidents: Incident[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
        Incident History
      </h2>
      {incidents.length === 0 ? (
        <p className="text-sm text-gray-400 py-2">No incidents reported.</p>
      ) : (
        <div className="space-y-3">
          {incidents.map((incident, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-white/5"
              style={{ backgroundColor: '#1a0f0f' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold uppercase ${STATUS_COLOR[incident.status]}`}>
                  {incident.status}
                </span>
                <span className="text-xs text-gray-400">{incident.date}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-200">{incident.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{incident.description}</p>
              {incident.services.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {incident.services.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-500">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
