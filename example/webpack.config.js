const path = require("path");

module.exports = {
  entry: "./src/example.js",
  output: {
    filename: "example.bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
};
