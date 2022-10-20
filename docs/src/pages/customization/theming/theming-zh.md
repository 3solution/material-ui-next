# Theming 主题

<p class="description">定制属于你自己的 Material-UI 主题。 你可以改变颜色、文字铸排等等。</p>

主题可以指定组件的配色、平面的明暗、阴影的深浅、墨水元素的合适的不透明度等等。

样式可让您为应用程序应用一致的音调。 它可以让你 **自定义所有的设计方面** 项目，以满足您的企业或品牌的特定需求。

为了提高应用程序之间的一致性，你可以在明暗主题类型中选择。 默认情况下，组件会使用浅色的主题样式。

## ThemeProvider

如果你想要使用自定义的主题，那么需要使用 `MuiThemeProvider` 组件将样式注入到你的应用中。 但是，这是可选的；因为 Material-UI 组件带有默认主题。

`ThemeProvider` 依赖于 [React 的上下文（context）功能](https://reactjs.org/docs/context.html)来将主题传递给下级组件，所以你需要确保 `ThemeProvider` 是你试图自定义组件的父级组件。 您可以在 [API 章节](/styles/api/#themeprovider)中了解有关此内容的更多信息 。

## 主题配置变量

更改主题配置变量是将 Material-UI 与您的需求相匹配的最有效方法。 以下各节涵盖了一些最重要的主题变量：

- [Palette 调色板](/customization/palette/)
- [文字排版](/customization/typography/)
- [Spacing 间距](/customization/spacing/)
- [Breakpoints 断点](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [全局样式](/customization/globals/)
- [过渡动画](/customization/transitions/)

您可以在[默认主题部分](/customization/default-theme/)查看完整的默认样式。

### 自定义变量

当 Material-UI 的主题与[样式解决方案（styling solution）](/styles/basics/)或[任何其他解决方案](/guides/interoperability/#themeprovider)一起使用时，若您将额外的变量添加到主题中，这样就能便于在任何地方使用它们。 就像这样：

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## 访问组件中的主题

<video autoPlay muted loop width="320">
  <source src="/static/studies.mp4" type="video/mp4" >
</video>

你 [可以访问](/styles/advanced/#accessing-the-theme-in-a-component) React 组件内部的主题变量。

- [mui-theme-creator](https://bareynol.github.io/mui-theme-creator/)：一个帮助设计和定制 Material-UI 组件库主题的工具。 包括基本的网站模板，并且展示各种组件及其受主题影响的方式。
- [create-mui-theme](https://react-theming.github.io/create-mui-theme/)：使用 Material Design 颜色工具来创建 Material-UI 主题的在线工具。
- [Material palette generator](https://material.io/inline-tools/color/)：它可用于通过您输入的任何颜色生成一系列的调色板。

## 访问一个组件中的主题

你[可以访问](/styles/advanced/#accessing-the-theme-in-a-component) React 组件内部的主题变量。

## 嵌套主题

[您可以嵌套](/styles/advanced/#theme-nesting)多个主题提供者。

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

内部主题将 **覆盖** 外部主题。 你可以提供一个函数来扩展外层主题：

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

**关于性能的一个说明**

嵌套 `ThemeProvider` 组件的性能和 JSS 幕后的工作是息息相关的。 需要理解的要点是，注入的 CSS 是用下面的元组(tuple) `(styles, theme)` 缓存的。

- `theme`: 如果你在每次渲染时都提供了一个新的主题，一个新的 CSS 对象将会被生成并注入。 为了界面的一致性和性能，最好能渲染数量有限的主题对象。
- `样式`：样式对象越大，需要的运算就越多。

## API

### `createMuiTheme(options, ...args) => theme`

通过接收的选项生成一个主题基础。

#### 参数

1. `options` （*Object*）：采用不完整的主题对象并添加缺少的部分。
2. `...args` (*Array*): 将参数与即将返回的主题深度合并(deep merge)。

#### 返回结果

`theme` (*Object*): 响应式排版的新主题。

#### 例子

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

根据接收到的选项生成响应式的文字铸排设置。

#### 参数

1. `theme` (*Object*): 要增强的主题对象。
2. `options` (_Object_ [optional]):

- `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers). 一个 [breakpoints](/customization/breakpoints/) 的数组（identifiers）。 一个 [breakpoints](/customization/breakpoints/) 的数组（identifiers）。
- `disableAlign` (_Boolean_ [optional]): 默认值为`false`。 字体大小是否略有变化，这样能够保持行高并与 Material Design 的 4px 行高网格相对齐。 这需要主题样式中的无单位行高度。
- `factor` (_Number_ [optional]): 默认值是 `2`。 此值决定了字体大小调整的强度。 值越高的话，在较小的屏幕上字体大小之间的差异就越小。 值越低的话，在较小屏幕上的字体就越大。 该值必须大于1。
- `variants` (_Array\<String\>_ [optional])：默认值为 all。 需要处理的文字变体。

#### 返回结果

生成一个主题，该主题减少 [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) 内的警告数量，类似于 `Warning: findDOMNode is deprecated in StrictMode`。

#### 例子

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

使用 `unstable_createMuiStrictModeTheme` 会限制某些组件的使用。

生成一个减少 [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) 内的警告数量的主题，类似于 `Warning: findDOMNode is deprecated in StrictMode`。

#### 要求

目前 `unstable_createMuiStrictModeTheme` 没有添加额外的要求。

#### 参数

1. `options` （*Object*）：采用不完整的主题对象并添加缺少的部分。
2. `...args` (*Array*): 将参数与即将返回的主题深度合并(deep merge)。

#### 返回结果

`theme` (*Object*): 响应式排版的新主题。

#### 例子

```js
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>
  );
}
```
