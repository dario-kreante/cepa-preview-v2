import { useState } from "react"
import { Search, Download, Filter, Plus, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { PATIENTS, type Patient } from "@/data/seed"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const STATE_VARIANTS: Record<Patient["estado"], any> = {
  "Activo": "success",
  "En tratamiento": "info",
  "Pendiente": "warning",
  "Cerrado": "neutral",
  "Derivado": "purple",
}

const EVAL_VARIANTS: Record<string, any> = {
  "Realizada": "success",
  "Pendiente": "warning",
  "En proceso": "info",
}

export function Ingresos({ onOpenPatient }: { onOpenPatient: (p: Patient) => void }) {
  const [q, setQ] = useState("")
  const [estado, setEstado] = useState("Todos")
  const [region, setRegion] = useState("Todas")
  const [derivacion, setDerivacion] = useState("Todas")
  const [page, setPage] = useState(0)
  const perPage = 10

  const filtered = PATIENTS.filter((p) => {
    if (estado !== "Todos" && p.estado !== estado) return false
    if (region !== "Todas" && p.region !== region) return false
    if (derivacion !== "Todas" && p.tipoDerivacion !== derivacion) return false
    if (q) {
      const qq = q.toLowerCase()
      return p.nombre.toLowerCase().includes(qq) || p.rut.includes(qq) || p.folio.includes(qq)
    }
    return true
  })

  const pages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice(page * perPage, (page + 1) * perPage)

  const regions = Array.from(new Set(PATIENTS.map((p) => p.region)))
  const derivs = Array.from(new Set(PATIENTS.map((p) => p.tipoDerivacion)))

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ingresos y gestión de pacientes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {PATIENTS.length} registros · {PATIENTS.filter((p) => p.estado === "Activo").length} activos · Actualizado hoy
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download /> Excel</Button>
          <Button variant="outline" size="sm"><SlidersHorizontal /> Filtros avanzados</Button>
          <Button size="sm"><Plus /> Nuevo ingreso</Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-[280px]">
            <Search className="size-4 text-muted-foreground shrink-0 ml-1" />
            <Input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(0) }}
              placeholder="Buscar por RUT, folio o nombre..."
              className="border-0 shadow-none focus-visible:ring-0 bg-transparent px-0 h-8"
            />
          </div>
          <Select label="Estado" value={estado} onChange={(v) => { setEstado(v); setPage(0) }}
            options={["Todos","Activo","En tratamiento","Pendiente","Cerrado","Derivado"]} />
          <Select label="Región" value={region} onChange={(v) => { setRegion(v); setPage(0) }}
            options={["Todas", ...regions]} />
          <Select label="Derivación" value={derivacion} onChange={(v) => { setDerivacion(v); setPage(0) }}
            options={["Todas", ...derivs]} />
          <Badge variant="neutral" className="ml-1 px-2 py-1 text-[11px]">
            {filtered.length} resultados
          </Badge>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="text-left px-4 py-3 font-bold">Folio</th>
                <th className="text-left px-4 py-3 font-bold">Paciente</th>
                <th className="text-left px-4 py-3 font-bold">RUT</th>
                <th className="text-left px-4 py-3 font-bold">Región</th>
                <th className="text-left px-4 py-3 font-bold">Derivación</th>
                <th className="text-left px-4 py-3 font-bold">Empresa</th>
                <th className="text-left px-4 py-3 font-bold">Ingreso</th>
                <th className="text-left px-4 py-3 font-bold">Eval. méd.</th>
                <th className="text-left px-4 py-3 font-bold">Eval. psi.</th>
                <th className="text-left px-4 py-3 font-bold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((p, i) => (
                <tr
                  key={p.folio}
                  onClick={() => onOpenPatient(p)}
                  className={cn(
                    "border-t hover:bg-muted/40 cursor-pointer transition-colors",
                    i % 2 === 1 && "bg-muted/10"
                  )}
                >
                  <td className="px-4 py-3 mono text-[12px] font-semibold text-muted-foreground">{p.folio}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[13px] leading-tight">{p.nombre}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 truncate max-w-[240px]">
                      {p.diagnostico.split("(")[0].trim()}
                    </div>
                  </td>
                  <td className="px-4 py-3 mono text-[12px]">{p.rut}</td>
                  <td className="px-4 py-3 text-[12.5px]">{p.region}</td>
                  <td className="px-4 py-3 text-[12px]">{p.tipoDerivacion}</td>
                  <td className="px-4 py-3 text-[12px] max-w-[180px] truncate">{p.empresa}</td>
                  <td className="px-4 py-3 mono text-[12px]">{p.fechaIngreso}</td>
                  <td className="px-4 py-3"><Badge variant={EVAL_VARIANTS[p.evaluacionMedica]}>{p.evaluacionMedica}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={EVAL_VARIANTS[p.evaluacionPsicologica]}>{p.evaluacionPsicologica}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={STATE_VARIANTS[p.estado]}>{p.estado}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
          <div className="text-[12px] text-muted-foreground">
            Mostrando {page * perPage + 1}–{Math.min((page + 1) * perPage, filtered.length)} de {filtered.length}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon-sm" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
              <ChevronLeft />
            </Button>
            <span className="px-3 text-[12px] font-semibold">
              {page + 1} / {Math.max(1, pages)}
            </span>
            <Button variant="outline" size="icon-sm" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 pl-7 pr-8 text-[12px] border rounded-md bg-background hover:bg-muted/50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {label}: {o}
          </option>
        ))}
      </select>
      <Filter className="absolute left-2 top-2 size-3.5 text-muted-foreground pointer-events-none" />
    </div>
  )
}
