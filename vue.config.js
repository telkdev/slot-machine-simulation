const path = require("path");
// Including scss code that not compiling(vars, mixins)

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, './src/scss/utils/*.scss'),
      ],
    },
  },
};
