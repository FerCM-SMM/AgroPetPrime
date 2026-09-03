# Guia de Configuracao WhatsApp API - AgroPet Pr1me

## Pre-requisitos
- Numero de WhatsApp Business verificado
- Conta no Z-API (https://z-api.io)
- Conta no N8N (cloud ou self-hosted)

## Passo 1: Configurar Z-API
1. Acesse https://z-api.io e crie uma conta
2. Vai em Settings > WhatsApp
3. Conecte o seu numero de WhatsApp Business
4. Escaneie o QR code com o seu celular
5. Copie a API Token gerada

## Passo 2: Criar Workflows no N8N

### Workflow 1: Novo Pedido
Trigger: Webhook (HTTP POST)
  -> Z-API: Send Message
    Mensagem formatada com dados do pedido

### Workflow 2: Boas-vindas
Trigger: Webhook (novo lead no Supabase)
  -> Z-API: Send Message
    Mensagem de boas-vindas + link do catalogo

## Integracao com o Site
No checkout do site, o frontend envia um POST para o webhook do N8N com os dados do pedido.

## Mensagem Padrao do Pedido
Pedido - AgroPet Pr1me
========================
Cliente: [NOME]
Telefone: [TELEFONE]
Endereco: [ENDERECO]
========================
ITENS DO PEDIDO:
- [PRODUTO] x[QTD] = R$[VALOR]
========================
TOTAL: R$[TOTAL]
========================
