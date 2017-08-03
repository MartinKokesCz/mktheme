<?php
function custom_theme_styles()
{
    // style.css
    wp_enqueue_style('custom_theme-style', get_stylesheet_uri());

    // minified version of all libs and scss files
    wp_enqueue_style('custom_theme-styles', get_template_directory_uri() . '/dist/css/main.css');
}
