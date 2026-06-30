import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const bullets = [
  "Alertas automáticos antes do vencimento",
  "Relatórios XLSX enviados por e-mail",
  "Status de manutenções em tempo real",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-32 pb-20 lg:pt-40 lg:pb-0"
    >
      {/* Gradient blob */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-amber-600/10 to-transparent blur-3xl" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <div className="flex flex-col items-start">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
              Plataforma SaaS · Grátis para começar
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Gestão de Manutenção{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                sem complicação
              </span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-slate-400 sm:text-xl">
              Controle todas as manutenções dos seus veículos em um só lugar.
              Nunca perca um prazo e economize com prevenção.
            </p>

            <ul className="mb-10 flex flex-col gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-500" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25"
                )}
              >
                Começar Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/30"
                )}
              >
                Ver Recursos
              </Link>
            </div>
          </div>

          {/* Image column */}
          <div className="relative flex items-end justify-center lg:justify-end">
            <div className="relative w-full max-w-[640px]">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden" />
              <Image
                src="/painel.png"
                width={845}
                height={500}
                alt="Painel CarManage"
                priority
                className="w-full rounded-t-xl shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
