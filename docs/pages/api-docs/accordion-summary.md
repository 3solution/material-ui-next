---
filename: /packages/material-ui/src/AccordionSummary/AccordionSummary.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# AccordionSummary API

<p class="description">The API documentation of the AccordionSummary React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import AccordionSummary from '@material-ui/core/AccordionSummary';
// or
import { AccordionSummary } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiAccordionSummary` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the accordion summary. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">expandIcon</span> | <span class="prop-type">node</span> |  | The icon to display as the expand indicator. |
| <span class="prop-name">focusVisibleClassName</span> | <span class="prop-type">string</span> |  | This prop can help a person know which element has the keyboard focus. The class name will be applied when the element gain the focus through a keyboard interaction. It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo). The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md). A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components if needed. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiAccordionSummary-root</span> | Styles applied to the root element.
| <span class="prop-name">expanded</span> | <span class="prop-name">.Mui-expanded</span> | Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the ButtonBase root element if the button is keyboard focused.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">content</span> | <span class="prop-name">.MuiAccordionSummary-content</span> | Styles applied to the children wrapper element.
| <span class="prop-name">expandIconWrapper</span> | <span class="prop-name">.MuiAccordionSummary-expandIconWrapper</span> | Styles applied to the `expandIcon`'s wrapper element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/AccordionSummary/AccordionSummary.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Accordion](/components/accordion/)

