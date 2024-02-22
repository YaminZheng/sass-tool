# Sass tool

[![npm (tag)](https://img.shields.io/npm/v/sass-runtime-tool)](https://www.npmjs.com/package/sass-runtime-tool)
![npm (downloads)](https://img.shields.io/npm/dm/sass-runtime-tool)

---

[English](./README-EN.md)

Sass 轻量安全无污染运行时工具集，简化 css 编写，不增加代码量！

**功能特点**

- 响应式布局
- 管理统一的 breakpoint
- unocss 一致的 rem 转化
- 小三角
- placeholder 样式更改
- 多行文本省略号
- 正方形盒子
- 清除浮动
- 删除 margin 折叠
- 简化 animation 使用
- 简写定位

## 安装

```bash
yarn add sass-runtime-tool -D
# or
npm i -D sass-runtime-tool
```

## 使用

```scss
// xxx.scss
@forward "sass-runtime-tool/all.scss";
// ...
```

**Vite 全局使用**

```scss
// 创建 src/assets/global.scss
@forward "sass-runtime-tool/all.scss";
```

```typescript
// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "/src/assets/global.scss" as *;',
      },
    },
  },
});
```

### 响应式

```html
<div class="box">
  <span>box1</span>
  <span>box2</span>
</div>

<style lang="scss">
  .box {
    height: 10px;
    background-image: linear-gradient(
      to right,
      toLighten(pink, 50%),
      toDarken(pink, 50%)
    );
    border: 2px solid map-get($colors, safety-lighten-1);

    @include media("md-and-down") {
      width: 50vw;
    }

    @include media("xs-only") {
      background-color: map-get($colors, danger);
      background-image: unset;
    }

    @media screen and (max-width(768px)) {
      opacity: 0.5;
    }

    @include media(only-width(768px, 960px)) {
      background-color: map-get($colors, danger-lighten-1);
      background-image: unset;
    }

    @include row-to-col(xs-only);
  }
</style>
```

### 与 unocss 一致的 rem 转化

```html
<div>Content</div>

<style lang="scss">
  div {
    font-size: rem(4); // 1rem, 可通过 $rem-base 改变
  }
</style>
```

### 改变 placeholder 的颜色和大小

```html
<input class="input" placeholder="Please enter content" />

<style lang="scss">
  .input {
    @include placeholder(red) {
      font-size: 12px;
    }
  }
  /* 或者 */
  .input {
    @include placeholder {
      color: red;
      font-size: 12px;
    }
  }
</style>
```

### 下拉框小三角

```html
<div class="triangle">
  <div class="triangle-2"></div>
</div>

<style lang="scss">
  .triangle {
    &::before {
      content: "";
      display: inline-block;
      @include triangle;
    }
    &::after {
      content: "";
      display: inline-block;
      @include triangle("left", 26px, green);
    }
  }
  .triangle-2 {
    @include triangle($color: blue);
  }
</style>
```

### 超出显示省略号

```html
<div class="ellipsis-2">一行省略号一行省略号一行省略号一行省略号</div>
<div class="ellipsis">
  多行省略号多行省略号多行省略号多行省略号多行省略号多行省略号
</div>

<style lang="scss">
  .ellipsis {
    width: 100px;
    @include ellipsis(3);
  }
  .ellipsis-2 {
    width: 100px;
    @include ellipsis;
  }
</style>
```

### 水平、垂直对齐

```html
<ul class="list">
  <li>1</li>
  <li>2</li>
</ul>

<style lang="scss">
  /* 水平对齐 */
  .list {
    @include items-center;
  }
  /* 垂直对齐 */
  .list {
    @include justify-center;
  }
  /* 水平垂直对齐 */
  .list {
    @include flex-center;
  }
</style>
```

### 正方形

```html
<div class="square"></div>

<style lang="scss">
  .square {
    @include square(100px);
    background-color: red;
  }
</style>
```

### 清除浮动

```html
<hr />
<div class="box">
  <div class="inner">1</div>
</div>

<style lang="scss">
  .inner {
    margin-top: 10px;
  }
  .box {
    @include clearfix;
  }
</style>
```

### 清除 margin 折叠

```html
<div class="box-clearfix">
  <div class="inner">1</div>
</div>

<style lang="scss">
  .inner {
    margin-top: 10px;
  }
  .box-clearfix {
    background-color: map-get($colors, warning);
    @include margin-recover;
  }
</style>
```

### 简化 animation 使用

```html
<div class="fade-in">1</div>

<style lang="scss">
  /* 全局只需创建一次动画，「它不应该在 scoped 中」 */
  @include fadein;
  /* or */
  @include fadeout;
  .fade-in {
    @include animation("fadein", 1s);
  }
</style>
```

### 简写定位

```html
<div class="loading-container">
  <div class="loading">loading...</div>
</div>

<style lang="scss">
  .loading-container {
    width: 100px;
    height: 100px;
    border: 1px solid red;
    position: relative;
  }
  .loading {
    @include position-content-center;
    /* 或者 */
    @include position-center;
    /* 或者 */
    @include position-full;
  }
</style>
```

### 变量、方法的使用

```scss
@debug map-get($colors, white);
@debug map-get($colors, black);
@debug map-get($colors, safety);
@debug map-get($colors, warning);
@debug map-get($colors, danger);
@debug map-get($colors, danger-lighten-1);
@debug map-get($colors, danger-l-1);
@debug map-get($colors, danger-darken-3);
@debug map-get($colors, danger-d-3);
@debug map-get($breakpoints, sm);
@debug map-get($breakpoints-spec, xs-only);
@debug toLighten(red, 10%);
@debug toLighten(#123456, 10%);
@debug toDarken(red, 10%);
@debug toDarken(#123456, 10%);
@debug min-width(768px);
@debug max-width(768px);
@debug only-width(768px, 1240px);
@debug rem(20);
@debug values(20, 5px);
```

## 默认主题

```scss
// Color
$color-count: 3; // 最大值 10，生成的颜色层级数
$colors: (
  "white": #ffffff,
  "black": #000000,
  "safety": #67c23a,
  "warning": #e6a23c,
  "danger": #f56c6c,
);

// Break point
$breakpoints: (
  "sm": 768px,
  "md": 960px,
  "lg": 1240px,
  "xl": 1920px,
);

$breakpoints-spec: (
  "xs-only": max-width(map.get($breakpoints, sm)),
  "sm-and-up": min-width(map.get($breakpoints, sm)),
  "sm-only": only-width(map.get($breakpoints, sm), map.get($breakpoints, md)),
  "sm-and-down": max-width(map.get($breakpoints, md)),
  "md-and-up": min-width(map.get($breakpoints, md)),
  "md-only": only-width(map.get($breakpoints, md), map.get($breakpoints, lg)),
  "md-and-down": max-width(map.get($breakpoints, lg)),
  "lg-and-up": min-width(map.get($breakpoints, lg)),
  "lg-only": only-width(map.get($breakpoints, lg), map.get($breakpoints, xl)),
  "lg-and-down": max-width(map.get($breakpoints, xl)),
  "xl-only": min-width(map.get($breakpoints, xl)),
);

// Rem base
$rem-base: 4;
$rem-unit-base: 16px;
```

## 自定义主题

```scss
@forward "sass-runtime-tool/all.scss" with (
  // 最大 10
  // 生成 [name]-lighten-1 ~ [name]-lighten-10 和 [name]-darken-1 ~ [name]-darken-10
  $color-count: 10,
  $colors: (primary: blue, safety: green),
  // 自定义响应式断点
  $breakpoints: ("mi": 480px, "sm": 640px),
  $breakpoints-spec: ("micro-only": max-width(map.get($breakpoints, mi))),
  // 设置 rem base
  $rem-base: 5 // [20 => 4rem, 10 => 2rem]
);
```
