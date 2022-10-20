---
title: React Grid component
components: Grid
githubLabel: 'component: Grid'
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grid

<p class="description">O leiaute responsivo da grade do Material Design se adapta ao tamanho e orientação da tela, garantindo a consistência entre leiautes.</p>

Uma [grade](https://material.io/design/layout/responsive-layout-grid.html) cria consistência visual entre leiautes, enquanto permite flexibilidade em uma ampla variedade de projetos. A UI responsiva do Material Design é baseada em um leiaute de grade com 12 colunas.

{{"component": "modules/components/ComponentLinkHeader.js"}}

> O componente `Grid` não deve ser confundido com um data grid; ele está mais próximo de um layout grid. Para um cabeçalho do data grid para [o componente `DataGrid`](/components/data-grid/).

## Como funciona

O sistema de grade é implementado com o componente `Grid`:

- Ele usa [Box flexível CSS](https://www.w3.org/TR/css-flexbox-1/) para alta flexibilidade.
- Existem dois tipos de leiautes: *contêineres* e *itens*.
- Larguras de itens são definidas em porcentagens, então elas são sempre fluidas e dimensionadas em relação ao elemento pai.
- Itens têm preenchimento para criar o espaçamento entre itens individuais.
- Existem cinco pontos de quebra (breakpoints) na grade: xs, sm, md, lg e xl.
- Integer values can be given to each breakpoint, indicating how many of the 12 available columns are occupied by the component when the viewport width satisfies the [breakpoint contraints](/customization/breakpoints/#default-breakpoints).

Se você é **novo ou não está familiarizado com o flexbox**, nós recomendamos você a ler este [guia do Flexbox CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Espaçamento

A grade responsiva se concentra em larguras de espaçamento consistentes, em vez de largura de coluna. As margens e colunas do Material Design seguem uma grade de linha de base quadrada de **8px**. A propriedade de espaçamento é um inteiro entre 0 e 10. Por padrão, o espaçamento entre dois itens de grade segue uma função linear: `output(spacing) = spacing * 8px`, por exemplo, `spacing={2}` cria um espaçamento de 16px.

Esta função de transformação de saída pode ser customizada [usando o tema](/customization/spacing/).

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Grades fluídas

As grades fluídas usam colunas que dimensionam e redimensionam o conteúdo. O leiaute de uma grade fluída pode usar pontos de quebra para determinar se o leiaute precisa mudar drasticamente.

### Grade básica

Column widths are integer values between 1 and 12; they apply at any breakpoint and indicate how many columns are occupied by the component.

A value given to a breakpoint applies to all the other breakpoints wider than it (unless overridden, as you can read later in this page). For example, `xs={12}` sizes a component to occupy the whole viewport width regardless of its size.

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### Grade com pontos de quebra

Algumas colunas têm várias larguras definidas, fazendo com que o leiaute seja alterado no ponto de interrupção definido. Width values given to larger breakpoints override those given to smaller breakpoints.

For example, `xs={12} sm={6}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is [600 or more pixels](/customization/breakpoints/#default-breakpoints). For smaller viewports, the component fills all 12 available columns.

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## Interativo

Abaixo está uma demonstração interativa que permite explorar os resultados visuais das diferentes configurações:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Leiaute Automático

O leiaute automático faz com que os *items* compartilhem equitativamente o espaço disponível. Isso também significa que você pode definir a largura de um *item* e os outros automaticamente se redimensionarão em torno dele.

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## Grade Complexa

A demonstração a seguir não segue a especificação do Material Design, mas ilustra como a grade pode ser usada para criar leiautes complexos.

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Grade Aninhada

As propriedades `container` e `item` são boleanas e independentes. Elas podem ser combinados.

> Um **container** flex é a caixa gerada por um elemento com uma exibição definida por `flex` ou `inline-flex`. Os filhos em um fluxo de um container flex são chamados de flex **items** e são dispostos usando o modelo de leiaute flex (flex layout).

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

## Limitações

### Margem negativa

Há uma limitação com a margem negativa que usamos para implementar o espaçamento entre itens. Uma barra de rolagem horizontal irá aparecer se uma margem negativa vai além do `<body>`. Existem 3 soluções disponíveis:

1. Não usar o recurso de espaçamento e implementá-lo no espaço do usuário `spacing={0}` (Padrão).
2. Aplicando padding ao pai com pelo menos metade do valor de espaçamento aplicado ao filho:

   ```jsx
   <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
       </Grid>
    </div>
  </body>
   ```

3. Adicionando `overflow-x: hidden;` para o pai.

### white-space: nowrap;

A configuração inicial em itens flexíveis é `min-width: auto`. Isto causa um conflito de posicionamento quando os elementos filhos estão usando `white-space: nowrap`. Você pode enfrentar o problema com:

```jsx
<Grid item xs>
  <Typography noWrap>
```

Para que o item permaneça dentro do contêiner, você precisa definir `min-width: 0`. Para que o item permaneça dentro do contêiner, você precisa definir `min-width: 0`.

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

The `xs`, `sm`, `md`, `lg`, and `xl` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers. If used, these props may have undesirable effects on the height of the `Grid` item elements.

## Leiaute de Grade CSS

Material-UI não fornece nenhuma funcionalidade CSS de Grade, mas como pode ser visto abaixo, você pode facilmente usar leiaute de Grade CSS em suas páginas.

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}
