<template>
  <div class="post">
    <div class="test-box"></div>
  </div>
  <ul class="text-list">
    <li>1</li>
    <li style="height: 10px; background-color: red">2</li>
    <li style="background-color: blue">3</li>
  </ul>
</template>

<style lang="scss" scoped>
.test-box {
  height: 10px;
}

// @container (width > 400px) {
//   .test-box {
//     background-color: red;
//   }
// }
.post {
  .test-box {
    width: 50%;
    background-color: red;
  }
}

.text-list {
  columns: 3;
  list-style: none;
  padding: 0;
}
</style>
