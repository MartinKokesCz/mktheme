//==============================================================================
//                                BUILD SETUP
//==============================================================================
const webpack = require('webpack');
const path = require('path');
const autoInjectPlugin = require('auto-inject-webpack-plugin');
const commonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const isProd = process.env.NODE_ENV === 'production';
console.log(isProd);
const configAssetsFolder = 'assets';
const configDistFolder = 'dist';
const configFontsFolder = 'fonts';
const configImagesFolder = 'images';
const configAssetsIndex = path.join(__dirname, configAssetsFolder + '/index.js');
const configStyles = 'css/main.css';
const configScripts = 'js/main.js';
const configWPProject = path.basename(path.join(__dirname, '../../../'));
console.log(configWPProject);
//==============================================================================
//                                NETWORK SETUP
//==============================================================================
const netBrowserSyncPort = 3000;

const netDevServerPort = 9000;


//==============================================================================
//                                WEBPACK MAGIC
//==============================================================================


const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const openBrowser = new OpenBrowserPlugin({
  //  url: 'http://localhost/logos.agency:8080'
});

// Extract single file with styles for production use to "dist" folder
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin({
  filename: configStyles,
  disable: !isProd,
  allChunks: true,
});

const CopyWebpackPlugin = require('copy-webpack-plugin');
const copyPluginImages = new CopyWebpackPlugin([{
  from: path.resolve(__dirname, configAssetsFolder + '/' + configImagesFolder),
  to: path.resolve(__dirname, configDistFolder + '/' + configImagesFolder),
}]);

const copyPluginFonts = new CopyWebpackPlugin([{
  from: path.resolve(__dirname, 'node_modules/font-awesome/' + configFontsFolder),
  to: path.resolve(__dirname, configDistFolder + '/' + configFontsFolder),
}]);

//==============================================================================
//                       webpack.plugins
//==============================================================================

// PROVIDER for libraries
const providePlugin = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
  "window.jQuery": "jquery",
  Popper: ['popper.js', 'default'],
  // In case you imported Bootstrap plugins individually, you must also require them here:
  // Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
  // Button: "exports-loader?Button!bootstrap/js/dist/button",
  // Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
  // Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
  // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
  // Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
  // Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
  // Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
  // Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
  // Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
  // Util: "exports-loader?Util!bootstrap/js/dist/util",
});

// BROWSER SYNC
// https://www.npmjs.com/package/browser-sync-webpack-plugin
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const browserSyncPlugin = new BrowserSyncPlugin(
  // BrowserSync options
  {
    host: 'localhost/' + configWPProject,
    port: netBrowserSyncPort,
    proxy: 'http://localhost:' + netDevServerPort + '/',
    files: [{
      match: [
        '**/*.php'
      ],
      fn: function(event, file) {
        if (event === "change") {
          const bs = require('browser-sync').get('bs-webpack-plugin');
          bs.reload();
        }
      }
    }],
    open: false
  },
  // plugin options
  {
    reload: true
  }
);


//==============================================================================
//                      webpack basic configuration
//==============================================================================
const entryConf = [
  configAssetsIndex
];

const outputConf = {
  filename: configScripts,
  path: path.resolve(__dirname, configDistFolder),
  publicPath: '/5zskolin.cz/dist'
};
const proxyFolder = '/' + configWPProject;

//==============================================================================
//                    webpack.devServer configuration
//==============================================================================
const devServerConf = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: netDevServerPort,
  clientLogLevel: "none",
  stats: {
    children: false
  },
  proxy: {
    '/5zskolin.cz/**': {
      target: {
        target: "http://localhost:9000/5zskolin.cz/",
        port: 80,
      },
      //changeOrigin: true,
      secure: false
    }
  }
  //open: false,
};

const scssConfDev = [{
  loader: 'style-loader', // inject CSS to page
}, {
  loader: 'css-loader', // translates CSS into CommonJS modules
}, {
  loader: 'postcss-loader', // Run post css actions
  options: {
    plugins: function() { // post css plugins, can be exported to postcss.config.js
      return [
        require('precss'),
        require('autoprefixer')
      ];
    }
  }
}, {
  loader: 'sass-loader' // compiles SASS to CSS
}];

/**
 * 1) Compile SASS/SCSS to CSS.
 * 2)
 * 3) Extract all to one file - main.css.
 **/
const scssConfProd = extractCSS.extract({
  use: [{
      loader: 'postcss-loader',
      options: {
        plugins: (loader) => [
          require('precss'),
          require('autoprefixer'),
        ]
      }
    },
    {
      loader: 'sass-loader',
    }
  ]
});

const scssConf = isProd ? scssConfProd : scssConfDev;
console.log(scssConf);
//==============================================================================
//                          webpack.module.rules
//==============================================================================

// SASS
const rulesSCSS = {
  test: /\.(scss)$/,
  use: scssConf,
};

// FONTS
const rulesFontsWoff = {
  test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
  // loader: "url?limit=10000"
  use: "url-loader"
};

const rulesFontsOther = {
  test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
  use: 'file-loader'
};

// IMAGES
const rulesImages = {
  test: /\.(png|gif|jpg|svg)$/,
  loader: "url-loader"
};

module.exports = {
  entry: entryConf,
  output: outputConf,
  devtool: "source-map",
  module: {
    rules: [
      rulesSCSS,
      rulesFontsWoff,
      rulesFontsOther,
      rulesImages,
    ]
  },
  devServer: devServerConf,
  plugins: [
    //browserSyncPlugin,
    extractCSS,
    //    copyPluginImages,
    //    copyPluginFonts,
    providePlugin,
    //    openBrowser
  ],

}
