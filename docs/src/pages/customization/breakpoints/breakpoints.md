# Breakpoints

<p class="description">API that enables the use of breakpoints in a wide variety of contexts.</p>

For optimal user experience, material design interfaces need to be able to adapt their layout at various breakpoints.
Material-UI uses a **simplified** implementation of the original [specification](https://material.io/design/layout/responsive-layout-grid.html#breakpoints).

The breakpoints are used internally in various components to make them responsive,
but you can also take advantage of them
for controlling the layout of your application through the [Grid](/components/grid/) and
[Hidden](/components/hidden/) components.

## Default breakpoints

Each breakpoint (a key) matches with a _fixed_ screen width (a value):

- **xs,** extra-small: 0px
- **sm,** small: 600px
- **md,** medium: 960px
- **lg,** large: 1280px
- **xl,** extra-large: 1920px

These values can be [customized](#custom-breakpoints).

## CSS Media Queries

CSS media queries are the idiomatic approach to make your UI responsive.
The theme provides four styles helpers to do so:

- [theme.breakpoints.up(key)](#theme-breakpoints-up-key-media-query)
- [theme.breakpoints.down(key)](#theme-breakpoints-down-key-media-query)
- [theme.breakpoints.only(key)](#theme-breakpoints-only-key-media-query)
- [theme.breakpoints.between(start, end)](#theme-breakpoints-between-start-end-media-query)

In the following demo, we change the background color (red, blue & green) based on the screen width.

```jsx
const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
});
```

{{"demo": "pages/customization/breakpoints/MediaQuery.js"}}

## JavaScript Media Queries

Sometimes, using CSS isn't enough.
You might want to change the React rendering tree based on the breakpoint value, in JavaScript.

### useMediaQuery hook

You can learn more on the [useMediaQuery](/components/use-media-query/) page.

### withWidth()

> ⚠️ This higher-order component will be deprecated for the [useMediaQuery](/components/use-media-query/) hook.

```jsx
import withWidth from '@material-ui/core/withWidth';

function MyComponent(props) {
  return <div>{`Current width: ${props.width}`}</div>;
}

export default withWidth()(MyComponent);
```

In the following demo, we change the rendered DOM element (_em_, <u>u</u>, ~~del~~ & span) based on the screen width.

{{"demo": "pages/customization/breakpoints/WithWidth.js"}}

## Custom breakpoints

You define your project's breakpoints in the `theme.breakpoints` section of your theme.

- [`theme.breakpoints.values`](/customization/default-theme/?expand-path=$.breakpoints.values): Default to the [above values](#default-breakpoints). The keys are your screen names, and the values are the min-width where that breakpoint should start.
- `theme.breakpoints.unit`: Default to `px`. The unit used for the breakpoint's values.
- `theme.breakpoints.step`: Default to 5 (`0.05px`). The increment used to implement exclusive breakpoints.

If you change the default breakpoints's values, you need to provide them all:

```jsx
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
```

Feel free to have as few or as many breakpoints as you want, naming them in whatever way you'd prefer for your project.

```js
const theme = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
```

## API

### `theme.breakpoints.up(key) => media query`

#### Arguments

1. `key` (_String_ | _Number_): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.

#### Returns

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths greater than the screen size given by the breakpoint key (inclusive).

#### Examples

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞)
    //       [960px, ∞)
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

#### Arguments

1. `key` (_String_ | _Number_): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.

#### Returns

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths less than the screen size given by the breakpoint key (exclusive).

#### Examples

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md)
    //       [0, 960px)
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

#### Arguments

1. `key` (_String_): A breakpoint key (`xs`, `sm`, etc.).

#### Returns

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths starting from the screen size given by the breakpoint key (inclusive) and stopping at the screen size given by the next breakpoint key (exclusive).

#### Examples

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1)
    //       [md, lg)
    //       [960px, 1280px)
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### Arguments

1. `start` (_String_): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.
2. `end` (_String_): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.

#### Returns

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths greater than the screen size given by the breakpoint key in the first argument (inclusive) and less than the screen size given by the breakpoint key in the second argument (exclusive).

#### Examples

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md)
    //       [600px, 960px)
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `withWidth([options]) => higher-order component`

Inject a `width` prop.
It does not modify the component passed to it; instead, it returns a new component.
This `width` breakpoint prop matches the current screen width.
It can be one of the following breakpoints:

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

Some implementation details that might be interesting to being aware of:

- It forwards _non React static_ properties so this HOC is more "transparent".
  For instance, it can be used to defined a `getInitialProps()` static method (next.js).

#### Arguments

1. `options` (_Object_ [optional]):

- `options.withTheme` (_Boolean_ [optional]): Defaults to `false`. Provide the `theme` object to the component as a prop.
- `options.noSSR` (_Boolean_ [optional]): Defaults to `false`.
  In order to perform the server-side rendering reconciliation, it needs to render twice.
  A first time with nothing and a second time with the children.
  This double pass rendering cycle comes with a drawback. The UI might blink.
  You can set this flag to `true` if you are not doing server-side rendering.
- `options.initialWidth` (_Breakpoint_ [optional]):
  As `window.innerWidth` is unavailable on the server,
  we default to rendering an empty component during the first mount.
  You might want to use a heuristic to approximate
  the screen width of the client browser screen width.
  For instance, you could be using the user-agent or the [client-hints](https://caniuse.com/#search=client%20hint).
  we also can set the initial width globally using [`custom props`](/customization/globals/#default-props) in the theme.
  In order to set the initialWidth we need to pass a custom prop with this shape:

```js
const theme = createMuiTheme({
  components: {
    // withWidth component ⚛️
    MuiWithWidth: {
      defaultProps: {
        // Initial width prop
        initialWidth: 'lg', // Breakpoint being globally set 🌎!
      },
    },
  },
});
```

- `options.resizeInterval` (_Number_ [optional]): Defaults to 166, corresponds to 10 frames at 60 Hz. Number of milliseconds to wait before responding to a screen resize event.

#### Returns

`higher-order component`: Should be used to wrap a component.

#### Examples

```jsx
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

function MyComponent(props) {
  if (isWidthUp('sm', props.width)) {
    return <span />;
  }

  return <div />;
}

export default withWidth()(MyComponent);
```

## Default values

You can explore the default values of the breakpoints using [the theme explorer](/customization/default-theme/?expand-path=$.breakpoints) or by opening the dev tools console on this page (`window.theme.breakpoints`).
