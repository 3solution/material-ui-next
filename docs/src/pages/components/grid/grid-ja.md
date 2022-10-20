---
title: React Grid component
components: Grid
githubLabel: 'component: Grid'
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grid

<p class="description">Material Designのレスポンシブレイアウトグリッドは、画面サイズと向きに適応し、レイアウト間の一貫性を保証します。</p>

[grid](https://material.io/design/layout/responsive-layout-grid.html) は、レイアウト間の視覚的な一貫性を実現しながら、さまざまなデザインでの柔軟性を可能にします。 [grid](https://material.io/design/layout/responsive-layout-grid.html) は、レイアウト間の視覚的な一貫性を実現しながら、さまざまなデザインでの柔軟性を可能にします。 Material DesignのレスポンシブUIは12列のグリッドレイアウトに基づいています。 Material DesignのレスポンシブUIは12列のグリッドレイアウトに基づいています。

{{"component": "modules/components/ComponentLinkHeader.js"}}

> ⚠️ The `Grid` component shouldn't be confused with a data grid; it is closer to a layout grid. For a data grid head to [the `DataGrid` component](/components/data-grid/).

## 仕組み

グリッドシステムは `Grid` コンポーネントで実装されています。

- 高い柔軟性のために [CSSのFlexible Boxモジュール](https://www.w3.org/TR/css-flexbox-1/) を使用します。
- レイアウトには* containers * と * items*の2種類あります 。
- アイテムの幅はパーセンテージで設定されているので、それらは常に親要素に対して流動的でサイズが決まっています。
- アイテムには、個々のアイテム間の間隔を空けるための余白があります。
- xs、sm、md、lg、およびxlの5つのグリッドブレークポイントがあります。
- Integer values can be given to each breakpoint, indicating how many of the 12 available columns are occupied by the component when the viewport width satisfies the [breakpoint contraints](/customization/breakpoints/#default-breakpoints).

**flexboxに不慣れ**な場合、 [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) を読むことをおすすめします。

## Spacing

レスポンシブグリッドは、列幅ではなく、一貫した間隔幅に焦点を当てています。 材料設計の余白と列は **8px** の四角いベースライングリッドに従います。 The `spacing` prop value is an integer between 0 and 10 inclusive. デフォルトでは、2つの格子項目間の間隔が線形関数に従う： `output(spacing) = spacing * 8px`、例えば `spacing={2}`では16pxに広いギャップを作成します。

この出力変換関数は、[テーマを使う](/customization/spacing/)ことでカスタマイズできます。

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Fluid grids

Fluid gridsでは、コンテンツの尺度とサイズを変更する列を使用します。 流体グリッドのレイアウトでは、ブレークポイントを使用して、レイアウトを大幅に変更する必要があるかどうかを判断できます。

### Basic grid

Column widths are integer values between 1 and 12; they apply at any breakpoint and indicate how many columns are occupied by the component.

A value given to a breakpoint applies to all the other breakpoints wider than it (unless overridden, as you can read later in this page). For example, `xs={12}` sizes a component to occupy the whole viewport width regardless of its size.

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### ブレークポイント付きGrid

一部の列では複数の幅が定義されているため、定義されたブレークポイントでレイアウトが変更されます。 Width values given to larger breakpoints override those given to smaller breakpoints.

For example, `xs={12} sm={6}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is [600 or more pixels](/customization/breakpoints/#default-breakpoints). For smaller viewports, the component fills all 12 available columns.

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## インタラクティブ

以下は、さまざまな設定の視覚的な結果を調べることができるインタラクティブなデモです。

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## 自動レイアウト

自動レイアウトにより、 *items* が使用可能なスペースを均等に共有します。 それはまた、あなたが1つの *item* 幅を設定することができ、他のものはそれの周りに自動的にサイズ変更されることを意味します。

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## 複雑なグリッド

以下のデモは、Material Designには従っていませんが、グリッドを使用して複雑なレイアウトを構築する方法を示しています。

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Nested Grid

`container`プロパティと`item`プロパティは、それぞれ独立したブール値です。 それらは組み合わせることができます。

> Flex ** container ** は、 `flex` または `inline-flex`を持つ要素によって生成されたボックスです。 フレックスコンテナのインフローの子は、flex ** items ** と呼ばれ、flexレイアウトモデルを使用してレイアウトされます。

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

## 制限事項

### Negative margin

項目間の間隔を実装するために使用する負のマージンには1つ制限があります。 項目間の間隔を実装するために使用する負のマージンには1つ制限があります。 負のマージンが `<body>`を超えると水平スクロールが表示されます。 回避策は3つあります。 回避策は3つあります。

1. スペーシング機能を使用し、ユーザ空間でそれを実装していない `spacing ={0}` （デフォルト）。
2. 子に適用された間隔値の少なくとも半分を使用して、親にパディングを適用します。

   ```jsx
   <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
       </Grid>
    </div>
  </body>
   ```

3. `overflow-x: hidden;`を親に追加する

### white-space: nowrap;

フレックスアイテムの初期設定は `min-width：auto`です。 子要素が`white-space: nowrap;`を使っているときに、位置のコンフリクトが起きます。 この問題は、次の場合に発生します:

```jsx
<Grid item xs>
  <Typography noWrap>
```

アイテムがコンテナ内に収まるようにするには、 `min-width：0`を設定する必要があります。 アイテムがコンテナ内に収まるようにするには、 `min-width：0`を設定する必要があります。

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

The `xs`, `sm`, `md`, `lg`, and `xl` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers. If used, these props may have undesirable effects on the height of the `Grid` item elements.

## CSS Grid Layout

Material-UI自体はCSSグリッド機能自体を提供しませんが、以下に示すように、CSSグリッドを使用してページをレイアウトすることは簡単にできます。

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}
