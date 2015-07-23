<?php
/*
Template Name: Inicio Template
 */
?>
<?php get_header(); ?>



<div id="search_container">
	<div id="search"> 
		<div id="searchBackgroundContainer">
			<img src="<?=get_bloginfo('wpurl')?>/wp-content/uploads/2015/04/marker.png"/>
			<div class="searchCity">!Busca tus destinos!</div>
			<input type="text" id="input_search" placeholder="Ciudad o Pais" autocomplete = "off" >
		</div>
		<div class="tableContainer" hidden>
			<div id="containerTableSearch">
				<table class="table table-striped" id="tableSearched"></table>
			</div>
		</div>
	</div>
	<div id="main_slider_vamosya"></div>
</div>

<div id="categories_slider_main_container">
	<div class="container" id="promotion_categories_container">
		<div id="promotions_categories_slider_vamosya"></div>
	</div>
</div>

<div id="containergrilla">
	
	<div class="container">
		<!--  Grilla promociones -->
		<div class="row" id="containerNewPost"></div>
	</div>
	<div class="container" id="morePostButtonContainer">
		<div class="loader" id="animationLoadDataCanvas" style="display:none;" >
			<div class="loader-inner ball-triangle-path">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
		<div id="containerButtonMorePost">
			<button id="morePosts" onclick="getPosts()" type="button" class="ghost-button-border-color">Mas promociones ... </button>
		</div>
	</div>	
</div>

<div id="contentface">
	<div id="backgroundFb">
		<div class="content"></div>
		<div class="overlay"></div>
		<div class="container">
			<div class="row">
				<!-- Youtube -->
				<div class="col-md-6 youtubeContainer">
					<iframe width="100%" height="300px" src="https://www.youtube.com/embed/MBtfidpnEmU" frameborder="0" allowfullscreen></iframe>
				</div>
				<!-- Facebook -->
				<div class="col-md-6" id="container-facebook-banner">
					<div id="fb-root"></div>
					<!-- end facebook -->
					<img id="avionImagen" src="<?=get_stylesheet_directory_uri();?>/assets/images/plane_message.png" style="display: none;"/>
				 	<!--  Contenido Facebook y Barner  -->
				 	<div class="content_fb">
	     				<div class="fb-like-box" data-href="https://www.facebook.com/vamosyaagency" data-width="350" data-height="450" data-colorscheme="light" data-show-faces="true" data-header="true" data-stream="true" data-show-border="true"></div>  	
	     			</div>	
				 	
				</div>
			</div>
		</div>
	</div>
</div>

 <?php get_footer(); ?>
