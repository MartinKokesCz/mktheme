<?php
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
