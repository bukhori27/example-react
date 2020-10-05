const path = require('path')
require('dotenv').config();
let webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


const PublicPath = "./public/";
let PublicPathImage= "./public/"

if (process.env.NODE_ENV ===  "production") {
  PublicPathImage = "./";
}

let plugins  = [];

plugins.push(new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: PublicPath + "bundle.css",
}))

plugins.push(new LodashModuleReplacementPlugin);

let configurationWebpack = {
  mode: process.env.NODE_ENV,
  optimization: {
      minimizer: [
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
  },
  plugins: [],
  entry: ['./packages/web/index.jsx'],
  output: {
      path: __dirname,
      filename: PublicPath + 'bundle.js'
  },
  resolve: {
      extensions: ['.js', '.json', '.jsx', '.css'],
      alias: {
          moment$: 'moment/moment.js',
      },
  },
  module: {
      rules: [
        {
          test: /\.[s]?[ac]ss$/,
          use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader'
          ]
        },
        {
          test: /\.(jsx|js)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
              "presets": [
                [
                  "@babel/preset-env",
                  {
                    "useBuiltIns": "entry"
                  }
                ]
              ],
              plugins: [
                '@babel/plugin-transform-react-jsx', 
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-export-default-from', 
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-arrow-functions',
                '@babel/plugin-transform-block-scoping'
              ]
          }
        },
        {
          test: /\.(png|jpg|gif|svg|jpeg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                  name: '[hash:12].[ext]',
                  publicPath: 'images/',
                  outputPath: PublicPathImage + 'images/'
                }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                }
              }
            },
          ]
        }
      ],
  }
}
plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': "'"+process.env.NODE_ENV+"'",
    'APP_ENV': "'"+process.env.APP_ENV+"'",
    'HOST_API_URL': "'"+process.env.API_HOST+"'",
    'HOST_API_URL_POS': "'"+process.env.API_HOST_POS+"'",
    'ENDPOINT_POS': "'"+process.env.API_ENDPOINT_POS+"'",
    'APP_KEY_POS': "'"+process.env.APP_KEY_POS+"'",
    'API_KEY_MAPS':"'"+process.env.API_KEY_MAPS+"'",
    'WEB_API_KEY': "'"+process.env.WEB_API_KEY+"'",
    'GA_APP_API_KEY': "'"+process.env.GA_APP_API_KEY+"'",
    'GA_APP_AUTH_DOMAIN': "'"+process.env.GA_APP_AUTH_DOMAIN+"'",
    'GA_APP_DATABASE_URL': "'"+process.env.GA_APP_DATABASE_URL+"'",
    'GA_APP_PROJECT_ID': "'"+process.env.GA_APP_PROJECT_ID+"'",
    'GA_APP_STORAGE_BUCKET': "'"+process.env.GA_APP_STORAGE_BUCKET+"'",
    'GA_APP_MESSAGING_SENDER_ID': "'"+process.env.GA_APP_MESSAGING_SENDER_ID+"'",
  }
}))

configurationWebpack.plugins = plugins
module.exports = configurationWebpack