# Dimensionierung

<p class="description">Easily make an element as wide or as tall (relative to its parent) with the width and height utilities.</p>

## Unterstützte Werte

Die Größenstilfunktionen unterstützen verschiedene Eigenschafteneingabetypen:

{{"demo": "pages/system/sizing/Values.js", "defaultCodeOpen": false}}

```jsx
<Box width={1/4}> // Números em [0,1] são multiplicados por 100 e convertido em % valores.
<Box width={300}> // Números são convertidos em valores de pixel.
<Box width="75%"> // Valores de string são usados como CSS bruto.
<Box width={1}>   // 100%
```

## Breite

{{"demo": "pages/system/sizing/Width.js", "defaultCodeOpen": false}}

```jsx
<Box width="25%">…
<Box width="50%">…
<Box width="75%">…
<Box width="100%">…
<Box width="auto">…
```

## Höhe

{{"demo": "pages/system/sizing/Height.js", "defaultCodeOpen": false}}

```jsx
<Box height="25%">…
<Box height="50%">…
<Box height="75%">…
<Box height="100%">…
```

## API

```js
import { sizing } from '@material-ui/system';
```

| Inportname  | Eigenschaften | CSS-Eigenschaft | Theme-Schlüssel |
|:----------- |:------------- |:--------------- |:--------------- |
| `width`     | `width`       | `width`         | none            |
| `maxWidth`  | `maxWidth`    | `max-width`     | none            |
| `minWidth`  | `minWidth`    | `min-width`     | none            |
| `height`    | `height`      | `height`        | none            |
| `maxHeight` | `maxHeight`   | `max-height`    | none            |
| `minHeight` | `minHeight`   | `min-height`    | none            |
| `boxSizing` | `boxSizing`   | `box-sizing`    | none            |
