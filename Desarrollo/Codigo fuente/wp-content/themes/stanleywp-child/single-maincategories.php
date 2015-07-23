<?php 
/*
Template Name: Categorias Principales Template
 */
?>
<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<?php $page_title = get_the_title();?>
<?php $page_id = get_the_ID();?>
<div id="postIdContent" style="display:none;">
	<?php echo $page_id; ?>
</div>
<div id="slider-category-container">
	<div class="container" id="promotion_categories_container">
		<div id="promotions_categories_slider_vamosya"></div>
	</div>
</div>

<div id="images-container">
	<div class="container" id="touristic-images-container">
			<div id="touristics-images-top">
				<div class="col-md-8 col-sm-12 principal-image" id="sliderBasicMainCategories">
					
				</div>
				<div class="col-md-4 col-sm-12 description-category">
					<h1 id="countryTitle"><?= $page_title; ?></h1>
					<div id="countryDescription"> <?php echo get_field("description_principal_category"); ?>  </div>
				</div>
			</div>
			<div id="touristics-images-bottom">
				<?php 
					$fields_image = ["primera_imagen_auxiliar","segunda_imagen_auxiliar","tercera_imagen_auxiliar"];
					for ($i=0; $i < 3; $i++) { ?>
						<div class="col-xs-4 secundary-images">
							<?php $image = get_field( $fields_image[$i] );
							$url = $image['url']; $alt = $image['alt']; $size = 'single-promotion-slider'; $thumb = $image['sizes'][ $size ]; ?>
							<img src="<?php echo $thumb; ?>" alt="<?php echo $alt; ?>" />
						</div>
				<?php } ?>
			</div>
	</div>
</div>

<div id="category-slug" style="display:none;">
	<?php 
		$category = get_the_category();
		echo $category[0]->slug;
	?>
</div>

<img id="no-post-image-maincategories" style="display:none;"src="<?php echo get_template_directory_uri();?>/images/404.png" alt="">

<div id="grid-container">
	<div class="container" id="grid-promotion-container">
		<div class="col-md-3 col-sm-12 collections-container">
				<div id="title-collection">				
					<h2>Destino</h2>
				</div>
				<div id="list-child-collection">
					<div id="content-data-categories">
						<?php 
							$category = get_the_category($post->ID);
							wp_list_cats(array(
						        "child_of" => get_the_category()[count($category) - 1]->cat_ID,
						        "hide_empty" =>0
						    )); 
						?>
					</div>
				</div>
		</div>

		<div class="col-md-9 col-sm-12 feature-promotion-container">
				<div id="title-feature">
					<h2>Promociones</h2>
				</div>
				<div id="grid-child-collection">
						<!--  Grilla promociones -->
						<div class="row" id="containerPostMainCategories"></div>
				</div>
				<img id="avionImagen" src="<?=get_bloginfo('wpurl')?>/wp-content/uploads/2015/04/plane_message.png" style="display: none;"/>


				<div class="container" id="morePostButtonContainer">
					<div class="loader" id="animationLoadDataCanvas" style="display:none;" >
						<div class="loader-inner ball-triangle-path">
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
					<div id="containerButtonMorePost">
						<button id="morePosts" onclick="morePostByCategory()" type="button" class="ghost-button-border-color">Mas promociones ... </button>
					</div>
				</div>

		</div>
	</div>
</div>

<?php endwhile; endif; // end of the loop. ?>
 <?php get_footer(); ?>