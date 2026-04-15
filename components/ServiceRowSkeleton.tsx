export function ServiceRowSkeleton() {
  return (
    <div
      className="flex items-center justify-between py-4 px-6 border-b border-white/5 last:border-0"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="h-3 w-24 rounded bg-white/5 animate-pulse" />
      </div>
      <div className="flex items-center gap-5">
        <span className="h-3 w-16 rounded bg-white/5 animate-pulse" />
        <span className="h-3 w-10 rounded bg-white/5 animate-pulse" />
        <span className="hidden sm:block h-3 w-12 rounded bg-white/5 animate-pulse" />
      </div>
    </div>
  )
}
