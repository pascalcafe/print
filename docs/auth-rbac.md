# Auth e RBAC

Data de referencia: 2026-03-31

## Objetivo

Definir a base de autenticacao e autorizacao do Marco 1 sem criar complexidade prematura.

## Estrategia adotada

- autenticacao via JWT
- contexto de tenant embutido na sessao
- papel principal por vinculacao `UserTenant`
- permissoes explicitas por acao
- aplicacao de guard nas rotas criticas do Marco 1
- frontend refletindo permissoes para esconder ou desabilitar acoes sensiveis

## Papeis bootstrap

- `admin`
- `editor`
- `operator`

## Permissoes atuais

- `template.view`
- `template.edit`
- `template.publish`
- `asset.view`
- `asset.manage`
- `printer.view`
- `printer.manage`
- `print-profile.view`
- `print-profile.manage`
- `print-job.view`
- `print-job.test`
- `audit.view`

## Matriz inicial

### Admin

Possui todas as permissoes do Marco 1.

### Editor

- visualizar templates
- criar e editar templates
- publicar templates
- visualizar e gerenciar assets
- visualizar impressoras
- visualizar perfis de impressao
- visualizar jobs
- executar impressao teste

### Operador

- visualizar templates
- visualizar impressoras
- visualizar perfis de impressao
- visualizar jobs
- executar impressao teste

## Rotas protegidas no Marco 1

- templates: visualizacao, edicao e publicacao
- assets: listagem e upload
- impressoras: listagem e cadastro
- perfis de impressao: listagem e cadastro
- jobs: historico e impressao teste
- auditoria: consulta

## Observacoes

- a sessao do frontend e revalidada por `auth/me` antes de liberar a navegacao protegida
- o controle atual e suficiente para o Marco 1, mas ainda nao cobre gestao administrativa completa de usuarios e papeis
- mudancas de papel exigem nova leitura de sessao, o que ja acontece na entrada do app
