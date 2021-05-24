const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./common.js')
const host = '0.0.0.0'
const port = 8087

module.exports = merge(common, {
  mode: 'development',

  plugins: common.plugins.concat([
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template/index.html'),
      filename: path.resolve(__dirname, '../public/index.html'),
      hash: true,
      excludeChunks: ['sw']
    }),

  ]),

  devServer: {
    historyApiFallback: true,
    contentBase: [path.join(__dirname, '..', 'public')],
    port,
    host,
    disableHostCheck: true,
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
})
