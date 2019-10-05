// Working with directories and file paths
const path = require('path');
// Basic webpack npm package
const webpack = require('webpack');
// Simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Plugin to remove the build/dist folder
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Generate favicon
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// Webpack config starts here
module.exports = {
  // Esta herramienta mapea el código tal y como era antes de empaquetar (facilita el debug)
  devtool: 'cheap-eval-source-map',
  mode: 'development',
  entry: ['@babel/polyfill', path.join(__dirname, 'src', 'index.js')],
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, 'src/resources/images')
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // npm install --save-dev postcss-loader style-loader css-loader sass-loader
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      // npm install --save-dev eslint-loader
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      // npm install --save-dev babel-loader @babel/core @babel/preset-env
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
          loader: 'url-loader', // Mejor que file-loader porque te carga la imagen en binario en el HTML si es menor a "limit"
          options: {
            limit: 8000, // Convert images < 14kb to base64 strings. Bigger than that as usual (request)
            publicPath: '/assets/images',
            outputPath: 'assets/images',
            name: '[path][name].[ext]'
          }
        }
      },
      // npm install --save-dev image-webpack-loader
      {
        enforce: 'pre',
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          webp: {
            quality: 75
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // Limpia la carpeta build
    new webpack.ProgressPlugin(), // Barra de progreso mientras compila webpack
    new HtmlWebpackPlugin({
      // Genera el html. En este caso por el template, me lo genera con modelo al indicado
      title: 'Beerflix',
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    }),
    new FaviconsWebpackPlugin('src/resources/images/logo.png')
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
