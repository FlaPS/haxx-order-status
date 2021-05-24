const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./common.js')
module.exports = merge(common, {
    mode: 'development',
    optimization: {
        minimize: false,
    },
  plugins: common.plugins.concat([

    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../template/index.html'),
        filename: path.resolve(__dirname, '../public/index.html'),
        hash: true,
 
    })

  ]),

})
