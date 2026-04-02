# Model Library and Quick Print Flow

## Objetivo

Transformar a tela inicial do EasyPrint em uma biblioteca operacional de modelos, sem perder o acesso ao editor visual.

## Decisoes principais

### 1. Categorias do modelo

Os modelos passaram a ser organizados por:

- `doces`
- `salgados`
- `bebidas`
- `refeicao`

A categoria pode ser persistida em `template.metadata.category` no editor.

Quando a categoria ainda nao existe no metadata, a biblioteca faz inferencia pelo nome do template para manter compatibilidade com modelos antigos.

### 2. Fluxo rapido de impressao

Ao selecionar um modelo na biblioteca, o sistema abre um modal operacional com:

- nome do produto
- responsavel preenchido pela categoria
- data de fabricacao com data local atual
- data de validade calculada automaticamente como fabricacao + 2 dias
- quantidade de etiquetas

O modal tambem mostra um preview do documento usando a mesma superficie compartilhada do editor e da pagina de preview.

### 3. Edicao controlada

Os campos abaixo iniciam bloqueados e podem ser liberados individualmente por um controle discreto de desbloqueio:

- responsavel
- data de fabricacao
- data de validade

Isso preserva velocidade operacional sem impedir ajustes manuais quando necessarios.

### 4. Estrutura do modal

O modal de impressao rapida foi redesenhado em duas areas bem definidas:

- formulario operacional no lado esquerdo
- preview da etiqueta no lado direito

O formulario usa corpo rolavel e barra de acoes fixa na base, para manter o CTA `IMPRIMIR` sempre visivel.
O preview usa escala adaptativa, fundo neutro e contencao propria, evitando cortes e overflow visual.

### 5. Fluxo de impressao local e PrintJob

Ao clicar em `IMPRIMIR`, o frontend:

- prepara uma execucao de impressao com `template + payload + quantidade`
- cria um `PrintJob` real no backend antes de abrir o dialogo do navegador
- persiste `copies`, `source`, `payloadJson` e `resolvedDataJson`
- registra eventos iniciais do job (`job.created`, `job.queued` e `job.started`)
- renderiza uma folha isolada apenas com a etiqueta
- repete a etiqueta conforme a quantidade solicitada
- aplica `window.print()` usando somente a area imprimivel
- registra o fechamento do dialogo do navegador como evento complementar do job

Nada do chrome da interface entra na impressao.
Como o navegador nao confirma a impressao fisica na impressora, o fluxo registra o despacho local de forma honesta: o job fica rastreavel e pronto para futura evolucao com agente local ou confirmacao operacional mais forte.

### 5.1 Base unica de preview e impressao

A impressao nao usa o card reduzido de preview do modal como fonte direta.

Em vez disso, o EasyPrint passou a compartilhar a mesma superficie oficial de renderizacao entre:

- preview do editor
- pagina de preview do template
- preview do modal operacional
- folha imprimivel do navegador

Essa superficie comum:

- reaproveita a mesma base visual da etiqueta
- recebe o `template` e o `previewPayload` resolvido
- elimina divergencia entre preview e impressao
- mantem a etiqueta inteira dentro de uma caixa imprimivel isolada
- mostra apenas a etiqueta completa no `@media print`

### 6. Payload de impressao

O payload da impressao rapida combina:

- chaves canonicas do fluxo operacional
- aliases comuns em portugues e ingles
- mapeamento heuristico para `dataSchema` do template

Com isso, modelos mais antigos continuam funcionando mesmo sem convencao perfeita de nomes.

### 7. Rota operacional

O frontend tenta usar:

1. primeira impressora ativa
2. primeiro perfil compativel

Mesmo quando a execucao ainda depende do navegador, o EasyPrint ja registra o job com contexto suficiente para historico, auditoria e futura integracao com agente/local.

## Endpoints envolvidos

- `POST /api/print-jobs`
- `POST /api/print-jobs/:id/events`
- `GET /api/print-jobs`
- `GET /api/print-jobs/:id`
