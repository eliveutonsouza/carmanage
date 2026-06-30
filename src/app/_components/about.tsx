import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, Car, Wrench } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Car,
    title: "Cadastre seus veículos",
    description:
      "Adicione seus veículos com placa, modelo e ano. Em segundos, sua frota está organizada na plataforma.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Registre as manutenções",
    description:
      "Informe a última e a próxima manutenção, tipo (preventiva ou corretiva), custo e fornecedor.",
  },
  {
    number: "03",
    icon: Bell,
    title: "Receba alertas e relatórios",
    description:
      "A plataforma avisa antes do vencimento e envia relatórios XLSX por e-mail automaticamente todo dia.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-slate-50 py-20 lg:py-28">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-amber-500">
            Como Funciona
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
            Simples do começo ao fim
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Em três passos você tem controle total sobre as manutenções de todos os seus veículos.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                {/* Decorative number */}
                <span className="absolute right-6 top-4 text-7xl font-black leading-none text-amber-100 select-none">
                  {step.number}
                </span>
                <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                  <Icon className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {step.description}
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
            Experimente Grátis
          </Link>
        </div>
      </div>
    </section>
  );
}
