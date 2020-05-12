const rules = require('./webpack.rules');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const assets = [ 'images' ]; // asset directories

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: ['file-loader']
});

rules.push({
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
})

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules
  },
  plugins: assets.map(asset => {
    return new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', asset),
        to: path.resolve(__dirname, '.webpack/renderer', asset)
      }
    ]);
  }),
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  }
};