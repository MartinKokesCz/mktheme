//==============================================================================
//                                BUILD SETUP
//==============================================================================
const bsAssetsFolder = 'assets';
const bsDistFolder = 'dist';
const bsAssetsIndex = './' + bsAssetsFolder + '/index.js';
const bsStyles = 'css/main.css';
const bsScripts = 'js/main.js';

// Select libraries you should use
const bsFancybox = true;

//==============================================================================
//                                WEBPACK MAGIC
//==============================================================================
const webpack = require('webpack');
const path = require('path');

// Extract single file with styles for production use to "dist" folder
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin(bsStyles);

const defineLibs = new webpack.DefinePlugin({
  FANCYBOX: JSON.stringify(bsFancybox)
})
// yes 5zskolin
// next level
module.exports = {
  entry: bsAssetsIndex,
  output: {
    filename: bsScripts,
    path: path.resolve(__dirname, bsDistFolder)
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractCSS.extract({
        fallback: "style-loader",
        use: [{
            // Autoprefix the compiled main.css from main.scss
            // then minimize it
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
                require('cssnano')()
              ]
            }
          },
          {
            // First compile SASS to CSS
            loader: 'sass-loader'
          }
        ]
      })
    }]
  },
  plugins: [
    extractCSS,
    defineLibs
  ]
}
