# Carmanage

Este é um projeto [Next.js](https://nextjs.org/) para gestão de manutenção de veículos, criado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Começando

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev

# e então execute o docker compose
docker compose up -d
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando `app/page.tsx`. A página se atualiza automaticamente conforme você edita o arquivo.

Este projeto utiliza [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para otimizar e carregar automaticamente a fonte Inter, uma fonte personalizada do Google.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Auth0](https://auth0.com/)
- [Shadcn/ui](https://shadcn-ui.vercel.app/)
- [Docker](https://www.docker.com/)
- [Ingest](https://ingest.dev/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Rotas de Páginas

- `/` - Página inicial
- `/dashboard` - Painel de controle
- `/dashboard/reports` - Relatórios
- `/login` - Página de login
- `/register` - Página de registro
- `/dashboard/car/[id]` - Detalhes do veículo

## Rotas da API

- `POST /api/mails/send-a-user` - Enviar e-mail com relatório de manutenções vencidas.
- `GET /api/cron/send-all-user` - Enviar relatórios para todos os usuários (produção).
- `GET /api/cron/` - Endpoint para cron (desenvolvimento).

## Acessando as Rotas da API com Client HTTP

### Exemplo de requisição para desenvolvimento

```http
GET http://localhost:3000/api/cron/send-all-user HTTP/1.1
Content-Type: application/json
```

### Exemplo de requisição para produção

```http
GET https://carmanage.tech/api/cron/send-all-user HTTP/1.1
Content-Type: application/json
```

## Aprenda mais sobre Next.js

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre os recursos e a API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo de Next.js.

Você pode conferir [o repositório do Next.js no GitHub](https://github.com/vercel/next.js/) - seu feedback e contribuições são bem-vindos!

## Deploy no Vercel

A maneira mais fácil de implantar seu aplicativo Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Confira nossa [documentação de implantação do Next.js](https://nextjs.org/docs/deployment) para mais detalhes.