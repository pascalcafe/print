# Plano de Implementacao do Marco 1

## Objetivo

Concluir o Marco 1 do EasyPrint com foco em tres pilares:

1. o editor visual funciona;
2. o template pode ser salvo e reaberto com consistencia;
3. a etiqueta sai do editor e chega ao fluxo de impressao teste.

## Base atual do repositorio

O repositorio ja possui uma fundacao relevante e reaproveitavel:

- monorepo com `apps/web`, `apps/api`, `apps/worker`;
- packages `shared`, `prisma` e `ui`;
- auth bootstrap com JWT;
- schema Prisma inicial do Marco 1;
- CRUD inicial de templates;
- editor visual com store central, canvas, propriedades, preview e status bar;
- upload de assets local;
- cadastro inicial de impressoras, perfis e jobs;
- auditoria basica.

## Estrutura de pastas alvo

```text
apps/
  api/
    src/modules/
      auth/
      templates/
      file-assets/
      printers/
      print-profiles/
      print-jobs/
      audit/
      prisma/
  web/
    app/
      login/
      editor/[id]/
      preview/[id]/
      printers/
      print-profiles/
      jobs/
      audit/
    components/
      app/
      editor/
    lib/
  worker/
packages/
  prisma/
  shared/
    src/template/
    src/editor/
  ui/
docs/
infra/
```

## Modulos do Marco 1

### Modulo 1 - Core e autenticacao

Responsavel por:

- tenant;
- usuario;
- login;
- contexto autenticado;
- roles/permissoes iniciais.

Status atual:

- `Tenant`, `User`, `Role`, `Permission`, `UserTenant` modelados;
- login bootstrap funcionando;
- tenant default bootstrapado;
- falta endurecer papeis e restricoes por permissao no fluxo de publicacao/impressao.

### Modulo 2 - Gestao de templates

Responsavel por:

- criar template;
- listar templates;
- abrir template;
- salvar rascunho;
- versionar;
- publicar.

Status atual:

- schema JSON compartilhado e validado;
- snapshot versionado em `TemplateVersion`;
- endpoints principais implementados;
- falta consolidar rollback/version browser na UI.

### Modulo 3 - Editor visual

Responsavel por:

- canvas;
- elementos;
- selecao unica;
- drag;
- resize;
- propriedades;
- preview.

Status atual:

- store centralizada pronta;
- canvas com grade e snap basicos;
- elementos principais presentes;
- falta polir alinhamento visual, guias e consistencia de refinamentos.

### Modulo 4 - Assets

Responsavel por:

- upload de imagem;
- armazenamento do asset;
- vinculo com template.

Status atual:

- upload local funcional;
- assets persistidos em `FileAsset`;
- imagem vinculada no documento;
- falta biblioteca visual de assets no editor.

### Modulo 5 - Impressoras e perfis

Responsavel por:

- cadastro de impressoras;
- cadastro de perfis de impressao;
- associacao de perfil.

Status atual:

- endpoints e telas basicas implementados;
- falta CRUD completo e associacao default por template.

### Modulo 6 - Jobs de impressao

Responsavel por:

- criar print job;
- registrar eventos;
- armazenar payload;
- guardar resultado.

Status atual:

- `PrintJob` e `PrintJobEvent` persistem;
- impressao teste hoje e simulada;
- falta fluxo assicrono no worker.

### Modulo 7 - Auditoria basica

Responsavel por:

- criacao de template;
- edicao de template;
- publicacao de template;
- criacao de print job;
- sucesso/falha.

Status atual:

- eventos principais registrados;
- endpoint e tela de consulta presentes;
- falta ampliar cobertura de eventos e filtros.

## Backlog tecnico detalhado

### Faixa A - Fechamento do nucleo do produto

- `A01` endurecer validacao do documento JSON e regras de consistencia por tipo de elemento.
- `A02` revisar round-trip completo do template: criar -> salvar -> reabrir -> preview -> publicar.
- `A03` consolidar schema de `shape` como base do retangulo e manter compatibilidade na UI.
- `A04` adicionar navegador simples de versoes do template na tela do editor ou detalhe.
- `A05` preparar rollback tecnico de snapshot, mesmo que sem UI final no primeiro passo.

### Faixa B - Editor visual

- `B01` revisar escala fisica do canvas e unidade por `mm/cm/in/px`.
- `B02` melhorar handles de resize e area de selecao.
- `B03` adicionar grade opcional com persistencia local.
- `B04` consolidar snap to grid no movimento e resize.
- `B05` ampliar propriedades contextuais por elemento.
- `B06` incluir suporte explicito a campo dinamico no painel lateral.
- `B07` melhorar preview para ficar mais aderente ao editor.
- `B08` preparar autosave remoto incremental, mesmo que atras de flag.

### Faixa C - Templates e persistencia

- `C01` padronizar naming e slug de templates com validacoes mais claras.
- `C02` adicionar endpoint de detalhe/listagem de versoes com payload resumido.
- `C03` incluir marca de `publishedAt` e autor da publicacao se necessario.
- `C04` preparar associacao opcional entre template e print profile default.
- `C05` tratar conflitos de update com base em `currentVersion`.

### Faixa D - Auth, tenant e permissoes

- `D01` criar papeis bootstrap: `Admin`, `Editor`, `Operador`.
- `D02` mapear permissoes minimas por papel.
- `D03` adicionar guard/utilitario de permissao na API.
- `D04` restringir publicar template a `Admin` e `Editor`.
- `D05` restringir impressao teste e consulta de auditoria conforme papel.
- `D06` refletir sessao autenticada no web app com guard central.

### Faixa E - Assets

- `E01` estabilizar upload local com metadados e URL consistente.
- `E02` criar listagem de assets do tenant.
- `E03` permitir escolher asset ja enviado no editor, sem subir novamente.
- `E04` preparar abstração de storage para evolucao futura.

### Faixa F - Impressoras e perfis

- `F01` completar CRUD de impressoras.
- `F02` completar CRUD de perfis de impressao.
- `F03` adicionar campos minimos de perfil: largura, altura, dpi efetivo ou opcoes.
- `F04` permitir selecionar impressora/perfil no fluxo de impressao teste a partir do editor.

### Faixa G - Jobs e impressao teste

- `G01` fazer o editor disparar impressao teste com selecao explicita de impressora/perfil.
- `G02` enriquecer `payloadJson` e `resultJson` do job.
- `G03` registrar eventos `created`, `queued`, `completed`, `failed`.
- `G04` criar detalhe basico do job na web.
- `G05` preparar contrato de handoff para `apps/worker`.

### Faixa H - Auditoria

- `H01` garantir log em criacao, edicao, publicacao e impressao teste.
- `H02` adicionar auditoria para upload de asset e cadastro de impressora/perfil.
- `H03` exibir filtros basicos por entidade/acao/data.

### Faixa I - Infra e operacao

- `I01` consolidar `pnpm dev` com watch estavel no monorepo.
- `I02` manter `pnpm db:migrate` nao interativo e confiavel para ambiente local.
- `I03` validar bootstrap da API com `.env` do monorepo.
- `I04` documentar fluxo local: subir infra, migrar, gerar client, rodar apps.
- `I05` preparar worker para fila sem ainda assumir fluxo completo.

## Ordem ideal de execucao

### Etapa 1 - Estabilizacao da fundacao

- `I01`
- `I02`
- `I03`
- `D01`
- `D02`

### Etapa 2 - Templates e round-trip

- `A01`
- `A02`
- `C01`
- `C02`
- `C05`

### Etapa 3 - Editor funcional do Marco 1

- `B01`
- `B02`
- `B03`
- `B04`
- `B05`
- `B06`
- `B07`

### Etapa 4 - Assets

- `E01`
- `E02`
- `E03`
- `E04`

### Etapa 5 - Impressoras, perfis e impressao teste

- `F01`
- `F02`
- `F03`
- `F04`
- `G01`
- `G02`
- `G03`

### Etapa 6 - Auditoria, permissoes e polimento

- `D03`
- `D04`
- `D05`
- `G04`
- `H01`
- `H02`
- `H03`
- `A04`
- `A05`
- `B08`

## Dependencias entre blocos

- Auth e tenant sao pre-requisito para templates, assets, impressoras, jobs e auditoria.
- Schema JSON validado e pre-requisito para versionamento confiavel.
- Editor funcional depende de store central, renderer e endpoints de template.
- Assets dependem de auth, tenant e API de upload.
- Impressao teste depende de template persistido e de impressora/perfil cadastrados.
- Auditoria depende da consolidacao dos eventos de templates e jobs.
- Worker depende da definicao do contrato de `PrintJob`.

## Dependencias criticas por item

- `A02` depende de `C01`.
- `B05` depende de `A01`.
- `E03` depende de `E02`.
- `F04` depende de `F01` e `F02`.
- `G01` depende de `A02`, `F01` e `F02`.
- `D04` depende de `D03`.
- `H02` depende de `E01`, `F01` e `F02`.

## Definicao de pronto por modulo

### Templates pronto quando

- cria;
- abre;
- salva;
- reabre;
- publica;
- versiona por snapshot.

### Editor pronto quando

- insere elementos;
- move;
- redimensiona;
- altera propriedades;
- salva sem perder layout;
- preview reflete o documento.

### Impressao pronta quando

- impressora e perfil podem ser escolhidos;
- um `PrintJob` e criado;
- eventos ficam registrados;
- historico basico aparece na web.

### Auditoria pronta quando

- os eventos centrais do tenant ficam registrados com usuario, entidade, acao e data.

## Plano recomendado em sprints

### Sprint 1 - Fundacao e estabilidade

- estabilizar `dev` do monorepo;
- endurecer env, migrate e bootstrap;
- criar papeis e permissoes iniciais.

### Sprint 2 - Templates

- consolidar CRUD, versoes e publicacao;
- reforcar round-trip do documento JSON.

### Sprint 3 - Editor parte 1

- canvas, tamanho da etiqueta, texto, linha, retangulo;
- selecao, drag, resize, propriedades.

### Sprint 4 - Editor parte 2 e assets

- codigo de barras;
- imagem;
- biblioteca de assets;
- preview refinado.

### Sprint 5 - Impressao

- CRUD de impressoras;
- CRUD de perfis;
- selecao de perfil;
- impressao teste;
- jobs e eventos.

### Sprint 6 - Auditoria e polimento

- filtros de auditoria;
- endurecimento de permissoes;
- melhoria de UX;
- ajustes finais do Marco 1.

## Proximos passos imediatos

1. estabilizar o ciclo `pnpm dev` do monorepo;
2. concluir selecao de impressora/perfil diretamente a partir do editor;
3. adicionar controle de permissao para publicar e imprimir teste;
4. criar navegador de versoes do template;
5. fechar checklist de aceite do fluxo fim a fim.
