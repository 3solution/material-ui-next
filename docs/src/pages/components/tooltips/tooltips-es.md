---
title: React Tooltip component
components: Tooltip
githubLabel: 'component: Tooltip'
materialDesign: https://material.io/components/tooltips
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tooltip'
---

# Tooltip

<p class="description">Tooltips muestran texto informativo cuando los usuarios se desplazan, se concentran o tocan un elemento.</p>

When activated, [Tooltips](https://material.io/design/components/tooltips.html) display a text label identifying an element, such as a description of its function.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Simple Tooltips

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Tooltips posicionados

El `Tooltip` tiene 12 **posiciones** para elegir. No tienen flechas direccionales; en cambio, dependen del movimiento que emana de la fuente para transmitir la dirección.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Tooltips personalizados

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Tooltip Flecha

Puedes usar el apoyo del prop `flecha` para dar a tu tooltip una flecha indicando a qué elemento se refiere.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Elemento child personalizado

El tooltip necesita aplicar los oyentes de eventos DOM a su elemento hijo. El tooltip necesita aplicar los oyentes de eventos DOM a su elemento hijo.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip title="Delete">
  <MyComponent>
</Tooltip>
```

Puede encontrar un concepto similar en la guía de [componentes de envoltura](/guides/composition/#wrapping-components).

## Triggers

Puede definir los tipos de eventos que causan que se muestre un tooltip.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Tooltips controlados

You can use the `open`, `onOpen` and `onClose` properties to control the behavior of the tooltip.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Ancho variable

El `Tooltip` envuelve texto largo por defecto para hacerlo legible.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Explora

Tooltips are interactive by default (to pass [WCAG 2.1 success criterion 1.4.13](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)). No se cerrará cuando el usuario pase sobre el tooltip antes de que el `leaveDelay` expire. You can disable this behavior (thus failing the success criterion which is required to reach level AA) by passing `disableInteractive`.

{{"demo": "pages/components/tooltips/NonInteractiveTooltips.js"}}

## Elementos deshabilitados

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

> ⚠️ Para trabajar con Safari, necesitas al menos un display block o un elemento flexionado debajo del envoltorio del tooltip.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a Material-UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property *pointer-events: none;* to your element when disabled:

```jsx
<Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {'A disabled button'}
    </button>
  </span>
</Tooltip> { pointerEvents: 'none' } : {}}
    >
      {'A disabled button'}
    </button>
  </span>
</Tooltip> { pointerEvents: 'none' } : {}}
    >
      {'A disabled button'}
    </button>
  </span>
</Tooltip>
```

## Transiciones

Usar una transición diferente.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Follow cursor

You can enable the tooltip to follow the cursor by setting `followCursor={true}`.

{{"demo": "pages/components/tooltips/FollowCursorTooltips.js"}}

## Faked reference object

In the event you need to implement a custom placement, you can use the `anchorEl` prop: The value of the `anchorEl` prop can be a reference to a fake DOM element. You need to create an object shaped like the [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

{{"demo": "pages/components/tooltips/AnchorElTooltips.js"}}

## Mostrar y ocultar

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tooltip)

Por defecto, Tooltip solo etiqueta a su elemento hijo. This is notably different from `title` which can either label **or** describe its child depending on whether the child already has a label. Por ejemplo, en:

```html
<button title="más información">Un botón</button>
```

el  `title` actúa como una descripción accesible. Si quieres que Tooltip actúe como una descripción accesible, puedes utilizar `describeChild`. Ten en cuenta que no deberías usar `describeChild` si Tooltip es la única etiqueta visual. De lo contrario, el hijo no tendría un nombre accesible y la descripción violaría [criterio de éxito 2.5.3 en WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "páginas/componentes/tooltips/AccessibilityTooltips.js"}}
