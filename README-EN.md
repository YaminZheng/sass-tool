# Sass tool

[![npm (tag)](https://img.shields.io/npm/v/sass-runtime-tool)](https://www.npmjs.com/package/sass-runtime-tool)
![npm (downloads)](https://img.shields.io/npm/dm/sass-runtime-tool)

---

[中文](./README.md)

Sass is a lightweight, safe and pollution-free runtime tool set that simplifies css writing without increasing the amount of code!

**Feature**

- Responsive layout
- Manage unified breakpoint
- Unocss consistent rem conversion
- Make triangle
- Placeholder style changes
- Multiline text ellipses
- Square box

## Install

```bash
yarn add sass-runtime-tool -D
# or
npm i -D sass-runtime-tool
```

## Use

```scss
// xxx.scss
@forward "sass-runtime-tool/all.scss";
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

### Responsive web design

```html
<body>
  <div class="box">box</div>
</body>

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

### Rem transformation

```html
<body>
  <div>Content</div>
</body>

<style lang="scss">
  div {
    font-size: rem(4); // 1rem, It can be changed with $rem-base
  }
</style>
```

### Change the color and size of placeholder

```html
<body>
  <input class="input" placeholder="Please enter content" />
</body>

<style lang="scss">
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
</style>
```

### Small triangle

```html
<body>
  <div class="triangle">
    <div class="triangle-2"></div>
  </div>
</body>

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
    @include triangle("bottom", 6px, blue);
  }
</style>
```

### Exceed display ellipses

```html
<body>
  <div class="ellipsis">
    Multi-line ellipsis Multi-line ellipsis Multi-line ellipsis multi-line
    ellipsis
  </div>
  <div class="ellipsis-2">
    A line of ellipses a line of ellipses a line of ellipses
  </div>
</body>

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

### Align horizontally and vertically

```html
<body>
  <ul class="list">
    <li>1</li>
    <li>2</li>
  </ul>
</body>

<style lang="scss">
  .list {
    @include items-center;
  }
  /* or */
  .list {
    @include justify-center;
  }
  /* or */
  .list {
    @include flex-center;
  }
</style>
```

### Square box

```html
<body>
  <div class="square"></div>
</body>

<style lang="scss">
  .square {
    @include square(100px);
    background-color: map-get($colors, safety);
  }
</style>
```

### Use of variables and methods

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

## Default theme

```scss
// Color
$color-count: 3; // Maximum 10, number of generated color levels
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

## Custom theme

```scss
@forward "../styles/var.scss" with (
  // Maximum 10
  // Generate [name]-lighten-1 ~ [name]-lighten-10 and [name]-darken-1 ~ [name]-darken-10
  $color-count: 10,
  $colors: (primary: blue, safety: green),
  // Custom reactive breakpoints
  $breakpoints: ("mi": 480px, "sm": 640px),
  $breakpoints-spec: ("micro-only": max-width(map-get($breakpoints, mi))),
  // Rem base
  $rem-base: 5 // [20 => 4rem, 10 => 2rem]
);
```
