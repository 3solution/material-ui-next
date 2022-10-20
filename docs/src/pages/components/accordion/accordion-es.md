---
title: React Accordion component
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: Accordion'
materialDesign: https://material.io/archive/guidelines/components/expansion-panels.html
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#accordion'
---

# Accordion (panel de expansión)

<p class="description">Los paneles de expansión contienen flujos de creación y permiten una edición simple de un elemento.</p>

Un [panel de expansión](https://material.io/archive/guidelines/components/expansion-panels.html) es un contenedor liviano que puede ser ya sea único o estar conectado a una superficie más grande, como una tarjeta.

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **Note:** Expansion panels are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them. It was formerly known as the "expansion panel".

## Panel de expansión simple

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Acordeón controlado

Extiende el comportamiento por defecto del panel para crear un acordeón con el componente `Accordion`.

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Customized accordions

He aquí un ejemplo de personalización del componente. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Rendimiento

The content of Accordions is mounted by default even if the panel is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Para óptima accesibilidad recomendamos establecer `id` y `aria-controls` en `AccordionSummary`. El `Accordion` derivará los necesarios `aria-labelledby` y `id` para la región de contenido del panel.
