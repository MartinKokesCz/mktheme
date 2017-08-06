<?php
/**
 * @package WordPress
 * @subpackage MK Theme
 */
?>
<!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title><?php wp_title('|', true, 'right'); ?></title>

  <link rel="profile" href="http://gmpg.org/xfn/11" />
  <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

<?php wp_head(); ?>
</head>

<body <?php body_class('c_body'); ?>>

  <nav class="navbar navbar-toggleable-md navbar-inverse fixed-top c_navbar">
    <div class="container">
        <button
        class="navbar-toggler navbar-toggler-right" type="button"
        data-toggle="collapse" data-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand ml-4" href="#">
          <?php printPictureSVG("logo", "Logo ZŠ Mnichovická", "img-fluid"); ?>
        </a>
        <div class="collapse navbar-collapse align-self-end" id="navbarCollapse">
<?php
          wp_nav_menu(array(
              'theme_location' => 'navbar',
              'container' => false,
              'menu_class' => 'nav navbar-nav ml-auto',
              'fallback_cb' => '__return_false',
              'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
              'depth' => 2,
              'walker' => new bootstrap_4_walker_nav_menu()
            ));
?>
        </div>
        </div>
      </nav>
