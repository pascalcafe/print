# Verificacao do Marco 1

Data de referencia: 2026-03-31

## Objetivo desta verificacao

Conferir o estado atual do repositorio frente ao objetivo do Marco 1 e consolidar uma proposta pratica para fechar o escopo sem perder coerencia arquitetural.

## Resumo executivo

O EasyPrint ja possui uma fundacao consistente e demonstravel, mas o Marco 1 ainda nao pode ser considerado 100% concluido.

Hoje o repositorio ja prova partes importantes dos tres pilares:

1. o editor visual existe e funciona em nivel inicial;
2. o template pode ser salvo, reaberto e versionado;
3. o fluxo de impressao teste existe, mas ainda esta simplificado.

Status executivo recomendado:

- `Editor visual`: parcial forte
- `Persistencia e versionamento`: parcial forte
- `Ciclo editor -> preview -> impressao teste`: parcial
- `Marco 1 como um todo`: parcial avancado

## Base verificada no repositorio

Itens confirmados na base atual:

- monorepo com `apps/web`, `apps/api`, `apps/worker`, `packages/shared`, `packages/prisma`, `packages/ui`, `docs` e `infra`
- schema Prisma do dominio principal em `packages/prisma/schema.prisma`
- contrato compartilhado do documento em `packages/shared/src/template/document.ts`
- validacao estrutural do template em `packages/shared/src/template/schema.ts`
- store central do editor em `apps/web/lib/editor-store.ts`
- shell do editor em `apps/web/components/editor/editor-shell.tsx`
- propriedades contextuais iniciais em `apps/web/components/editor/properties.tsx`
- login bootstrap, sessao JWT e RBAC inicial em `apps/api/src/modules/auth`
- CRUD inicial de templates e versionamento em `apps/api/src/modules/templates`
- upload local de assets em `apps/api/src/modules/file-assets`
- impressoras, perfis, jobs e auditoria basica em `apps/api/src/modules/printers`, `print-profiles`, `print-jobs` e `audit`

## Verificacao por pilar

### Pilar 1 - O editor visual funciona

Status: `parcial forte`

Ja esta entregue:

- canvas central com store unica
- insercao de `text`, `barcode`, `line`, `shape` e `image`
- suporte pratico ao campo dinamico via `text` com `contentMode: "dynamic"`
- selecao unica
- drag
- resize
- painel de propriedades
- grade opcional
- snap basico
- preview desacoplado

Ainda falta para o criterio ficar fechado:

- melhorar precisao de resize e handles
- reforcar aderencia entre editor e preview
- permitir selecao de impressora e perfil no fluxo do editor
- evoluir propriedades contextuais por tipo
- tratar autosave remoto de forma real, nao apenas local

### Pilar 2 - O template pode ser salvo e reaberto com consistencia

Status: `parcial forte`

Ja esta entregue:

- template salvo como JSON estruturado
- JSON como fonte unica da verdade
- snapshot versionado em `TemplateVersion`
- reabertura do template a partir da API
- listagem inicial de templates
- publicacao simples

Ainda falta para fechar com seguranca de produto:

- browser simples de versoes na UI
- rollback tecnico de snapshot
- controle de conflito de edicao por `currentVersion`
- endurecimento de validacoes por tipo de elemento

### Pilar 3 - A etiqueta sai do editor e chega a impressao

Status: `parcial forte`

Ja esta entregue:

- cadastro basico de impressoras
- cadastro basico de perfis
- endpoint de impressao teste
- criacao de `PrintJob`
- persistencia de eventos do job
- auditoria basica do disparo

Ainda falta para fechar o ciclo de forma convincente:

- selecao explicita de impressora e perfil a partir do editor
- enriquecimento do payload do job
- status de job mais completo
- tela de detalhe ou historico mais forte
- handoff para `apps/worker`, mesmo que ainda com execucao simulada

## Verificacao por modulo do Marco 1

### Modulo 1 - Core e autenticacao

Status: `parcial`

Entregue:

- `Tenant`, `User`, `Role`, `Permission`, `UserTenant`
- login com e-mail e senha
- sessao JWT
- tenant bootstrap

Gap principal:

- a base de RBAC ja esta aplicada nas rotas criticas do Marco 1
- ainda falta gestao administrativa de usuarios, papeis e memberships por interface
- ainda nao ha troca de tenant ou experiencia multi-tenant mais madura

### Modulo 2 - Gestao de templates

Status: `parcial forte`

Entregue:

- criar template
- listar templates
- abrir template
- salvar rascunho
- versionar por snapshot
- publicar

Gap principal:

- falta navegador de versoes
- falta rollback
- falta controle de concorrencia na atualizacao

### Modulo 3 - Editor visual

Status: `parcial forte`

Entregue:

- shell com header, biblioteca, canvas, propriedades e barra tecnica
- elementos do Marco 1
- selecao, drag, resize
- propriedades basicas
- preview basico

Gap principal:

- UX ainda precisa de refinamento para sensacao de precisao profissional
- persistencia do autosave ainda e local
- faltam pequenos fechamentos de coerencia entre editor, preview e impressao

### Modulo 4 - Assets

Status: `parcial`

Entregue:

- upload local
- persistencia em `FileAsset`
- vinculo do asset ao template

Gap principal:

- falta biblioteca reaproveitavel de assets do tenant
- falta UX para reutilizar imagem ja enviada

### Modulo 5 - Impressoras e perfis

Status: `parcial`

Entregue:

- listagem e criacao basicas

Gap principal:

- CRUD ainda incompleto
- falta associacao de perfil default
- faltam validacoes e campos operacionais mais claros

### Modulo 6 - Jobs de impressao

Status: `parcial`

Entregue:

- `PrintJob`
- `PrintJobEvent`
- impressao teste simulada
- historico basico

Gap principal:

- falta fluxo assicrono no worker
- falta tela de detalhe do job
- falta resultado mais rico para debug operacional

### Modulo 7 - Auditoria

Status: `parcial`

Entregue:

- auditoria de criacao, edicao e publicacao de template
- auditoria de criacao de printer/profile/job
- consulta basica

Gap principal:

- falta restricao por permissao
- faltam filtros e cobertura de eventos complementares

## Escopo realmente atendido hoje

Atendido ou quase atendido:

- login bootstrap
- tenant basico
- listagem de templates
- criacao e edicao de template
- definicao de largura e altura
- insercao dos elementos do Marco 1
- mover e redimensionar
- salvar rascunho
- reabrir template
- preview basico
- upload basico de imagem
- cadastro basico de impressoras
- cadastro basico de perfis
- impressao teste simulada
- historico basico
- auditoria basica
- permissoes iniciais por papel nas rotas criticas

Ainda nao atendido no nivel esperado para declarar o Marco 1 concluido:

- fechamento UX do editor como experiencia profissional
- browser de versoes e rollback tecnico
- selecao operacional de impressora/perfil no editor
- CRUD mais completo de impressoras e perfis
- fluxo mais convincente de jobs e handoff para worker

## Proposta oficial para fechamento do Marco 1

### Diretriz

Nao ampliar escopo. Fechar o que ja foi iniciado, endurecer o que esta permissivo e elevar a experiencia para nivel de produto demonstravel.

### Proposta por frente

#### Frente 1 - Endurecimento de acesso e tenant

Objetivo:

fechar seguranca minima e remover permissividade excessiva.

Entradas:

- criar papeis bootstrap `admin`, `editor`, `operator`
- mapear permissoes minimas por papel
- implementar guard de permissao na API
- aplicar restricoes em `publish`, `print-jobs/test` e `audit`

Resultado esperado:

o sistema passa a respeitar as regras minimas do Marco 1.

#### Frente 2 - Fechamento do nucleo de templates

Objetivo:

garantir round-trip confiavel do template.

Entradas:

- endurecer schema do documento
- revisar save/open/publish
- expor versoes com payload resumido
- preparar rollback tecnico
- tratar `currentVersion` como controle de atualizacao

Resultado esperado:

o template volta exatamente como saiu do editor e o historico passa a ser operacionalmente util.

#### Frente 3 - Consolidacao do editor

Objetivo:

transformar o editor de fundacao funcional em experiencia convincente.

Entradas:

- polir handles de resize
- reforcar snap e grade
- ampliar propriedades contextuais
- alinhar editor e preview
- preparar autosave remoto sob controle

Resultado esperado:

o editor deixa de parecer apenas uma prova tecnica e passa a sustentar a narrativa central do produto.

#### Frente 4 - Assets e reutilizacao

Objetivo:

fechar o uso de imagem de ponta a ponta.

Entradas:

- listar assets do tenant
- permitir reutilizar asset ja enviado
- organizar resposta de upload e URL

Resultado esperado:

imagem passa a ser um recurso operacional do template, nao so um upload pontual.

#### Frente 5 - Impressoras, perfis e impressao teste

Objetivo:

fechar o terceiro pilar do Marco 1.

Entradas:

- completar CRUD basico de impressoras
- completar CRUD basico de perfis
- selecionar impressora/perfil no editor
- enriquecer `PrintJob` e `PrintJobEvent`
- preparar contrato de handoff para worker

Resultado esperado:

fica claro que a etiqueta sai do editor e entra num fluxo de impressao rastreavel.

#### Frente 6 - Auditoria e acabamento operacional

Objetivo:

dar maturidade minima de produto ao que ja esta implementado.

Entradas:

- filtros basicos de auditoria
- detalhe de job
- mensagens de erro e status mais claras
- documentacao final do fluxo local e do escopo fechado

Resultado esperado:

o Marco 1 passa a ser apresentavel tecnicamente e operacionalmente.

## Ordem recomendada de execucao

1. seguranca minima e permissoes
2. templates e versionamento
3. editor visual e preview
4. assets
5. impressoras, perfis e print jobs
6. auditoria e polish

## Criterio objetivo para declarar o Marco 1 concluido

O Marco 1 pode ser considerado concluido quando este fluxo estiver estavel:

1. usuario autenticado entra no sistema dentro do tenant correto
2. cria um template
3. define largura e altura
4. insere `text`, `line`, `shape`, `image` e `barcode`
5. move e redimensiona
6. salva como rascunho
7. reabre sem perda de layout
8. visualiza preview coerente
9. seleciona impressora e perfil
10. dispara impressao teste
11. encontra job e auditoria da acao

## Recomendacao final

Minha recomendacao oficial e considerar o repositorio em estado de `fundacao avancada`, nao de `Marco 1 concluido`.

O caminho mais saudavel nao e abrir novas frentes, e sim fechar as seis frentes acima com disciplina. Isso preserva a coerencia da arquitetura atual e transforma a base existente em um primeiro produto realmente demonstravel e vendavel.
