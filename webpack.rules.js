// const { sass } = require('svelte-preprocess-sass');

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.svelte$/,
    exclude: /node_modules/,
    use: {
      loader: 'svelte-loader',
      options: require('./svelte.config')
    }
  }
]