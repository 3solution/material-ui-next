---
title: React Transition component
components: Collapse, Fade, Grow, Slide, Zoom
githubLabel: 'component: Transition'
---

# Übergänge

<p class="description">Übergänge helfen, eine Oberfläche ausdrucksvoll und einfach zu benutzen zu gestalten.</p>

Material-UI bietet eine Anzahl von Übergängen, die verwendet werden können, um einige einfache [Bewegungen](https://material.io/design/motion/) in deiner Anwendung einzuführen.

Die Style-Funktion der [Palette](/system/palette/).

Um Server Rendering besser zu unterstützen, bietet Material-UI ein `style` Property auf den Kindern einiger Übergangs-Komponenten (Fade, Grow, Zoom, Slide). Das `style` Property muss auf das DOM angewendet werden, damit die Animation wie gewünscht funktioniert.

```jsx
// Das `props'-Objekt enthält eine` style'-Eigenschaft.
// Dieses musst du, wie hier gezeigt, an das `div` Element übergeben.
function MyComponent(props) {
  return (
    <div {...props}>
      Fade
    </div>
  );
}

export default Main() {
  return (
    <Fade>
      <MyComponent />
    </Fade>
  );
}
```

## Collapse

Expand vertically from the top of the child element. Use the `orientation` prop if you need a horizontal collapse. The `collapsedHeight` property can be used to set the minimum height when not expanded.

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade

Blende von Transparent zu Undurchsichtig ein.

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow

Erweitert sich von der Mitte des untergeordneten Elements nach außen, während es von transparent nach opak einblendet.

The second example demonstrates how to change the `transform-origin`, and conditionally applies the `timeout` prop to change the entry speed.

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide

Slide in from the edge of the screen. The `direction` property controls which edge of the screen the transition starts from.

The Transition component's `mountOnEnter` property prevents the child component from being mounted until `in` is `true`. Dadurch wird verhindert, dass die relativ positionierte Komponente von der Off-Screen-Position in die Ansicht gescrollt wird. In ähnlicher Weise entfernt die `unmountOnExit` -Eigenschaft die Komponente aus dem DOM, nachdem der Übergang vom Bildschirm beendet wurde.

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

## Zoom

Erweitern sich von der Mitte des untergeordneten Elements nach außen.

In diesem Beispiel veranschaulicht, wie der Eintritts animation verzögert wird.

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## TransitionComponent prop

The components accept a `TransitionComponent` prop to customize the default transitions. You can use any of the above components or your own. Es sollte folgende Bedingungen einhalten:

- Accepts an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. Call the `onExited` callback prop when the exit transition is completed.

For more information on creating a custom transition, visit the [React Transition Group Transition docs](http://reactcommunity.org/react-transition-group/transition). You can also visit the dedicated sections of some of the components:

- [Modal](/components/modal/#transitions)
- [Dialog](/components/dialogs/#transitions)
- [Popper](/components/popper/#transitions)
- [Snackbar](/components/snackbars/#transitions)
- [Tooltip](/components/tooltips/#transitions)
