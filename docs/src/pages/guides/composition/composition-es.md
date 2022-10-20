# Composición

<p class="description">Material-UI intenta hacer que la composición sea lo más fácil como sea posible.</p>

## Envolviendo componentes

Para proporcionar la máxima flexibilidad y rendimiento, necesitamos una forma de conocer la naturaleza de los elementos secundarios que recibe un componente. Para resolver este problema, etiquetamos algunos de los componentes con una propiedad estática `muiName` cuando es necesario.

You may, however, need to wrap a component in order to enhance it, which can conflict with the `muiName` solution. If you wrap a component, verify if that component has this static property set.

If you encounter this issue, you need to use the same tag for your wrapping component that is used with the wrapped component. In addition, you should forward the properties, as the parent component may need to control the wrapped components props.

Let's see an example:

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## Component prop

Material-UI allows you to change the root element that will be rendered via a prop called `component`.

### How does it work?

The custom component will be rendered by Material-UI like this:

```js
return React.createElement(props.component, props)
```

For example, by default a `List` component will render a `<ul>` element. This can be changed by passing a [React component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) to the `component` prop. The following example will render the `List` component with a `<nav>` element as root element instead:

```jsx
<List component="nav">
  <ListItem button>
    <ListItemText primary="Trash" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="Spam" />
  </ListItem>
</List>
```

This pattern is very powerful and allows for great flexibility, as well as a way to interoperate with other libraries, such as your favorite routing or forms library. But it also **comes with a small caveat!**

### Caveat with inlining

Using an inline function as an argument for the `component` prop may result in **unexpected unmounting**, since a new component is passed every time React renders. Not only will React update the DOM unnecessarily, the ripple effect of the `ListItem` will also not work correctly.

```jsx
import { Link } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = props => <Link to={to} {...props} />;

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
```

⚠️ However, since we are using an inline function to change the rendered component, React will unmount the link every time `ListItemLink` is rendered. Not only will React update the DOM unnecessarily, the ripple effect of the `ListItem` will also not work correctly.

The solution is simple: **avoid inline functions and pass a static component to the `component` prop** instead. Let's change the `ListItemLink` component so `CustomLink` always reference the same component:

```jsx
import { Link } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
```

### Caveat with prop forwarding

You can take advantage of the prop forwarding to simplify the code. In this example, we don't create any intermediary component:

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️ However, this strategy suffers from a limitation: prop collisions. The component providing the `component` prop (e.g. ListItem) might not forward all the props (for example dense) to the root element.

### With TypeScript

You can find the details in the [TypeScript guide](/guides/typescript/#usage-of-component-prop).

## Routing libraries

The integration with third-party routing libraries is achieved with the `component` prop. The behavior is identical to the description of the prop above. Here are a few demos with [react-router-dom](https://github.com/ReactTraining/react-router). It covers the Button, Link, and List components, you should be able to apply the same strategy with all the components.

### Button (Botón)

{{"demo": "pages/guides/composition/ButtonRouter.js"}}

### Link

{{"demo": "pages/guides/composition/LinkRouter.js"}}

### List

{{"demo": "pages/guides/composition/ListRouter.js"}}

## Caveat with refs

This section covers caveats when using a custom component as `children` or for the `component` prop.

Some of the components need access to the DOM node. This was previously possible by using `ReactDOM.findDOMNode`. This function is deprecated in favor of `ref` and ref forwarding. However, only the following component types can be given a `ref`:

- Any Material-UI component
- class components i.e. `React.Component` or `React.PureComponent`
- DOM (or host) components e.g. `div` or `button`
- [React.forwardRef components](https://reactjs.org/docs/react-api.html#reactforwardref)
- [React.lazy components](https://reactjs.org/docs/react-api.html#reactlazy)
- [React.memo components](https://reactjs.org/docs/react-api.html#reactmemo)

If you don't use one of the above types when using your components in conjunction with Material-UI, you might see a warning from React in your console similar to:

> Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

Ten en cuenta que seguirás recibiendo esta advertencia por componentes `perezosos` y `memo` si su componente envuelto no puede contener ref. In some instances an additional warning is issued to help with debugging, similar to:

> Invalid prop `component` supplied to `ComponentName`. Expected an element type that can hold a ref.

Only the two most common use cases are covered. For more information see [this section in the official React docs](https://reactjs.org/docs/forwarding-refs.html).

```diff
-const MyButton = () => <div role="button" />;
+const MyButton = React.forwardRef((props, ref) =>
+  <div role="button" {...props} ref={ref} />);

<Button component={MyButton} />;
```

```diff
-const SomeContent = props => <div {...props}>Hello, World!</div>;
+const SomeContent = React.forwardRef((props, ref) => <div {...props} ref={ref}>Hello, World!</div>);
<Tooltip title="Hello, again."><SomeContent /></Tooltip>;
```

Para averiguar si el componente de Material-UI que estás utilizando tiene este requisito, revisa la documentación de los accesorios de ese componente. If you need to forward refs the description will link to this section.

### Caveat with StrictMode

If you use class components for the cases described above you will still see warnings in `React.StrictMode`. `ReactDOM.findDOMNode` is used internally for backwards compatibility. You can use `React.forwardRef` and a designated prop in your class component to forward the `ref` to a DOM component. Doing so should not trigger any more warnings related to the deprecation of `ReactDOM.findDOMNode`.

```diff
class Component extends React.Component {
  render() {
-   const { props } = this;
+   const { forwardedRef, ...props } = this.props;
    return <div {...props} ref={forwardedRef} />;
  }
}

-export default Component;
+export default React.forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />);
```
