# Guia de Contribuição - AgroPet Pr1me

Agradecemos o interesse em contribuir com o **AgroPet Pr1me**! Para manter a integridade, a qualidade e a agilidade nos deploys, todos os contribuidores e agentes de IA devem seguir o fluxo estabelecido abaixo.

## 1. Regra das Issues e Pull Requests
- Toda contribuição deve estar vinculada a uma [GitHub Issue](https://github.com/FerCM-SMM/AgroPetPrime/issues).
- Se não houver uma issue aberta para o que você pretende fazer, abra uma issue primeiro explicando o motivo e o escopo.
- Todo Pull Request deve conter `Closes #<numero>` na descrição para fechar a issue automaticamente após o merge.

## 2. Padrão de Branches
- Features: `feature/issue-<numero>-<descricao-curta>`
- Correções: `fix/issue-<numero>-<descricao-curta>`
- Documentação: `docs/issue-<numero>-<descricao-curta>`

## 3. Padrão de Commits
Seguimos a convenção [Conventional Commits](https://www.conventionalcommits.org/):
- `feat`: novas funcionalidades
- `fix`: correção de bugs
- `docs`: alterações na documentação
- `style`: ajustes visuais e de CSS sem alteração de lógica
- `refactor`: refatoração de código
- `test`: criação ou ajuste de testes
- `chore`: tarefas de manutenção de dependências ou build

## 4. Design e Motion Principles
- Consulte as diretrizes em `AGENTS.md` e `docs/brand-manual.md`.
- Siga a IDV da marca e implemente skeletons, lazy loading e micro-interações respeitando `@media (prefers-reduced-motion: reduce)`.
