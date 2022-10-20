# Komposition

<p class="description">Die Material-UI versucht die Komposition so einfach wie möglich zu gestalten.</p>

## Komponenten verpacken

Um maximale Flexibilität und Leistung zu gewährleisten, benötigen wir einen Weg, um die Art der untergeordneten Elemente einer Komponente zu kennen. To solve this problem we tag some of the components with a `muiName` static property when needed.

You may, however, need to wrap a component in order to enhance it, which can conflict with the `muiName` solution. If you wrap a component, verify if that component has this static property set.

If you encounter this issue, you need to use the same tag for your wrapping component that is used with the wrapped component. In addition, you should forward the properties, as the parent component may need to control the wrapped components props.

Sehen wir uns ein Beispiel an:

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## Component prop

Material-UI allows you to change the root element that will be rendered via a prop called `component`.

### Wie funktioniert das?

The custom component will be rendered by Material-UI like this:

```js
return React.createElement(props.component, props)
```

Beispielsweise wird die `List` Komponente mit einem `<ul>`-Element gerendert. This can be changed by passing a [React component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) to the `component` prop. The following example will render the `List` component with a `<nav>` element as root element instead:

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

This pattern is very powerful and allows for great flexibility, as well as a way to interoperate with other libraries, such as your favorite routing or forms library. Aber es gibt auch eine **kleine Einschränkung!**

### Vorbehalt beim Inlining

Using an inline function as an argument for the `component` prop may result in **unexpected unmounting**, since a new component is passed every time React renders. ⚠️ Da wir jedoch eine Inline-Funktion verwenden, um die gerenderte Komponente zu ändern, wird die Verknüpfung von React bei jedem Rendern des `ListItemLink` aufgehoben.

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

⚠️ Da wir jedoch eine Inline-Funktion verwenden, um die gerenderte Komponente zu ändern, wird die Verknüpfung von React bei jedem Rendern des `ListItemLink` aufgehoben. React aktualisiert nicht nur das DOM unnötig, sondern die Wellenvisualisierung des `ListItem` funktioniert auch nicht richtig.

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

You can take advantage of the prop forwarding to simplify the code. In diesem Beispiel erstellen wir keine Zwischenkomponente:

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️ However, this strategy suffers from a limitation: prop collisions. The component providing the `component` prop (e.g. ListItem) might not forward all the props (for example dense) to the root element.

### Mit TypeScript

You can find the details in the [TypeScript guide](/guides/typescript/#usage-of-component-prop).

## Routing libraries

The integration with third-party routing libraries is achieved with the `component` prop. The behavior is identical to the description of the prop above. Here are a few demos with [react-router-dom](https://github.com/ReactTraining/react-router). It covers the Button, Link, and List components, you should be able to apply the same strategy with all the components.

### Button

{{"demo": "pages/guides/composition/ButtonRouter.js"}}

### Link

{{"demo": "pages/guides/composition/LinkRouter.js"}}

### List (liste)

{{"demo": "pages/guides/composition/ListRouter.js"}}

## Vorbehalt bei Refs

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

Note that you will still get this warning for `lazy` and `memo` components if their wrapped component can't hold a ref. In some instances an additional warning is issued to help with debugging, similar to:

> Ungültige `component` Eigenschaft an `ComponentName` übergeben. Es wurde ein Elementtyp erwartet, der eine Referenz enthalten kann.

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

Um herauszufinden, ob die Material-UI - Komponente, die Sie verwenden, diese Anforderung hat, überprüfen Sie API - Dokumentation für diese Komponente. Wenn Sie Refs weiterleiten müssen, wird die Beschreibung mit diesem Abschnitt verknüpft.

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
