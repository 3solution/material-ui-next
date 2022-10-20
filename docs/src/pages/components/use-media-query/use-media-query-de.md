---
title: Medienanfragen in React für Responsive Design
githubLabel: 'hook: useMediaQuery'
---

# useMediaQuery

<p class="description">Dies ist ein CSS-Media-Abfrage-Hook für React. Es wartet auf Übereinstimmungen mit einer CSS-Medienabfrage. Es ermöglicht das Rendern von Komponenten basierend darauf, ob die Abfrage übereinstimmt oder nicht.</p>

Einige der wichtigsten Funktionen:

- ⚛️ Es verfügt über eine idiomatische React-API.
- 🚀 Es ist performant. Es observiert das Dokument, welches erkennt, wenn sich die Medienabfragen ändern, anstatt die Werte regelmäßig abzufragen.
- 📦 [ kB](/size-snapshot) gzipped.
- 🤖 Es unterstützt serverseitiges Rendering.

Die Style-Funktion der [Palette](/system/palette/).

## Einfache Medienabfrage

Sie sollten eine Medienabfrage für das erste Argument des Hooks bereitstellen. The media query string can be any valid CSS media query, e.g. [`'(prefers-color-scheme: dark)'`](/customization/palette/#user-preference).

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

⚠️ You can't use `'print'` per browsers limitation, e.g. [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=774398).

## Verwenden der Haltepunkt-Helfer der Material-UI

Sie können die Material-UI [Haltepunkt-Helfer](/customization/breakpoints/) wie folgt verwenden:

```jsx
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') entspricht: ${matches}`}</span>;
}
```

{{"demo": "pages/components/use-media-query/ThemeHelper.js", "defaultCodeOpen": false}}

Alternatively, you can use a callback function, accepting the theme as a first argument:

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

⚠️ There is **no default** theme support, you have to inject it in a parent theme provider.

## JavaScript-Syntax verwenden

You can use [json2mq](https://github.com/akiran/json2mq) to generate media query string from a JavaScript object.

{{"demo": "pages/components/use-media-query/JavaScriptMedia.js", "defaultCodeOpen": true}}

## Testen

You need an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in your test environment.

For instance, [jsdom doesn't support it yet](https://github.com/jsdom/jsdom/blob/master/test/web-platform-tests/to-upstream/html/browsers/the-window-object/window-properties-dont-upstream.html). Du solltest ein Polyfill benutzen. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it is recommended.

```js
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}

describe('MyTests', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
});
```

## Server-Rendering

> ⚠️ Server-side rendering and client-side media queries are fundamentally at odds. Be aware of the tradeoff. The support can only be partial.

Try relying on client-side CSS media queries first. Zum Beispiel könnten Sie verwenden:

- [`<Box display>`](/system/display/#hiding-elements)
- [`themes.breakpoints.up(x)`](/customization/breakpoints/#css-media-queries)
- or [`<Hidden implementation="css">`](/components/hidden/#css)

If none of the above alternatives are an option, you can proceed reading this section of the documentation.

First, you need to guess the characteristics of the client request, from the server. You have the choice between using:

- **User Agent**. Parsen Sie den User-Agent-String des Clients, um Informationen zu extrahieren. Using [ua-parser-js](https://github.com/faisalman/ua-parser-js) to parse the user agent is recommended.
- **Client hints**. Read the hints the client is sending to the server. Be aware that this feature is [not supported everywhere](https://caniuse.com/#search=client%20hint).

Finally, you need to provide an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to the `useMediaQuery` with the previously guessed characteristics. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate matchMedia is recommended.

For instance on the server-side:

```js
import ReactDOMServer from 'react-dom/server';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/core/styles';

function handleRender(req, res) {
  const deviceType = parser(req.headers['user-agent']).device.type || 'desktop';
  const ssrMatchMedia = query => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      import ReactDOMServer from 'react-dom/server';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/core/styles';

function handleRender(req, res) {
  const deviceType = parser(req.headers['user-agent']).device.type || 'desktop';
  const ssrMatchMedia = query => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser. width: deviceType === 'mobile' ? '0px' : '1024px',
    }),
  });

  const html = ReactDOMServer.renderToString(
    <ThemeProvider
      theme={{
        props: {
          // Change the default options of useMediaQuery
          MuiUseMediaQuery: { ssrMatchMedia },
        },
      }}
    >
      <App />
    </ThemeProvider>,
  );

  // …
}
}
}
```

{{"demo": "pages/components/use-media-query/ServerSide.js", "defaultCodeOpen": false}}

Make sure you provide the same custom match media implementation to the client-side to guarantee a hydration match.

## Migration von `withWidth()`

Die Komponente höherer Ordnung `withWidth()` fügt die Bildschirmbreite der Seite ein. Sie können dasselbe Verhalten mit einem `useWidth` Hook reproduzieren:

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### Parameter

1. `query` (*String* | *Function*): A string representing the media query to handle or a callback function accepting the theme (in the context) that returns a string.
2. `options` (*Object* [optional]):

- `options.defaultMatches` (*Boolean* [optional]): Da `window.matchMedia()` auf dem Server nicht verfügbar ist, wird ein Standard Match zurückgegeben. Der Standardwert ist `false`.
- `options.matchMedia` (*Function* [optional]) You can provide your own implementation of *matchMedia*. This can be used for handling an iframe content window.
- `options.noSsr` (*Boolean* [optional]): Standardeinstellung ist `false`. Um den serverseitigen Renderingabgleich durchzuführen, muss er zweimal gerendert werden. Ein erstes Mal mit nichts und ein zweites Mal mit den Kind-Elementen. Dieser Zyklus mit zwei Durchgängen ist mit einem Nachteil verbunden. Es ist langsamer. Sie können diese Flag auf `true` setzten, wenn Sie **nicht serverseitig** rendern.
- `options.ssrMatchMedia` (*Function* [optional]) You can provide your own implementation of *matchMedia* in a [server-side rendering context](#server-side-rendering).

Note: You can change the default options using the [`default props`](/customization/globals/#default-props) feature of the theme with the `MuiUseMediaQuery` key.

#### Rückgabewerte

`matches`: Match ist `true` wenn das Dokument aktuell mit der Medienabfrage übereinstimmt, und `false` wenn dies nicht der Fall ist.

#### Beispiele

```jsx
import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```
