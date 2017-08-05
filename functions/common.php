function printPictureSVG($name, $alt, $classes = '')
{
?>
  <picture class="<?php echo $classes; ?>">
    <source
    type="image/svg+xml"
    srcset="<?php echo get_template_directory_uri() . '/dist/images/' . $name . '.svg'; ?>">
    <img
    src="<?php echo get_template_directory_uri() . '/dist/images/' . $name . '.png'; ?>" 
    alt="<?php echo $alt; ?>">
  </picture>
<?php
}
