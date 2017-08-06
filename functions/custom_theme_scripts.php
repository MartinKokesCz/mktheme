<?php
function custom_theme_scripts()
{
    // webpack package
    wp_enqueue_script('custom_theme-scripts', get_template_directory_uri() . '/dist/js/main.js');
}
