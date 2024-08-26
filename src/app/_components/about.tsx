import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function About() {
  return (
    <section
      id="about"
      className="pt-20 lg:pt-[120px] pb-20 lg:pb-[120px] bg-[#f3f4fe]"
    >
      <div className="container">
        <div className="bg-white wow fadeInUp" data-wow-delay=".2s">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="lg:grid grid-cols-2 items-center justify-between border overflow-hidden">
                <div className="lg:max-w-[565px] xl:max-w-[640px] w-full py-12 px-7 sm:px-12 md:p-16 lg:py-9 lg:px-16 xl:p-[70px]">
                  <Badge className="mb-4"> Sobre a Plataforma</Badge>
                  <h2 className="font-bold text-3xl sm:text-4xl 2xl:text-[40px] sm:leading-snug text-dark mb-6">
                    Nossa plataforma facilita o gerenciamento de manutenções de
                    veículos.
                  </h2>
                  <p className="text-base text-body-color mb-9 leading-relaxed">
                    Nossa plataforma oferece uma gestão completa e intuitiva
                    para manutenções de veículos. Você pode acompanhar o
                    histórico de manutenções, agendar novas manutenções, gerar
                    relatórios e muito mais.
                  </p>

                  <Link
                    href={"login"}
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    Experimente Grátis
                  </Link>
                </div>

                <div>
                  <Image
                    src="/about-image.jpg"
                    alt="imagem"
                    width={500}
                    height={500}
                    quality={100}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
