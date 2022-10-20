---
title: React Tooltip component
components: Tooltip
githubLabel: 'component: Tooltip'
materialDesign: https://material.io/components/tooltips
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tooltip'
---

# Tooltip

<p class="description">Les info-bulles affichent un texte informatif lorsque les utilisateurs survolent, se concentrent ou tapent sur un élément.</p>

Lorsqu'elles sont activées, [Info-bulles](https://material.io/design/components/tooltips.html) affiche une étiquette de texte identifiant un élément, telle qu'une description de sa fonction.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Info-bulles simples

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Info-bulles positionnées

The `Tooltip` has 12 **placements** choice. They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Customized tooltips

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Arrow Tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Élément enfant personnalisé

The tooltip needs to apply DOM event listeners to its child element. The tooltip needs to apply DOM event listeners to its child element.

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

Vous pouvez trouver un concept similaire dans le [composants d'emballage](/guides/composition/#wrapping-components) guide.

## Activation

Vous pouvez définir les types d'événements qui entraînent l'affichage d'une info-bulle.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Info-bulles contrôlées

Vous pouvez utiliser les propriétés `open`, `onOpen` et `onClose` pour contrôler le comportement de l'info-bulle.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Largeur Variable

Le `Tooltip` enveloppements long texte par défaut pour le rendre lisible.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Interactif

Tooltips are interactive by default (to pass [WCAG 2.1 success criterion 1.4.13](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)). It won't close when the user hovers over the tooltip before the `leaveDelay` is expired. You can disable this behavior (thus failing the success criterion which is required to reach level AA) by passing `disableInteractive`.

{{"demo": "pages/components/tooltips/NonInteractiveTooltips.js"}}

## Éléments désactivés

Par éléments désactivés par défaut comme `<button>` ne déclenchent pas les interactions utilisateur si un `infobulle` ne sera pas activée sur les événements normaux comme vol stationnaire. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

> ⚠️ In order to work with Safari, you need at least one display block or flex item below the tooltip wrapper.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a Material-UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property *pointer-events: none;* to your element when disabled:

```jsx
<Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {'A disabled button'}
    </button>
  </span>
</Tooltip>
```

## Les transitions

Utilisez une transition différente.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Follow cursor

You can enable the tooltip to follow the cursor by setting `followCursor={true}`.

{{"demo": "pages/components/tooltips/FollowCursorTooltips.js"}}

## Faked reference object

In the event you need to implement a custom placement, you can use the `anchorEl` prop: The value of the `anchorEl` prop can be a reference to a fake DOM element. You need to create an object shaped like the [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

{{"demo": "pages/components/tooltips/AnchorElTooltips.js"}}

## Montrer et se cacher

L'info-bulle est normalement affichée immédiatement lorsque la souris de l'utilisateur survole l'élément, et se cache immédiatement lorsque la souris de l'utilisateur quitte la souris. Un retard dans l'affichage ou le masquage de l'info-bulle peut être ajouté via les propriétés suivantes `enterDelay` et `leaveDelay`, comme indiqué dans la démo Infobulles contrôlées ci-dessus.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tooltip)

By default, the tooltip only labels its child element. This is notably different from `title` which can either label **or** describe its child depending on whether the child already has a label. For example, in:

```html
<button title="some more information">A button</button>
```

the `title` acts as an accessible description. If you want the tooltip to act as an accessible description you can pass `describeChild`. Note that you shouldn't use `describeChild` if the tooltip provides the only visual label. Otherwise, the child would have no accessible name and the tooltip would violate [success criterion 2.5.3 in WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "pages/components/tooltips/AccessibilityTooltips.js"}}
