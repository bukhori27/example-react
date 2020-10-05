let config = require('./webpack.config.js');
var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

config.output = {
    filename: './[name].[contenthash].js',
    path: path.resolve(__dirname, './public')
}

let outputFilename = 'output.html';

if (process.env.APP_ENV == 'production') {
    outputFilename = 'output.html';
}

if (process.env.APP_ENV == 'staging') {
    outputFilename = "output.html";
}

config.plugins.push( 
    new CleanWebpackPlugin(['./public/*.js', './public/*.css', './public/public/*.css', './public/*.json', './public/*.html'],{
        exclude: [
            './public/.gitignore',
            './public/fonts/*',
        ],
    }),
    new HtmlWebpackPlugin({
        title: 'Qasir Mitra Application',
        template: './packages/server/template.html',
        minify: true,
        cache: true,
        filename: outputFilename
    }),
    // new DynamicCdnWebpackPlugin(),
    new ManifestPlugin({
        fileName: 'manifest.json'
    }),
    new WorkboxWebpackPlugin.InjectManifest({        
        swSrc: './packages/service-worker/index.js',
        swDest: path.resolve(__dirname, './public', 'sw-qasir-wholesale.js'),
        globDirectory: 'public'           
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
       },
       chunks: 'all'
    }
})

module.exports = config