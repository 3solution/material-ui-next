---
title: React Checkbox component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
materialDesign: 'https://material.io/components/selection-controls#checkboxes'
githubLabel: 'component: Checkbox'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#checkbox'
---

# Caixa de seleção

<p class="description">Caixas de seleção permitem ao usuário selecionar um ou mais itens de um conjunto.</p>

[Caixas de Seleção](https://material.io/design/components/selection-controls.html#checkboxes) podem ser usadas para ativar ou desativar uma opção.

Se você tem várias opções aparecendo em uma lista, você pode economizar espaço usando caixas de seleção ao invés de interruptores liga/desliga. Se você tem uma única opção, evite usar uma caixa de seleção e use um interruptor de liga/desliga.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Caixa de seleção básica

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

## Caixa de seleção com FormControlLabel

A checkbox input can only have two states in a form: checked or unchecked. It either submits its value or doesn't. Visually, there are actually three states a checkbox can be in: checked, unchecked, or indeterminate.

{{"demo": "pages/components/checkboxes/IndeterminateCheckbox.js"}}

## Caixas de seleção com FormGroup

O componente `Checkbox` pode ser exibido com um rótulo graças ao componente `FormControlLabel`.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Posicionamento do rótulo

`FormGroup` é usado para agrupar componentes de seleção para facilitar o uso da API.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Posicionamento do rótulo

Você pode alterar o posicionamento do rótulo:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Caixa de seleção customizada

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js", "defaultCodeOpen": false}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/checkbox).

## Quando usar

- [Caixas de Seleção vs. Botões de Opção](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Caixas de Seleção vs. Interruptores](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e interruptores. Na maioria dos casos, isso é feito usando o elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```
