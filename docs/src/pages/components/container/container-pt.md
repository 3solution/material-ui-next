---
title: React Container component
components: Container
githubLabel: 'component: Container'
---

# Container

<p class="description">O container centraliza seu conteúdo horizontalmente. É o elemento de leiaute mais básico.</p>

Enquanto os containers podem ser aninhados, a maioria dos leiautes não necessitam de um container aninhado.

[A paleta](/system/palette/) com funções de estilo.

## Fluído

A fluid container width is bounded by the `maxWidth` prop value.

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## Fixo

Se você preferir projetar um conjunto fixo de tamanhos em vez de tentar acomodar em uma visualização totalmente fluída, você pode definir a propriedade `fixed`. A largura máxima corresponde à largura mínima do ponto de quebra atual.

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```
