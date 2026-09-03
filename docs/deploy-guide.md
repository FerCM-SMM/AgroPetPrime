# Guia de Deploy - AgroPet Pr1me

## Requisitos
- Conta no Vercel (https://vercel.com)
- Dominio registrado (https://registro.br)
- Conta no Supabase (https://supabase.com)
- Conta no N8N Cloud (https://n8n.cloud)

## Passo 1: Registrar o Dominio
1. Acesse https://registro.br
2. Registre o dominio agropetpr1me.com.br
3. Aguarde a confirmacao

## Passo 2: Configurar Supabase
1. Acesse https://supabase.com
2. Crie um novo projeto
3. Vai em Settings > API
4. Copie Project URL e anon key
5. Crie as tabelas necessarias

## Passo 3: Deploy no Vercel
### Opcao A: GitHub
1. Crie um repositorio no GitHub
2. Faça push do codigo
3. Vai em Vercel > New Project > Import GitHub Repo
4. Configure as variaveis de ambiente
5. Clique em Deploy

### Opcao B: Vercel CLI
npm install -g vercel
vercel

## Passo 4: Configurar Dominio Customizado
No Vercel > Settings > Domains, adicione agropetpr1me.com.br
Configure os registros DNS no registro.br
