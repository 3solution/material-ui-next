---
title: React Autocomplete component
components: TextField, Popper, Autocomplete
githubLabel: 'component: Autocomplete'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#combobox'
---

# Autovervollständigung (Autocomplete)

<p class="description">Die Autovervollständigung ist eine normale Texteingabe, die durch ein Panel mit vorgeschlagenen Optionen ergänzt wird.</p>

Das Widget ist nützlich, um den Wert eines einzeiligen Textfeldes in einem von zwei Arten von Szenarien zu setzen:

1. Der Wert für das Textfeld muss aus einer vordefinierten Menge zulässiger Werte ausgewählt werden, z. B. ein Standortfeld, welches einen gültigen Standortnamen enthalten muss: [Combo Box](#combo-box).
2. Das Textfeld kann beliebige Werte enthalten, aber es ist vorteilhaft, dem Benutzer mögliche Werte vorzuschlagen, z. B ein Suchfeld, welches ähnliche oder frühere Suchen vorschlägt, um den Suchvorgang für den Benutzer zu beschleunigen: [free solo](#free-solo).

It's meant to be an improved version of the "react-select" and "downshift" packages.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Combo box

Der Wert muss aus einer vordefinierten Menge zulässiger Werte ausgewählt werden.

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### Spielwiese

By default, the component accepts the following options structures:

```ts
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

Wählen Sie eines der 248 Länder.

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

However, you can use different structures by providing a `getOptionLabel` prop.

### Spielwiese

Die folgenden Beispiele demonstrieren je eine Funktion der Autocomplete-Komponente.

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Länderauswahl

Wählen Sie eines der 248 Länder.

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

### Controllable states

The component has two states that can be controlled:

1. the "value" state with the `value`/`onChange` props combination. This state represents the value selected by the user, for instance when pressing <kbd>Enter</kbd>.
2. the "input value" state with the `inputValue`/`onInputChange` props combination. This state represents the value displayed in the textbox.

> ⚠️ These two state are isolated, they should be controlled independently.

{{"demo": "pages/components/autocomplete/ControllableStates.js"}}

## Free solo

Set `freeSolo` to true so the textbox can contain any arbitrary value.

### Search input

The prop is designed to cover the primary use case of a **search input** with suggestions, e.g. Google search or react-autowhatever.

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Creatable

If you intend to use this mode for a [combo box](#combo-box) like experience (an enhanced version of a select element) we recommend setting:

- `selectOnFocus` to helps the user clear the selected value.
- `clearOnBlur` to helps the user to enter a new value.
- `handleHomeEndKeys` to move focus inside the popup with the <kbd>Home</kbd> and <kbd>End</kbd> keys.
- A last option, for instance `Add "YOUR SEARCH"`.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

You could also display a dialog when the user wants to add a new value.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## Grouped

You can group the options with the `groupBy` prop. If you do so, make sure that the options are also sorted with the same dimension that they are grouped by, otherwise you will notice duplicate headers.

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Disabled options

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

For advanced customization use cases, we expose a `useAutocomplete()` hook. It accepts almost the same options as the Autocomplete component minus all the props related to the rendering of JSX. The Autocomplete component uses this hook internally.

```jsx
import useAutocomplete from '@material-ui/core/useAutocomplete';
```

- 📦 [4.5 kB gzipped](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Customized hook

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

Auch als Tags bekannt, darf der Benutzer mehr als einen Wert eingeben.

## Asynchrone Anfragen

The component supports two different asynchronous use-cases:

- [Load on open](#load-on-open): it waits for the component to be interacted with to load the options.
- [Search as you type](#search-as-you-type): a new request is made for each keystroke.

### Load on open

It displays a progress state as long as the network request is pending.

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### Search as you type

If your logic is fetching new options on each keystroke and using the current value of the textbox to filter on the server, you may want to consider throttling requests.

Additionally, you will need to disable the built-in filtering of the `Autocomplete` component by overriding the `filterOptions` prop:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

### Google Maps Ort

Eine angepasste Oberfläche für Google Maps Places Autovervollständigung.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

Für diese Demo müssen wir die [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial) API laden.

> ⚠️ Bevor Sie die Google Maps JavaScript-API verwenden können, müssen Sie sich anmelden und ein Abrechnungskonto erstellen.

## Mehrere Werte

Auch als Tags bekannt, darf der Benutzer mehr als einen Wert eingeben.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Feste Optionen

Falls Sie bestimmte Tags sperren müssen, damit sie nicht in der Schnittstelle entfernt werden können, können Sie die Chips deaktivieren.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Kontrollkästchen

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

### Limit tags

You can use the `limitTags` prop to limit the number of displayed options when not focused.

{{"demo": "pages/components/autocomplete/LimitTags.js"}}

## Größen

Fancy smaller inputs? Verwenden Sie die `size` Prop.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## Individuelle Anpassung

### Custom input

The `renderInput` prop allows you to customize the rendered input. The first argument of this render prop contains props that you need to forward. Pay specific attention to the `ref` and `inputProps` keys.

{{"demo": "pages/components/autocomplete/CustomInputAutocomplete.js"}}

### GitHub's picker

Diese Demo reproduziert die Label-Auswahl von GitHub:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Head to the [Customized hook](#customized-hook) section for a customization example with the `useAutocomplete` hook instead of the component.

## Highlights

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Benutzerderfinierter Filter

The component exposes a factory to create a filter method that can provided to the `filterOptions` prop. Sie können es verwenden, um das Standard-Filterverhalten der Option zu ändern.

```js
import { createFilterOptions } from '@material-ui/core/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### Parameter

1. `config` (*Object* [optional]):

- `config.ignoreAccents` (*Boolean* [optional]): Defaults to `true`. Remove diacritics.
- `config.ignoreCase` (*Boolean* [optional]): Defaults to `true`. Alles in Kleinbuchstaben.
- `config.limit` (*Number* [optional]): Default to null. Limit the number of suggested options to be shown. For example, if `config.limit` is `100`, only the first `100` matching options are shown. It can be useful if a lot of options match and virtualization wasn't set up.
- `config.matchFrom` (*'any' | 'start'* [optional]): Defaults to `'any'`.
- `config.stringify` (*Func* [optional]): Controls how an option is converted into a string so that it can be matched against the input text fragment.
- `config.trim` (*Boolean* [optional]): Standardeinstellung ist `false`. Abschließende Leerzeichen entfernen.

#### Rückgabewerte

`filterOptions`: the returned filter method can be provided directly to the `filterOptions` prop of the `Autocomplete` component, or the parameter of the same name for the hook.

In der folgenden Demo müssen die Optionen mit dem Abfragepräfix beginnen:

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### Erweitert

For richer filtering mechanisms, like fuzzy matching, it's recommended to look at [match-sorter](https://github.com/kentcdodds/match-sorter). Zum Beispiel:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Virtualisierung

Suche innerhalb von 10.000 zufällig generierten Optionen. Die Liste ist virtualisiert dank [react-window](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Einschränkungen

### autocomplete/autofill

Die Browser haben Heuristiken, um den Benutzern zu helfen, die Formulareingaben auszufüllen. Es kann jedoch die UX der Komponente negativ beeinflussen.

By default, the component disable the **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute.

Zusätzlich zur Speicherung der eingegebenen Werte kann der Browser aber auch **Autofill** Vorschläge vorschlagen (gespeichertes Login, Adresse oder Zahlungsinformationen). Falls Sie die automatische Füllung vermeiden möchten, können Sie Folgendes versuchen:

- Name the input without leaking any information the browser can use. e.g. `id="field1"` instead of `id="country"`. Wenn Sie die ID leer lassen, verwendet die Komponente eine zufällige ID.
- Setze `autoComplete="neues Passwort"`: jsx Setze `autoComplete="neues Passwort": 
    jsx` Setze `autoComplete="neues Passwort": 
        jsx`

  ```jsx
  inputProps={{
        ...params.inputProps,
        autoComplete: 'new-password',
      }}
      /&#062;
  ```

### iOS VoiceOver

VoiceOver auf iOS Safari unterstützt das `aria-owns` Attribut nicht sehr gut. You can work around the issue with the `disablePortal` prop.

### ListboxComponent

If you provide a custom `ListboxComponent` prop, you need to make sure that the intended scroll container has the `role` attribute set to `listbox`. This ensures the correct behavior of the scroll, for example when using the keyboard to navigate.

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

Wir empfehlen die Verwendung eines Labels für die Textbox. Die Komponente implementiert die WAI-ARIA Autorenpraktiken.
