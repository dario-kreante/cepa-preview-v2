import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LICENCIAS, RECETAS, CONTROLES } from "@/data/seed"
import { Download, Plus, FileText, Pill, Stethoscope, Briefcase, RefreshCw, ShieldCheck, Calendar, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

function PageHeader({ title, subtitle, onPrimary, primaryLabel }: { title: string; subtitle: string; onPrimary?: () => void; primaryLabel?: string }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm"><Download /> Exportar</Button>
        {primaryLabel && <Button size="sm" onClick={onPrimary}><Plus /> {primaryLabel}</Button>}
      </div>
    </div>
  )
}

export function Licencias() {
  return (
    <div>
      <PageHeader title="Licencias médicas" subtitle={`${LICENCIAS.length} licencias registradas · ${LICENCIAS.filter(l => l.estado === "Vigente").length} vigentes`} primaryLabel="Nueva licencia" />
      <Card className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-[10.5px] uppercase tracking-wider text-muted-foreground font-bold">
            <tr>
              <th className="text-left px-4 py-3">Folio</th>
              <th className="text-left px-4 py-3">Paciente</th>
              <th className="text-left px-4 py-3">N°</th>
              <th className="text-left px-4 py-3">Tipo</th>
              <th className="text-left px-4 py-3">Inicio</th>
              <th className="text-left px-4 py-3">Fin</th>
              <th className="text-left px-4 py-3">Días</th>
              <th className="text-left px-4 py-3">Médico</th>
              <th className="text-left px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {LICENCIAS.map((l, i) => (
              <tr key={l.numero} className={cn("border-t hover:bg-muted/40 transition-colors cursor-pointer", i % 2 === 1 && "bg-muted/10")}>
                <td className="px-4 py-3 mono text-[12px] text-muted-foreground font-semibold">{l.folio}</td>
                <td className="px-4 py-3 font-semibold text-[13px]">{l.paciente}</td>
                <td className="px-4 py-3 mono text-[12px]">{l.numero}</td>
                <td className="px-4 py-3 text-[12px]">{l.tipoLicencia}</td>
                <td className="px-4 py-3 mono text-[12px]">{l.inicio}</td>
                <td className="px-4 py-3 mono text-[12px]">{l.fin}</td>
                <td className="px-4 py-3 mono text-[12px] font-semibold">{l.dias}</td>
                <td className="px-4 py-3 text-[12px]">{l.medico}</td>
                <td className="px-4 py-3"><Badge variant={l.estado === "Vigente" ? "success" : l.estado === "Rechazada" ? "destructive" : "neutral"}>{l.estado}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function Farmacos() {
  return (
    <div>
      <PageHeader title="Gestión de fármacos" subtitle={`${RECETAS.length} recetas · ${RECETAS.filter(r => r.estado === "Vigente").length} vigentes · ${RECETAS.filter(r => r.estado === "Por vencer").length} por vencer`} primaryLabel="Nueva receta" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {RECETAS.map((r, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="size-10 rounded-md bg-[oklch(0.95_0.05_290)] text-[oklch(0.42_0.16_290)] grid place-items-center shrink-0">
                  <Pill className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px] leading-tight">{r.farmaco}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{r.dosis}</div>
                </div>
                <Badge variant={r.estado === "Vigente" ? "success" : r.estado === "Por vencer" ? "warning" : "destructive"}>{r.estado}</Badge>
              </div>
              <div className="text-[12px]">
                <div className="font-medium truncate">{r.paciente}</div>
                <div className="text-muted-foreground mono text-[11px] mt-1">
                  Folio {r.folio} · {r.inicio} → {r.vigenciaHasta}
                </div>
                <div className="text-muted-foreground text-[11px] mt-0.5">{r.medico}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function Controles() {
  return (
    <div>
      <PageHeader title="Controles médicos" subtitle={`${CONTROLES.length} controles · ${CONTROLES.filter(c => c.estado === "Agendado").length} agendados esta semana`} primaryLabel="Nuevo control" />
      <Card className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-[10.5px] uppercase tracking-wider text-muted-foreground font-bold">
            <tr>
              <th className="text-left px-4 py-3">Folio</th>
              <th className="text-left px-4 py-3">Paciente</th>
              <th className="text-left px-4 py-3">Tipo</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Hora</th>
              <th className="text-left px-4 py-3">Profesional</th>
              <th className="text-left px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {CONTROLES.map((c, i) => (
              <tr key={i} className={cn("border-t hover:bg-muted/40 transition-colors cursor-pointer", i % 2 === 1 && "bg-muted/10")}>
                <td className="px-4 py-3 mono text-[12px] text-muted-foreground font-semibold">{c.folio}</td>
                <td className="px-4 py-3 font-semibold text-[13px]">{c.paciente}</td>
                <td className="px-4 py-3 text-[12px]">{c.tipo}</td>
                <td className="px-4 py-3 mono text-[12px]">{c.fecha}</td>
                <td className="px-4 py-3 mono text-[12px] font-semibold">{c.hora}</td>
                <td className="px-4 py-3 text-[12px]">{c.profesional}</td>
                <td className="px-4 py-3"><Badge variant={c.estado === "Realizado" ? "success" : c.estado === "No asistió" ? "destructive" : c.estado === "Reagendado" ? "warning" : "info"}>{c.estado}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function Placeholder({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="size-16 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-4 [&_svg]:size-7">
        {icon}
      </div>
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground max-w-md">{desc}</p>
      <Badge variant="info" className="mt-4">Módulo en desarrollo</Badge>
    </div>
  )
}

export function EPT() {
  return (
    <div>
      <PageHeader title="Seguimiento EPT" subtitle="Evaluación Psicolaboral · 14 procesos activos" primaryLabel="Nuevo EPT" />
      <Placeholder icon={<Briefcase />} title="Seguimiento EPT" desc="Gestión completa de evaluaciones psicolaborales: ingreso, seguimiento por etapas, plazos ISL y cierre." />
    </div>
  )
}

export function Reintegro() {
  return (
    <div>
      <PageHeader title="Seguimiento reintegro laboral" subtitle="9 reintegros en curso · 3 RECA pendientes" primaryLabel="Nuevo reintegro" />
      <Placeholder icon={<RefreshCw />} title="Reintegro laboral" desc="Tracking de etapas de reintegro, RECA, recomendaciones médicas y comunicaciones con empresas." />
    </div>
  )
}

export function Auditoria() {
  return (
    <div>
      <PageHeader title="Auditoría" subtitle="Registro de acciones y validaciones del sistema" />
      <Placeholder icon={<ShieldCheck />} title="Auditoría del sistema" desc="Bitácora de cambios, validaciones de calidad de datos y cumplimiento de protocolos clínicos." />
    </div>
  )
}

export function Agenda() {
  return (
    <div>
      <PageHeader title="Agendamiento" subtitle="Vista semanal · 58 horas disponibles" primaryLabel="Agendar cita" />
      <Placeholder icon={<Calendar />} title="Agenda de profesionales" desc="Calendario con disponibilidad por profesional, tipo de atención y automatización de recordatorios." />
    </div>
  )
}

export function Reportes() {
  return (
    <div>
      <PageHeader title="Reportería" subtitle="Exportación y análisis de indicadores" />
      <Placeholder icon={<BarChart3 />} title="Reportería avanzada" desc="Generación de reportes ISL, mutuales, estadísticas clínicas y exportación a Excel/PDF." />
    </div>
  )
}

// Re-export
export { FileText, Pill, Stethoscope }
