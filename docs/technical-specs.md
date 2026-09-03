# Documentacao Tecnica - AgroPet Pr1me

## Stack
- Frontend: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui
- Backend: Supabase (PostgreSQL + Auth + Storage + Realtime)
- Automacao: N8N + WhatsApp Business API (Z-API)
- Hospedagem: Vercel + Supabase Cloud

## Estrutura de Pastas
app/ - Paginas do Next.js
components/ - Componentes React
lib/ - Utilitarios e configuracoes
hooks/ - Custom hooks
types/ - Tipos TypeScript
docs/ - Documentacao

## Configuracao do Ambiente
Criar arquivo .env.local:
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave
