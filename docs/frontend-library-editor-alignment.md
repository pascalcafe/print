# Frontend Library And Editor Alignment

## Benchmark direction

O EasyPrint passou a usar o Labeljoy como benchmark funcional de:

- foco no canvas
- software tecnico leve
- biblioteca de modelos como entrada forte
- relacao clara entre modelo pronto e edicao livre
- preview como base oficial da impressao

Sem copiar a interface, a refatoracao consolidou a mesma ideia de produto:

- biblioteca para operacao rapida
- editor para modelagem e refinamento
- uma unica base de renderizacao entre preview e impressao

## O que mudou

### Biblioteca

- a home deixou de parecer uma galeria solta e passou a funcionar como uma mesa operacional
- categorias ganharam papel de navegacao primaria
- cada card reforca dois caminhos:
  - preencher e imprimir
  - abrir no editor

### Modal operacional

- o modal comunica melhor o fluxo rapido
- campos automáticos continuam travados por padrao
- o preview do modal usa o mesmo renderer do preview oficial
- a acao principal de impressao ficou mais clara

### Editor

- topbar mais forte
- sidebars mais discretas
- canvas como protagonista
- linguagem visual alinhada com a biblioteca e o modal

## Regra oficial de renderizacao

O preview funcional e a impressao usam a mesma superficie compartilhada:

- `LabelPreviewSurface`

Ela e reutilizada em:

- editor
- pagina de preview
- modal operacional
- folha de impressao

Isso reduz divergencia entre:

- o que o usuario ve
- o que o usuario revisa
- o que o navegador imprime
