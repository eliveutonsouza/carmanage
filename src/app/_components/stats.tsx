import { Bell, FileSpreadsheet, Layers, Zap } from "lucide-react";

const stats = [
  {
    icon: Layers,
    value: "3 Planos",
    label: "Grátis, Pro e Empresa",
  },
  {
    icon: Zap,
    value: "100%",
    label: "Automatizado",
  },
  {
    icon: Bell,
    value: "10 dias",
    label: "Alertas antecipados",
  },
  {
    icon: FileSpreadsheet,
    value: "XLSX",
    label: "Relatórios por e-mail",
  },
];

export function Stats() {
  return (
    <section className="border-t border-white/5 bg-slate-950 py-12">
      <div className="container">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Icon className="h-5 w-5 text-amber-500" />
              </div>
              <dt className="text-2xl font-bold text-white">{value}</dt>
              <dd className="text-sm text-slate-400">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
