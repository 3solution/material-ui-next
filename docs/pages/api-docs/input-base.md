---
filename: /packages/material-ui/src/InputBase/InputBase.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# InputBase API

<p class="description">The API documentation of the InputBase React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import InputBase from '@material-ui/core/InputBase';
// or
import { InputBase } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

`InputBase` contains as few styles as possible.
It aims to be a simple building block for creating an input.
It contains a load of style reset and some state logic.

## Component name

The `MuiInputBase` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">autoComplete</span> | <span class="prop-type">string</span> |  | This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill). |
| <span class="prop-name">autoFocus</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element is focused during the first mount. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> |  | The color of the component. It supports those theme colors that make sense for this component. The prop defaults to the value (`'primary'`) inherited from the parent FormControl component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">any</span> |  | The default `input` element value. Use when the component is not controlled. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element is disabled. The prop defaults to the value (`false`) inherited from the parent FormControl component. |
| <span class="prop-name">endAdornment</span> | <span class="prop-type">node</span> |  | End `InputAdornment` for this component. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> |  | If `true`, the input will indicate an error. The prop defaults to the value (`false`) inherited from the parent FormControl component. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input will take up the full width of its container. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | The id of the `input` element. |
| <span class="prop-name">inputComponent</span> | <span class="prop-type">element type</span> | <span class="prop-default">'input'</span> | The component used for the `input` element. Either a string to use a HTML element or a component.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. |
| <span class="prop-name">inputRef</span> | <span class="prop-type">ref</span> |  | Pass a ref to the `input` element. |
| <span class="prop-name">margin</span> | <span class="prop-type">'dense'<br>&#124;&nbsp;'none'</span> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. The prop defaults to the value (`'none'`) inherited from the parent FormControl component. |
| <span class="prop-name">maxRows</span> | <span class="prop-type">number<br>&#124;&nbsp;string</span> |  | Maximum number of rows to display when multiline option is set to true. |
| <span class="prop-name">minRows</span> | <span class="prop-type">number<br>&#124;&nbsp;string</span> |  | Minimum number of rows to display when multiline option is set to true. |
| <span class="prop-name">multiline</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, a `textarea` element is rendered. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | Name attribute of the `input` element. |
| <span class="prop-name">onBlur</span> | <span class="prop-type">func</span> |  | Callback fired when the input is blurred.<br>Notice that the first argument (event) might be undefined. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value` (string). |
| <span class="prop-name">placeholder</span> | <span class="prop-type">string</span> |  | The short hint displayed in the input before the user enters a value. |
| <span class="prop-name">readOnly</span> | <span class="prop-type">bool</span> |  | It prevents the user from changing the value of the field (not from interacting with the field). |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element is required. The prop defaults to the value (`false`) inherited from the parent FormControl component. |
| <span class="prop-name">rows</span> | <span class="prop-type">number<br>&#124;&nbsp;string</span> |  | Number of rows to display when multiline option is set to true. |
| <span class="prop-name">startAdornment</span> | <span class="prop-type">node</span> |  | Start `InputAdornment` for this component. |
| <span class="prop-name">type</span> | <span class="prop-type">string</span> | <span class="prop-default">'text'</span> | Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types). |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the `input` element, required for a controlled component. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiInputBase-root</span> | Styles applied to the root element.
| <span class="prop-name">formControl</span> | <span class="prop-name">.MuiInputBase-formControl</span> | Styles applied to the root element if the component is a descendant of `FormControl`.
| <span class="prop-name">focused</span> | <span class="prop-name">.Mui-focused</span> | Styles applied to the root element if the component is focused.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">adornedStart</span> | <span class="prop-name">.MuiInputBase-adornedStart</span> | Styles applied to the root element if `startAdornment` is provided.
| <span class="prop-name">adornedEnd</span> | <span class="prop-name">.MuiInputBase-adornedEnd</span> | Styles applied to the root element if `endAdornment` is provided.
| <span class="prop-name">error</span> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element if `error={true}`.
| <span class="prop-name">marginDense</span> | <span class="prop-name">.MuiInputBase-marginDense</span> | Styles applied to the `input` element if `margin="dense"`.
| <span class="prop-name">multiline</span> | <span class="prop-name">.MuiInputBase-multiline</span> | Styles applied to the root element if `multiline={true}`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiInputBase-colorSecondary</span> | Styles applied to the root element if the color is secondary.
| <span class="prop-name">fullWidth</span> | <span class="prop-name">.MuiInputBase-fullWidth</span> | Styles applied to the root element if `fullWidth={true}`.
| <span class="prop-name">hiddenLabel</span> | <span class="prop-name">.MuiInputBase-hiddenLabel</span> | Styles applied to the root element if `hiddenLabel={true}`.
| <span class="prop-name">input</span> | <span class="prop-name">.MuiInputBase-input</span> | Styles applied to the `input` element.
| <span class="prop-name">inputMarginDense</span> | <span class="prop-name">.MuiInputBase-inputMarginDense</span> | Styles applied to the `input` element if `margin="dense"`.
| <span class="prop-name">inputMultiline</span> | <span class="prop-name">.MuiInputBase-inputMultiline</span> | Styles applied to the `input` element if `multiline={true}`.
| <span class="prop-name">inputTypeSearch</span> | <span class="prop-name">.MuiInputBase-inputTypeSearch</span> | Styles applied to the `input` element if `type="search"`.
| <span class="prop-name">inputAdornedStart</span> | <span class="prop-name">.MuiInputBase-inputAdornedStart</span> | Styles applied to the `input` element if `startAdornment` is provided.
| <span class="prop-name">inputAdornedEnd</span> | <span class="prop-name">.MuiInputBase-inputAdornedEnd</span> | Styles applied to the `input` element if `endAdornment` is provided.
| <span class="prop-name">inputHiddenLabel</span> | <span class="prop-name">.MuiInputBase-inputHiddenLabel</span> | Styles applied to the `input` element if `hiddenLabel={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/InputBase/InputBase.js) for more detail.

## Demos

- [Text Fields](/components/text-fields/)

