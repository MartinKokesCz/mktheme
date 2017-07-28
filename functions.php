<?php
include __DIR__ . '/classes/bs4nav_walker.php';

//show_admin_bar(false);

function custom_theme_setup()
{
    add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

    add_theme_support('post-thumbnails');

    register_nav_menus(array(
            'main' => __('Main Menu', 'custom_theme'),
        ));

    add_theme_support('html5', array(
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));
}

add_action('after_setup_theme', 'custom_theme_setup');


// Add CSS and JS files
function custom_theme_scripts()
{
    wp_enqueue_style('custom_theme-style', get_stylesheet_uri());
    wp_enqueue_style('theme-style', get_template_directory_uri() . '/dist/css/main.css');
    wp_enqueue_script('custom_theme-scripts', get_template_directory_uri() . '/dist/js/app.min.js');
}

add_action('wp_enqueue_scripts', 'custom_theme_scripts');
