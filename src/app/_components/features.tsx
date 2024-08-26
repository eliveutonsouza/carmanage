import {
  AreaChart,
  ArrowRight,
  FileSpreadsheet,
  MonitorCheck,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    id: 1,
    title: "Fácil de Usar",
    description:
      "A plataforma é totalmente acessível e permite a gestão de manutenções de forma simples e intuitiva.",
    icon: <AreaChart size={30} className="text-yellow-50" />,
    href: "/login",
  },
  {
    id: 2,
    title: "Gere Relatórios",
    description:
      "A plataforma permite a geração de relatórios completos sobre manutenções.",
    icon: <FileSpreadsheet size={30} className="text-yellow-50" />,
    href: "/login",
  },
  {
    id: 3,
    title: "Todos os Elementos Essenciais",
    description:
      "A plataforma inclui todas as ferramentas necessárias para uma gestão eficaz de manutenções.",
    icon: <MonitorCheck size={30} className="text-yellow-50" />,
    href: "/login",
  },
];

export function Features() {
  return (
    <section id="features" className="pt-20 lg:pt-[120px] pb-8 lg:pb-[70px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mb-12 lg:mb-20 max-w-[620px]">
              <span className="font-semibold text-lg text-primary mb-2 block">
                Recursos
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-dark mb-4">
                Principais Recursos da Plataforma
              </h2>
              <p className="text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-body-color">
                Nossa plataforma oferece uma gestão completa e intuitiva para
                manutenções de veículos.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-wrap -mx-4">
          {features.map((feature) => (
            <div key={feature.id} className="w-full md:w-1/2 lg:w-1/4 px-4">
              <div
                className="bg-white mb-12 group wow fadeInUp"
                data-wow-delay=".1s"
              >
                <div className="w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-2xl mb-8 relative z-10">
                  <span className="w-[70px] h-[70px] flex items-center justify-center bg-primary bg-opacity-20 rounded-2xl mb-8 absolute z-[-1] top-0 left-0 rotate-[25deg] group-hover:rotate-45 duration-300"></span>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-xl text-dark mb-3">
                  {feature.title}
                </h4>
                <p className="text-body-color mb-8 lg:mb-11">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="flex items-center gap-2 font-medium text-base text-body-color hover:text-primary"
                >
                  Comece Agora
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
