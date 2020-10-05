let config = require('./webpack.config.js');
var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.output = {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './public')
}

config.plugins.push( 
    new CleanWebpackPlugin(['./public/*.js', './public/*.css'],{
        exclude: [
            './public/.gitignore',
            './public/fonts/*',
        ],
    }),
    new HtmlWebpackPlugin({
        title: 'Qasir Mitra Application',
        template: './packages/server/template.html',
        minify: true,
        cache: true
    })
)

config.optimization = Object.assign(config.optimization, {
    runtimeChunk: 'single',
    splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all'
         }
       }
    }
})
module.exports = config