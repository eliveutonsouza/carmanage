import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Básico",
    price: "Grátis",
    description: "Ideal para uso pessoal e acompanhamento de veículos próprios.",
    features: [
      "Até 2 veículos",
      "Manutenções ilimitadas por veículo",
      "Relatórios por e-mail",
      "Atualização automática de status",
    ],
    cta: "Começar Grátis",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "R$ 29",
    period: "/mês",
    description: "Para quem gerencia uma pequena frota ou quer recursos avançados.",
    features: [
      "Até 15 veículos",
      "Alertas antecipados de vencimento",
      "Rastreamento de custos de manutenção",
      "Exportação em PDF e Excel",
      "Suporte prioritário",
    ],
    cta: "Assinar Pro",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Empresa",
    price: "R$ 79",
    period: "/mês",
    description: "Para frotas corporativas com múltiplos usuários e veículos.",
    features: [
      "Veículos ilimitados",
      "Múltiplos usuários por conta",
      "Controle de acesso por perfil",
      "API para integração com ERPs",
      "Relatórios personalizados",
      "Suporte dedicado",
    ],
    cta: "Falar com Vendas",
    href: "/register",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-background pt-20 lg:pt-[120px] pb-12 lg:pb-[90px]"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[620px]">
          <span className="font-semibold text-lg text-primary mb-2 block">
            Planos e Preços
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-foreground mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
            Comece gratuitamente e escale conforme sua necessidade. Sem
            surpresas, sem contratos longos.
          </p>
        </div>

        <div className="flex flex-wrap items-stretch justify-center gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`w-full md:w-[calc(33%-1rem)] max-w-sm rounded-xl border p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground border-primary shadow-xl scale-105"
                  : "bg-card text-card-foreground border-border"
              }`}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p
                  className={`text-sm mb-4 ${
                    plan.highlighted
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span
                      className={
                        plan.highlighted
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check
                      size={16}
                      className={
                        plan.highlighted ? "text-primary-foreground" : "text-primary"
                      }
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.highlighted ? "secondary" : "default"}
                className="w-full"
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
