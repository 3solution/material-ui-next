---
title: React 图标组件
components: Icon, SvgIcon
githubLabel: 'components: SvgIcon'
materialDesign: https://material.io/design/iconography/system-icons.html
---

# Icons 图标

<p class="description">我们提供了一些建议和指导，能够帮组您在 Material-UI 中使用图标。</p>

Material-UI 通过以下三种方式来支持图标的使用：

1. 您可以将标准的 [Material Design 图标](#material-icons) 导出为 React 组件 (SVG icons)。
1. 或者可以将自定义的 SVG 图标通过 [SvgIcon](#svgicon) 组件来包装成一个 React 组件。
1. 或者可以将自定义的 font 图标通过 [ Icon ](#icon-font-icons) 组件来包装成一个 React 组件。

## Material Icons 图标

Material Design 已经将1,100多个官方图标标准化，而每个图标都有五个不同的“主题”(见下文)。 对于每个 SVG 图标，我们从 @ material-ui/icons 包中导出相应的React组件。 您可以 [搜索完整的图标列表](/components/material-icons/)。

### 安装

请在您的项目目录中用以下方式安装依赖包：

```sh
// 使用 npm 安装
npm install @material-ui/icons@next

// 使用 yarn 安装
yarn add @material-ui/icons@next
```

这些组件使用 Material-UI 的`SvgIcon` 组件来渲染每个图标的 SVG 路径，因此对 `@materialui/core` 具有对等依赖性。

如果你还没有在你的项目中使用 Material-UI，你可以用以下方法添加它：

```sh
// 用 npm 安装
npm install @material-ui/core@next

// 用 yarn 安装
yarn add @material-ui/core@next
```

### 使用

有两种导入图标的方法：

- 方法 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- 方法 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

对于捆绑包的大小来说，最安全的是方案 1，但有些开发者更喜欢方案 2。 在使用第二个方法之前，请确保您遵循 [最小化捆绑包大小指南](/guides/minimizing-bundle-size/#option-2)。

每个 Material icon 都有一个“主题”：Filled（默认）, Outlined, Rounded, Two-tone, 和 Sharp。 要导入非默认主题的图标组件，请在图标名称后附加主题名称。 例如，`@material-ui/icons/Delete` 图标可以：

- 导出为 Filled 主题（默认值）：`@material-ui/icons/Delete`，
- 导出为 Outlined 主题：`@material-ui/icons/DeleteOutlined`，
- 导出为 Rounded 主题：`@material-ui/icons/DeleteRounded `，
- 导出为 Twotone 主题：`@material-ui/icons/DeleteTwoTone `，
- 导出为 Sharp 主题：`@material-ui/icons/DeleteSharp `，

> 友情提示：Material Design 在命名图标的时候遵循了 “snake_case” 变量命名法（例如，`delete_forever` 和 `add_a_photo`），而 `@material-ui/icons` 则使用 “PascalCase” 来命名导出的相应图标（例如，`DeleteForever` 以及 `AddAPhoto`）。 并且此命名规则有三个特例：`3d_rotation` 导出为 `ThreeDRotation`，`4k` 导出为 `FourK`，以及 `360` 导出为 `ThreeSixty`。

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

### 测试

出于测试目的，每个从 `@material-ui/icons` 暴露的图标都有一个 `data-testid` 属性，这其中包含了图标的名称。 就像这样：

```jsx
import DeleteIcon from '@material-ui/icons/Delete';
```

一旦挂载后，它就具有以下属性：

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon（Svg 图标）

如果你需要使用自定义的 SVG 图标（在 [Material Icons](/components/material-icons/) 中不可用），那么你可以使用 `SvgIcon` 包装器来实现它。 此组件是原生 `<svg>` 元素的拓展版：

- 它具备一些内置的无障碍设计。
- SVG 元素应该在 24x24px 的视口中进行缩放，这样所渲染的图标就可以按原样使用，或者作为其他使用图标的 Material-UI 组件的子元素。 （使用 `viewBox` 属性，您可以随意自定义）。
- 默认情况下，此组件会继承当前的颜色。 当然，通过 `color` 这个属性，你可以让图标使用主题里的颜色。

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### Color 颜色

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Size 大小

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### 组件属性

即使图标以 `.svg` 的格式保存，你依然可以使用 `SvgIcon` 来包装它。 通过 [svgr](https://github.com/smooth-code/svgr) 提供的加载器，您可以导入 SVG 文件，并以 React 组件形式使用。 譬如，使用 webpack ：

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// ---
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

通过 “url-loader” 或 “file-loader” 加载也是可行的。 这是 Create React App 使用的方法。

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
}

// ---
import { ReactComponent as StarIcon } from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

### createSvgIcon

`createSvgIcon` 工具集是用于创建 [材料图标](#material-icons) 的。 它可以用来包装一个带有 SvgIcon 组件的 SVG 路径。

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
```

{{"demo": "pages/components/icons/CreateSvgIcon.js"}}

### Font Awesome

如果你发现在使用来自 `@fortawesome/react-fontawesome` 的 FontAwesomeIcon 时存在布局问题，你可以尝试将 Font Awesome SVG 数据直接传递给 SvgIcon。

如下是一个同时使用[Font Awesome](https://fontawesome.com/icons) 与 `Icon` 的示例：

{{"demo": "pages/components/icons/FontAwesomeSvgIconDemo.js"}}

FontAwesomeIcon 的 `fullWidth` 属性也可以用来应用近似正确的尺寸，但这样的效果并不完美。

### 其他图标库

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) 提供了 2000 多个图标。 对于你想要使用的图标，可以复制它们所提供的 SVG `path`，并将其作为 `SvgIcon` 组件的子组件，或者也可以使用 `createSvgIcon()` 来应用它。

友情提示：[mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) 已经将每个 SVG 图标用 `SvgIcon` 组件包装起来，你可以高枕无忧了。

## Icon (Font icons)

对于支持连字的任何图标字体，`Icon` 组件能够将其显示为一个图标。 作为先决条件，你的项目里必须包含 [Material icon font](https://google.github.io/material-design-icons/#icon-font-for-the-web)，譬如说，您可以通过 Google Web Fonts 来导入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` 将为 Material Icons font 设置正确的类名。 `Icon`  将为 Material icon font 设置正确的 class 名字。

若想要使用图标，您只需把图标名（字体连字）和 `Icon` 组件包装到一起，例如：

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>;
```

默认情况下，一个图标会继承使用当前的文本颜色。 您也可以选择使用以下任何一个主题颜色属性来设置图标的颜色：`primary`，`secondary`，`action`，`error` 以及 `disabled`。

### Font Material 图标

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) 可以和 `Icon` 组件一起使用，如下所示：

{{"demo": "pages/components/icons/FontAwesomeIcon.js"}}

需要注意的是，Font Awesome icons 的设计并不像 Material Design icons 那样（你可以对比之前的两个 demo）。 fa icons 经过裁剪，以利用所有可用空间。 你可以通过全局覆盖的方式来适配它：

```jsx
const theme = createMuiTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // 匹配 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/components/icons/FontAwesomeIconSize.js"}}

## Font vs SVG。 使用哪个更好呢？

这两种方法都能很好地工作，但是其中有一些微妙的差异，特别是在性能和渲染质量方面。 在环境允许的情况下，首选使用 SVG 的方式，因为它允许代码分割，能支持更多的图标，并且渲染得更快更好。

更多详情，请查阅 [为什么 GitHub 将 font icons 迁移到 SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/)。

## 无障碍设计

图标可以传达各种有意义的信息，所以确保它们的无障碍设计是很重要的。 您可能会注意到这两个用例：

- **装饰性图标** 仅用于增强视觉或强调品牌。 即使将它们从页面中移除，用户仍然可以理解并能够使用整个界面。
- **语义图标** 是用来传达其中意义的，而不只是单纯地装饰。 This includes icons without text next to them that are used as interactive controls — buttons, form elements, toggles, etc.

### 装饰性图标

如果你的图标只是作为纯粹的装饰，那么你已经大功告成啦！ 而添加 `aria-hidden=true` 属性可以让你的图标变成正确的且可访问的（隐形的）。

### 语义图标

#### 语义化的 SVG icons

你应该在 `titleAccess` 属性中增加一个有意义的值。 `role="img"` 属性和 `<title>` 元素将会被添加，以便你的图标可以正确适配无障碍设计。

对于可聚焦的交互式元素，例如当与图标按钮一起使用时，你可以使用 `aria-label` 属性：

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>;
```

#### 语义化的 font icons

你需要提供一个只有辅助技术才能看到的文本替代方案：

```jsx
import Icon from '@material-ui/core/Icon';
import { visuallyHidden } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles({ visuallyHidden })();

// ...

<Icon>add_circle</Icon>
<span className={classes.visuallyHidden}>创建一个用户</span>
```

#### 参考

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
