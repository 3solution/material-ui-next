# Unterstützte Plattformen

<p class="description">Erfahren Sie, welche von der modernen bis zu alten Plattformen von Material-UI unterstützt werden.</p>

## Browser

Die Material-UI unterstützt die neuesten, stabilen Versionen aller gängigen Browser und Plattformen. You don't need to provide any JavaScript polyfill as it manages unsupported browser features internally and in isolation.

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari |
|:----- |:------- |:------ |:------ |
| >= 83 | >= 68   | >= 83  | >= 13  |

If you need to support IE 11, check out our [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).

Da Googlebot einen Web-Rendering-Service (WRS) zum Indizieren des Seiteninhalts verwendet, ist es entscheidend, dass Material-UI dies unterstützt. [WRS aktualisiert regelmäßig die verwendete Rendering-Engine](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Sie können erwarten, dass die Komponenten von Material-UI ohne größere Probleme gerendert werden.

## Server

<!-- #stable-snapshot -->

We support [Node.js](https://github.com/nodejs/node) starting with version 10 for server-side rendering. Where possible, the [LTS versions that are in maintenance](https://github.com/nodejs/Release#lts-schedule1) are supported.

### CSS-Präfix

Be aware that some CSS features [require](https://github.com/cssinjs/jss/issues/279) an additional postprocessing step that adds vendor-specific prefixes. These prefixes are automatically added to the client thanks to [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

Das in dieser Dokumentation bereitgestellte CSS wird mit dem [`Autoprefixer`](https://www.npmjs.com/package/autoprefixer) verarbeitet. Sie können die [Dokumentationsimplementierung](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) als Inspiration verwenden. Beachten Sie, dass dies Auswirkungen auf die Leistung der Seite hat. It's a must-do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages.

## React

Material-UI supports the most recent versions of React, starting with ^16.8.0 (the one with the hooks). Have a look at the older [versions](https://material-ui.com/versions/) for backward compatibility.

## TypeScript

Material-UI requires a minimum version of TypeScript 3.2.
