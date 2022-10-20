# Spacing

<p class="description">簡単に要素のmarginとpaddingをレスポンシブに変更するためのユーティリティクラスです。</p>

## 表記

スペースユーティリティは、簡易マージンとパディングプロップをマージンとパディングのCSS宣言に変換します。 プロップには、`{property}{sides}`という形式で名前が付けられます。 プロップには、`{property}{sides}`という形式で名前が付けられます。

Where *property* is one of:

- `m` - for classes that set *margin*
- `p` - for classes that set *padding*

Where *sides* is one of:

- `t` - for classes that set *margin-top* or *padding-top*
- `b` - for classes that set *margin-bottom* or *padding-bottom*
- `l` - for classes that set *margin-left* or *padding-left*
- `r` - for classes that set *margin-right* or *padding-right*
- `x` - for classes that set both **-left* and **-right*
- `y` - for classes that set both **-top* and **-bottom*
- (指定なし) - HTML要素の四方向のmarginもしくはpaddingを設定するためのクラス

## 変形

入力内容とTheme (テーマ) 設定によって、以下の様に間隔の変更ができます。

- input: `number` & theme: `number`: the property is multiplied by the theme value.

```jsx
const theme = {
  spacing: 8,
}

<Box m={-2} /> // margin: -16px;
<Box m={0} /> // margin: 0px;
<Box m={0.5} /> // margin: 4px;
<Box m={2} /> // margin: 16px;
```

- input: `number` & theme: `array`: the property is value is used as the array index.

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box m={-2} /> // margin: -3px;
<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 3px;
```

- input: `number` & theme: `function`: the function is called with the property value.

```jsx
const theme = {
  spacing: value => value ** 2,
}

<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 4px;
```

- input: `string`: the property is passed as raw CSS value.

```jsx
<Box m="2rem" /> // margin: 2rem;
<Box mx="auto" /> // margin-left: auto; margin-right: auto;
```

## 例

{{"demo": "pages/system/spacing/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box p={1}>…
<Box m={1}>…
<Box p={2}>…
```

## 水平方向に中央寄せする

{{"demo": "pages/system/spacing/HorizontalCentering.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box mx="auto">…
```

## API

```js
import { spacing } from '@material-ui/system';
```

| Import name | Prop | CSS property                    | Theme key                                                        |
|:----------- |:---- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing`   | `m`  | `margin`                        | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mt` | `margin-top`                    | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mr` | `margin-right`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mb` | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `ml` | `margin-left`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mx` | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `my` | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `p`  | `padding`                       | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pt` | `padding-top`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pr` | `padding-right`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pb` | `padding-bottom`                | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pl` | `padding-left`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `px` | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `py` | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |

_もしPropsの略称が難しいと感じた場合、正称を使用することもできます。_

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```

```diff
-<Box px={2} />
+<Box paddingX={2} />
```
