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
- 去除 <input type="number" /> 右边的箭头
- 隐藏滚动条

## 安装

```bash
yarn add sass-runtime-tool -D
# or
npm i -D sass-runtime-tool
```

## 使用

```scss
// xxx.scss
@use "sass-runtime-tool/all.scss" as *;
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

### 超方便的响应式

```html
<div class="box">
  <span>box1</span>
  <span>box2</span>
</div>
```

```scss
.box {
  height: 10px;
  background-image: linear-gradient(
    to right,
    toLighten(pink, 50%),
    toDarken(pink, 50%)
  );
  border: 2px solid green;

  @include media("md-and-down") {
    width: 50vw;
  }

  @include media("xs-only") {
    background-color: orangered;
    background-image: unset;
  }

  @include media(only-width(768px, 960px)) {
    background-color: red;
    background-image: unset;
  }
}
```

### 与 unocss 一致的 rem 转化

```html
<div>Content</div>
```

```scss
div {
  font-size: rem(4); // 1rem, 可通过 $rem-base 改变
}
```

### 改变 placeholder 的颜色和大小

```html
<input class="input" placeholder="Please enter content" />
```

```scss
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
```

### 下拉框小三角

```html
<div class="triangle">
  <div class="triangle-2"></div>
</div>
```

```scss
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
```

### 超出显示省略号

```html
<div class="ellipsis-2">一行省略号一行省略号一行省略号一行省略号</div>
<div class="ellipsis">
  多行省略号多行省略号多行省略号多行省略号多行省略号多行省略号
</div>
```

```scss
.ellipsis {
  width: 100px;
  @include ellipsis(3);
}
.ellipsis-2 {
  width: 100px;
  @include ellipsis;
}
```

### 正方形

```html
<div class="square"></div>
```

```scss
.square {
  @include square(100px);
  background-color: red;
}
```

### 清除浮动

```html
<div class="left">left</div>
<div class="right">right</div>
```

```scss
.left {
  float: left;
}
.right {
  @include clearfix;
}
```

### 清除 margin 折叠

```html
<div class="box-clearfix">
  <div class="inner">inner-inner-inner</div>
</div>
```

```scss
.inner {
  margin-top: 10px;
}
.box-clearfix {
  background-color: yellow;
  @include margin-recover;
}
```

### 去除 <input type="number" /> 右边的箭头

```html
<input type="number" />
```

```scss
/* 推荐全局使用 */
:where(input[type="number"]) {
  @include hide-arrow;
}
```

### 隐藏滚动条

```html
<div class="scroll">
  <p style="height: 1000px"></p>
</div>
```

```scss
.scroll {
  height: 100px;
  @include hide-scroll;
}
```

### 变量、方法的使用

```scss
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
// Break point
$breakpoints: (
  "sm": 768px,
  "md": 960px,
  "lg": 1240px,
  "xl": 1920px,
);
$breakpoints-spec: (
  "xs-only": "(max-width: #{map.get($breakpoints, sm)})",
  "sm-and-up": "(min-width: #{map.get($breakpoints, sm)})",
  "sm-only":
    "(min-width: #{$map.get($breakpoints, sm)}) and (max-width: #{map.get($breakpoints, md) - 1})",
  "sm-and-down": "(max-width: #{map.get($breakpoints, md)})",
  "md-and-up": "(min-width: #{map.get($breakpoints, md)})",
  "md-only":
    "(min-width: #{$map.get($breakpoints, md)}) and (max-width: #{map.get($breakpoints, lg) - 1})",
  "md-and-down": "(max-width: #{map.get($breakpoints, lg)})",
  "lg-and-up": "(min-width: #{map.get($breakpoints, lg)})",
  "lg-only":
    "(min-width: #{$map.get($breakpoints, lg)}) and (max-width: #{map.get($breakpoints, xl) - 1})",
  "lg-and-down": "(max-width: #{map.get($breakpoints, xl)})",
  "xl-only": "(min-width: #{map.get($breakpoints, xl)})",
);

// Rem base
$rem-base: 4;
$rem-unit-base: 16px;
```

## 自定义主题

```scss
@forward "sass-runtime-tool/all.scss" with (
  // 自定义响应式断点
  $breakpoints: ("sm": 640px),
  // 设置 rem base
  $rem-base: 5 // [20 => 4rem, 10 => 2rem]
);
```
