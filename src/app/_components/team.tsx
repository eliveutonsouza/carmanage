import { Github, Linkedin, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teams = [
  {
    id: 1,
    name: "Eliveuton Souza",
    role: "Desenvolvedor Full Stack & Fundador",
    image: "https://github.com/eliveutonsouza.png",
  },
];

export function Team() {
  return (
    <section id="equipe" className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] max-w-[620px]">
              <span className="font-semibold text-lg text-primary mb-2 block">
                Nossa Equipe
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-[42px] text-dark mb-4">
                Conheça Nossa Equipe responsáveis pelo desenvolvimento da
                Plataforma
              </h2>
              <p className="text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-body-color">
                Nossa equipe é formada por profissionais especializados em
                desenvolvimento de software, criou a plataforma para facilitar a
                gestão de manutenções de veículos.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className="mb-10 wow fadeInUp"
                data-wow-delay=".1s"
              >
                <div className="relative w-[170px] h-[170px] rounded-full z-10 mx-auto mb-6">
                  <Image
                    width={170}
                    height={170}
                    src={team.image}
                    alt="imagem"
                    className="w-full rounded-full"
                  />
                  <span className="absolute top-0 left-0 z-[-1]">
                    <Image
                      width={71}
                      height={82}
                      src="/dots.svg"
                      alt="imagem"
                    />
                  </span>
                  <span className="absolute right-0 bottom-0">
                    <Image
                      src={"/shape.svg"}
                      width={22}
                      height={22}
                      alt="imagem"
                    />
                  </span>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-lg text-dark mb-2">
                    {team.name}
                  </h4>
                  <p className="font-medium text-sm text-body-color mb-5">
                    {team.role}
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <Link
                      href="/"
                      className="text-[#cdced6] hover:text-primary flex items-center"
                    >
                      <Linkedin size={20} />
                    </Link>
                    <Link
                      href="/"
                      className="text-[#cdced6] hover:text-primary flex items-center"
                    >
                      <Github size={20} />
                    </Link>
                    <Link
                      href="/"
                      className="text-[#cdced6] hover:text-primary flex items-center"
                    >
                      <MailIcon size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
