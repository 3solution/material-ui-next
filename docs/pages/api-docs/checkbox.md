---
filename: /packages/material-ui/src/Checkbox/Checkbox.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Checkbox API

<p class="description">The API documentation of the Checkbox React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Checkbox from '@material-ui/core/Checkbox';
// or
import { Checkbox } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiCheckbox` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">checked</span> | <span class="prop-type">bool</span> |  | If `true`, the component is checked. |
| <span class="prop-name">checkedIcon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;CheckBoxIcon /></span> | The icon to display when the component is checked. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'secondary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the checkbox is disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect is disabled. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;CheckBoxOutlineBlankIcon /></span> | The icon to display when the component is unchecked. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | The id of the `input` element. |
| <span class="prop-name">indeterminate</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component appears indeterminate. This does not set the native input element to indeterminate due to inconsistent behavior across browsers. However, we set a `data-indeterminate` attribute on the input. |
| <span class="prop-name">indeterminateIcon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;IndeterminateCheckBoxIcon /></span> | The icon to display when the component is indeterminate. |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object</span> |  | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. |
| <span class="prop-name">inputRef</span> | <span class="prop-type">ref</span> |  | Pass a ref to the `input` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new checked state by accessing `event.target.checked` (boolean). |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element is required. |
| <span class="prop-name">size</span> | <span class="prop-type">'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the checkbox. `small` is equivalent to the dense checkbox styling. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the component. The DOM API casts this to a string. The browser uses "on" as the default value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([IconButton](/api/icon-button/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiCheckbox-root</span> | Styles applied to the root element.
| <span class="prop-name">checked</span> | <span class="prop-name">.Mui-checked</span> | Pseudo-class applied to the root element if `checked={true}`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">indeterminate</span> | <span class="prop-name">.MuiCheckbox-indeterminate</span> | Pseudo-class applied to the root element if `indeterminate={true}`.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiCheckbox-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiCheckbox-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Checkbox/Checkbox.js) for more detail.

## Inheritance

The props of the [IconButton](/api/icon-button/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Checkboxes](/components/checkboxes/)
- [Transfer List](/components/transfer-list/)

