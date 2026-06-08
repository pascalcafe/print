# Editor Shell Refactor

## Objetivo

Refatorar a tela principal do editor do EasyPrint para aproximar a ergonomia de um editor tecnico leve, usando o Labeljoy como benchmark de:

- foco no canvas
- barra superior util
- sidebars discretos
- baixa poluicao visual
- organizacao por grupos de acao

Sem copiar a interface de referencia.

## Decisoes principais

### 1. Topbar mais forte

O editor passou a usar uma topbar agrupada como estrutura principal da operacao.

Grupos principais:

- Documento
- Inserir
- Layout
- Tipografia contextual
- Visualizacao

Isso reduz a dependencia de sidebars para acoes frequentes e deixa o canvas mais protagonista.

### 2. Canvas-first

O corpo do editor foi reorganizado para dar mais espaco ao documento.

- o canvas ganhou um frame central proprio
- o topo do stage mostra somente contexto tecnico essencial
- a navegacao visual ficou mais limpa

### 3. Sidebars mais discretas

Biblioteca e inspector continuam existindo, mas perderam protagonismo visual.

- menor peso cromatico
- menos cara de card pesado
- largura menor
- possibilidade de ocultar cada painel

### 4. Status bar mais enxuta

A barra inferior deixou de concentrar comandos de edicao.

Agora ela atua como leitura tecnica:

- status
- zoom
- grade/snap
- unidade
- coordenadas da selecao
- estado de salvamento

### 5. Estrutura preparada para evolucao

O shell agora separa melhor:

- topbar operacional
- stage central
- biblioteca
- inspector
- status bar

Isso facilita evoluir o editor com novas ferramentas sem voltar a sobrecarregar as laterais.

## Inspiracao no benchmark

As decisoes inspiradas pelo Labeljoy foram:

- mais area util para o documento
- ferramenta principal concentrada acima
- sensacao de software tecnico leve
- menos blocos pesados competindo com o canvas
- leitura mais imediata do estado do editor
