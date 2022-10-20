# z-index

<p class="description">Der z-index ist die CSS-Eigenschaft, die das Layout steuert, indem eine dritte Achse zum Anordnen von Inhalt bereitgestellt wird.</p>

Einige Material-UI-Komponenten verwenden den `z-Index`. Es wird eine Standard-z-Index-Skala in Material-UI verwendet, die Schubladen, Modalen, Snackbars, QuickInfos und mehr ordentlich übereinander legt.

The `z-index` values start at an arbitrary number, high and specific enough to ideally avoid conflicts:

- mobile stepper: 1000
- speed dial: 1050
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

Diese Werte können immer angepasst werden. You will find them in the theme under the [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) key of the theme. Von der individuellen Anpassung einzelner Werte wird abgeraten. Wenn Sie einen ändern, müssen Sie wahrscheinlich alle ändern.
