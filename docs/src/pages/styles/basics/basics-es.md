# @material-ui/styles

<p class="description">Puede utilizar la solución de estilo de Material-UI en su aplicación, tanto si está usando o no componentes de Material-UI.</p>

Material UI busca proveer fundamentos sólidos para la construcción de UIs de manera dinámica. Material UI busca proveer fundamentos sólidos para la construcción de UIs de manera dinámica. You can use it, but you don't have to, since Material-UI is also [interoperable with](/guides/interoperability/) all the other major styling solutions.

## ¿Por qué usar la solución de estilo de Material-UI?

In previous versions, Material-UI has used LESS, then a custom inline-style solution to write the component styles, but these approaches have proven to be limited. [A *CSS-in-JS* solution](https://github.com/oliviertassinari/a-journey-toward-better-style) overcomes many of those limitations, and **unlocks many great features** (theme nesting, dynamic styles, self-support, etc.).

Material-UI's styling solution is inspired by many other styling libraries such as [styled-components](https://www.styled-components.com/) and [emotion](https://emotion.sh/).

- Podes esperar [las mismas ventajas](https://www.styled-components.com/docs/basics#motivation) que las que tenían los componentes con estilos.

<!-- #default-branch-switch -->

- 🚀 Es [ultra rápida](https://github.com/mui-org/material-ui/blob/next/packages/material-ui-benchmark/README.md#material-uistyles).
- 🧩 Es extensible a través de una [plugin](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.
- ⚡ Utiliza [JSS](https://github.com/cssinjs/jss) en su núcleo – un compilador de JavaScript a CSS de [alto rendimiento](https://github.com/cssinjs/jss/blob/master/docs/performance.md) que funciona en tiempo de ejecución y por el lado del servidor.
- 📦 Less than [15 KB comprimido](https://bundlephobia.com/result?p=@material-ui/styles); and no bundle size increase if used alongside Material-UI.

## Instalación

> `@material-ui/styles` es reexportado como `@material-ui/core/styles` - sólo necesitas instalarlo si deseas usarlo independientemente de Material-UI.

Para instalarlo y guardarlo en las dependencias de tu ` package.json `, ejecuta:

```sh
// with npm
npm install @material-ui/styles

// with yarn
yarn add @material-ui/styles
```

## Primeros pasos

There are 3 possible APIs you can use to generate and apply styles, however they all share the same underlying logic.

### Hook API

```jsx
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

{{"demo": "pages/styles/basics/Hook.js"}}

### API de Styled components

Note: this only applies to the calling syntax – style definitions still use a JSS object. You can also [change this behavior](/styles/advanced/#string-templates), with some limitations.

```jsx
import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

{{"demo": "pages/styles/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
```

{{"demo": "pages/styles/basics/HigherOrderComponent.js"}}

## Nesting selectors

You can nest selectors to target elements inside the current class or component. The following example uses the Hook API, but it works the same way with the other APIs.

```js
const useStyles = makeStyles({
  root: {
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue'
      }
    }
  },
});
```

{{"demo": "pages/styles/basics/NestedStylesHook.js", "defaultCodeOpen": false}}

## Adapting based on props

You can pass a function to `makeStyles` ("interpolation") in order to adapt the generated value based on the component's props. The function can be provided at the style rule level, or at the CSS property level:

```jsx
const useStyles = makeStyles({
  // style rule
  foo: props => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS property
    color: props => props.color,
  },
});

function MyComponent() {
  // Simulated props for the purpose of the example
  const props = { backgroundColor: 'black', color: 'white' };
  // Pass the props as the first argument of useStyles()
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}
```

This button component has a color property that changes its color:

### Adapting the hook API

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### Adapting the styled components API

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### Adapting the higher-order component API

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

### Stress test

In the following stress test, you can update the *theme color* and the *background-color property* live:

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## @material-ui/core/styles vs @material-ui/styles

Material-UI's styles are powered by the [@material-ui/styles](https://www.npmjs.com/package/@material-ui/styles) package, (built with JSS). This solution is [isolated](https://bundlephobia.com/result?p=@material-ui/styles). It doesn't have a default theme, and can be used to style React applications that are not using Material-UI components.

To reduce the number of packages to install when using Material-UI, and to simplify the imports, `@material-ui/styles` modules are re-exported from `@material-ui/core/styles`.

To remove the need to systematically supply a theme, the default Material-UI theme is applied to the re-exported `makeStyles`, `styled`, `withTheme`, `useTheme`, and `withStyles` modules.

For example:

```js
// Re-export with a default theme
import { makeStyles } from '@material-ui/core/styles';

// Original module with no default theme
import { makeStyles } from '@material-ui/styles';
```
