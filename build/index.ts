const sass = require("sass");

sass
  .render({
    file: "../src/styles/all.scss",
  })
  .then((error, result) => {
    console.log(result);
  });
