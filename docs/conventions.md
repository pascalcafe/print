# Convencoes do Projeto

## Estrutura

- `apps/*` para pontos de entrada executaveis.
- `packages/shared` para contratos de dominio e regras puras reutilizaveis.
- `packages/prisma` para schema e migracoes.
- `packages/ui` para tokens e componentes compartilhados.
- `docs/*` para ADRs leves, guias e visao arquitetural.

## Diretrizes de arquitetura

- JSON do template e a fonte unica da verdade.
- Regras de dominio devem viver fora de `apps`.
- API nao deve carregar SQL manual; acesso a dados via Prisma.
- UI deve priorizar clareza, simplicidade progressiva e canvas como protagonista.
- Worker deve assumir responsabilidades assicronas e integracoes futuras, nao logica de interface.

## Convencoes de codigo

- TypeScript com tipagem forte por padrao.
- DTOs e validacao nas bordas da API.
- Componentes pequenos e orientados a contexto na web.
- Preferir composicao e packages compartilhados em vez de duplicacao entre apps.
- Documentar decisoes estruturais em markdown antes de complexificar a implementacao.
