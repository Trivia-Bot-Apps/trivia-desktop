var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'index.bundle.js'
  },
  target: 'electron-main',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'html', to: 'static' },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`
      new HtmlMinimizerPlugin(),
    ],
  },
};