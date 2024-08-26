import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: 1,
    question: "Como posso adicionar um novo veículo?",
    answer:
      "Você pode adicionar um novo veículo acessando a seção 'Adicionar Veículo' no painel de controle e preenchendo o formulário com as informações necessárias.",
  },
  {
    id: 2,
    question: "Como posso visualizar as manutenções do meu veículo?",
    answer:
      "As manutenções do seu veículo podem ser visualizadas na página de detalhes do veículo, onde você encontrará uma lista de todas as manutenções realizadas e programadas.",
  },
  {
    id: 3,
    question: "O que fazer se uma manutenção estiver vencida?",
    answer:
      "Se uma manutenção estiver vencida, você receberá uma notificação por e-mail. Você pode acessar a seção de manutenções para agendar a manutenção necessária.",
  },
  {
    id: 4,
    question: "Como posso gerar relatórios de manutenção?",
    answer:
      "Você pode gerar relatórios de manutenção acessando a seção de relatórios no painel de controle, onde poderá visualizar e exportar os dados das manutenções.",
  },
  {
    id: 5,
    question: "A plataforma oferece suporte para múltiplos usuários?",
    answer:
      "Sim, a plataforma permite que você adicione múltiplos usuários, cada um com suas próprias permissões e acesso às informações dos veículos.",
  },
  {
    id: 6,
    question: "Como posso entrar em contato com o suporte?",
    answer:
      "Você pode entrar em contato com o suporte através da seção 'Contato' no aplicativo, onde encontrará um formulário para enviar suas dúvidas ou problemas.",
  },
];

export function Faq() {
  return (
    <section className="bg-[#f3f4ff] pt-20 lg:pt-[120px] pb-12 lg:pb-[90px] relative z-20 overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[620px]">
              <span className="font-semibold text-lg text-primary mb-2 block">
                FAQ
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-dark mb-4">
                Perguntas Frequentes sobre a Plataforma
              </h2>
              <p className="text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-body-color">
                Aqui você encontra as perguntas mais frequentes sobre a
                plataforma. Se ainda tiver dúvidas, entre em contato conosco.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value={`item-${faq.id}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" stopOpacity="0.36" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
