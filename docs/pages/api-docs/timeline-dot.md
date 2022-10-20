---
filename: /packages/material-ui-lab/src/TimelineDot/TimelineDot.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TimelineDot API

<p class="description">The API documentation of the TimelineDot React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TimelineDot from '@material-ui/lab/TimelineDot';
// or
import { TimelineDot } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiTimelineDot` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'grey'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'grey'</span> | The dot can have a different colors. |
| <span class="prop-name">variant</span> | <span class="prop-type">'filled'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;string</span> | <span class="prop-default">'filled'</span> | The dot can appear filled or outlined. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiTimelineDot-root</span> | Styles applied to the root element.
| <span class="prop-name">filled</span> | <span class="prop-name">.MuiTimelineDot-filled</span> | Styles applied to the root element if `variant="filled"`.
| <span class="prop-name">outlined</span> | <span class="prop-name">.MuiTimelineDot-outlined</span> | Styles applied to the root element if `variant="outlined"`.
| <span class="prop-name">filledGrey</span> | <span class="prop-name">.MuiTimelineDot-filledGrey</span> | Styles applied to the root element if `color="grey"` and `variant="filled"`.
| <span class="prop-name">outlinedGrey</span> | <span class="prop-name">.MuiTimelineDot-outlinedGrey</span> | Styles applied to the root element if `color="grey"` and `variant="outlined"`.
| <span class="prop-name">filledPrimary</span> | <span class="prop-name">.MuiTimelineDot-filledPrimary</span> | Styles applied to the root element if `color="primary"` and `variant="filled"`.
| <span class="prop-name">outlinedPrimary</span> | <span class="prop-name">.MuiTimelineDot-outlinedPrimary</span> | Styles applied to the root element if `color="primary"` and `variant="outlined"`.
| <span class="prop-name">filledSecondary</span> | <span class="prop-name">.MuiTimelineDot-filledSecondary</span> | Styles applied to the root element if `color="secondary"` and `variant="filled"`.
| <span class="prop-name">outlinedSecondary</span> | <span class="prop-name">.MuiTimelineDot-outlinedSecondary</span> | Styles applied to the root element if `color="secondary"` and `variant="outlined"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui-lab/src/TimelineDot/TimelineDot.js) for more detail.

## Demos

- [Timeline](/components/timeline/)

