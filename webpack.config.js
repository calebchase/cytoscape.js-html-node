const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/test.js",
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "htmlnode",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
};
