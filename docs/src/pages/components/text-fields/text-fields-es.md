---
title: Componente de React Text Field
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
githubLabel: 'component: TextField'
materialDesign: https://material.io/components/text-fields
---

# Text Field (campo de texto)

<p class="description">Los campos de texto permiten a los usuarios ingresar y editar texto.</p>

[Text fields](https://material.io/design/components/text-fields.html) allow users to enter text into a UI. Generalmente se encuentran en formularios y diálogos.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## TextField

El componente `TextField` es un control de formulario completo, incluyendo una etiqueta, el campo de texto y texto de ayuda.

Soporta estilos "Standard", "Outlined" y "Filled".

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**Note:** The standard variant of the `TextField` is no longer documented in the [Material Design guidelines](https://material.io/) ([here's why](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)), but Material-UI will continue to support it.

## Propiedades del Form

Standard form attributes are supported e.g. `required`, `disabled`, `type`, etc. as well as a `helperText` which is used to give context about a field’s input, such as how the input will be used.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validación

The `error` prop toggles the error state, the `helperText` prop can then be used to provide feedback to the user about the error.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multiline

The `multiline` prop transforms the text field into a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) or a [TextareaAutosize](/components/textarea-autosize/). Unless the `rows` prop is set, the height of the text field dynamically matches its content (using [TextareaAutosize](/components/textarea-autosize/)). You can use the `rowsMin` and `rowsMax` props to bound it.

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Selección

The `select` prop makes the text field use the [Select](/components/selects/) component internally.

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Iconos

There are multiple ways to display an icon with a text field.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Adornos de campos de texto

The main way is with an `InputAdornment`. Por ejemplo, puedes usar un botón de icono para esconder o revelar una contraseña. This can be used to add a prefix, a suffix or an action to an input.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## Tamaños

Fancy smaller inputs? Use the `size` prop.

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

## Disposición

`dense` and `normal` alter other styles to meet the specification. `margin` prop can be used to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will.

`fullWidth` can be used to make the input take up the full width of its container.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Uncontrolled vs Controlled

The component can be controlled or uncontrolled.

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Componentes

El componente `TextField` incluye y usa subcomponentes ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/) y [`FormHelperText`](/api/form-helper-text/) ) que pueden ser usados directamente para personalizar campos de ingreso de texto de manera sustancial.

Puede que también hayas notado que algunas propiedades nativas de input HTML no están presentes en el componente `TextField`. Esto es a propósito. El componente se encarga de programar la mayoría de las propiedades más usadas, luego depende del usuario programar las propiedades que se muestran en la siguiente demo. Aun así, se puede utilizar `inputProps` (y las propiedades `InputProps` e `InputLabelProps`) para personalizar y evitar el código boilerplate.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Color

The `color` prop changes the highlight color of the text field when focused.

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## Inputs personalizados

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

La personalización no se limita a usar CSS, también puedes usar una composición de componentes personalizados para darle a tu aplicación un estilo único. A continuación sigue un ejemplo del uso del componente [`InputBase`](/api/input-base/), inspirado por Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

🎨 Si buscas un poco de inspiración, puedes visitar [MUI Treasury's ejemplos de customizacion](https://mui-treasury.com/styles/text-field).

## Limitaciones

### Shrink

El estado "shrink" de la etiqueta del campo de texto no está siempre correcto. La etiqueta debe achicarse al momento que el campo demuestra algun texto. En algunas circunstancias, no se puede determinar el estado "shrink" (campo de números, campo de fecha y hora, campo de Stripe). Tal vez veas una superposición.

![shrink](/static/images/text-fields/shrink.png)

Para resolver el problema, puedes forzar el estado "shrink" de la etiqueta.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

o

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### Floating label

The floating label is absolutely positioned, it won't impact the layout of the page. You need to make sure that the input is larger than the label to display correctly.

### type="number"

Inputs of type="number" have potential usability issues:

- Allowing certain non-numeric characters ('e', '+', '-', '.') and silently discarding others and silently discarding others
- Si se está componiendo el componente:

and more - see [this article](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) by the GOV. UK Design System team for a more detailed explanation.

For number validation, one viable alternative is to use the default input type="text" with the _pattern_ attribute, for example:

```jsx
<TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
```

In the future, we might provide a [number input component](https://github.com/mui-org/material-ui/issues/19154).

### Helper text

The helper text prop affects the height of the text field. If two text fields are placed side by side, one with a helper text and one without, they will have different heights. For example:

{{"demo": "pages/components/text-fields/HelperTextMisaligned.js"}}

This can be fixed by passing a space character to the `helperText` prop:

{{"demo": "pages/components/text-fields/HelperTextAligned.js"}}

## Integration with 3rd party input libraries

Se pueden utilizar librerías externas para formatear un campo de texto. Para ello, hay que proporcionar una implementación personalizada del elemento `<input>` con el atributo `inputComponent`.

El siguiente demo utiliza las librerías [react-text-mask](https://github.com/text-mask/text-mask) y [react-number-format](https://github.com/s-yadav/react-number-format). The same concept could be applied to [e.g. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

El componente del campo de texto proporcionado debe manejar el atributo `inputRef`. The property should be called with a value that implements the following interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
<div class="form-control">
  <label for="mi-campo">Email</label>
  <input id="mi-campo" aria-describedby="mi-texto-de-ayuda" />
  <span id="mi-texto-de-ayuda">Nunca compartiremos tu email.</span>
</div>
```

## Accesibilidad

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure:

```jsx
<FormControl>
  <InputLabel htmlFor="mi-campo">Email</InputLabel>
  <Input id="mi-campo" aria-describedby="mi-texto-de-ayuda" />
  <FormHelperText id="mi-texto-de-ayuda">Nunca compartiremos tu email.</FormHelperText>
</FormControl>
```

- Si se usa el componente `TextField`, sólo hay que proporcionar un `id` único.
- Si se está componiendo el componente:

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">
    We'll never share your email.
  </FormHelperText>
</FormControl>
```

## Proyectos relacionados

Para usos más avanzados tal vez puedas aprovercharte de:

- [mui-rff](https://github.com/lookfirst/mui-rff) Bindings for using Material-UI with [React Final Form](https://final-form.org/react).
- [formik-material-ui](https://github.com/stackworx/formik-material-ui): Bindings for using Material-UI with [formik](https://jaredpalmer.com/formik).
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui): Bindings for using Material-UI with [Redux Form](https://redux-form.com/).
- [mui-rff](https://github.com/lookfirst/mui-rff): Bindings for using Material-UI with [React Final Form](https://final-form.org/react).
