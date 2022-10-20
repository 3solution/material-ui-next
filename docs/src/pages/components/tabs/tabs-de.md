---
title: React Tabs component
components: Tabs, Tab, TabScrollButton, TabContext, TabList, TabPanel
githubLabel: 'component: Tabs'
materialDesign: https://material.io/components/tabs
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tabpanel'
---

# Tabs

<p class="description">Tabs erleichtern das Erkunden und Wechseln zwischen verschiedenen Ansichten.</p>

[Tabs](https://material.io/design/components/tabs.html) organisieren und ermöglichen die Navigation zwischen zusammengehörigen Inhaltsgruppen auf derselben Hierarchieebene.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Einfache Tabs

{{"demo": "pages/components/tabs/SimpleTabs.js", "bg": true}}

{{"demo": "pages/components/tabs/BasicTabs.js", "bg": true}}

### Umbrechen von Tab Beschriftungen

Lange Beschriftungen werden automatisch umgebrochen. Zu lange Beschriftungen sind allerdings nicht sichtbar und werden abgeschnitten (`overflow`).

{{"demo": "pages/components/tabs/TabsWrappedLabel.js", "bg": true}}

### Deaktivierter Tab

Ein Tab kann durch die Eigenschaft `disabled` deaktiviert werden.

{{"demo": "pages/components/tabs/DisabledTabs.js", "bg": true}}

## Feste Tabs

Feste Tabs sollten mit einer begrenzten Anzahl von Tabs verwendet werden, und wenn eine gleichmäßige Platzierung das Muskelgedächtnis verbessert.

### Gesamte Breite

Die Eigenschaft `variant="fullWidth"` sollte für kleinere Ansichten verwendet werden. Diese Demo verwendet auch [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views), um den Tab-Übergang zu animieren und Tabs auf Touch-Geräten zu ziehen.

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### Zentriert

Die Eigenschaft `centered` sollte für kleinere Ansichten verwendet werden.

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## Scrollbare Tabs

### Automatische Scroll-Tasten

By default, left and right scroll buttons are automatically presented on desktop and hidden on mobile. All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift-mousewheel, etc.)

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### Erzwungene Bildlaufschaltflächen

Left and right scroll buttons be presented (reserve space) regardless of the viewport width with `scrollButtons={true}` `allowScrollButtonsMobile`:

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

If you want to make sure the buttons are always visible, you should customize the opacity.

```css
.MuiTabs-scrollButtons.Mui-disabled {
  opacity: 0.3;
}
```

{{"demo": "pages/components/tabs/ScrollableTabsButtonVisible.js", "bg": true}}

### Scrolltasten verhindern

Left and right scroll buttons are never be presented with `scrollButtons={false}`. All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift-mousewheel, etc.)

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## Benutzerdefinierte Tabs

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/tabs/CustomizedTabs.js", "bg": true}}

🎨 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/styles/tabs/) an.

## Vertikale Tabs

Tab-Beschriftungen können entweder nur Symbole oder nur Text enthalten.

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

Note that you can restore the scrollbar with `visibleScrollbar`.

## Nav-Tabs

Standardmäßig verwenden Registerkarten als `Button-` Element dargestellt, Sie können jedoch Ihr eigenes benutzerdefiniertes Tag oder Ihre eigene Komponente definieren. Here's an example of implementing tabbed navigation:

{{"demo": "pages/components/tabs/NavTabs.js", "bg": true}}

## Symbol-Tabs

Tab-Beschriftungen können entweder nur Symbole oder nur Text enthalten.

{{"demo": "pages/components/tabs/IconTabs.js", "bg": true}}

{{"demo": "pages/components/tabs/IconLabelTabs.js", "bg": true}}

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tabpanel)

The following steps are needed in order to provide necessary information for assistive technologies:

1. Label `Tabs` via `aria-label` or `aria-labelledby`.
2. `Tab`s need to be connected to their corresponding `[role="tabpanel"]` by setting the correct `id`, `aria-controls` and `aria-labelledby`.

An example for the current implementation can be found in the demos on this page. We've also published [an experimental API](#experimental-api) in `@material-ui/lab` that does not require extra work.

### Keyboard navigation

The components implement keyboard navigation using the "manual activation" behavior. If you want to switch to the "selection automatically follows focus" behavior you have pass `selectionFollowsFocus` to the `Tabs` component. The WAI-ARIA authoring practices have a detailed guide on [how to decide when to make selection automatically follow focus](https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus).

#### Demo

The following two demos only differ in their keyboard navigation behavior. Focus a tab and navigate with arrow keys to notice the difference.

```jsx
/* Tabs where selection follows focus */
<Tabs selectionFollowsFocus />
/* Tabs where each tab needs to be selected manually */
<Tabs />
```

{{"demo": "pages/components/tabs/AccessibleTabs.js", "bg": true}}

## Experimental API

`@material-ui/lab` offers utility components that inject props to implement accessible tabs following [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel).

{{"demo": "pages/components/tabs/LabTabs.js", "bg": true}}
