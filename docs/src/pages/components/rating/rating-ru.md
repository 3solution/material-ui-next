---
title: Компонент React Rating
components: Rating
githubLabel: 'component: Rating'
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
---

# Rating

<p class="description">Рейтинги дают представление о мнении и опыте других и позволяют пользователю дать собственную оценку.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic rating

{{"demo": "pages/components/rating/BasicRating.js"}}

## Rating precision

The rating can display any float number with the `value` prop. Use the `precision` prop to define the minimum increment value change allowed.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Hover feedback

You can display a label on hover to help the user pick the correct rating value. The demo uses the `onChangeActive` prop.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Размеры

For larger or smaller ratings use the `size` prop.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Customized rating

Ниже находятся примеры кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/rating/CustomizedRating.js"}}

## Доступность

([WAI tutorial](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

Доступность этого компонента зависит от:

- A radio group with its fields visually hidden. It contains six radio buttons, one for each star, and another for 0 stars that is checked by default. Be sure to provide a value for the `name` prop that is unique to the parent form.
- Labels for the radio buttons containing actual text (“1 Star”, “2 Stars”, …). Be sure to provide a suitable function to the `getLabelText` prop when the page is in a language other than English. You can use the [included locales](https://material-ui.com/guides/localization/), or provide your own.
- A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons)to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo. This is important to match [success Criterion 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) of WCAG2.1.

{{"demo": "pages/components/rating/TextRating.js"}}

### ARIA

The read only rating has a role of "img", and an aria-label that describes the displayed rating.

### Keyboard

Because the rating component uses radio buttons, keyboard interaction follows the native browser behavior. Tab will focus the current rating, and cursor keys control the selected rating.

The read only rating is not focusable.
