<template>
  <div class="container">
    <div class="box box-1">
      <div class="li li-1">safety-lighten-1</div>
      <div class="li li-2">safety-lighten-2</div>
      <div class="li li-3">safety-lighten-3</div>
    </div>
    <div class="box box-2">
      <div class="li li-1">safety-darken-1</div>
      <div class="li li-2">safety-darken-2</div>
      <div class="li li-3">safety-darken-3</div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-image: linear-gradient(
    to right,
    toLighten(pink, 50%),
    toDarken(pink, 50%)
  );
}
</style>

<style lang="scss" scoped>
.box {
  height: 48vh;
  font-size: 16px;

  .li {
    height: 30%;

    + .li {
      margin-top: 1%;
    }
  }

  + .box {
    margin-top: 2vh;
  }
}

.box-1 {
  background-color: map-get($colors, safety);

  @include media("md-and-down") {
    width: 50vw;
  }

  @include media("sm-and-down") {
    background-color: map-get($colors, warning);
  }

  @include media("xs-only") {
    background-color: map-get($colors, danger);
  }

  .li-1 {
    background-color: map-get($colors, "safety-lighten-1");
  }
  .li-2 {
    background-color: map-get($colors, "safety-lighten-2");
  }
  .li-3 {
    background-color: map-get($colors, "safety-lighten-3");
  }
}

.box-2 {
  background-color: map-get($colors, safety);

  // @include width(100%, 80%, 70%, 60%, 50%); // === @include width(100%, $sm: 80%, $md: 70%, $lg: 60%, $xl: 50%);
  @include width(100%, $md: 50%);

  .li-1 {
    background-color: map-get($colors, "safety-darken-1");

    @media screen and (max-width(960px)) {
      opacity: 0.3;
    }
  }
  .li-2 {
    background-color: map-get($colors, "safety-darken-2");

    @include media(max-width(768px)) {
      opacity: 0.3;
    }
  }
  .li-3 {
    background-color: map-get($colors, "safety-darken-3");

    @include media(only-width(768px, 960px)) {
      opacity: 0.5;
    }
  }
}
</style>
