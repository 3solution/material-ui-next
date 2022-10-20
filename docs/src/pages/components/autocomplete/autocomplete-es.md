---
title: React Autocomplete component
components: TextField, Popper, Autocomplete
githubLabel: 'component: Autocomplete'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#combobox'
---

# Autocompletado

<p class="description">El autocompletado es una caja de texto normal mejorada por un panel de opciones sugeridas.</p>

El widget es útil para establecer el valor de un cuadro de texto de una sola línea en uno de los dos tipos de escenarios:

1. El valor para el cuadro de texto debe elegirse de un conjunto predefinido de valores permitidos, por ejemplo, un campo de ubicación debe contener un nombre de ubicación válido: [cuadro combinado](#combo-box).
2. El cuadro de texto puede contener cualquier valor arbitrario, pero es ventajoso sugerir posibles valores al usuario, por ejemplo, un campo de búsqueda puede sugerir búsquedas similares o anteriores para ahorrarle tiempo al usuario: [gratis solo](#free-solo).

Esto pretende ser una versión mejorada de los paquetes "react-select" y "downshift".

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Combo box

El valor debe elegirse de un conjunto predefinido de valores permitidos.

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### Campo de pruebas

Por defecto, el componente acepta la siguiente estructura de opciones:

```ts
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

por ejemplo:

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

However, you can use different structures by providing a `getOptionLabel` prop.

### Campo de pruebas

Cada uno de los siguientes ejemplos demuestran una característica del componente Autocompletado.

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Selección de País

Selecciona uno de los 248 países.

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

### Estados controlables

El componente tiene dos estados que pueden ser controlados:

1. el "valor" del estado con la combinación de props `value`/`onChange`. Este estado representa el valor seleccionado por el usuario, por ejemplo al pulsar <kbd>Enter</kbd>.
2. el estado "valor de entrada" con la combinación de props `inputValue`/`onInputChange`. Este estado representa el valor mostrado en el campo de texto.

> ⚠️ Estos dos estados son aislados, deben ser controlados de forma independiente.

{{"demo": "pages/components/autocomplete/ControllableStates.js"}}

## Free solo

Setear `freeSolo` a true, para que el cuadro de texto pueda contener cualquier valor arbitrario.

### Campo de búsqueda

También puedes mostrar un diálogo cuando el usuario quiere añadir un nuevo valor.

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Creable

Si pretendes usar este modo para una experiencia similar a un [combo box](#combo-box) (una versión mejora de un selector de elementos) te recomendamos configurar:

- `selectOnFocus` que ayuda al usuario a borrar el valor seleccionado.
- `clearOnBlur` que ayuda a que el usuario introduzca un nuevo valor.
- `handleHomeEndKeys` para mover el foco dentro de la ventana emergente con las claves <kbd>Home</kbd> y <kbd>End</kbd>.
- Una última opción, por ejemplo `Agregar "SU BÚSQUEDA"`.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

También puedes mostrar un diálogo cuando el usuario quiere añadir un nuevo valor.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## Agrupado

Puedes agrupar las opciones con el accesorio `groupBy`. Si lo haces, asegúrate de que las opciones también están ordenadas con la misma dimensión con la que están agrupadas, de lo contrario se crearan cabeceras duplicadas.

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Deshabilitar opciones

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

Para la personalización avanzada de casos de uso, exponemos un hook `useAutocomplete()`. Acepta casi las mismas opciones que el componente Autocompletar menus las propiedades relacionadas al renderizado de JSX. El componente Autocompletar usa este hook internamente.

```jsx
importar useAutocomplete de '@material-ui/core/useAutocomplete';
```

- 📦 [4.5 kB comprimido](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Hook personalizado

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

También conocidos como etiquetas, el usuario puede introducir más de un valor.

## Peticiones asíncronas

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

### Lugar de Google Maps

Una interfaz de usuario personalizado para el autocompletar de Google Maps Places.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

Para esta demostración, tenemos que cargar la API de [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial).

> ⚠️ Antes de empezar a usar la API de Google Maps JavaScript, debes registrarte y crear una cuenta de facturación.

## Valores múltiples

También conocidos como etiquetas, el usuario puede introducir más de un valor.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Opciones fijas

En caso de que necesites bloquear ciertas etiquetas de modo que no puedan ser removidas en la interfaz, se puede deshabilitar los chips.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Casillas de Verificación

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

### Limitar las etiquetas

Puedes utilizar la propiedad `limitTags` para limitar el número de opciones que aparecen cuando no se selecciona.

{{"demo": "pages/components/autocomplete/LimitTags.js"}}

## Tamaños

Fancy smaller inputs? Use the `size` prop.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## Personalización

### Custom input

The `renderInput` prop allows you to customize the rendered input. The first argument of this render prop contains props that you need to forward. Pay specific attention to the `ref` and `inputProps` keys.

{{"demo": "pages/components/autocomplete/CustomInputAutocomplete.js"}}

### Selector de GitHub

Esta demo reproduce el selector de etiquetas de GitHub:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Dirígete a la sección de [Hook personalizado](#customized-hook) para un ejemplo de personalización con el hook `useAutocomplete` en lugar del componente.

## Destacados

La siguiente demostración se basa en [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), una pequeña utilidad (1 kB) para resaltar texto en componentes de autosuggest y autocompletar.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Filtro personalizado

El componente expone una factoría para crear un método de filtrado para proveer a la propiedad `filterOptions`. Puede usarse para cambiar el comportamiento de filtrado por defecto.

```js
import { createFilterOptions } from '@material-ui/core/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### Argumentos

1. `config` (*Object* [optional]):

- `config.ignoreAccents` (*Boolean* [optional]): Por defecto a `true`. Elimina los acentos.
- `config.ignoreCase` (*Boolean* [optional]): Por defecto a `true`. En minúsculas todo.
- `config.limit` (*Number* [optional]): Por defecto a null. Limita el número de opciones sugeridas para ser mostrado. Por ejemplo, si `config.limit` es `100`, sólo las primeras `100` coincidencias se muestran. Esto puede ser útil si existe muchas coincidencias y la virtualización no estaba establecida.
- `config.matchFrom` (*'any' | 'start'* [optional]): Por defecto a `'any'`.
- `config.stringify` (*Func* [optional]): Controla cómo una opción se convierte en una cadena, de manera que se pueden combinar en contra de la entrada de texto del fragmento.
- `config.trim` (*Boolean* [optional]): Por defecto a `false`. Eliminar espacios en blanco.

#### Regresa

`filterOptions`: método de filtro devuelto puede ser provisto directamente a la propiedad `filterOptions` del componente `Autocompletar`, o el parámetro del mismo nombre para el hook.

En la siguiente demostración, las opciones que se necesitan para iniciar con la consulta prefijo:

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### Avanzado

Para mecanismos de filtrado más completos, como la coincidencia aproximada, se recomienda buscar en [match-sorter de](https://github.com/kentcdodds/match-sorter). Por ejemplo:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Virtualización

Buscar entre 10.000 opciones generadas al azar. La lista está virtualizada gracias a [react-window](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Limitaciones

### autocompletar/autorellenar

Los navegadores tienen heurísticos para ayudar a los usuarios a rellenar el formulario. Sin embargo, puede dañar la experiencia de usuario del componente.

Dirígete a la sección [Autocompletar Personalizado](#customized-autocomplete) para un ejemplo de personalización con el componente `Autcompletar` en vez del hook.

Sin embargo, además de recordar el valor introducido anteriormente, el navegador también puede proponer sugerencias **autorellenadas** (inicio de sesión guardado, la dirección o detalles de pago). En el caso de que desees evitar el autorellenar, puedes intentar lo siguiente:

- Nombra la entrada sin filtrar ninguna información que el navegador pueda utilizar. p.e. `id="field1"` en vez de `id="country"`. Si dejas el id de vacío, el componente utiliza un identificador aleatorio.
- Establecer `autoComplete="new-password"`: jsx Establecer `autoComplete="new-password": 
    jsx` Establecer `autoComplete="new-password": 
        jsx`

  ```jsx
  inputProps={{
        ...params.inputProps,
        autoComplete: 'new-password',
      }}
      /&#062;
  ```

### iOS VoiceOver

VoiceOver en iOS Safari no soporta el atributo `aria-owns` especialmente bien. Puedes solucionar el problema con la propiedad `disablePortal`.

### ListboxComponent

If you provide a custom `ListboxComponent` prop, you need to make sure that the intended scroll container has the `role` attribute set to `listbox`. This ensures the correct behavior of the scroll, for example when using the keyboard to navigate.

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

We encourage the usage of a label for the textbox. El componente implementa las prácticas de creación de WAI-ARIA.
