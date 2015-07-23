<?php
/*
Plugin Name: Raskit Custom Post Types
Plugin URI: http://raskit.com
Description: Custom Post Types for "Vamosya" website.
Version: 1.0.0
Author: Billy Caballero & Christian Tamayo
Author URI: http://raskit.com
License: GPLv2 or later
*/

add_action( 'init', 'raskit_cpt' );

function raskit_cpt() {

	register_post_type( 'maincategories', array(
		'labels' => array(
			'name' => 'Categorias Principales',
			'singular_name' => 'Categoria Principal',
		),
		'description' => 'Aqui se ingresan las categorias principales de las promociones.',
		'public' => true,
		'menu_position' => 20,
		'supports'      => array( 'title', 'thumbnail'),
		'taxonomies'    => array( 'category' )
	));

	register_post_type( 'promociones', array(
		'labels' => array(
			'name' => 'Promociones',
			'singular_name' => 'Promoción',
		),
		'description' => 'Aqui se ingresan las promociones turisticas.',
		'public' => true,
		'menu_position' => 20,
		'supports'      => array( 'title', 'thumbnail'),
		'taxonomies'    => array( 'category', 'post_tag')
	));

	register_post_type( 'slider_principal', array(
		'labels' => array(
			'name' => 'Slider Principal',
			'singular_name' => 'Slider Principal',
		),
		'description' => 'Aqui se crean los post el slider principal del homepage',
		'public' => true,
		'menu_position' => 20,
		'supports'      => array( 'title', 'editor' ,'thumbnail')
	));

	register_post_type( 'hoteles', array(
		'labels' => array(
			'name' => 'Hoteles',
			'singular_name' => 'Hotel',
		),
		'description' => 'Aqui se crean los post para los hoteles',
		'public' => true,
		'menu_position' => 20,
		'supports'      => array( 'title', 'editor' ,'thumbnail')
	));
}

?>