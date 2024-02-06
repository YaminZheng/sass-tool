# Sass tool

_自己平常会经常使用的一些方法和变量，希望可以帮到你们_

_主要是针对，响应式、主题切换「亮色、暗色等等」做的一个简单的工具集_

## 安装

```bash
yarn add sass-runtime-tool -D
```

## 使用

```scss
// app.scss
@use "sass-runtime-tool/var.scss";
@use "sass-runtime-tool/mixins.scss";
@use "sass-runtime-tool/functions.scss";

.content {
  background-color: map-get($colors, safety);
  border: 1p solid map-get($colors, safety-lighten-1);

  @include media("xs-only") {
    padding: 0 10px;
  }
  @include media("sm-and-down") {
    width: 100%;
    padding: 0 20px;
  }
}
```

## 使用方法

#### media

```scss
.box {
  @include media("md-and-down") {
    width: 50vw;
  }

  @include media("sm-and-down") {
    background-color: map-get($colors, warning);
  }

  @include media("xs-only") {
    background-color: map-get($colors, danger);
  }
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
@debug map-get($colors, danger-lighten-3);
@debug map-get($colors, danger-lighten-3);
@debug map-get($colors, danger-darken-1);
@debug map-get($colors, danger-darken-3);
@debug map-get($colors, danger-darken-3);
```

### toLighten toDarken

```scss
@debug toLighten(red, 10%);
@debug toLighten(#123456, 10%);
@debug toDarken(red, 10%);
@debug toDarken(#123456, 10%);

.box {
  background-image: linear-gradient(
    to right,
    toLighten(pink, 50%),
    toDarken(pink, 50%)
  );
}
```

### min-width, max-width, only-width

```scss
@debug min-width(768px);
@debug max-width(768px);
@debug only-width(768px, 1240px);

.box {
  @media screen and (min-width(768px)) {
    width: 1200px;
    padding: 0;
  }

  @media screen and (max-width(360px)) {
    width: 100%;
    padding: 0 10px;
  }

  @include media(only-width(768px, 960px)) {
    background-color: map-get($colors, danger-lighten-1);
  }
}
```

## 默认主题

```scss
// Color
$colors: () !default;
$color-count: 3 !default; // 最大值 10

$colors: map.deep-merge(
  (
    "white": #ffffff,
    "black": #000000,
    "safety": #67c23a,
    "warning": #e6a23c,
    "danger": #f56c6c,
  ),
  $colors
);

@mixin extend-color($name, $color, $number) {
  $colors: map.deep-merge(
    (
      "#{$name}-lighten-#{$number}": toLighten($color, math.percentage(math.div($number, 10))),
      "#{$name}-darken-#{$number}": toDarken($color, math.percentage(math.div($number, 10))),
    ),
    $colors
  ) !global;
}

@each $name, $value in $colors {
  @for $i from 1 through $color-count {
    @include extend-color($name, $value, $i);
  }
}

// Break point
$breakpoints: (
  "sm": 768px,
  "md": 960px,
  "lg": 1240px,
  "xl": 1920px,
) !default;

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
) !default;
```

## 自定义主题

```scss
@forward "../styles/var.scss" with (
  // [name]-lighten-1 ~ [name]-lighten-10 和 [name]-darken-1 ~ [name]-darken-10
  $color-count: 10,
  $colors: (
    // 新增颜色
    primary: blue,
    // 覆盖颜色
    safety: green
  ),
  $breakpoints: ("sm": 640px, "md": 768px, "lg": 1024px, "xl": 1240px)
);
/**
   map-get($colors, primary);
   map-get($colors, primary-lighten-1);
   map-get($colors, primary-lighten-10);
*/
@forward "../styles/mixins.scss";
@forward "../styles/functions.scss";
```
