<template>
  <div class="box"></div>
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
}

.input {
  @include placeholder(red) {
    // 或者直接在下边写
    // color: red;
    font-size: 12px;
  }
}

.triangle {
  &::before {
    content: "";
    display: inline-block;
    @include triangle();
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
.ellipsis {
  width: 100px;
  @include ellipsis(3);
}
.ellipsis-2 {
  width: 100px;
  @include ellipsis();
}

.list {
  @include items-center();
  // 或者你需要某个断点响应
  @include row-to-col("md-and-down");
  align-items: center;
}
</style>
