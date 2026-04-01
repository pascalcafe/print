# Editor UX and Print Fidelity

## Objetivo

Evoluir o editor visual do EasyPrint sem trocar a arquitetura central baseada em:

- documento JSON como fonte unica da verdade;
- store central do editor;
- renderer desacoplado da persistencia;
- preview e impressao derivados do mesmo documento.

## Decisoes principais

### 1. Tipografia expandida no schema

Os elementos de texto passaram a suportar:

- `fontFamily`
- `fontSize`
- `fontWeight`
- `fontStyle`
- `textDecoration`
- `lineHeight`
- `align`
- `color`

Essas propriedades continuam persistidas no JSON do template, o que preserva fidelidade entre edicao, preview e impressao.

### 2. Renderer unico do documento

Foi introduzida uma camada de renderizacao reutilizavel para o documento da etiqueta no frontend.

Objetivo:

- evitar divergencia entre canvas, preview e impressao;
- reaproveitar a mesma logica visual para elementos;
- manter coesao tipografica e de posicionamento.

### 3. Canvas com viewport propria

O canvas passou a ter:

- viewport com scroll proprio;
- pan com `Space + arrastar`;
- zoom por `Ctrl/Cmd + roda`;
- melhor preservacao de contexto visual ao alterar zoom.

### 4. Edicao de texto mais natural

O editor passou a suportar:

- edicao inline por duplo clique em texto estatico;
- campo multilinha no painel de propriedades;
- ajuste da altura da caixa de texto com base no conteudo;
- controles tipograficos mais proximos de ferramentas de escritorio.

### 5. Impressao isolada

O preview passou a separar claramente:

- chrome da interface;
- area imprimivel da etiqueta.

Em modo de impressao, apenas a area marcada como `data-print-root` fica visivel.

## Proximos refinamentos naturais

- handle dedicado para largura de texto;
- presets tipograficos por tenant;
- kerning e espacamento de letra;
- snapping visual por guias entre elementos;
- exportacao dedicada para PDF/impressao em alta fidelidade.
