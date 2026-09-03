# Diretrizes para Agentes de IA - AgroPet Pr1me

Este documento contém as regras obrigatórias e o protocolo de desenvolvimento que **TODO** agente autônomo, assistente ou modelo de linguagem (Gemini, Claude, GPT, Cursor, Antigravity, etc.) deve seguir estritamente ao trabalhar neste repositório.

---

## 1. Fluxo de Governança Obrigatório: Issues & Pull Requests

> [!IMPORTANT]
> **NUNCA faça commits diretos na branch `main`.** Todo trabalho deve seguir o ciclo de vida: Issue -> Branch -> Commits Convencionais -> Pull Request -> Merge/Deploy.

### Passo a Passo:
1. **Verificar ou Criar a GitHub Issue:**
   - Antes de iniciar qualquer alteração (nova feature, bugfix, refatoração, documentação), verifique se existe uma Issue correspondente no repositório [FerCM-SMM/AgroPetPrime](https://github.com/FerCM-SMM/AgroPetPrime/issues).
   - Se não existir, utilize a API do GitHub ou solicite a criação da Issue correspondente com título descritivo e critérios de aceitação claros.
2. **Criar uma Branch Dedicada:**
   - Para novas funcionalidades: `git checkout -b feature/issue-<numero>-<slug-da-tarefa>`
   - Para correções de bugs: `git checkout -b fix/issue-<numero>-<slug-da-tarefa>`
   - Para documentação ou infra: `git checkout -b docs/issue-<numero>-<slug-da-tarefa>` ou `chore/issue-<numero>-<slug-da-tarefa>`
3. **Padrão de Mensagens de Commit (Conventional Commits):**
   - Estrutura: `<tipo>(<escopo>): <descrição no imperativo>`
   - Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
   - Exemplo: `feat(ui): implementar cards modernos de produtos na home`
4. **Abrir o Pull Request (PR):**
   - Envie a branch para a nuvem: `git push -u origin <nome-da-branch>`
   - Abra o PR no GitHub apontando para `main`.
   - **OBRIGATÓRIO:** Na descrição do PR, inclua a palavra-chave de fechamento vinculando a Issue correspondente:
     - `Closes #<numero>` ou `Fixes #<numero>`
   - Detalhe claramente as alterações realizadas e instruções para teste.
5. **Deploys:**
   - Deploys são disparados exclusivamente a partir do merge do Pull Request na branch `main`.

---

## 2. Identidade Visual (IDV) e Padrão Estético

O AgroPet Pr1me possui identidade visual definida que deve ser rigorosamente respeitada, aliada a um acabamento acolhedor e profissional inspirado em e-commerces modernos de referência (como PawJoy):

| Elemento | Valor / Token | Aplicação |
|----------|---------------|-----------|
| **Cyan Pr1me** | `#12c0e0` / `#00b8d9` | Ações principais, CTAs, badges de destaque, indicador de carrinho |
| **Preto / Carvão** | `#000000` / `#0f172a` | Tipografia de alto contraste, elementos institucionais, rodapé |
| **Dourado / Âmbar** | `#fbbf24` / `#f59e0b` | Estrelas de avaliações, selos de promoção e urgência |
| **Verde Fresco** | `#10b981` / `#059669` | Selos de saúde animal, produtos 100% naturais e frete grátis |
| **Fundo Quente** | `#faf8f5` / `#f5f2eb` | Fundo geral da loja, transmitindo conforto e cuidado com o pet |

- **Sem Placeholders:** Nunca use URLs fictícias como `via.placeholder.com`. Utilize ativos reais em `public/images/` ou gere ilustrações fotográficas contextuais.
- **Tipografia:** Heading `Inter Bold` / `Outfit`, Body `Inter Regular`.
- **Formas:** Bordas suaves e acolhedoras (`rounded-2xl`, `rounded-3xl`, botões em `rounded-full` estilo pill).

---

## 3. Motion Principles (`design-motion-principles`)

Toda interface deve seguir as diretrizes da skill Motion Principles baseadas em **Jakub Krehel** (refinamento sutil de produção) e **Emil Kowalski** (velocidade e contenção):

1. **The Frequency Gate:** Ações frequentes (ex: adicionar ao carrinho, cliques em navegação) devem ter animações instantâneas ou < 200ms. Ações ocasionais podem ter transições suaves de 250ms a 400ms.
2. **Skeletons Shimmer:** Toda listagem ou componente que carrega dados de forma assíncrona (produtos, categorias, detalhes) DEVE exibir um Skeleton com efeito shimmer suave durante o loading.
3. **Lazy-loading & Blur:** Imagens devem possuir `loading="lazy"` e transição suave de fade-in ao completar o carregamento.
4. **Sem "AI-Slop":** Evite animações exageradas (como botões que pulsam eternamente ou elementos saltando sem propósito).
5. **Acessibilidade:** Respeite SEMPRE `@media (prefers-reduced-motion: reduce)`.

---

## 4. Arquitetura, Qualidade e Testes

- **Linting & Formatting:** O projeto adota **Biome** para linting e formatação. Execute `npm run lint:biome` antes de submeter PRs.
- **Commitlint:** Verifique se as mensagens de commit seguem a convenção antes de enviar branches.
- **Observabilidade:** Todos os erros críticos e fluxos de negócio devem ser instrumentados via `lib/observability` (com suporte a Sentry, OpenTelemetry, Datadog e NewRelic).
- **Testes:**
  - Testes unitários de lógica de carrinho e componentes com **Vitest**.
  - Testes E2E com **Playwright** cobrindo a jornada de compra do usuário.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
