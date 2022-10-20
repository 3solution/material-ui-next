# Espaciado

<p class="description">Una amplia gama de tipos de utilidades de relleno y márgenes receptivos cortos para modificar la apariencia de un elemento.</p>

## Notación

La utilidad espacial convierte el abreviado del margen corto y los accesorios de relleno en márgenes y declaraciones CSS. Los props se nombran usando el formato `{property}{sides}`.

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
- en blanco - para las clases que establecen un margen o un relleno en los 4 lados del elemento

## Transformación

Dependiendo del input y la configuración del tema, se aplica la siguiente transformación:

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

## Ejemplo

{{"demo": "pages/system/spacing/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box p={1}>…
<Box m={1}>…
<Box p={2}>…
```

## Centrado Horizontal

{{"demo": "pages/system/spacing/HorizontalCentering.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box mx="auto">…
```

## API

```js
import { spacing } from '@material-ui/system';
```

| Nombre del import | Prop | Propiedad CSS                   | Clave del tema                                                   |
|:----------------- |:---- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing`         | `m`  | `margin`                        | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mt` | `margin-top`                    | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mr` | `margin-right`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mb` | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `ml` | `margin-left`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mx` | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `my` | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `p`  | `padding`                       | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pt` | `padding-top`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pr` | `padding-right`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pb` | `padding-bottom`                | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pl` | `padding-left`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `px` | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `py` | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |

_Algunas personas encuentran confusión con la abreviatura del prop, puedes usar la versión completa si lo prefieres:_

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```

```diff
-<Box px={2} />
+<Box paddingX={2} />
```
