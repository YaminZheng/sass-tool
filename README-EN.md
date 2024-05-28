# Sass tool

[![npm (tag)](https://img.shields.io/npm/v/sass-runtime-tool)](https://www.npmjs.com/package/sass-runtime-tool)
![npm (downloads)](https://img.shields.io/npm/dm/sass-runtime-tool)

---

[中文](./README.md)

Sass is a lightweight, safe and pollution-free runtime tool set that simplifies css writing without increasing the amount of code!

**Feature**

- Responsive layout
- Unocss consistent rem conversion
- Make triangle
- Placeholder style changes
- Multiline text ellipses
- Clear float
- Clear margin collapsing
- Remove the arrow to the right of <input type="number" />
- Hide scroll bar

## Install

```bash
yarn add sass-runtime-tool -D
# or
npm i -D sass-runtime-tool
```

## Use

```scss
// xxx.scss
@use "sass-runtime-tool/all.scss" as *;
// ...
```

**Vite Global Use**

```scss
// src/assets/global.scss
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

### Easy responsive web design

```html
<div class="box">box</div>
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

### Rem transformation

```html
<div>Content</div>
```

```scss
div {
  // 1rem, It can be changed with $rem-base
  font-size: rem(4);
}
```

### Change the color and size of placeholder

```html
<input class="input" placeholder="Please enter content" />
```

```scss
.input {
  @include placeholder(red) {
    font-size: 12px;
  }
}
/* or */
.input {
  @include placeholder {
    color: red;
    font-size: 12px;
  }
}
```

### Small triangle

```html
<div class="triangle">
  <div class="triangle-2"></div>
</div>
```

```scss
<style lang="scss" > .triangle {
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

### Exceed display ellipses

```html
<div class="ellipsis">
  Multi-line ellipsis Multi-line ellipsis Multi-line ellipsis multi-line
  ellipsis
</div>
<div class="ellipsis-2">
  A line of ellipses a line of ellipses a line of ellipses
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

### Clear float

```html
<div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

```scss
.left {
  float: left;
}
.right {
  @include clearfix;
}
```

### Clear margin collapsing

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

### Remove the arrow to the right of <input type="number" />

```html
<input type="number" />
```

```scss
/* Recommended for global use */
:where(input[type="number"]) {
  @include hide-arrow;
}
```

### Hide scroll bar

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

### Simplify animation use

```html
<div class="fade">1</div>
```

```scss
/* Global animation only needs to be created once, "It shouldn't be in scoped"  */
@include fadein;
.fade {
  @include animation("fadein", 1s);
}
/* or */
@include fadeout;
.fade {
  @include animation("fadeout", 1s);
}
```

### Use of variables and methods

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

## Default theme

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

## Custom theme

```scss
@forward "sass-runtime-tool/all.scss" with (
  // Custom reactive breakpoints
  $breakpoints: ("sm": 640px),
  // Rem base
  $rem-base: 5 // [20 => 4rem, 10 => 2rem]
);
```
