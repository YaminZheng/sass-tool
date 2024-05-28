<template>
  <h1>响应式 media</h1>
  <div class="box"></div>
  <hr />
  <h1>正方形盒子</h1>
  <div class="square"></div>
  <hr />
  <h1>input 标签修改 placeholder 样式</h1>
  <input class="input" placeholder="Please enter content" />
  <hr />
  <h1>制作小三角</h1>
  <div style="display: flex; align-items: center; gap: 4px">
    <div class="triangle"></div>
    <span>小三角</span>
  </div>
  <hr />
  <h1>任意行省略号</h1>
  <div class="ellipsis-2">
    单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行单行
  </div>
  <br />
  <div class="ellipsis">
    多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行多行
  </div>
  <hr />
  <h1>清除元素 margin</h1>
  <div class="box-clearfix">
    <div class="inner">margin-top: 10px;</div>
  </div>
  <hr />
  <h1>删除 number 输入框右侧小三角</h1>
  <input type="number" />
  <hr />
</template>

<style lang="scss" scoped>
// media
.box {
  height: 100px;
  background-image: linear-gradient(
    to right,
    toLighten(pink, 50%),
    toDarken(pink, 50%)
  );

  @include media("md-and-down") {
    width: 50vw;
  }

  @include media("xs-only") {
    background-color: toLighten(red, 10%);
    background-image: unset;
    opacity: 0.9;
  }

  @include media(only-width(768px, 960px)) {
    background-color: toDarken(orange, 50%);
    background-image: unset;
  }
}

// square
.square {
  @include square(100px);
  background-color: toDarken(rgb(148, 148, 64), 10%);
}

// placeholder
.input {
  height: 40px;
  padding: 0 10px;
  font-size: rem(4.5);
  border: thin solid toLighten(black, 50%);
  border-radius: rem(1);
  @include placeholder {
    color: toLighten(black, 80%);
    font-size: inherit;
  }
}

// triangle
.triangle {
  &::before {
    content: "";
    display: inline-block;
    @include triangle($color: pink);
  }
}
.triangle-2 {
  @include triangle("bottom", 6px, blue);
}

// ellipsis
.ellipsis {
  width: 50%;
  @include ellipsis(3);
}
.ellipsis-2 {
  width: 50%;
  @include ellipsis;
  font-size: rem(4);
}

// margin-recover
.box-clearfix {
  background-color: yellowgreen;
  @include margin-recover;
}
.inner {
  margin-top: 10px;
}

// hide-arrow
:where(input[type="number"]) {
  @include hide-arrow;
}
</style>
