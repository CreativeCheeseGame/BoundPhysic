<?php

if (function_exists('add_theme_support')) {
    the_post_thumbnail();
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'principal-slider', 1400, 875 );
    add_image_size( 'principal-categories-hotel-slider', 240, 160 ); //tambien para hoteles
    add_image_size( 'grid-promotions-slider', 390, 280 );
    add_image_size( 'single-promotion-slider', 696, 500 );
    add_image_size( 'promotion-relations-slider', 264, 190 );
    add_image_size( 'main-categories-image', 800, 575 );
}

function register_styles_and_scripts_raskit()
{

    //Registrando estilos principales
    wp_register_style( 'footer', get_stylesheet_directory_uri() . '/assets/css/footer.css', array(), 'ver. 1.0', 'all' );
    wp_register_style( 'menu', get_stylesheet_directory_uri() . '/assets/css/menu.css', array(), 'ver. 1.0', 'all' );
    wp_register_style( 'toastr_css', get_stylesheet_directory_uri() . '/assets/css/toastr/toastr.css', array(), 'ver. 1.0', 'all' );
    wp_register_style( 'sliderhorizontal', get_stylesheet_directory_uri() . '/assets/css/home/sliderhorizontal.css', array(), 'ver. 1.0', 'all' );
    wp_register_style( 'font-style', get_stylesheet_directory_uri() . '/assets/css/font-style.css', array(), 'ver. 1.0', 'all' );
    wp_register_style( 'arvo-bold', get_stylesheet_directory_uri() . '/assets/fonts/arvobold/arvo-bold.css', array(), 'ver. 1.0', 'all' );
    wp_register_style( 'avenir-next-lt-pro', get_stylesheet_directory_uri() . '/assets/fonts/avenir-next-lt-pro/AvenirFonts.css', array(), 'ver. 1.0', 'all' );
    wp_register_style( 'gridpromociones', get_stylesheet_directory_uri() . '/assets/css/home/gridpromociones.css', array(), 'ver. 1.0', 'all' );
    wp_register_style( 'loaderEffects', get_stylesheet_directory_uri() . '/assets/css/loaderEffects.css', array(), 'ver. 1.0', 'all' );


    wp_register_script( 'slidersHome', get_stylesheet_directory_uri() . '/assets/js/home/slidersHome.js', array( 'jquery' ), 'ver 1.0', true );
    wp_register_script( 'menu_js', get_stylesheet_directory_uri() . '/assets/js/menu/menu.js', array( 'jquery' ), 'ver 1.0', true );

    wp_enqueue_style( 'menu' );
    wp_enqueue_style( 'footer' );
    wp_enqueue_style( 'toastr_css' );
    wp_enqueue_style( 'sliderhorizontal' );
    wp_enqueue_style( 'font-style' );
    wp_enqueue_style( 'arvo-bold' );
    wp_enqueue_style( 'avenir-next-lt-pro' );
    wp_enqueue_style( 'gridpromociones' );
    wp_enqueue_style( 'loaderEffects' );

    wp_enqueue_script('slidersHome'); 
    wp_enqueue_script('menu_js'); 

    if ( is_front_page() ): {

        // Registrando los estilos para el home
        wp_register_style( 'advisormovil', get_stylesheet_directory_uri() . '/assets/css/home/advisormovil.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'homeslider', get_stylesheet_directory_uri() . '/assets/css/home/homeslider.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'searchpromo', get_stylesheet_directory_uri() . '/assets/css/home/searchpromo.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'widgetfacepost', get_stylesheet_directory_uri() . '/assets/css/home/widgetfacepost.css', array(), 'ver. 1.0', 'all' );
       
        // Enqueue JS scripts globally
        wp_register_script( 'postjs', get_stylesheet_directory_uri() . '/assets/js/home/post.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'avionCanvas', get_stylesheet_directory_uri() . '/assets/js/home/avionCanvas.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'facebookLibrary', get_stylesheet_directory_uri() . '/assets/js/home/facebookLibrary.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'searchHome', get_stylesheet_directory_uri() . '/assets/js/home/searchHome.js', array( 'jquery' ), 'ver 1.0', true );

        // For either a plugin or a theme, you can then enqueue the style:
        wp_enqueue_style( 'advisormovil' );
        wp_enqueue_style( 'homeslider' );
        wp_enqueue_style( 'searchpromo' );
        wp_enqueue_style( 'widgetfacepost' );

        wp_enqueue_script('postjs'); 
        wp_enqueue_script('avionCanvas');      
        wp_enqueue_script('searchHome');    
        wp_enqueue_script('facebookLibrary');       
    }
    endif;

    // Registrando estilos solo para pagina promociones
    if ( is_singular( 'promociones' ) ): {

        wp_register_style( 'infotabpromo', get_stylesheet_directory_uri() . '/assets/css/promociones/infotabpromo.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'singlepromociones', get_stylesheet_directory_uri() . '/assets/css/promociones/singlepromociones.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'sliderbasicpromociones', get_stylesheet_directory_uri() . '/assets/css/promociones/sliderbasicpromociones.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'slider_promociones_relacionadas', get_stylesheet_directory_uri() . '/assets/css/promociones/slider_promociones_relacionadas.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'slider_hotel', get_stylesheet_directory_uri() . '/assets/css/promociones/sliderhotel.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'cs-select', get_stylesheet_directory_uri() . '/assets/css/promociones/cs-select.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'cs-skin-elastic', get_stylesheet_directory_uri() . '/assets/css/promociones/cs-skin-elastic.css', array(), 'ver. 1.0', 'all' );


        wp_register_script( 'slidersSinglePromotions', get_stylesheet_directory_uri() . '/assets/js/single-promotions/slidersSinglePromotions.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'fbCommentsLibrary', get_stylesheet_directory_uri() . '/assets/js/single-promotions/fbCommentsLibrary.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'timerExpiredPromotion', get_stylesheet_directory_uri() . '/assets/js/single-promotions/timerExpiredPromotion.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'sliderHotelSinglePromotion', get_stylesheet_directory_uri() . '/assets/js/single-promotions/sliderHotelSinglePromotion.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'formToSendData', get_stylesheet_directory_uri() . '/assets/js/single-promotions/formToSendData.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'hotelMap', get_stylesheet_directory_uri() . '/assets/js/single-promotions/hotelMap.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'tabs', get_stylesheet_directory_uri() . '/assets/js/single-promotions/cbpFWTabs.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'promotion_tabs', get_stylesheet_directory_uri() . '/assets/js/single-promotions/promotiontab.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'contentForForm', get_stylesheet_directory_uri() . '/assets/js/single-promotions/contentForForm.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'hoverHotel', get_stylesheet_directory_uri() . '/assets/js/single-promotions/hoverHotel.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'classie', get_stylesheet_directory_uri() . '/assets/js/single-promotions/classie.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'selectFx', get_stylesheet_directory_uri() . '/assets/js/single-promotions/selectFx.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'toastr_js', get_stylesheet_directory_uri() . '/assets/js/toastr/toastr.js', array( 'jquery' ), 'ver 1.0', true );


        wp_enqueue_style( 'infotabpromo' );
        wp_enqueue_style( 'singlepromociones' );
        wp_enqueue_style( 'sliderbasicpromociones' );
        wp_enqueue_style( 'slider_promociones_relacionadas' );
        wp_enqueue_style( 'slider_hotel' );
        wp_enqueue_style( 'cs-select' );
        wp_enqueue_style( 'cs-skin-elastic' );

        wp_enqueue_script('fbCommentsLibrary'); 
        wp_enqueue_script('timerExpiredPromotion');  
        wp_enqueue_script('slidersSinglePromotions'); 
        wp_enqueue_script('sliderHotelSinglePromotion'); 
        wp_enqueue_script('formToSendData'); 
        wp_enqueue_script('hotelMap'); 
        wp_enqueue_script('tabs');
        wp_enqueue_script('contentForForm');   
        wp_enqueue_script('hoverHotel');
        wp_enqueue_script('classie');
        wp_enqueue_script('selectFx');
        wp_enqueue_script('promotion_tabs');
        wp_enqueue_script('toastr_js'); 
    }
    endif;

    // Registrando estilos solo para pagina de las CATEGORIAS PRINCIPALES DE PROMOCIONES
    if ( is_singular( 'maincategories' ) ): {

        wp_register_style( 'category-promotion', get_stylesheet_directory_uri() . '/assets/css/categoria-principal-promociones/category-promotion.css', array(), 'ver. 1.0', 'all' );
        wp_register_style( 'category-grid-promotions', get_stylesheet_directory_uri() . '/assets/css/categoria-principal-promociones/category-grid-promotions.css', array(), 'ver. 1.0', 'all' );
     
        wp_register_script( 'maincategories', get_stylesheet_directory_uri() . '/assets/js/single-maincategories/maincategories.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'animationCanvasMainCategories', get_stylesheet_directory_uri() . '/assets/js/single-maincategories/animationCanvasMainCategories.js', array( 'jquery' ), 'ver 1.0', true );
        wp_register_script( 'sliderMainCategories', get_stylesheet_directory_uri() . '/assets/js/single-maincategories/sliderMainCategories.js', array( 'jquery' ), 'ver 1.0', true );

        wp_enqueue_style( 'category-promotion' );
        wp_enqueue_style( 'category-grid-promotions' );

        wp_enqueue_script('maincategories'); 
        wp_enqueue_script('animationCanvasMainCategories'); 
        wp_enqueue_script('sliderMainCategories'); 
        
    }
    endif;
  /*  
    // Registrando 
    if ( is_page_template('category-promotion.php') ): {


    }
    endif; */

}
add_action( 'wp_enqueue_scripts', 'register_styles_and_scripts_raskit' );


// Facebook Open Graph
/*
add_action('wp_head', 'add_fb_open_graph_tags');
function add_fb_open_graph_tags() {
    if (is_single()) {
        global $post;
        if(get_the_post_thumbnail($post->ID, 'thumbnail')) {
            $thumbnail_id = get_post_thumbnail_id($post->ID);
            $thumbnail_object = get_post($thumbnail_id);
            $image = $thumbnail_object->guid;
        } else {    
            $image = ''; // Change this to the URL of the logo you want beside your links shown on Facebook
        }
        //$description = get_bloginfo('description');
        $description = my_excerpt( $post->post_content, $post->post_excerpt );
        $description = strip_tags($description);
        $description = str_replace("\"", "'", $description);
?>
<meta property="og:title" content="<?php the_title(); ?>" />
<meta property="og:type" content="article" />
<meta property="og:image" content="<?php echo $image; ?>" />
<meta property="og:url" content="<?php the_permalink(); ?>" />
<meta property="og:description" content="<?php echo $description ?>" />
<meta property="og:site_name" content="<?php echo get_bloginfo('name'); ?>" />

<?php   }
}
*/
function my_excerpt($text, $excerpt){
    
    if ($excerpt) return $excerpt;

    $text = strip_shortcodes( $text );

    $text = apply_filters('the_content', $text);
    $text = str_replace(']]>', ']]&gt;', $text);
    $text = strip_tags($text);
    $excerpt_length = apply_filters('excerpt_length', 55);
    $excerpt_more = apply_filters('excerpt_more', ' ' . '[...]');
    $words = preg_split("/[\n
     ]+/", $text, $excerpt_length + 1, PREG_SPLIT_NO_EMPTY);
    if ( count($words) > $excerpt_length ) {
            array_pop($words);
            $text = implode(' ', $words);
            $text = $text . $excerpt_more;
    } else {
            $text = implode(' ', $words);
    }

    return apply_filters('wp_trim_excerpt', $text, $excerpt);
}

?>