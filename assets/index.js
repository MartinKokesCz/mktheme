//==============================================================================
//                 THIS FILE IS FOR REFERENCING ALL ASSETS
//==============================================================================

//==============================================================================
//                                   STYLES
//==============================================================================

// Sassy files with variables
require('./scss/main.scss');

/* FONTS */
/* example with .css extension */
/* import "../fonts/rawengulksans/stylesheet"; */

/* example with .scss extension */
/* import "../fonts/open-sans/open-sans.scss"; */



//==============================================================================
//                                  SCRIPTS
//==============================================================================
require('../node_modules/jquery/dist/jquery.min.js');
require('../node_modules/bootstrap/dist/js/bootstrap.min.js');

if (FANCYBOX) {
  require('script-loader!../node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js');
}
require('uglify-loader!./js/main.js');
