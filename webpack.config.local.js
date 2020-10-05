let config = require('./webpack.config.js');
let webpack = require('webpack');

let webpackConfiguration = Object.assign(config, {
    watch: true
})

module.exports = webpackConfiguration