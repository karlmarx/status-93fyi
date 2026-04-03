export interface ServiceStatus {
  name: string
  url: string
  status: 'up' | 'degraded' | 'down'
  latencyMs: number
  checkedAt: string
}

export interface StatusResponse {
  services: ServiceStatus[]
}

export interface Incident {
  date: string
  title: string
  description: string
  status: 'resolved' | 'investigating' | 'monitoring'
  services: string[]
}
