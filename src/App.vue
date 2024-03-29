<script setup lang="ts">
import Test from "./Test.vue";
</script>

<template>
  <Test />
  <div class="box">
    <span>box1</span>
    <span>box2</span>
  </div>
  <div class="square"></div>
  <input class="input" placeholder="Please enter content" />
  <div class="triangle">
    <div class="triangle-2"></div>
  </div>
  <div class="ellipsis-2">一行省略号一行省略号一行省略号一行省略号</div>
  <div class="ellipsis">
    多行省略号多行省略号多行省略号多行省略号多行省略号多行省略号
  </div>
  <ul class="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
  <div class="fade-in">1</div>
  <div class="loading-container">
    <div class="loading">loading...</div>
  </div>
  <div class="box-clearfix">
    <div class="inner">1</div>
  </div>
  <input type="number" />
</template>

<style lang="scss" scoped>
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
.square {
  @include square(100px);
  background-color: map-get($colors, danger);
}

.input {
  @include placeholder {
    color: red;
    font-size: 12px;
  }
}

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
.ellipsis {
  width: 100px;
  @include ellipsis(3);
}
.ellipsis-2 {
  width: 100px;
  @include ellipsis;
  font-size: rem(4);
}

.list {
  @include items-center;
  // 或者你需要某个断点响应
  @include row-to-col("md-and-down");
  align-items: center;
}

@include fadein;
.fade-in {
  @include animation("fadein", 1s);
}

.loading-container {
  width: 100px;
  height: 100px;
  border: 1px solid red;
  position: relative;
}
.loading {
  @include position-content-center;
  font-size: 12px;
}
.inner {
  margin-top: 10px;
  height: 1000px;
}
.box-clearfix {
  background-color: map-get($colors, warning);
  @include margin-recover;
  max-height: 300px;
  overflow-y: auto;
}
:where(input[type="number"]) {
  @include hide-arrow;
}
</style>
