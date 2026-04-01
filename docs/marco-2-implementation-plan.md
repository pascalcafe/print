# Marco 2 - Plano de Implementacao

## Objetivo

Transformar o EasyPrint de uma fundacao funcional em uma base operacional mais confiavel, reforcando:

- produtividade do editor visual;
- governanca de templates e versoes;
- previsibilidade de preview e dados dinamicos;
- confiabilidade do ciclo de impressao;
- visibilidade administrativa e rastreabilidade.

## Direcao do Marco 2

O Marco 2 nao abre o produto em muitas frentes novas. Ele amadurece o nucleo que ja existe no Marco 1:

1. editor visual mais produtivo e seguro;
2. versionamento profissional de templates;
3. preview e dados dinamicos mais uteis;
4. operacao de print jobs mais clara;
5. painel administrativo mais consultivo;
6. governanca e permissoes mais granulares.

## Status atual do inicio do Marco 2

O segundo corte do Marco 2 ja foi iniciado e esta compilando com sucesso.

### Ja implementado neste corte atual

#### Editor

- rotacao basica de elementos;
- duplicacao de elemento selecionado;
- bloqueio e desbloqueio de elemento;
- ordenacao de camada para frente, tras, topo e fundo;
- alinhamento basico em relacao ao canvas;
- atalhos de teclado para salvar, desfazer e refazer;
- autosave remoto por debounce para templates persistidos;
- rascunho local com recuperacao explicita ao reabrir o editor;
- suporte visual e funcional a QR Code;
- exibicao visual de elemento bloqueado;
- resumo tecnico da selecao com estado de rotacao e lock.
- painel de `dataSchema` no editor;
- binding dinamico por seletor;
- aviso de campos obrigatorios sem preview completo.

#### Versionamento

- permissao dedicada para rollback de template;
- endpoint de rollback por versao;
- restauracao por snapshot com nova versao draft;
- auditoria de rollback;
- historico de versoes exibido no painel lateral do editor.
- criacao formal de nova versao draft;
- comparacao basica por resumo entre versoes;
- controle de ultima versao publicada no template;
- publicacao mais controlada entre draft, published e archived.

#### Estrutura de dados dinamicos

- `TemplateDataField` preparado para `fallbackValue`;
- `TemplateDataField` preparado para `formatType`;
- `TemplateDataField` preparado para `formatConfig`;
- schema compartilhado atualizado para validacao desses campos.
- `TemplateDataField` preparado para `description`;
- canvas e preview lendo valores simulados com fallback e formatacao.

#### Preview

- preview desacoplado atualizado para respeitar rotacao e QR Code;
- renderer rapido do painel lateral preparado para acompanhar a evolucao do editor.
- renderer compartilhado de texto dinamico entre canvas e preview.

#### Jobs operacionais

- reimpressao;
- retry;
- cancelamento;
- detalhe de job;
- filtros por status e busca;
- vinculo entre job e versao do template;
- falha simulada para validacao operacional.

#### Painel administrativo

- busca e filtros em templates;
- busca e filtros em jobs;
- busca e filtros em impressoras;
- ativacao e desativacao de impressoras;
- status operacionais mais claros.

## Escopo proposto por modulo

### Modulo 1 - Evolucao do Editor

Entregas:

- rotacao refinada;
- duplicar elemento;
- bloquear e desbloquear;
- ordenacao de camadas;
- alinhamento basico;
- undo/redo robusto;
- autosave confiavel;
- zoom refinado;
- grid e snap maduros;
- suporte a QR Code.

Situacao atual:

- iniciado;
- boa parte da produtividade ja entregue;
- ainda faltam snap/grid mais maduros, polimento de precisao e refinamento adicional de undo/redo.

### Modulo 2 - Versionamento Profissional

Entregas:

- lista de versoes;
- nova versao formal;
- publicacao controlada;
- rollback;
- comparacao basica;
- status mais claros.

Situacao atual:

- iniciado;
- rollback basico entregue;
- comparacao basica, nova versao formal e fluxo publish/draft ja iniciados;
- ainda faltam comparacoes mais detalhadas e UX mais rica para historico.

### Modulo 3 - Data Binding e Preview Melhorado

Entregas:

- painel de campos dinamicos;
- validacao de obrigatoriedade;
- preview com dados simulados;
- fallback configuravel;
- formatacao de texto, data e moeda.

Situacao atual:

- preparado no contrato;
- iniciado na interface e no renderer;
- ainda faltam validacoes mais profundas e preview com dados externos mais sofisticados.

### Modulo 4 - Print Jobs Operacionais

Entregas:

- reimpressao;
- retry;
- cancelamento;
- historico detalhado;
- eventos de job mais ricos;
- filtros por status.

Situacao atual:

- iniciado;
- reimpressao, retry, cancelamento, filtros e detalhe de job entregues;
- ainda faltam worker real, fila e status assincronos mais completos.

### Modulo 5 - Painel Administrativo

Entregas:

- busca de templates;
- filtros por status;
- listagem de jobs com mais detalhe;
- listagem de impressoras mais clara;
- status visuais melhores.

Situacao atual:

- iniciado;
- templates, jobs, impressoras e auditoria com filtros e leitura mais clara;
- ainda faltam refinamentos adicionais de perfis e dashboards sinteticos.

### Modulo 6 - Auditoria e Governanca

Entregas:

- logs mais granulares;
- rastreabilidade de rollback;
- rastreabilidade de reimpressao e cancelamento;
- reforco de acoes criticas.

Situacao atual:

- iniciado;
- rollback ja entra em auditoria.
- eventos criticos de print job e status de impressora entram melhor na trilha.

### Modulo 7 - Permissoes Refinadas

Entregas:

- granularidade maior em publicacao, rollback, impressao, reimpressao, cancelamento e auditoria.

Situacao atual:

- iniciado;
- `template.rollback` ja foi introduzida;
- `template.version.create`, `print-job.reprint`, `print-job.retry` e `print-job.cancel` foram introduzidas;
- ainda faltam refinamentos adicionais por perfil e administracao de usuarios.

### Modulo 8 - Refinamento de UX

Entregas:

- feedback de salvamento;
- feedback de erro;
- mensagens mais objetivas;
- consistencia visual maior;
- sensacao de ferramenta mais precisa.

Situacao atual:

- iniciado de forma indireta no editor;
- polish geral ainda pendente.

## Ordem recomendada de execucao

1. fechar produtividade do editor com undo/redo, autosave, QR Code e snap/grid refinados;
2. consolidar versoes com comparacao, notas, status e fluxo formal de nova versao;
3. evoluir data binding e preview com dados simulados e formatacao;
4. amadurecer print jobs com retry, cancelamento e reimpressao;
5. fechar painel administrativo, filtros, busca e governanca operacional.

## Criterios de aceite macro do Marco 2

O Marco 2 so deve ser considerado concluido quando:

- o editor estiver claramente mais rapido e seguro do que no Marco 1;
- rollback e historico de versoes fizerem parte do fluxo normal de template;
- preview suportar dados simulados e fallback coerente;
- print jobs tiverem operacao real de retry, reimpressao e cancelamento;
- painis administrativos permitirem busca, filtro e leitura operacional;
- logs e permissoes estiverem mais proximos de uso corporativo recorrente.

## Validacao atual

O corte atual do Marco 2 foi validado com:

- `pnpm typecheck`
- `pnpm build`

Ambos executados com sucesso apos as alteracoes mais recentes.
