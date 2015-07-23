<?php

// Primero incluimos nuestro archivo javascript definido anteriormente
define('rps_url',WP_PLUGIN_URL."/raskit-post-slider/");
wp_enqueue_script( 'mi-script-ajax', rps_url . '/js/slider.js', array( 'jquery' ) );

// ahora declaramos la variable MyAjax y le pasamos el valor url (wp-admin/admin-ajax.php) al script ajax-search.js
wp_localize_script( 'mi-script-ajax', 'MyAjax', array( 'url' => admin_url( 'admin-ajax.php' ) ) );
 
//Para manejar admin-ajax tenemos que añadir estas dos acciones.
//IMPORTANTE!! Para que funcione reemplazar "buscar_posts" por vuestra action definida en ajax-search.js
 
add_action('wp_ajax_get_postype_promociones', 'get_postype_promociones');
add_action('wp_ajax_nopriv_get_postype_promociones', 'get_postype_promociones');
 
function get_postype_promociones() { //API para obtener datos json para la grilla de promociones
     
    $paged     = $_POST["paged"]; 
    $next_posts = new WP_Query(array(
        'post_type'   => 'promociones',
        'post_status' => 'publish',
        'posts_per_page' => 9,
        'paged' => $paged
    ));
    if ( $next_posts->have_posts() ) {
        // devolvemos como output el listado de posts como JSON

        $jsonArray = array();

        while($next_posts->have_posts()): $next_posts->the_post();

            $fechaVencimiento = get_field('promoexpiration');

            $fecha = DateTime::createFromFormat('Y/m/d', "". substr($fechaVencimiento, 0, 4) . "/" . substr($fechaVencimiento, 4, 2) . "/" . substr($fechaVencimiento, 6, 2) . "");
            $today = new DateTime;

            if ($fecha < $today) {
                $current_post = get_post( $post->ID, 'ARRAY_A' );
                $current_post['post_status'] = 'trash';
                wp_update_post($current_post);
            }else{
               //$url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
               $image_id = get_post_thumbnail_id($post->ID);
               $img_url = wp_get_attachment_image_src($image_id,'grid-promotions-slider', true);
               $url = $img_url[0];
               $postitle = get_field('tituloPromocion');  
               $subtitledetails = get_field('subtitledetails');
               $porcentaje = (int)get_field('priceregular');
               $price = get_field('precio');
               $priceregu =  ($price ) + ( ($price ) * ($porcentaje / 100) );
               $priceregular =  ceil( $priceregu);
               $link = get_permalink();
               $checkboxIncluye = get_field('checkbox_incluye');
               $arr = array(
                                'image'           => $url, 
                                'title'           => $postitle,  
                                'subtitledetails' => $subtitledetails,
                                'priceregular'    => $priceregular,
                                'price'           => $price,
                                'link'            => $link,
                                'porcentaje'      => $porcentaje,
                                'checkboxIncluye' => $checkboxIncluye
                            );
                array_push($jsonArray, $arr);
            }
        endwhile;
        wp_reset_query();
           
        array_push($jsonArray);

        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);

        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }else{
        echo json_encode( array(
            'information'   => 'no se encontraron mas posts'
        )  );
    }
    
    exit;
}

/*API para Categorias Principales*/

function get_postype_main_category() {
     
    $offset     = absint( $_REQUEST['posts_offset'] );  
    $next_posts = new WP_Query(array(
        'offset'        => $offset,
        'post_type'     => 'maincategories',
        'post_status'   => 'publish',
        'post_per_page' => -1
        
    ));
    if ( $next_posts->have_posts() ) {
        // devolvemos como output el listado de posts como JSON
        $jsonArray = array();
        while($next_posts->have_posts()): $next_posts->the_post();
           $image_id = get_post_thumbnail_id($post->ID);
           $img_url = wp_get_attachment_image_src($image_id,'principal-categories-hotel-slider', true);
           $url = $img_url[0];
           $link = get_permalink();
           
           $postitle = get_the_title($post->ID);

           $arr = array(
                            'image'           => $url, 
                            'title'           => $postitle, 
                            'link'            => $link
                        );
            array_push($jsonArray, $arr);
        endwhile;
        wp_reset_query();
           
        array_push($jsonArray);
        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);
        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }
    echo json_encode( array() );
    exit;
}

add_action('wp_ajax_get_postype_main_category', 'get_postype_main_category');
add_action('wp_ajax_nopriv_get_postype_main_category', 'get_postype_main_category');

/* FIN DE LA API*/


add_action('wp_ajax_get_postype_main_slider', 'get_postype_main_slider');
add_action('wp_ajax_nopriv_get_postype_main_slider', 'get_postype_main_slider');

function get_postype_main_slider() {
     
    $offset     = absint( $_REQUEST['posts_offset'] );  
    $next_posts = new WP_Query(array(
        'offset'      => $offset,
        'post_type'   => 'slider_principal',
        'post_status' => 'publish',
        'post_per_page' => -1
    ));
    if ( $next_posts->have_posts() ) {
        // devolvemos como output el listado de posts como JSON

        $jsonArray = array();

        while($next_posts->have_posts()): $next_posts->the_post();

           //$image_url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
           $image_id = get_post_thumbnail_id($post->ID);
           $img_url = wp_get_attachment_image_src($image_id,'principal-slider', true);
           $img_main_url = $img_url[0];
           $title = get_the_title($post->ID);
           $content = get_the_content($post->ID);
           $text_url = get_field('text_url');
           $url = get_field('url_aviso');

           $arr = array(
                            'image'    => $img_main_url, 
                            'title'    => $title, 
                            'content'  => $content,
                            'text_url' => $text_url,
                            'url'      => $url
                        );

            array_push($jsonArray, $arr);

        endwhile;
        wp_reset_query();
           
        array_push($jsonArray);

        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);

        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }
    echo json_encode( array() );
    exit;
}

function get_postype_basic() {
     
    $offset     = absint( $_REQUEST['posts_offset'] );
    $promotion_id = $_POST['promotion_id'];  
    $next_posts = new WP_Query(array(
        'offset'      => $offset,
        'post_type'   => 'promociones',
        'post_status' => 'publish',
        'p'           => $promotion_id,
        'post_per_page' => -1
    ));
    if ( $next_posts->have_posts() ) {
        // devolvemos como output el listado de posts como JSON

        $jsonArray = array();

        while($next_posts->have_posts()): $next_posts->the_post();

            if( class_exists('Dynamic_Featured_Image') ) {
               global $dynamic_featured_image;
               $features_img_array = $dynamic_featured_image->get_all_featured_images( $post->ID );
            }
            foreach ($features_img_array as $featureImg) {
                $title =  get_post( $featureImg["attachment_id"] )->post_title;
                $img_url = $dynamic_featured_image -> get_image_url( $featureImg["attachment_id"], "single-promotion-slider" ); 

                $arr = array( 'image'  => $img_url, 'title' => $title );

                array_push($jsonArray, $arr);
            }
            
        endwhile;
        wp_reset_query();
           
        array_push($jsonArray);

        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);

        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }
    echo json_encode( array() );
    exit;
}

add_action('wp_ajax_get_postype_basic', 'get_postype_basic');
add_action('wp_ajax_nopriv_get_postype_basic', 'get_postype_basic');

function get_postype_relation_category() {
    $offset     = absint( $_REQUEST['posts_offset'] );  
    $next_posts = new WP_Query(array(
        'offset'      => $offset,
        'post_type'   => 'promociones',
        'post_status' => 'publish',
        'post_per_page' => -1
    ));
    if ( $next_posts->have_posts() ) {
        // devolvemos como output el listado de posts como JSON

        $jsonArray = array();

        while($next_posts->have_posts()): $next_posts->the_post();

            $image_id = get_post_thumbnail_id($post->ID);
            $img_url = wp_get_attachment_image_src($image_id,'promotion-relations-slider', true);
            $url = $img_url[0];
            $postitle = get_field('tituloPromocion'); 
            $subtitledetails = get_field('subtitledetails');
            $porcentaje = (int)get_field('priceregular');
            $price = get_field('precio');
            $priceregular =   round(((int)$price ) + (((int)$price ) * ($porcentaje / 100)));
            $porcentaje = (int)get_field('priceregular');
            $checkboxIncluye = get_field('checkbox_incluye');

           $link = get_permalink();

           $arr = array(
                            'image'           => $url,
                            'title'           => $postitle, 
                            'subtitledetails' => $subtitledetails,
                            'priceregular'    => $priceregular,
                            'price'           => $price,
                            'link'            => $link,
                            'porcentaje'      => $porcentaje,
                            'checkboxIncluye' => $checkboxIncluye
                        );

            array_push($jsonArray, $arr);

        endwhile;
        wp_reset_query();
           
        array_push($jsonArray);

        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);

        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }
    echo json_encode( array() );
    exit;
}


add_action('wp_ajax_get_postype_relation_category', 'get_postype_relation_category');
add_action('wp_ajax_nopriv_get_postype_relation_category', 'get_postype_relation_category');

function get_postype_hotel_promotions() {
     
    $offset     = absint( $_REQUEST['posts_offset'] );  
    $next_posts = new WP_Query(array(
        'offset'      => $offset,
        'post_type'   => 'slider_principal',
        'post_status' => 'publish',
        'post_per_page' => -1
    ));
    if ( $next_posts->have_posts() ) {
        // devolvemos como output el listado de posts como JSON
        $jsonArray = array();
        while($next_posts->have_posts()): $next_posts->the_post();
           $image_id = get_post_thumbnail_id($post->ID);
           $img_url = wp_get_attachment_image_src($image_id,'principal-categories-hotel-slider', true);
           $url = $img_url[0];
           $postitle = get_the_title($post->ID);
           $subtitle = get_field('subtitle');
           $subtitledetails = get_field('subtitledetails');
           $priceregular = get_field('priceregular');
           $price = get_field('precio'); 

           $arr = array(
                            'image'           => $url, 
                            'title'           => $postitle, 
                            'subtitle'        => $subtitle, 
                            'subtitledetails' => $subtitledetails,
                            'priceregular'    => $priceregular,
                            'price'           => $price
                        );
            array_push($jsonArray, $arr);
        endwhile;
        wp_reset_query();
           
        array_push($jsonArray);
        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);
        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }
    echo json_encode( array() );
    exit;
}

add_action('wp_ajax_get_postype_hotel_promotions', 'get_postype_hotel_promotions');
add_action('wp_ajax_nopriv_get_postype_hotel_promotions', 'get_postype_hotel_promotions');


function get_postype_search_promotions() {
     
    $offset     = absint( $_REQUEST['posts_offset'] );
    $textToSearch = $_POST['textToSearch'];
    $paged = $_POST['paged'];
    $next_posts = new WP_Query(array(
        'offset'      => $offset,
        'post_type'   => 'promociones',
        's' => $textToSearch,
        'posts_per_page' => 5,
        'paged' => $paged
    ));
    if ( $next_posts->have_posts() ) {
        // devolvemos como output el listado de posts como JSON
        $jsonArray = array();
        while($next_posts->have_posts()): $next_posts->the_post();
           $image_id = get_post_thumbnail_id($post->ID);
           $img_url = wp_get_attachment_image_src($image_id,'medium', true);
           $url = $img_url[0];
           $postitle = get_field('tituloPromocion'); //get_the_title($post->ID);
           $subtitle = get_field('subtitle');
           $subtitledetails = get_field('subtitledetails');
           $porcentaje = (int)get_field('priceregular');
           $price = get_field('precio');
           $priceregular =   round(((int)$price ) + (((int)$price ) * ($porcentaje / 100)));
           $link = get_permalink();
           $pais = get_field('pais');
           $pais_img = get_field('paisbandera')['url'];
           $ciudad = get_field('ciudad');
           $arr = array(
                            'image'           => $url, 
                            'title'           => $postitle, 
                            'subtitle'        => $subtitle, 
                            'subtitledetails' => $subtitledetails,
                            'priceregular'    => $priceregular,
                            'price'           => $price,
                            'link'            => $link,
                            'pais'            => $pais,
                            'paisImg'         => $pais_img,
                            'ciudad'          => $ciudad,
                            'totalPost' => $next_posts->found_posts
                        );
            array_push($jsonArray, $arr);
        endwhile;
        wp_reset_query();
           
        array_push($jsonArray);
        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);
        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }
    echo json_encode( array() );
    exit;
}

add_action('wp_ajax_get_postype_search_promotions', 'get_postype_search_promotions');
add_action('wp_ajax_nopriv_get_postype_search_promotions', 'get_postype_search_promotions');


function get_hotels_by_promotion() {
     
    $promotion_id     = $_POST["promotion_id"]; 
    $next_posts = new WP_Query(array(
        'p'      => $promotion_id,
        'post_type'   => 'promociones'
    ));
    if ( $next_posts->have_posts() ) {
        //devolvemos como output el listado de posts como JSON
        $jsonArray = array();
        while($next_posts->have_posts()): $next_posts->the_post();
            $hotelPriceArray = get_field('price_by_hotel')["body"];
            $index = 0;
            //array_push($jsonArray, $hotelArray);
            $hotels = get_field('near_hotels');
            foreach ($hotels as $hotel) {
                $hotelFromDB = getHotelById($hotel->ID);
                $hotelFromDB["precio_h_simple"] = (int)$hotelPriceArray[$index][0]["c"];
                $hotelFromDB["precio_h_doble"] = (int)$hotelPriceArray[$index][1]["c"];
                $hotelFromDB["precio_h_triple"] = (int)$hotelPriceArray[$index][2]["c"];
                array_push($jsonArray, $hotelFromDB);
                $index++;
            }
        endwhile;
        wp_reset_query();
           
        array_push($jsonArray);
        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);
        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }
    echo json_encode( array() );
    exit;
}

function getHotelById($hotel_id){
    $hotel = array();
    $next_posts = new WP_Query(array(
        'p'      => $hotel_id,
        'post_type'   => 'hoteles'
    ));

    if ( $next_posts->have_posts() ) {
        while($next_posts->have_posts()): $next_posts->the_post();
            $postitle = get_the_title($post->ID);
            $postid = get_the_ID();
            $location = get_field('maps_google');
            $pagina_web = get_field('web_hotel');
            $star_hotel = get_field('star_hotel');
            $address_hotel = get_field('address_hotel');
            $image_id = get_post_thumbnail_id($post->ID);
            $img_url = wp_get_attachment_image_src($image_id,'medium', true);
            $url = $img_url[0];
            $h_simple = get_field('precio_havitacion_simple');
            $h_doble = get_field('precio_havitacion_doble');
            $h_triple = get_field('precio_havitacion_triple');
            $url_star = get_bloginfo('wpurl').'/wp-content/themes/stanleywp-child/assets/images/star.png';
            $hotel = array(
                'title'           => $postitle,
                'id'              => $postid,
                'imageUrl'        => $url,
                'location'        => $location,
                'pagina_web'      => $pagina_web,
                'star_hotel'      => $star_hotel,
                'address_hotel'   => $address_hotel,
                'precio_h_simple' => $h_simple,
                'precio_h_doble'  => $h_doble,
                'precio_h_triple' => $h_triple,
                'imageStar'       => $url_star
                );
        endwhile;
        wp_reset_query();
        return $hotel;
        exit;
    }
    return $hotel;
    exit;
}

add_action('wp_ajax_get_hotels_by_promotion', 'get_hotels_by_promotion');
add_action('wp_ajax_nopriv_get_hotels_by_promotion', 'get_hotels_by_promotion');


/* GET CHILD OF CATEGORIES */
function get_promotions_by_category_name() {
     
    $category_name     = $_POST["category_name"];
    $paged    = $_POST["paged"];  
    $next_posts = new WP_Query(array(
        'post_type' => 'promociones',
        'post_status' => 'publish',
        'category_name' => $category_name,
        'posts_per_page' => 6,
        'paged' => $paged
    ));

    if ( $next_posts->have_posts() ) {
        // devolvemos como output el listado de posts como JSON

        $jsonArray = array();

        while($next_posts->have_posts()): $next_posts->the_post();

            $fechaVencimiento = get_field('promoexpiration');

            $fecha = DateTime::createFromFormat('Y/m/d', "". substr($fechaVencimiento, 0, 4) . "/" . substr($fechaVencimiento, 4, 2) . "/" . substr($fechaVencimiento, 6, 2) . "");
            $today = new DateTime;

            if ($fecha < $today) {
                $current_post = get_post( $post->ID, 'ARRAY_A' );
                $current_post['post_status'] = 'trash';
                wp_update_post($current_post);
            }else{
               //$url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
               $image_id = get_post_thumbnail_id($post->ID);
               $img_url = wp_get_attachment_image_src($image_id,'grid-promotions-slider', true);
               $url = $img_url[0];
               $postitle = get_field('tituloPromocion'); 
               $subtitle = get_field('subtitle');
               $subtitledetails = get_field('subtitledetails');
               $porcentaje = (int)get_field('priceregular');
               $price = get_field('precio');
               $priceregular =   round(((int)$price ) + (((int)$price ) * ($porcentaje / 100)));
               $link = get_permalink();
               $checkboxIncluye = get_field('checkbox_incluye');
               $arr = array(
                                'image'           => $url, 
                                'title'           => $postitle, 
                                'subtitle'        => $subtitle, 
                                'subtitledetails' => $subtitledetails,
                                'priceregular'    => $priceregular,
                                'price'           => $price,
                                'link'            => $link,
                                'porcentaje'      => $porcentaje,
                                'checkboxIncluye' => $checkboxIncluye
                            );
                array_push($jsonArray, $arr);
            }
        endwhile;
        wp_reset_query();
        array_push($jsonArray);

        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);

        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }else{
        echo json_encode( array(
            'information'   => 'no se encontraron mas posts'
        )  );
    }
    
    exit;
}

add_action('wp_ajax_get_promotions_by_category_name', 'get_promotions_by_category_name');
add_action('wp_ajax_nopriv_get_promotions_by_category_name', 'get_promotions_by_category_name');

/* GET IMAGES OF CATEGORIE */
function get_images_by_category_id() {
     
    $category_id    = $_POST["category_id"];
    $next_posts = new WP_Query(array(
        'post_type' => 'maincategories',
        'p' => $category_id
    ));

    if ( $next_posts->have_posts() ) {
        // devolvemos como output el listado de posts como JSON
        
        $jsonArray = array();
        $features_img_array = null;
        $title_array = array();
        while($next_posts->have_posts()): $next_posts->the_post();
           
            if( class_exists('Dynamic_Featured_Image') ) {
               global $dynamic_featured_image;
               $features_img_array = $dynamic_featured_image->get_all_featured_images( $post->ID );
            }
            foreach ($features_img_array as $featureImg) {
                $title =  get_post( $featureImg["attachment_id"] )->post_title;
                $img_url = $dynamic_featured_image -> get_image_url( $featureImg["attachment_id"], "main-categories-image" ); 

                $arr = array( 'image'  => $img_url, 'title' => $title);

                array_push($jsonArray, $arr);
            }
        endwhile;
        wp_reset_query();
           
        array_push($jsonArray);

        
        header('Content-Type: application/json');
        echo json_encode( $jsonArray);

        // como es una petición AJAX, cortamos inmediatamente la ejecución de PHP
        exit;
    }else{
        echo json_encode( array(
            'information'   => 'no se encontraron mas posts'
        )  );
    }
    
    exit;
}

add_action('wp_ajax_get_images_by_category_id', 'get_images_by_category_id');
add_action('wp_ajax_nopriv_get_images_by_category_id', 'get_images_by_category_id');





?>
