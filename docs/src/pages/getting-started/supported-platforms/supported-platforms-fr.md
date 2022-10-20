# Plateformes supportées

<p class="description">En savoir plus sur les plateformes, des plus anciennes aux plus modernes, prises en charge par Material-UI.</p>

## Navigateur

Material-UI prend en charge les dernières versions stables de tous les principaux navigateurs et plates-formes. You don't need to provide any JavaScript polyfill as it manages unsupported browser features internally and in isolation.

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari |
|:----- |:------- |:------ |:------ |
| >= 83 | >= 68   | >= 83  | >= 13  |

If you need to support IE 11, check out our [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).

Étant donné que Googlebot utilise un service de rendu Web (WRS) pour indexer le contenu de la page, il est essentiel que Material-UI le prenne en charge. [WRS regularly updates the rendering engine it uses](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Vous pouvez vous attendre à ce que les composants de Material-UI soient rendus sans problèmes majeurs.

## Serveur

<!-- #stable-snapshot -->

We support [Node.js](https://github.com/nodejs/node) starting with version 10 for server-side rendering. Where possible, the [LTS versions that are in maintenance](https://github.com/nodejs/Release#lts-schedule1) are supported.

### Préfixes CSS

Be aware that some CSS features [require](https://github.com/cssinjs/jss/issues/279) an additional postprocessing step that adds vendor-specific prefixes. These prefixes are automatically added to the client thanks to [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

The CSS served on this documentation is processed with [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). You can use [the documentation implementation](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) as inspiration. Be aware that it has an implication with the performance of the page. It's a must-do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages.

## React

Material-UI supports the most recent versions of React, starting with ^16.8.0 (the one with the hooks). Have a look at the older [versions](https://material-ui.com/versions/) for backward compatibility.

## TypeScript

Material-UI requires a minimum version of TypeScript 3.2.
