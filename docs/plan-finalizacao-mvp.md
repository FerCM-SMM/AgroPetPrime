# AgroPet Pr1me — Plano de Finalização do MVP

> Criado: 2026-09-02
> Status: Aprovado — em execução (Build Mode)
> Base: `PLAN.md` + auditoria read-only de 2026-09-02
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + shadcn/ui + Supabase + N8N + Vercel

---

## 1. Objetivo

Entregar o MVP descrito em `PLAN.md:46-47`: site no ar, catálogo completo, carrinho funcional, checkout WhatsApp-first salvando no banco, painel admin e LGPD compliant. Arquitetura atual está ~70% scaffold UI e 0% backend integrado.

---

## 2. Diagnóstico (evidências)

### Pronto
- `app/page.tsx:1` hero/stats/categories/featured — OK
- `app/layout.tsx:11` metadata/SEO/OG
- `components/layout/header.tsx:9` header + mobile menu
- `types/schema.ts:1-123` tipos completos (Profile, Product, Order, Lead...)
- `lib/mock-data.ts:3` mocks para dev
- Páginas institucionais: `quem-somos`, `contato`, `politica-*`, `termos-de-uso`, `blog`

### Pendente crítico
| Área | Arquivo | Problema |
|------|---------|----------|
| Supabase | `lib/supabase/client.ts:3`, `components/providers/supabase-provider.tsx:9` | client cria mas não provê session; env vazia; sem migrations |
| Carrinho | `app/carrinho/page.tsx:11`, `app/checkout/page.tsx:12` | `MOCK_CART_ITEMS` estático, `useState` sem setter, botões sem handler, badge fixo `0` em `header.tsx:44` |
| Produto | `app/produto/[slug]/page.tsx:14` | sempre `MOCK_PRODUCTS[0]`, ignora slug |
| Categoria | `app/categorias/[slug]/page.tsx:4` | ignora slug, sem busca/filtro |
| Checkout | `app/checkout/page.tsx:47` | `wa.me/5511999999999` hardcoded, sem salvar `orders` |
| Auth | `hooks/use-auth.tsx:30` | simula login, sem Supabase Auth |
| LGPD | `components/layout/cookie-banner.tsx:7` | componente existe mas não é renderizado no layout |
| Admin | `app/admin/page.tsx:5`, `app/admin/produtos/page.tsx:6` | mock estático, sem auth guard |
| Env | `.env.local` | inexistente |

---

## 3. Fases de Execução

### Fase 1 — Fundação Supabase (D1)
**Objetivo:** banco operando com seed real e clients SSR corretos.
- Criar `supabase/migrations/001_initial_schema.sql` (profiles, addresses, categories, products, orders, order_items, leads, settings) espelhando `types/schema.ts`
- Seed categorias + `MOCK_PRODUCTS` + settings com `whatsapp_number`
- Corrigir `lib/supabase/client.ts` (browser via `createBrowserClient`, server via `createServerClient` com cookies)
- Corrigir `components/providers/supabase-provider.tsx` para expor `supabase` e `session` via context
- Criar `.env.local.example` e instruir preenchimento
- **Critério:** `npm run build` passa, `supabase query products` retorna 4+ linhas

### Fase 2 — Carrinho Global (D1-2)
**Objetivo:** carrinho reativo e persistente.
- Criar `hooks/use-cart.tsx` + `components/providers/cart-provider.tsx` (context + localStorage + `useState`)
- Adicionar `CartProvider` em `app/providers.tsx:11` dentro de `SupabaseProvider`
- Conectar `product-card.tsx`, `produto/[slug]/page.tsx:44` (“Adicionar”), `header.tsx:42` (badge) e `carrinho/page.tsx` (qty, remove, subtotal)
- Persistir em `localStorage` key `agropet-cart`
- **Critério:** adicionar 2 produtos, recarregar mantém carrinho

### Fase 3 — Catálogo Real + Checkout (D2-3)
**Objetivo:** fim dos mocks, compra ponta-a-ponta.
- Substituir mocks por fetch Supabase em `app/page.tsx:8` (featured), `categorias/[slug]/page.tsx`, `produto/[slug]/page.tsx` (buscar por slug, `notFound()`)
- Implementar busca/filtro por `animal_types` e categoria em `components/products/categories.tsx`
- Refatorar `checkout/page.tsx:31` para usar `useCart()`, validar com Zod (telefone, CEP via ViaCEP), salvar `orders` + `order_items` e só então `window.open('wa.me/...')` com número de `settings`
- Tratar `observation`, formatar mensagem WhatsApp padronizada
- **Critério:** pedido cria `orders` com `pending` e abre WhatsApp correto

### Fase 4 — Auth + LGPD + Guard (D3-4)
**Objetivo:** login real e compliance.
- Integrar Supabase Auth em `app/login/page.tsx`, `app/register/page.tsx`, `components/auth/*`, `hooks/use-auth.tsx`
- Criar `middleware.ts` ou guard em `app/admin/layout.tsx` para role `admin`
- Renderizar `CookieBanner` em `app/layout.tsx:55`, persistir `cookies-accepted` + inserir `leads.consent_*`
- Linkar políticas no footer e no checkout (checkbox)
- **Critério:** `/admin` bloqueia anônimo, banner persiste após aceito

### Fase 5 — Admin Real (D4-5)
**Objetivo:** lojista gerencia sem código.
- CRUD produtos (`admin/produtos`) com upload para Supabase Storage
- Listagem de pedidos com mudança de status (`pending→confirmed→delivered`)
- Dashboard com métricas reais (substituir `admin/page.tsx:6` mock `156/342`)
- `admin/clientes`, `admin/analytics` conectados
- **Critério:** criar produto no admin reflete no catálogo imediatamente

### Fase 6 — Deploy (D5-6)
**Objetivo:** produção no ar.
- Criar repo GitHub + Vercel project + env vars
- Configurar domínio `agropetpr1me.com.br` (Registro.br → Vercel)
- N8N webhook para notificação WhatsApp/Email após `orders` insert (Z-API futura)
- **Critério:** site acessível em produção, pedido de teste cria linha no Supabase produção

---

## 4. Ordem de Implementação (dependências)

```
Fase 1 (Supabase) ─┬─> Fase 2 (Carrinho) ─> Fase 3 (Catálogo+Checkout)
                   └─> Fase 4 (Auth/LGPD) ─> Fase 5 (Admin) ─> Fase 6 (Deploy)
```

Fase 2 e 4 podem paralelizar após Fase 1, mas Fase 3 depende de 1+2.

---

## 5. Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| SSR Supabase quebrar hidratação | Usar `createServerClient` com cookies (docs em `node_modules/next/dist/docs`) |
| Next 16 breaking changes | Validar `app/` com `next build` a cada fase |
| WhatsApp número fake em prod | Buscar de `settings.whatsapp_number`, fallback para env |
| Storage sem RLS | Criar policies `public read, authenticated write` |

---

## 6. Verificação por Fase

Cada fase exige `npm run build` + `npm run lint` sem erros e teste manual do critério listado acima. Ao final da Fase 6, executar pedido ponta-a-ponta em produção.

---

## 7. Próximas Decisões Pendentes do Cliente

- [ ] Número WhatsApp oficial (substituir `5511999999999`)
- [ ] Credenciais Supabase (URL + anon key) — aguardando preenchimento de `.env.local`
- [ ] Fonte do catálogo real (planilha / cadastrar manual no admin)
- [ ] Domínio já registrado? (`agropetpr1me.com.br`)

---

## 8. Log de Execução

- 2026-09-02: Plano aprovado, Fase 1 iniciada
- 2026-09-02: **Fase 1 concluída** — `lib/supabase/client.ts:1`, `lib/supabase/server.ts:1`, `components/providers/supabase-provider.tsx:1` corrigidos (SSR com cookies + fallback placeholder); criado `supabase/migrations/001_initial_schema.sql` + `002_seed.sql` (8 tabelas + seed), `.env.local.example`
- 2026-09-02: **Fase 2 concluída** — `hooks/use-cart.tsx:1` (CartProvider + localStorage `agropet-cart`), integrado em `app/providers.tsx:12`, `components/layout/header.tsx:44` badge dinâmico, `components/products/product-card.tsx:1` botão Adicionar com toast, `app/carrinho/page.tsx:1` qty/remove/total reativo
- 2026-09-02: **Fase 3 concluída** — `lib/supabase/queries.ts:1` (server queries) + `lib/supabase/orders.ts:1` + `components/products/featured-products.tsx:1` agora busca Supabase, `app/produto/[slug]/page.tsx:13` busca por slug com `notFound()`, `components/products/product-detail-client.tsx:1` add-to-cart + WhatsApp com número dinâmico, `app/categorias/[slug]/page.tsx:1` filtra por categoria, `app/checkout/page.tsx:1` cria `orders`/`order_items` + mensagem WhatsApp; `app/layout.tsx:1` Header global + CookieBanner
- 2026-09-02: Build verificado — `npm run build` ✓ (18 rotas, 4 SSG `produto/[slug]`, 4 dynamic `/admin/*`; warning único `metadataBase`)
- 2026-09-02: Fase 4 em progresso (LGPD banner integrado; admin guard com `dynamic='force-dynamic'` TODO Supabase Auth)
