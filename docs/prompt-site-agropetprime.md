# Prompt para IA de Desenvolvimento (Antigravity / Cursor / v0 / etc)
## Site: AgroPet Pr1me — Sorocaba/SP

> **Referência de estrutura e comportamento:** https://www.voldogfood.com/
> **Conteúdo/base atual do cliente (domínio temporário em produção):** https://mediumseagreen-swallow-366493.hostingersite.com/
> **IDV completa:** ver arquivo `IDV-AgroPetPrime.md` (anexar junto a este prompt)

**Objetivo:** Reconstruir o site da AgroPet Pr1me usando a MESMA arquitetura, hierarquia de seções, Hero e animações de scroll do site de referência (Voldog), mas com o conteúdo, produtos e identidade visual já existentes da AgroPet Pr1me (extraídos do domínio temporário). A AgroPet Pr1me **não deve ficar restrita a cães e gatos** como a Voldog — é uma loja híbrida de pet + agropecuária, e isso deve ficar evidente em toda a estrutura.

---

## 1. Instrução geral para a IA

Construa uma landing page one-page com scroll vertical contínuo, replicando o comportamento estrutural e as animações do site de referência (Voldog), preenchida com o conteúdo real da AgroPet Pr1me listado abaixo. Onde o conteúdo do domínio temporário já é bom, mantenha o texto; onde for genérico ou fraco, você pode sugerir uma versão melhorada, mas sempre dentro do tom de voz descrito na IDV.

---

## 2. Header (fixo/sticky no topo)

1. **Barra superior (marquee/ticker fino)**, fundo preto ou azul `#20BEE2`: texto rolando — *"Entregas rápidas em Sorocaba e região • WhatsApp: (15) 9 9658-0804 • R. Antônio Silva Saladino, 878 - Pq. Vitória Régia • Loja Oficial Prime"* (repetir em loop).
2. **Menu principal**: logo AgroPet Pr1me à esquerda; à direita, itens de navegação com mega-menu (Cães, Gatos, Pássaros, Cavalos & Agro, Farmácia & Saúde, Acessórios & Conforto) + botão pílula de destaque **"Pedir no WhatsApp"** (azul `#20BEE2`, texto branco/preto) + ícone de carrinho com valor.
3. Colapsa em hambúrguer no mobile.
4. Fundo do header ganha leve sombra/opacidade ao rolar.

---

## 3. Hero — manter o comportamento do vídeo da Voldog, com a identidade da AgroPet

- **Fundo**: vídeo em loop, autoplay, mudo, full-screen (`object-fit: cover`), com overlay escuro/azul-petróleo para legibilidade — mesma técnica da Voldog.
  - **Conteúdo do vídeo**: cenas com o **pitbull da marca** (mascote/imagem principal já usada na Hero atual — `hero-pitbull-tight.png`) em movimento, intercaladas (se houver material) com cenas da loja física, sacaria de ração e/ou cavalos/campo, para reforçar que a marca não é só pet doméstico. Se não houver vídeo pronto, usar como fallback a imagem estática atual do pitbull em alta resolução com leve efeito de parallax/zoom lento (efeito Ken Burns) enquanto o vídeo real não é produzido.
- **Título principal**: *"O Melhor Cuidado para seu Pet com a Nutrição Ideal"* (manter ou ajustar para reforçar também o lado agro, ex: *"...para seu Pet e sua Propriedade"*).
- **Subtítulo**: *"Rações super premium selecionadas, farmácia veterinária especializada e artigos para o campo. Atendimento amigo de loja de bairro, com entrega rápida para Sorocaba e região."*
- **Campo de busca** de produtos, estilo pílula, sobreposto ao vídeo.
- **Badges de confiança** em linha: `100% Originais` · `Apoio Vet` · `Entrega Expressa`.
- **Elemento de alternância (toggle)** — este é o equivalente direto ao toggle cão/gato da Voldog, já existente no site atual como dois botões: transformar em um **toggle switch estilizado** (pílula com dois estados, ícone + label, transição suave ao trocar):
  - 🐾 **Tutor de Pet** (Cães & Gatos & Pássaros)
  - 🌾 **Campo/Agro** (Cavalos & Haras)
  - Ao trocar o estado, as seções de "Departamentos" e "Produtos em destaque" abaixo devem filtrar/priorizar os itens correspondentes (mesma lógica de filtragem dinâmica da Voldog).
- **CTA secundário**: botão "Pedir no WhatsApp" (link `https://wa.me/5515996580804`).

---

## 4. Seção "Departamentos & Espécies" (grid de categorias)

Título: **"Qual é a sua necessidade hoje?"**
Subtítulo: *"Selecione o departamento ideal para encontrar rações nobres, dosagens veterinárias seguras e suprimentos para campo ou residência."*

Grid de 6 cards (ícone/imagem + nome + descrição curta), **mais abrangente que a Voldog** (que só tem cão/gato):

| Card | Descrição curta |
|---|---|
| 🐕 Cães | Super Premium, Sachês & Antipulgas |
| 🐈 Gatos | Areias Sílica, Rações Castrados & Brinquedos |
| 🐦 Pássaros | Sementes Selecionadas, Gaiolas & Blocos |
| 🐴 Cavalos & Agro | Ração Alta Performance, Selaria & Minerais |
| 💊 Farmácia Veterinária | Antibióticos, Vacinas & Suplementos |
| 🛁 Higiene & Banho | Shampoos Neutros, Rasqueadeiras & Camas |

**Animação:** stagger fade-in + slide-up ao entrar na viewport, como no site de referência.

---

## 5. Seção "Produtos em destaque" (carrossel com filtro)

Título: **"Destaques para seu Pet & Campo"**
Subtítulo: *"Itens originais de alta nutrição e saúde, com entrega expressa para toda a região de Sorocaba."*

- Filtros/tabs horizontais: `Todos os Itens` · `Cães Adultos` · `Gatos Castrados` · `Farmácia Veterinária` · `Campo & Equinos`
- Cards de produto (exemplos reais a popular):
  1. Ração Premier Formula Cães Adultos Raças Médias e Grandes 15kg — R$289,90 → R$237,70 (-18% OFF, selo "Mais Vendido")
  2. Ração Royal Canin Gatos Adultos Castrados 7.5kg — R$299,00 → R$254,15 (-15% OFF)
  3. Antipulgas e Carrapatos Simparic 80mg (Cães 20-40kg) — R$139,90 → R$119,90 (selo "Frete Sorocaba Grátis" / "Original Zoetis")
  4. Ração Equinos Alta Energia Cavalo Atleta Laminada 25kg — R$165,00 → R$142,50 (selo "Linha Campo & Haras")
  5. Caminha Donut Faux-Fur Nuvem Ultra Macia Lavável Bege — R$189,90 → R$149,90 (selo "Toque Macio")
  6. Kit Banho & Tosa: Shampoo Hipoalergênico 473ml + Escova Bambu — R$110,00 → R$89,90 (selo "Fórmula Vegana")
- Cada card: imagem, avaliações (nº de reviews), nome, preço riscado + preço com desconto, seletor de variação (embalagem/tamanho), botão "Adicionar ao Carrinho".
- Botão final: "Todos os Itens" (ver catálogo completo).
- **Animação:** hover com leve zoom na imagem + elevação de sombra no card.

---

## 6. Seção "Farmácia Veterinária" (bloco de confiança, específico da AgroPet — não existe na Voldog)

Título: **"Cuide da saúde com quem entende. Farmácia completa com orientação segura."**
Texto: *"Trabalhamos exclusivamente com laboratórios credenciados (Zoetis, MSD, Elanco, Bravet, Ourofino). Medicamentos e antipulgas mantidos em armazenamento estritamente monitorado."*

- 4 sub-blocos em grid: `Antiparasitários` (pipetas, coleiras e mastigáveis) · `Suplementos & Ômegas` (fortalecimento imunológico e suporte sênior) · `Dermatológicos` (shampoos terapêuticos e sprays calmantes) · `Articulações & Dor` (condroitina, glicosamina e anti-inflamatórios).
- CTA de destaque: *"Tem receita do médico veterinário? Envie a foto no WhatsApp para cotação em minutos!"* → botão "Enviar Receita" (link WhatsApp com mensagem pré-preenchida).
- Imagem lateral: ambiente de farmácia/atendimento veterinário.

---

## 7. Seção "Diferenciais" (equivalente aos benefícios B.A.R.F da Voldog)

Título: **"A certeza de um cuidado genuíno com o seu animal"**

Grid de 4 blocos (ícone + título + descrição curta):

1. **Loja Física em Sorocaba** — Estrutura ampla e acolhedora na R. Antônio Silva Saladino, 878, Parque Vitória Régia. "Venha tomar um café conosco!"
2. **Entrega Expressa Ágil** — Despachamos seu pedido com agilidade para seu pet nunca ficar sem a refeição favorita.
3. **Atendimento Amigo & Cuidadoso** — Orientação de quem realmente entende e ama animais, do apartamento à lida do campo.
4. **Preço Justo & Cashback** — Promoções semanais, combos de saca fechada e 5% de cashback em todas as compras.

**Animação:** stagger fade-in + slide-up.

---

## 8. Seção "Comunidade" (equivalente aos depoimentos/reviews da Voldog)

Título: **"De chácaras a lares urbanos: histórias de quem confia"**
Subtítulo: Comunidade @agropetprime.sorocaba
CTA: "Ver fotos no Instagram" → link `instagram.com/agropetprime.sorocaba`

Carrossel horizontal de cards (foto + tag de categoria + nome + descrição curta):

- **Thor** (Cães da Região) — "Visita semanal para garantir ração super premium e um bom papo no balcão."
- **Mel** (Cuidado Felino) — "Conforto e areia mineral de alta absorção recomendada pela nossa equipe."
- **Haras Boa Vista** (Equinos & Haras) — "Nutrição pesada e sal mineral entregues com cuidado direto na cocheira."
- **Chácara Recanto Verde** (Entrega Expressa) — "Sacarias de 15kg e 20kg descarregadas no mesmo dia em Sorocaba."

> Nota: diferente da Voldog (que usa reviews do Google com nota agregada), a AgroPet ainda não tem essa integração ativa. Estruturar o carrossel de forma que comporte, no futuro, um widget de avaliações do Google (nota média + selo "powered by Google") assim que a loja tiver essa integração disponível.

---

## 9. Seção "Clube de Vantagens" (captura de lead — não existe na Voldog, manter)

Título: **"Economize 10% na sua primeira compra de ração ou medicamento"**
Texto: *"Cadastre seu WhatsApp ou e-mail para receber cupons exclusivos, avisos de vacinas anuais e ofertas de saca fechada antes de todo mundo em Sorocaba."*
CTA: botão "Quero 10% OFF" + campo de captura (WhatsApp ou e-mail)
Microcopy: *"Sem spam. Apenas descontos reais e lembretes de saúde para Sorocaba e chácaras da região."*

---

## 10. Seção "FAQ" (a estruturar — conteúdo a ser extraído da página /faq existente)

- Título: **"Tem dúvidas? Temos as respostas."**
- Accordion com perguntas frequentes sobre entrega, formas de pagamento, receitas veterinárias, trocas.
- Link "Ver todas as perguntas" → página `/faq`.
- *Observação: o domínio temporário já tem uma página `/faq` — recomendo puxar o conteúdo real de lá antes de finalizar esta seção (não incluí aqui por não termos o texto completo ainda).*

---

## 11. Seção "Nossa Loja em Sorocaba" (localização — específica da AgroPet)

- Endereço: Rua Antônio Silva Saladino, 878, Parque Vitória Régia — Sorocaba/SP
- Texto: *"Estacionamento amplo e facilitado na porta para carregamento de sacarias pesadas e produtos de chácara."*
- Horário: Segunda a Sábado, 08:00 às 19:00
- Mapa embutido (Google Maps) + botões: "Como Chegar (GPS)" e telefone clicável `(15) 9 9658-0804`.

---

## 12. Footer

- **Coluna 1**: descrição institucional — *"O acolhimento de uma loja de bairro com a tradição do campo em Sorocaba. Nutrição nobre, farmácia veterinária responsável e artigos para cães, gatos, aves e cavalos."* + selo "CNPJ Ativo" + "Entrega em Sorocaba & Região".
- **Coluna 2 (Canais de Atendimento)**: endereço, WhatsApp, Instagram, horário.
- **Coluna 3 (Departamentos)**: links para Cães, Gatos, Farmácia, Agro, Clube Prime de Descontos.
- **Coluna 4 (Pagamento)**: *"Pague via PIX com desconto imediato, cartões de crédito em até 6x sem juros ou pague na entrega para Sorocaba."* + ícones PIX / Cartão / Boleto / Débito + selo "Ambiente Seguro com Criptografia SSL".
- Linha inferior: © 2025-2026 AgroPet Pr1me Sorocaba. Todos os direitos reservados. + links Termos de Uso / Privacidade / Política de Entregas & FAQ.

---

## 13. Animações de scroll (mesmo comportamento da Voldog)

- **Fade-in + slide-up** em todos os blocos de conteúdo (títulos, cards, grids) ao entrarem na viewport, via `IntersectionObserver` ou lib equivalente (Framer Motion / GSAP ScrollTrigger).
- **Stagger em grids**: delay sequencial de 80–120ms entre itens de um mesmo grid.
- **Marquee infinito** na barra superior do header, velocidade constante e lenta.
- **Header**: sombra/fundo sólido ao ultrapassar a Hero.
- **Hover em cards de produto**: zoom leve na imagem + elevação de sombra.
- **Toggle Tutor de Pet / Campo-Agro**: transição suave de estado (deslizar + crossfade no conteúdo filtrado abaixo).
- Duração recomendada: 400–700ms, easing `ease-out`.

---

## 14. Identidade Visual — resumo rápido (detalhe completo em `IDV-AgroPetPrime.md`)

- **Cor primária:** Azul `#20BEE2`
- **Cor secundária:** Preto `#000000`
- **Acento/variante:** Turquesa `#51FFE6`
- **Tipografia títulos:** sans-serif bold/black (ex: Archivo Black, Poppins ExtraBold, Anton)
- **Tipografia corpo:** sans-serif regular da mesma família (ex: Poppins/Barlow Regular)
- **Tom de voz:** premium + força + acolhedora — linguagem de loja de bairro com tradição de campo
- **Logo/ícone:** wordmark "AgroPet" + "PR1ME" (número 1 sempre em azul de destaque) + símbolo de cabeça de pitbull em line art

---

## 15. Requisitos técnicos

- Totalmente responsivo (mobile-first)
- Vídeo da Hero com fallback de imagem estática para conexões lentas
- Lazy-load de imagens fora da primeira dobra
- Botões de CTA sempre priorizando o link direto do WhatsApp: `https://wa.me/5515996580804`
- Acessibilidade: contraste adequado de texto branco sobre o overlay do vídeo/imagens

---

### Como usar este arquivo
Envie este arquivo junto com `IDV-AgroPetPrime.md` para o Antigravity (ou ferramenta equivalente) como prompt de reconstrução do site. Antes de finalizar, complete a seção 10 (FAQ) com o conteúdo real da página `/faq` do domínio temporário, e substitua o vídeo da Hero assim que houver material filmado do pitbull/loja — até lá, use a imagem estática já existente como fallback.
