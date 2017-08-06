<?php

// Disable admin bar, when logged in
show_admin_bar(false);

include __DIR__ . '/functions/common.php';

// Custom nav Walker for Bootstrap 4
include __DIR__ . '/classes/bs4nav_walker.php';

// disable emojis
include __DIR__ . '/functions/disable_emoji.php';
add_action('init', 'disable_wp_emojicons');

// basic theme setup for HTML5 template
include __DIR__ . '/functions/custom_theme_setup.php';
add_action('after_setup_theme', 'custom_theme_setup');

// Add styles like style.css and minified main.css
include __DIR__ . '/functions/custom_theme_styles.php';
add_action('wp_enqueue_scripts', 'custom_theme_styles');

// Add scripts
include __DIR__ . '/functions/custom_theme_scripts.php';
add_action('wp_enqueue_scripts', 'custom_theme_scripts');
