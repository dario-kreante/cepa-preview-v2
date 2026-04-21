import {
  LayoutDashboard, Users, FileText, Pill, Stethoscope, Briefcase,
  RefreshCw, ShieldCheck, Calendar, BarChart3, ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavKey =
  | "dashboard" | "ingresos" | "licencias" | "farmacos" | "controles"
  | "ept" | "reintegro" | "auditoria" | "agenda" | "reportes"

export const NAV_ITEMS: {
  key: NavKey
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  group: "general" | "clinico" | "operacion"
}[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "general" },
  { key: "ingresos", label: "Ingresos y pacientes", icon: Users, group: "clinico" },
  { key: "licencias", label: "Licencias médicas", icon: FileText, badge: 4, group: "clinico" },
  { key: "farmacos", label: "Gestión de fármacos", icon: Pill, group: "clinico" },
  { key: "controles", label: "Controles médicos", icon: Stethoscope, group: "clinico" },
  { key: "ept", label: "Seguimiento EPT", icon: Briefcase, badge: 2, group: "clinico" },
  { key: "reintegro", label: "Seguimiento reintegro", icon: RefreshCw, group: "clinico" },
  { key: "auditoria", label: "Auditoría", icon: ShieldCheck, group: "clinico" },
  { key: "agenda", label: "Agendamiento", icon: Calendar, group: "operacion" },
  { key: "reportes", label: "Reportería", icon: BarChart3, group: "operacion" },
]

export function Sidebar({
  current, onNav, collapsed, onToggle,
}: {
  current: NavKey
  onNav: (k: NavKey) => void
  collapsed: boolean
  onToggle: () => void
}) {
  const groups: { label: string; key: string }[] = [
    { label: "General", key: "general" },
    { label: "Módulos clínicos", key: "clinico" },
    { label: "Operación", key: "operacion" },
  ]

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand */}
      <div className={cn(
        "flex items-center gap-3 border-b border-sidebar-border h-15 px-5",
        collapsed && "justify-center px-2"
      )}>
        <div className="relative size-9 rounded-lg bg-gradient-to-br from-primary to-[oklch(0.40_0.09_195)] grid place-items-center shadow-md">
          <span className="text-primary-foreground font-bold text-sm tracking-tight">C</span>
          <span className="absolute -right-1 -bottom-1 size-3 rounded-full bg-[oklch(0.72_0.15_80)] border-2 border-sidebar" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-sm tracking-wide">CEPA</span>
            <span className="text-sidebar-foreground/70 text-[10.5px]">Universidad de Talca</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {groups.map((g) => (
          <div key={g.key} className="mb-2">
            {!collapsed && (
              <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 px-5 py-2 font-semibold">
                {g.label}
              </div>
            )}
            {NAV_ITEMS.filter((it) => it.group === g.key).map((it) => {
              const active = current === it.key
              const Icon = it.icon
              return (
                <button
                  key={it.key}
                  onClick={() => onNav(it.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-5 py-2 text-[13px] font-medium transition-all relative group cursor-pointer",
                    collapsed && "justify-center px-2",
                    active
                      ? "bg-sidebar-accent text-white"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white"
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-r" />
                  )}
                  <Icon className="size-[17px] shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{it.label}</span>
                      {it.badge && (
                        <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                          {it.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Collapse */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={onToggle}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 text-[12px] text-sidebar-foreground/70 hover:text-white hover:bg-sidebar-accent rounded-md cursor-pointer",
            collapsed && "justify-center"
          )}
        >
          <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && <span>Colapsar</span>}
        </button>
      </div>
    </aside>
  )
}

export type { NavKey }
