# 过渡动画

<p class="description">主题键使您能够自定义使用跨 Material-UI 组件的各种过渡动画的时长和缓动效果，并且它也提供了一个用于创建自定义过渡动画的工具集。</p>

## API

### `theme.transitions.create(props, options) => transition
`

#### 参数

1. `props` (_String_ | _String[]_)：默认值为 `['all']`。 这将提供一个 CSS 属性，或者提供一个应该具有动画效果的 CSS 属性列表。
2. `options` (_Object_ [optional]):

- `options.duration` (_String_ | _Number_ [optional])：默认为 `theme.transitions.duration.standard`。 这将提供动画效果的时长。
- `options.easing` (_String_ [optional])：默认为 `theme.transitions.easing.easeInOut`。 这将为动画提供缓动效果。
- `options.delay` (_String_ | _Number_ [optional])：默认为 `0`。 这将为动画提供延迟效果。

#### 返回结果

`

`transition`：一个 CSS 的动画值，它包含了所有需要应用动画效果的 CSS 属性，以及定义的时长、缓动效果。</p>

```js
theme.transitions.create(['background-color', 'transform']);

```

#### 示例

{{"demo": "pages/customization/transitions/TransitionHover.js", "defaultCodeOpen": false}}

### `theme.transitions.getAutoHeightDuration(height) => duration`

#### 参数

1. `height` (_Number_)：组件的高度。

#### 返回结果

`duration`：基于高度计算出来的时长。

## 时长

你可以更改其中部分或全部的时长，或者提供你想要的时长（供 `create()` 助手使用）。 此示例显示了所有默认值（以毫秒为单位），但你只需要提供你想要更改或添加的键。

```js
const theme = createMuiTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // 最基本的建议时间
      standard: 300,
      // 这将用于复杂的动画中
      complex: 375,
      // 当有东西转进屏幕时建议使用
      enteringScreen: 225,
      // 当有东西转出屏幕时建议使用
      leavingScreen: 195,
    },
  },
});
```

## 缓动

你可以通过提供一个自定义的 CSS <code>transition-timing-function</code> 值来改变部分或全部的缓动值，或者提供你自己的缓动值。

```js
const theme = createMuiTheme({
  transitions: {
    easing: {
      // 这是最常见的缓和曲线（easing curve）。
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // 物体以全速从屏幕外进入屏幕，并在屏幕上以全速前进。
      // 缓慢减速至静止点。
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // 物体以全速离开屏幕。 它们在屏幕外不会减速。
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // 锐化曲线是由可能随时返回屏幕的对象使用的。
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});
```

## 参考

你可以通过提供一个自定义的 CSS <code>transition-timing-function</code> 值来改变部分或全部的缓动值，或者提供你自己的缓动值。
