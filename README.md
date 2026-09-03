# 🐾 AgroPet Pr1me - E-commerce & Pet Care

Plataforma moderna de comércio eletrônico especializada em nutrição, medicamentos, acessórios e equipamentos para animais domésticos (cães e gatos) e animais de fazenda/campo (equinos, bovinos e aves).

---

## 🎨 Identidade Visual & Design System
- **Cyan Pr1me (`#12c0e0`):** Ações primárias, CTAs em pílula, indicador de carrinho e badges de destaque.
- **Preto / Carvão (`#000000` / `#0f172a`):** Tipografia de alta fidelidade e contraste.
- **Dourado / Âmbar (`#fbbf24`):** Avaliações de clientes e selos promocionais.
- **Superfícies Acolhedoras:** Fundo quente em tom creme suave com cartões elevados em branco puro e cantos arredondados (`rounded-3xl`).

---

## 🛠️ Tecnologias & Arquitetura
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components & React 19)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com design system customizado
- **Banco de Dados & Auth:** [Supabase](https://supabase.com/) (PostgreSQL com Row Level Security)
- **Animações & Motion:** [Design Motion Principles](https://github.com/kylezantos/design-motion-principles) (Jakub Krehel & Emil Kowalski)
- **Qualidade & Lint:** Biome, Commitlint, Knip, Arch-Contract e Stryker
- **Testes:** Vitest, Testing Library e Playwright (E2E)
- **Observabilidade:** Sentry, OpenTelemetry, Datadog e NewRelic

---

## 🚀 Como Executar Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   Crie o arquivo `.env.local` com as chaves do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
   SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000).

---

## 📋 Governança, Issues e Pull Requests
- Toda tarefa deve obrigatoriamente possuir uma [GitHub Issue](https://github.com/FerCM-SMM/AgroPetPrime/issues) associada.
- Deploys são gerenciados por Pull Requests na branch `main`.
- Veja os detalhes completos em [`AGENTS.md`](./AGENTS.md) e [`CONTRIBUTING.md`](./CONTRIBUTING.md).
