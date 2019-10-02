// Working with directories and file paths
const path = require('path');
// Basic webpack npm package
const webpack = require('webpack');
// Minify css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Plugin to remove the build/dist folder
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Control development vs production mode
const devMode = process.env.NODE_ENV !== 'production';

// Webpack config starts here
module.exports = {
  devtool: 'cheap-eval-source-map',
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'assets')
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: devMode ? 'bundle.js' : 'bundle.[hash].js'
  },
  module: {
    rules: [
      // npm install --save-dev mini-css-extract-plugin style-loader css-loader
      {
        // HHave both HMR in development and styles extracted in a file for production builds.
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      // npm install --save-dev babel-loader @babel/core @babel/
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader', 'eslint-loader']
      },
      // npm install --save-dev html-loader
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src']
          }
        }
      },
      // npm install --save-dev file-loader url-loader
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        use: {
          loader: 'url-loader', // Te carga la imagen en binario en el HTML (salvo que sea superior a 8Kb)
          options: {
            limit: 14000, // Convert images < 14kb to base64 strings. Bigger than that as usual (request)
            publicPath: '/assets/images',
            outputPath: 'assets/images',
            name: devMode ? '[path][name].[ext]' : '[contenthash].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: 'Beerflix',
      filename: 'index.html',
      template: path.join(__dirname, 'index.html')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output. Both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
  devServer: {
    port: 3000, // port dev server
    open: true, // do not open browser by default
    overlay: true, // check errors
    hot: true, // hot module replacement
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true
  }
};
