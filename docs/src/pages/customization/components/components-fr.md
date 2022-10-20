# Personnaliser les composants

<p class="description">Vous pouvez facilement personnaliser l'apparence d'un composant Material-UI.</p>

As components can be used in different contexts, there are several approaches to this. Du plus étroit cas d'utilisation au plus large, il s'agit des suivants :

1. [Variation spécifique pour une situation ponctuelle](#1-specific-variation-for-a-one-time-situation)
1. [Variation dynamique pour une situation ponctuelle](#2-dynamic-variation-for-a-one-time-situation)
1. [Variation spécifique d'un composant](#3-specific-variation-of-a-component) réutilisé dans différents contextes
1. [Variations de Material Design](#4-material-design-variations) comme avec le composant bouton
1. [Variation globale du thème](#5-global-theme-variation)

## 1. Variation spécifique pour une situation ponctuelle

Vous devrez peut-être modifier le style d'un composant pour un cas particulier. Vous disposez des solutions suivantes :

### Remplacement de styles avec des noms de classe

La première façon de remplacer le style d'un composant consiste à utiliser des **noms de classes** . Chaque composant fournit une propriété `className` qui est toujours appliquée à l'élément racine.

This example uses the [`withStyles()`](/styles/basics/#higher-order-component-api) higher-order component to inject custom styles into the DOM, and to pass the class name to the `ClassNames` component via its `classes` property. You can choose [any other styling solution](/guides/interoperability/), or even plain CSS to create the styles, but be sure to consider the [CSS injection order](/styles/advanced/#css-injection-order), as the CSS injected into the DOM by Material-UI to style a component has the highest specificity possible, since the `<link>` is injected at the bottom of the `<head />` to ensure the components always render correctly.

{{"demo": "pages/customization/components/ClassNames.js"}}

### Overriding styles with classes

When the `className` property isn't enough, and you need to access deeper elements, you can take advantage of the `classes` object property to customize all the CSS injected by Material-UI for a given component.

The list of classes for each component is documented in the component API page, you should refer to the **CSS section** and **rule name column**. For instance, you can have a look at the [Button CSS API](/api/button/#css). Alternatively, you can use the [browser dev tools](#using-the-dev-tools).

This example also uses `withStyles()` (see above), but here, `ClassesNesting` is using `Button`'s `classes` prop to provide an object that maps the **names of classes to override** (style rules) to the **CSS class names to apply** (values). The component's existing classes will continue to be injected, so it is only necessary to provide the specific styles you wish to add or override.

Notice that in addition to the button styling, the button label's capitalization has been changed:

{{"demo": "pages/customization/components/ClassesNesting.js"}}

### Overriding styles with global class names

[Follow this section](/styles/advanced/#with-material-ui-core).

### Utiliser les outils de développement

The browser dev tools can save you a lot of time. Material-UI's class names [follow a simple pattern](/styles/advanced/#class-names) in development mode: `Mui[component name]-[style rule name]-[UUID]`.

Let's go back to the above demo. How can you override the button label?

![dev-tools](/static/images/customization/dev-tools.png)

Using the dev tools, you know that you need to target the `Button` component and the `label` style rule:

```jsx
<Button classes={{ label: 'my-class-name' }} />
```

### Shorthand

The above code example can be condensed by using **the same CSS API** as the child component. In this example, the `withStyles()` higher-order component is injecting a `classes` property that is used by the [`Button` component](/api/button/#css).

```jsx
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);
```

{{"demo": "pages/customization/components/ClassesShorthand.js"}}

### Pseudo-classes

The components special states, like *hover*, *focus*, *disabled* and *selected*, are styled with a higher CSS specificity. [Specificity is a weight](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) that is applied to a given CSS declaration.

In order to override the components special states, **you need to increase specificity**. Here is an example with the *disable* state and the button component using a **pseudo-class** (`:disabled`):

```css
.Button {
  color: black;
}
.Button:disabled { /* Increase the specificity */
  color: white;
}
```

```jsx
<Button disabled className="Button">
```

Sometimes, you can't use a **pseudo-class** as the state doesn't exist in the platform. Let's take the menu item component and the *selected* state as an example. Aside from accessing nested elements, the `classes` property can be used to customize the special states of Material-UI components:

```css
.MenuItem {
  color: black;
}
.MenuItem.selected { /* Increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MenuItem', selected: 'selected' }}>
```

#### Why do I need to increase specificity to override one component state?

By design, the CSS specification makes the pseudo-classes increase the specificity. For consistency, Material-UI increases the specificity of its custom pseudo-classes. This has one important advantage, it allows you to cherry-pick the state you want to customize.

#### Can I use a different API that requires fewer boilerplate?

Instead of providing values to the `classes` prop API, you can rely on [the global class names](/styles/advanced/#with-material-ui-core) generated by Material-UI. It implements all these custom pseudo-classes:

| classes key  | Global class name |
|:------------ |:----------------- |
| checked      | Mui-checked       |
| disabled     | Mui-disabled      |
| error        | Mui-error         |
| focused      | Mui-focused       |
| focusVisible | Mui-focusVisible  |
| required     | Mui-required      |
| expanded     | Mui-expanded      |
| selected     | Mui-selected      |

```css
.MenuItem {
  color: black;
}
.MenuItem.Mui-selected { /* Increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected className="MenuItem">
```

### Use `$ruleName` to reference a local rule within the same style sheet

The [jss-nested](https://github.com/cssinjs/jss/tree/master/packages/jss-plugin-nested) plugin (available by default) can make the process of increasing specificity easier.

```js
const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
```

compile vers :

```css
.root-x.disable-x {
  color: white;
}
```

⚠️ You need to apply the two generated class names (`root` & `disabled`) to the DOM to make it work.

```jsx
<Button
  disabled
  classes={{
    root: classes.root, // class name, e.g. `root-x`
    disabled: classes.disabled, // class name, e.g. `disabled-x`
  }}
>
```

{{"demo": "pages/customization/components/ClassesState.js"}}

### Overriding with inline-styles

The second way to override the style of a component is to use the **inline-style** approach. Every component provides a `style` property. These properties are always applied to the root element.

You don't have to worry about CSS specificity as the inline-style takes precedence over the regular CSS.

{{"demo": "pages/customization/components/InlineStyle.js"}}

[When should I use inline-style vs classes?](/getting-started/faq/#when-should-i-use-inline-style-vs-css)

## 2. Variation dynamique pour une situation ponctuelle

You have learned how to override the style of a Material-UI component in the previous section. Now, let's see how we can make these overrides dynamic. Here are five alternatives; each has its pros and cons.

### Dynamic CSS

{{"demo": "pages/customization/components/DynamicCSS.js"}}

### Class name branch

{{"demo": "pages/customization/components/DynamicClassName.js"}}

### CSS variables

{{"demo": "pages/customization/components/DynamicCSSVariables.js"}}

### Inline-styles

{{"demo": "pages/customization/components/DynamicInlineStyle.js"}}

### Theme nesting

{{"demo": "pages/customization/components/DynamicThemeNesting.js"}}

## 3. Specific variation of a component

You might need to create a variation of a component and use it in different contexts, for instance a colorful button on your product page, however you probably want to keep your code [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

The best approach is to follow option 1 and then take advantage of the composition power of React by exporting your customized component to use wherever you need it.

{{"demo": "pages/customization/components/Component.js", "hideEditButton": true}}

## 4. Material Design variations

The Material Design specification documents different variations of certain components, such as how buttons come in different shapes: [text](https://material.io/design/components/buttons.html#text-button) (formerly "flat"), [contained](https://material.io/design/components/buttons.html#contained-button) (formerly "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) and more.

Material-UI attempts to implement all of these variations. Please refer to the [Supported Components](/getting-started/supported-components/) documentation to find out the current status of all supported Material Design components.

## 5. Variation globale du thème

In order to promote consistency between components, and manage the user interface appearance as a whole, Material-UI provides a mechanism to apply global changes.

The demos of this section covers how to the change the button's font size.

### Theme variables

You can adjust the [theme configuration variables](/customization/theming/#theme-configuration-variables).

```jsx
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/components/ThemeVariables.js"}}

### Global CSS override

You can also customize all instances of a component with CSS. It's very similar to how you would customize Bootstrap. Components expose [global class names](/styles/advanced/#with-material-ui-core) to enable this.

```jsx
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

// …

<GlobalCss />
```

{{"demo": "pages/customization/components/GlobalCssOverride.js", "iframe": true, "height": 70}}

### Global theme override

You can take advantage of the `overrides` key of the `theme` to potentially change every single style injected by Material-UI into the DOM. Learn more about it in the [themes section](/customization/globals/#css) of the documentation.

```jsx
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});
```

{{"demo": "pages/customization/components/GlobalThemeOverride.js"}}

### Adding new component variants

You can take advantage of the `variants` key in the `theme`'s components section to add new variants to Material-UI components. These new variants, can specify which styles the component should have, if specific props are defined together.

The definitions are specified in an array, under the component's name. For every one of them a class is added in the head. The order is **important**, so make sure that the styles that should win will be specified lastly.

```jsx
const theme = createMuiTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed grey${blue[500]}`,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
  },
});
```

If you are using TypeScript, you will need to specify your new variants/colors, using module augmentation.

```tsx
declare module '@material-ui/core/Button/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

{{"demo": "pages/customization/components/GlobalThemeVariants.js"}}
