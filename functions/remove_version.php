<?php
function remove_version_meta()
{
    return '';
}

function remove_version_asset($src)
{
    if (strpos($src, 'ver=' . get_bloginfo('version'))) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
