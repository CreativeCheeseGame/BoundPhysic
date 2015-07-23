<?php
/*
Plugin Name: Raskit Post Slider
Plugin URI: http://raskit.com
Description: A multipurpose responsive slideshow plugin powered with javascript, lots of easy customizable options and many more to explore.
Version: 1.0.0
Author: Billy Caballero & Christian Tamayo
Author URI: http://raskit.com
License: GPLv2 or later
*/
require_once(dirname (__FILE__) . '/' . 'request_posts_api.php');

define('rps_url',WP_PLUGIN_URL."/raskit-post-slider/");

function raskit_post_slider(){

}

add_action( 'init', 'raskit_post_slider' );


/* ---------------------------------------------------------------------------------*/
function rps_enqueue() {
	wp_register_script( 'raskit_slider_factory',rps_url. 'js/sliderFactory.js', array( 'jquery' ), 'ver 1.0', true );
	wp_register_script( 'raskit_slider_parent',rps_url. 'js/slider.js', array( 'jquery' ), 'ver 1.0', true );
	wp_register_script( 'raskit_slider_carrusel',rps_url. 'js/sliderCarrusel.js', array( 'jquery' ), 'ver 1.0', true );
	wp_register_script( 'raskit_slider_basic',rps_url. 'js/sliderBasic.js', array( 'jquery' ), 'ver 1.0', true );
	wp_register_script( 'raskit_carrousel',rps_url. 'js/carrousel.js', array( 'jquery' ), 'ver 1.0', true );
	wp_register_script( 'raskit_ajax',rps_url. 'js/Ajax.js', array( 'jquery' ), 'ver 1.0', true );
	wp_register_script( 'raskit_slider_hotel',rps_url. 'js/sliderHotel.js', array( 'jquery' ), 'ver 1.0', true );

	wp_register_style( 'slider_css', rps_url . '/css/slider.css', array(), 'ver. 1.0', 'all' );

	wp_enqueue_script('raskit_ajax');
	wp_enqueue_script('raskit_slider_factory');
	wp_enqueue_script('raskit_slider_parent');
	wp_enqueue_script('raskit_slider_carrusel');
	wp_enqueue_script('raskit_slider_basic');
	wp_enqueue_script('raskit_carrousel');
	wp_enqueue_script('raskit_slider_hotel');
	wp_enqueue_style( 'slider_css' );
	
}
add_action( 'wp_enqueue_scripts', 'rps_enqueue' );


