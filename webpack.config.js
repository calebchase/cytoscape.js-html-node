const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  entry: './src/index.js',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'cytoscape-html-node',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};
