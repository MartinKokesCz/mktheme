<?php
function custom_theme_scripts()
{
    // webpack production package
    wp_enqueue_script('custom_theme-scripts', get_template_directory_uri() . '/dist/js/main.js');

    // webpack dev package
    //wp_enqueue_script('custom_theme-scripts', 'http://localhost:9000/dist/js/main.js');
}
