---
title: React Select component
components: Select, NativeSelect
githubLabel: 'component: Select'
---

# Select (選択)

<p class="description">選択コンポーネントは、オプションのリストからユーザー提供の情報を収集するために使用されます。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 簡単な選択

メニューは、現在選択されているメニュー項目が放出要素の上に表示されるように、放出要素の上に配置されます。

選択コンポーネントはネイティブの `<select>` 要素に入れ替えられます。

## 高度な機能

選択コンポーネントはネイティブの `<select>` 要素に入れ替えられます。

コンボボックス、複数選択、自動補完、非同期、作成可能のサポートといったさらに高度な機能をお探しなら、[`Autocomplete`コンポーネント](/components/autocomplete/)を参照してください。 It's meant to be an improved version of the "react-select" and "downshift" packages. "react-select"と"downshift"というパッケージの改良版であることを意識しています。

## Props

### Filled and outlined variants

{{"demo": "pages/components/selects/NativeSelects.js"}}

### Labels and helper text

{{"demo": "pages/components/selects/SelectLabels.js"}}

### Auto width

{{"demo": "pages/components/selects/SelectAutoWidth.js"}}

### Other props

{{"demo": "pages/components/selects/SelectOtherProps.js"}}

## Text Fields

プラットフォームのネイティブ選択を使用することで、モバイルでのユーザーエクスペリエンスを向上させることができます。 このようなパターンを許容します。

{{"demo": "pages/components/selects/NativeSelect.js"}}

## TextField

`TextField` ラッパーコンポーネントは、ラベル、入力、およびヘルプテキストを含む完全なフォームコントロールです。 このセクション</a>で、選択モード例を見つけることができます。</p> 



## カスタマイズされた選択

コンポーネントのカスタマイズの例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

To properly label your `Select` input you need an extra element with an `id` that contains a label. スタイルを設定したら、テキストフィールドとして直接使用するか、select `input` プロパティに提供して、 `select` フィールドを作成できます。

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/styles/select) を確認すると良いでしょう。



## 制御開選択

To properly label your `Select` input you need an extra element with an `id` that contains a label. To properly label your `Select` input you need an extra element with an `id` that contains a label.

単一選択の場合と同様に、 `onChange` コールバックで `event.target.value` にアクセスすることにより、新しい値を引き出すことができます。 常に配列です。 常に配列です。 常に配列です。 常に配列です。



### Default

{{"demo": "pages/components/selects/MultipleSelect.js"}}



### Checkmarks

{{"demo": "pages/components/selects/MultipleSelectCheckmarks.js"}}



### Chip

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:



### Placeholder

{{"demo": "pages/components/selects/MultipleSelectPlaceholder.js"}}



### Native

{{"demo": "pages/components/selects/MultipleSelectNative.js"}}



## ダイアログ付き

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}



## With a dialog

Material Designの仕様では推奨されていませんが、ダイアログ内でselectを使用できます。

{{"demo": "pages/components/selects/DialogSelect.js"}}



## Grouping

`ListSubheader`コンポーネントまたはネイティブの`<optgroup>`要素でカテゴリを表示します。

{{"demo": "pages/components/selects/GroupedSelect.js"}}



## アクセシビリティ

To properly label your `Select` input you need an extra element with an `id` that contains a label. That `id` needs to match the `labelId` of the `Select` e.g.



```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```


Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:



```jsx
<TextField id="select" label="Age" value="20" select>
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```


For a [native select](#native-select), you should mention a label by giving the value of the `id` attribute of the select element to the `InputLabel`'s `htmlFor` attribute:



```jsx
<InputLabel htmlFor="select">Age</InputLabel>
<NativeSelect id="select">
  <option value="10">Ten</option>
  <option value="20">Twenty</option>
</NativeSelect>
```
