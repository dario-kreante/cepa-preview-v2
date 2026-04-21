import {
  Users, UserPlus, FileText, Stethoscope, Pill, Briefcase, RefreshCw, AlertTriangle,
  ArrowUp, ArrowDown, Minus, Download, Filter, RefreshCcw, MoreHorizontal, CheckCircle2, Clock,
} from "lucide-react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts"
import {
  DASHBOARD_KPIS, SERIE_ATENCIONES, CARGA_PROFESIONAL, DIAG_DISTRIBUTION, ALERTS,
} from "@/data/seed"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const KPIS = [
  { key: "pacientesActivos", label: "Pacientes activos", icon: Users, delta: "+12%", dir: "up" as const, tone: "primary" },
  { key: "ingresosMes", label: "Ingresos este mes", icon: UserPlus, delta: "+3", dir: "up" as const, tone: "info" },
  { key: "licenciasActivas", label: "Licencias activas", icon: FileText, delta: "+8%", dir: "up" as const, tone: "warning" },
  { key: "controlesEstaSemana", label: "Controles esta semana", icon: Stethoscope, delta: "−2", dir: "down" as const, tone: "success" },
  { key: "recetasActivas", label: "Recetas vigentes", icon: Pill, delta: "+5", dir: "up" as const, tone: "purple" },
  { key: "eptEnProceso", label: "EPT en proceso", icon: Briefcase, delta: "=", dir: "flat" as const, tone: "teal" },
  { key: "reintegrosProceso", label: "Reintegros en curso", icon: RefreshCw, delta: "+2", dir: "up" as const, tone: "primary" },
  { key: "alertasCriticas", label: "Alertas críticas", icon: AlertTriangle, delta: "Atención", dir: "alert" as const, tone: "danger" },
]

const TONE_STYLES: Record<string, { bg: string; fg: string }> = {
  primary: { bg: "bg-primary/10", fg: "text-primary" },
  info: { bg: "bg-[oklch(0.95_0.05_230)]", fg: "text-[oklch(0.42_0.14_230)]" },
  warning: { bg: "bg-[oklch(0.96_0.08_85)]", fg: "text-[oklch(0.52_0.16_75)]" },
  success: { bg: "bg-[oklch(0.94_0.05_155)]", fg: "text-[oklch(0.40_0.12_155)]" },
  purple: { bg: "bg-[oklch(0.95_0.05_290)]", fg: "text-[oklch(0.42_0.16_290)]" },
  teal: { bg: "bg-[oklch(0.94_0.05_175)]", fg: "text-[oklch(0.42_0.14_175)]" },
  danger: { bg: "bg-destructive/10", fg: "text-destructive" },
}

function Delta({ dir, children }: { dir: "up" | "down" | "flat" | "alert"; children: React.ReactNode }) {
  const cls =
    dir === "up" ? "text-[oklch(0.40_0.12_155)] bg-[oklch(0.95_0.05_155)]"
    : dir === "down" ? "text-destructive bg-destructive/10"
    : dir === "alert" ? "text-destructive bg-destructive/10"
    : "text-muted-foreground bg-muted"
  const Icon = dir === "up" ? ArrowUp : dir === "down" ? ArrowDown : dir === "alert" ? AlertTriangle : Minus
  return (
    <span className={cn("inline-flex items-center gap-1 text-[10.5px] font-semibold px-1.5 py-0.5 rounded-md", cls)}>
      <Icon className="size-2.5" />
      {children}
    </span>
  )
}

const TAREAS = [
  { id: 1, titulo: "Revisar LM-10003", desc: "Vence mañana", pri: "Urgente", done: false },
  { id: 2, titulo: "Reagendar control · Folio 012", desc: "Paciente no asistió", pri: "Alta", done: false },
  { id: 3, titulo: "Firmar receta · Sertralina 50mg", desc: "Solicitada por Ps. Pinto", pri: "Media", done: false },
  { id: 4, titulo: "Enviar RECA · Folio 015", desc: "Pendiente desde ayer", pri: "Alta", done: false },
  { id: 5, titulo: "Actualizar EPT · Folio 022", desc: "Reevaluación", pri: "Media", done: false },
  { id: 6, titulo: "Validar consentimiento · Folio 010", desc: "Faltan firmas", pri: "Baja", done: true },
  { id: 7, titulo: "Exportar reporte ISL semanal", desc: "Auto · lunes", pri: "Baja", done: true },
]

export function Dashboard({ onOpenPatient: _onOpenPatient }: { onOpenPatient: (folio: string) => void }) {
  const kpis = KPIS.map((k) => ({ ...k, value: (DASHBOARD_KPIS as any)[k.key] }))
  const topAlerts = ALERTS.slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard operativo</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Vista consolidada · 18 de abril de 2026, 10:42
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCcw /> Actualizar
          </Button>
          <Button variant="outline" size="sm">
            <Filter /> Abril 2026
          </Button>
          <Button size="sm">
            <Download /> Exportar
          </Button>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const tone = TONE_STYLES[k.tone]
          const Icon = k.icon
          return (
            <Card key={k.key} className="hover:shadow-md transition-shadow cursor-default">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("size-10 rounded-lg grid place-items-center", tone.bg)}>
                    <Icon className={cn("size-[18px]", tone.fg)} />
                  </div>
                  <Delta dir={k.dir}>{k.delta}</Delta>
                </div>
                <div className="text-[28px] font-bold leading-none mb-1 tracking-tight">{k.value}</div>
                <div className="text-[12px] text-muted-foreground">{k.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Row 2: Chart + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between space-y-0 pb-4">
            <div>
              <CardTitle>Atenciones vs. inasistencias</CardTitle>
              <CardDescription>Últimos 7 meses · todas las unidades</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Legend2 color="var(--chart-1)" label="Atenciones" />
              <Legend2 color="var(--destructive)" label="Inasistencias" />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SERIE_ATENCIONES} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="atenciones" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--chart-1)" }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="inasistencias" stroke="var(--destructive)" strokeWidth={2} dot={{ r: 3, fill: "var(--destructive)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-start justify-between space-y-0 pb-3">
            <div>
              <CardTitle>Tareas del día</CardTitle>
              <CardDescription>
                <Badge variant="warning" className="mt-1">7 pendientes</Badge>
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon-sm"><MoreHorizontal /></Button>
          </CardHeader>
          <CardContent className="p-0 max-h-[260px] overflow-y-auto">
            {TAREAS.map((t) => (
              <label
                key={t.id}
                className={cn(
                  "flex items-start gap-3 px-5 py-2.5 border-t hover:bg-muted/50 cursor-pointer transition-colors first:border-t-0",
                  t.done && "opacity-60"
                )}
              >
                <div className="pt-0.5">
                  <input
                    type="checkbox"
                    defaultChecked={t.done}
                    className="size-4 rounded border-border accent-primary cursor-pointer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn("text-[12.5px] font-semibold leading-tight", t.done && "line-through")}>
                    {t.titulo}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{t.desc}</div>
                </div>
                <Badge variant={t.pri === "Urgente" ? "destructive" : t.pri === "Alta" ? "warning" : t.pri === "Media" ? "info" : "neutral"}>
                  {t.pri}
                </Badge>
              </label>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Carga + Distribución + Urgentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Carga por profesional</CardTitle>
            <CardDescription>Atenciones del mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CARGA_PROFESIONAL} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="nombre" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={110} />
                  <Tooltip
                    cursor={{ fill: "var(--muted)" }}
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="atenciones" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución diagnóstica</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-center">
              <div className="w-[140px] h-[140px] shrink-0">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={DIAG_DISTRIBUTION}
                      innerRadius={40}
                      outerRadius={66}
                      dataKey="valor"
                      paddingAngle={2}
                    >
                      {DIAG_DISTRIBUTION.map((_, i) => (
                        <Cell key={i} fill={`var(--chart-${(i % 5) + 1})`} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 pl-2 space-y-1.5">
                {DIAG_DISTRIBUTION.map((d, i) => (
                  <div key={d.label} className="flex items-center gap-2 text-[11px]">
                    <span className="size-2 rounded-full shrink-0" style={{ background: `var(--chart-${(i % 5) + 1})` }} />
                    <span className="flex-1 truncate">{d.label}</span>
                    <span className="font-semibold mono text-muted-foreground">{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas urgentes</CardTitle>
            <CardDescription>Requieren acción inmediata</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {topAlerts.map((a, i) => {
              const Icon = a.tipo === "danger" ? AlertTriangle : a.tipo === "warn" ? Clock : a.tipo === "success" ? CheckCircle2 : AlertTriangle
              return (
                <div
                  key={a.id}
                  className={cn(
                    "flex items-start gap-3 px-5 py-3 border-t first:border-t-0 hover:bg-muted/50 cursor-pointer transition-colors",
                    i === 0 && "bg-destructive/5"
                  )}
                >
                  <div className={cn(
                    "size-7 rounded-md grid place-items-center shrink-0",
                    a.tipo === "danger" ? "bg-destructive/15 text-destructive" :
                    a.tipo === "warn" ? "bg-[oklch(0.96_0.08_85)] text-[oklch(0.52_0.16_75)]" :
                    a.tipo === "success" ? "bg-[oklch(0.94_0.05_155)] text-[oklch(0.40_0.12_155)]" :
                    "bg-[oklch(0.94_0.04_230)] text-[oklch(0.42_0.14_230)]"
                  )}>
                    <Icon className="size-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-semibold leading-tight">{a.titulo}</div>
                    <div className="text-[11px] text-muted-foreground truncate mt-0.5">
                      {a.paciente} · Folio {a.folio}
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Legend2({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {label}
    </div>
  )
}
