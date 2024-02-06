# Sass tool

_自己平常会经常使用的一些方法和变量，希望可以帮到你们_

_主要是针对，响应式、主题切换「亮色、暗色等等」做的一个简单的工具集_

## 安装

```bash
yarn add sass-runtime-tool -D
# or
npm i -D sass-runtime-tool
```

## 项目演示

```bash
git clone https://github.com/YaminZheng/sass-tool.git
cd sass-tool
yarn install
yarn dev
```

## 使用

```scss
// app.scss
@use "sass-runtime-tool/var.scss";
@use "sass-runtime-tool/mixins.scss";
@use "sass-runtime-tool/functions.scss";
```

**建议全局使用**

```scss
// src/assets/global.scss
@forward "sass-runtime-tool/var.scss";
@forward "sass-runtime-tool/mixins.scss";
@forward "sass-runtime-tool/functions.scss";
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

```vue
<!-- App.vue -->
<template>
  <div class="box">box</div>
</template>

<style lang="scss" scoped>
.box {
  background-image: linear-gradient(
    to right,
    toLighten(pink, 50%),
    toDarken(pink, 50%)
  );
  border: 1p solid map-get($colors, safety-lighten-1);

  @include media("md-and-down") {
    width: 50vw;
  }

  @include media("sm-and-down") {
    background-color: map-get($colors, warning);
  }

  @include media("xs-only") {
    background-color: map-get($colors, danger);
  }

  @media screen and (max-width(768px)) {
    opacity: 0.5;
  }

  @include media(only-width(768px, 960px)) {
    background-color: map-get($colors, danger-lighten-1);
  }
}
</style>
```

## 详情

#### media

```scss
@include media("md-and-down") {
  // ...
}
@include media("sm-and-down") {
  // ...
}
@include media("xs-only") {
  // ...
}
```

### 变量

```scss
@debug map-get($colors, white);
@debug map-get($colors, black);
@debug map-get($colors, safety);
@debug map-get($colors, warning);
@debug map-get($colors, danger);
@debug map-get($colors, danger-lighten-1);
@debug map-get($colors, danger-darken-3);
```

### toLighten，toDarken

```scss
@debug toLighten(red, 10%);
@debug toLighten(#123456, 10%);
@debug toDarken(red, 10%);
@debug toDarken(#123456, 10%);
```

### min-width, max-width, only-width

```scss
@debug min-width(768px);
@debug max-width(768px);
@debug only-width(768px, 1240px);
```

## 默认主题

```scss
// Color
$color-count: 3; // 最大值 10
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
```

## 自定义主题

```scss
@use "../styles/var.scss" with (
  // 最大 10
  // 生成 [name]-lighten-1 ~ [name]-lighten-10 和 [name]-darken-1 ~ [name]-darken-10
  $color-count: 10,
  $colors: (
    // 新增颜色
    primary: blue,
    // 覆盖颜色
    safety: green
  ),
  $breakpoints: ("sm": 640px, "md": 768px, "lg": 1024px, "xl": 1240px)
);
```
