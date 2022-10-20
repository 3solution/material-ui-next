---
title: Компонент React Autocomplete
components: TextField, Popper, Autocomplete
githubLabel: 'component: Autocomplete'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#combobox'
---

# Autocomplete (Автодополнение)

<p class="description">Автодополнение - это обычный ввод текста, дополненный панелью предлагаемых опций.</p>

Этот виджет используется для установки значения однострочного текстового поля. Он полезен в одном из двух случев:

1. Значение для текстового поля должно быть выбрано из предопределенного набора допустимых значений, например, поле местоположения должно содержать действительное имя местоположения: [поле со списком](#combo-box).
2. Текстовое поле может содержать любое произвольное значение, но целесообразно предлагать пользователю возможные значения. Например, поле поиска может предлагать аналогичные или предыдущие поиски, чтобы сэкономить время пользователя: [free solo](#free-solo).

It's meant to be an improved version of the "react-select" and "downshift" packages.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Комбо-Бокс

Значение должно быть выбрано из предопределенного набора допустимых значений.

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### Песочница

By default, the component accepts the following options structures:

```ts
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

например:

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

However, you can use different structures by providing a `getOptionLabel` prop.

### Песочница

Каждый из следующих примеров демонстрирует одну функцию компонента автозаполнения.

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Выбор страны

Choose one of the 248 countries.

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

### Controllable states

The component has two states that can be controlled:

1. the "value" state with the `value`/`onChange` props combination. This state represents the value selected by the user, for instance when pressing <kbd>Enter</kbd>.
2. the "input value" state with the `inputValue`/`onInputChange` props combination. This state represents the value displayed in the textbox.

> ⚠️ These two state are isolated, they should be controlled independently.

{{"demo": "pages/components/autocomplete/ControllableStates.js"}}

## Произвольное значение

Установите для `freeSolo` значение true, чтобы текстовое поле могло содержать любое произвольное значение.

### Search input

Вы также можете показать диалоговое окно, если пользователь хочет добавить новое значение.

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Creatable

If you intend to use this mode for a [combo box](#combo-box) like experience (an enhanced version of a select element) we recommend setting:

- `selectOnFocus` to helps the user clear the selected value.
- `clearOnBlur` to helps the user to enter a new value.
- `handleHomeEndKeys` to move focus inside the popup with the <kbd>Home</kbd> and <kbd>End</kbd> keys.
- A last option, for instance `Add "YOUR SEARCH"`.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

Вы также можете показать диалоговое окно, если пользователь хочет добавить новое значение.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## Сгруппированные

You can group the options with the `groupBy` prop. If you do so, make sure that the options are also sorted with the same dimension that they are grouped by, otherwise you will notice duplicate headers.

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Отключенные опции

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

Для продвинутой кастомизации используйте `useAutocomplete()` хук. It accepts almost the same options as the Autocomplete component minus all the props related to the rendering of JSX. The Autocomplete component uses this hook internally.

```jsx
import useAutocomplete from '@material-ui/core/useAutocomplete';
```

- 4.5 [4,5 кБ в сжатом виде](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Customized hook

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

Head to the [Customized Autocomplete](#customized-autocomplete) section for a customization example with the `Autocomplete` component instead of the hook.

## Асинхронные запросы

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

### Места Google Maps

A customized UI for Google Maps Places Autocomplete.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

For this demo, we need to load the [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial) API.

> ⚠️ Before you can start using the Google Maps JavaScript API, you must sign up and create a billing account.

## Множественные значения

Also known as tags, the user is allowed to enter more than one value.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Фиксированные опции

В случае, если вам нужно зафиксировать определенный тег (так что он не мог быть удалён через интерфейс), вы можете установить chips в состояние disabled.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Чекбоксы

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

### Limit tags

You can use the `limitTags` prop to limit the number of displayed options when not focused.

{{"demo": "pages/components/autocomplete/LimitTags.js"}}

## Размеры

Fancy smaller inputs? Use the `size` prop.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## Кастомизация

### Custom input

The `renderInput` prop allows you to customize the rendered input. The first argument of this render prop contains props that you need to forward. Pay specific attention to the `ref` and `inputProps` keys.

{{"demo": "pages/components/autocomplete/CustomInputAutocomplete.js"}}

### GitHub's picker

This demo reproduces the GitHub's label picker:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Head to the [Customized hook](#customized-hook) section for a customization example with the `useAutocomplete` hook instead of the component.

## Highlights

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Пользовательский фильтр

The component exposes a factory to create a filter method that can provided to the `filterOptions` prop. You can use it to change the default option filter behavior.

```js
import { createFilterOptions } from '@material-ui/core/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### Аргументы

1. `config` (*Object* [optional]):

- `config.ignoreAccents` (*Boolean* [optional]): Defaults to `true`. Remove diacritics.
- `config.ignoreCase` (*Boolean* [optional]): Defaults to `true`. Lowercase everything.
- `config.limit` (*Number* [optional]): Default to null. Limit the number of suggested options to be shown. For example, if `config.limit` is `100`, only the first `100` matching options are shown. It can be useful if a lot of options match and virtualization wasn't set up.
- `config.matchFrom` (*'any' | 'start'* [optional]): Defaults to `'any'`.
- `config.stringify` (*Func* [optional]): Controls how an option is converted into a string so that it can be matched against the input text fragment.
- `config.trim` (*Boolean* [optional]): По умолчанию - `false`. Remove trailing spaces.

#### Возвращает

`filterOptions`: the returned filter method can be provided directly to the `filterOptions` prop of the `Autocomplete` component, or the parameter of the same name for the hook.

In the following demo, the options need to start with the query prefix:

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### Дополнительные параметры

For richer filtering mechanisms, like fuzzy matching, it's recommended to look at [match-sorter](https://github.com/kentcdodds/match-sorter). Например:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Виртуализация

Поиск в 10000 случайно сгенерированных опций. Список виртуализирован благодаря [реагирующему окну](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Ограничения

### autocomplete/autofill

The browsers have heuristics to help the users fill the form inputs. However, it can harm the UX of the component.

By default, the component disable the **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute.

Однако, помимо запоминания введенных ранее значений браузер может также предложить **автозаполнение** (сохраненный логин, адрес или платежная информация). In the event you want the avoid autofill, you can try the following:

- Name the input without leaking any information the browser can use. e.g. `id="field1"` instead of `id="country"`. If you leave the id empty, the component uses a random id.
- Set `autoComplete="new-password"`: jsx Set `autoComplete="new-password": 
    jsx` Set `autoComplete="new-password": 
        jsx`

  ```jsx
  inputProps={{
        ...params.inputProps,
        autoComplete: 'new-password',
      }}
      /&#062;
  ```

### iOS VoiceOver

VoiceOver on iOS Safari doesn't support the `aria-owns` attribute very well. You can work around the issue with the `disablePortal` prop.

### ListboxComponent

If you provide a custom `ListboxComponent` prop, you need to make sure that the intended scroll container has the `role` attribute set to `listbox`. This ensures the correct behavior of the scroll, for example when using the keyboard to navigate.

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

We encourage the usage of a label for the textbox. The component implements the WAI-ARIA authoring practices.
