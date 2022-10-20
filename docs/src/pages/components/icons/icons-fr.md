---
title: React Icon Component
components: Icones, SvgIcon
githubLabel: 'components: SvgIcon'
materialDesign: https://material.io/design/iconography/system-icons.html
---

# Icônes

<p class="description">Conseils et suggestions pour l'utilisation des icônes avec Material-UI.</p>

Material-UI provides icons support in three ways:

1. Standardized [Material Design icons](#material-icons) exported as React components (SVG icons).
1. With the [SvgIcon](#svgicon) component, a React wrapper for custom SVG icons.
1. With the [Icon](#icon-font-icons) component, a React wrapper for custom font icons.

## Icônes Material

Material Design has standardized over 1,100 official icons, each in five different "themes" (see below). For each SVG icon, we export the respective React component from the @material-ui/icons package. You can [search the full list of these icons](/components/material-icons/).

### Installation

Installez le package dans votre répertoire de projet avec:

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

These components use the Material-UI `SvgIcon` component to render the SVG path for each icon, and so have a peer-dependency on `@materialui/core`.

If you aren't already using Material-UI in your project, you can add it with:

```sh
// avec npm
npm install @material-ui/core

// avec yarn
yarn add @material-ui/core
```

### Utilisation

Import icons using one of these two options:

- Option 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest for bundle size is Option 1, but some developers prefer Option 2. Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach.

Each Material icon also has a "theme": Filled (default), Outlined, Rounded, Two-tone, and Sharp. To import the icon component with a theme other than the default, append the theme name to the icon name. For example `@material-ui/icons/Delete` icon with:

- Filled theme (default) is exported as `@material-ui/icons/Delete`,
- Outlined theme is exported as `@material-ui/icons/DeleteOutlined`,
- Rounded theme is exported as `@material-ui/icons/DeleteRounded`,
- Twotone theme is exported as `@material-ui/icons/DeleteTwoTone`,
- Sharp theme is exported as `@material-ui/icons/DeleteSharp`.

> Note: The Material Design specification names the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@material-ui/icons` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). There are three exceptions to this naming rule: `3d_rotation` exported as `ThreeDRotation`, `4k` exported as `FourK`, and `360` exported as `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

### Test

For testing purposes, each icon exposed from `@material-ui/icons` has a `data-testid` attribute with the name of the icon. Par exemple:

```jsx
import DeleteIcon from '@material-ui/icons/Delete';
```

has the following attribute once mounted:

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon

If you need a custom SVG icon (not available in the [Material Icons](/components/material-icons/)) you can use the `SvgIcon` wrapper. This component extends the native `<svg>` element:

- It comes with built-in accessibility.
- SVG elements should be scaled for a 24x24px viewport so that the resulting icon can be used as is, or included as a child for other Material-UI components that use icons. (This can be customized with the `viewBox` attribute).
- By default, the component inherits the current color. Optionally, you can apply one of the theme colors using the `color` prop.

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### Couleur

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Size

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Component prop

You can use the `SvgIcon` wrapper even if your icons are saved in the `.svg` format. [svgr](https://github.com/smooth-code/svgr) has loaders to import SVG files and use them as React components. For example, with webpack:

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// ---
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

It's also possible to use it with "url-loader" or "file-loader". This is the approach used by Create React App.

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
}

// ---
import { ReactComponent as StarIcon } from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

### createSvgIcon

The `createSvgIcon` utility component is used to create the [Material icons](#material-icons). It can be used to wrap an SVG path with an SvgIcon component.

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
```

{{"demo": "pages/components/icons/CreateSvgIcon.js"}}

### Font Awesome

If you find that there are layout issues when using FontAwesomeIcon from `@fortawesome/react-fontawesome`, you can try passing the Font Awesome SVG data directly to SvgIcon.

[Font Awesome](https://fontawesome.com/icons) Peut être utilisé avec le composant `Icon` comme suit:

{{"demo": "pages/components/icons/FontAwesomeSvgIconDemo.js"}}

FontAwesomeIcon's `fullWidth` prop can also be used to approximate the correct dimensions, but it isn't perfect.

### Icônes de police Material

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 icons. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component, or with `createSvgIcon()`.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

Le composant `Icon` affichera une icône à partir de toute police d’icône prenant en charge les ligatures. Avant de commencer, vous devez en inclure une, telle que la police [Material icon](https://google.github.io/material-design-icons/#icon-font-for-the-web) dans votre projet, par exemple via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material Icons font. `Icon` will set the correct class name for the Material icon font.

Pour utiliser une icône, enveloppez simplement le nom de l'icône (ligature de police) avec le composant `Icon` , par exemple:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Par défaut, une icône héritera de la couleur de texte actuelle. Vous pouvez éventuellement définir la couleur de l'icône à l'aide de l'une des propriétés de couleur du thème: `primary`, `secondary`, `action`, `error` & `disabled`.

### Icônes de police Material

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follows:

{{"demo": "pages/components/icons/FontAwesomeIcon.js"}}

Note that the Font Awesome icons weren't designed like the Material Design icons (compare the two previous demos). The fa icons are cropped to use all the space available. You can adjust for this with a global override:

```jsx
const theme = createMuiTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/components/icons/FontAwesomeIconSize.js"}}

## Font vs SVG. Which approach to use?

Both approaches work fine, however there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, and renders faster and better.

For more details, take a look at [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accessibilité

Icons can convey all sorts of meaningful information, so it’s important to ensure they are accessible where appropriate. There are two use cases you’ll want to consider:

- **Decorative icons** that are only being used for visual or branding reinforcement. S'ils étaient supprimés de la page, les utilisateurs comprendraient toujours et pourraient utiliser votre page.
- **Semantic icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them that are used as interactive controls — buttons, form elements, toggles, etc.

### Decorative icons

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Semantic icons

#### Semantic SVG icons

You should include the `titleAccess` prop with a meaningful value. The `role="img"` attribute and the `<title>` element are added so that your icons are correctly accessible.

In the case of focusable interactive elements, for example when used with an icon button, you can use the `aria-label` prop:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

#### Semantic font icons

You need to provide a text alternative that is only visible to assistive technologies.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Créez un utilisateur</Typography>
```

#### Référence

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
