import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AreaChart, Bell, FileSpreadsheet, MonitorCheck } from "lucide-react";
import Link from "next/link";

const features = [
  {
    id: 1,
    title: "Fácil de Usar",
    description:
      "Interface intuitiva para cadastrar veículos e registrar manutenções em poucos cliques, sem curva de aprendizado.",
    icon: AreaChart,
  },
  {
    id: 2,
    title: "Relatórios Completos",
    description:
      "Gere e receba relatórios XLSX detalhados por e-mail com o histórico de todas as manutenções.",
    icon: FileSpreadsheet,
  },
  {
    id: 3,
    title: "Status em Tempo Real",
    description:
      "Saiba instantaneamente quais manutenções estão conformes e quais estão vencidas, sem precisar verificar manualmente.",
    icon: MonitorCheck,
  },
  {
    id: 4,
    title: "Alertas Antecipados",
    description:
      "Receba e-mails de aviso antes do vencimento das manutenções, configurando quantos dias de antecedência preferir.",
    icon: Bell,
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-20 lg:py-28">
      <div className="container">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-amber-500">
            Recursos
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
            Tudo que você precisa para cuidar dos seus veículos
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Uma plataforma completa com as ferramentas certas para nunca mais perder uma manutenção.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group rounded-2xl border border-slate-100 bg-white p-8 transition-all duration-200 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 group-hover:from-amber-100 group-hover:to-orange-100 transition-colors">
                  <Icon className="h-6 w-6 text-amber-500" />
                </div>
                <h4 className="mb-3 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20"
            )}
          >
            Começar Grátis
          </Link>
        </div>
      </div>
    </section>
  );
}
