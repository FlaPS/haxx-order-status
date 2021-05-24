const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./common.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')


module.exports = merge(common, {
  mode: 'production',

  plugins: common.plugins.concat([
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template/index.html'),
      filename: path.resolve(__dirname, '../public/index.html'),
      excludeChunks: ['sw'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new BundleAnalyzerPlugin(),
  ]),
})
