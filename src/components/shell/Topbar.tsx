import { Search, Bell, ChevronDown, Command as CommandIcon } from "lucide-react"
import { DASHBOARD_KPIS } from "@/data/seed"

export function Topbar({
  title, crumbs, onToggleAlerts, alertsHidden,
}: {
  title: string
  crumbs: string
  onToggleAlerts: () => void
  alertsHidden: boolean
}) {
  return (
    <header className="h-15 bg-card border-b flex items-center px-6 gap-4 sticky top-0 z-20">
      <div>
        <h1 className="text-base font-bold tracking-tight leading-none">{title}</h1>
        <p className="text-[11px] text-muted-foreground mt-1">{crumbs}</p>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2 bg-muted hover:bg-accent border border-transparent hover:border-border transition-colors px-3 py-2 rounded-lg w-80 cursor-pointer">
        <Search className="size-4 text-muted-foreground" />
        <span className="flex-1 text-[13px] text-muted-foreground">Buscar paciente por RUT, folio o nombre…</span>
        <kbd className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground bg-background border px-1.5 py-0.5 rounded font-mono">
          <CommandIcon className="size-2.5" />K
        </kbd>
      </div>

      <div className="flex items-center gap-2 bg-[oklch(0.96_0.05_155)] text-[oklch(0.38_0.12_155)] border border-[oklch(0.85_0.05_155)]/50 px-3 py-1.5 rounded-full text-xs font-semibold">
        <span className="size-1.5 rounded-full bg-[oklch(0.64_0.14_155)]" />
        {DASHBOARD_KPIS.pacientesActivos} activos
      </div>
      <div className="flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1.5 rounded-full text-xs font-semibold">
        <span className="size-1.5 rounded-full bg-destructive animate-pulse" />
        {DASHBOARD_KPIS.alertasCriticas} críticas
      </div>

      <button
        onClick={onToggleAlerts}
        className="size-9 rounded-lg grid place-items-center hover:bg-accent transition-colors relative cursor-pointer"
      >
        <Bell className="size-[18px]" />
        {!alertsHidden && (
          <span className="absolute top-1.5 right-1.5 size-2 bg-destructive rounded-full ring-2 ring-card" />
        )}
      </button>

      <div className="flex items-center gap-2.5 pl-3 pr-2 py-1 border-l ml-1 cursor-pointer hover:bg-muted rounded-r-lg transition-colors">
        <div className="size-8 rounded-full bg-primary grid place-items-center text-primary-foreground text-[11px] font-bold">
          MG
        </div>
        <div className="leading-tight">
          <div className="text-[12.5px] font-semibold">María García</div>
          <div className="text-[10.5px] text-muted-foreground">Psicóloga</div>
        </div>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </div>
    </header>
  )
}
