const packageData = require('./package.json')
const webpack = require('webpack')


module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageData.version),
      DESCRIPTION: JSON.stringify(packageData.description)
    })
  ]
};