<?php
/*
Template Name: Promociones Template
 */
?>
<?php get_header(); ?>

<div id="container_principal" class="first_section_row">
	<div class="container" id="primarycontainer">
		<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
		<div id="promotionId" style="display: none;"><?php the_ID(); ?></div>
		<div id="promotionKeys" style="display: none;" ><?php the_field('checkbox_incluye'); ?></div>
		<div class="row item_detail_first_section">
			<div class="col-md-6">
					<div id="slider_basic_promociones"></div>
			</div>
			<div class="col-md-6" id="calculator_section">
				<div class="promo_site_detail">
					<div class="promo_site_first">
						<h2 class="promo_city"><?php the_field('tituloPromocion'); ?></h2>
						<div class="promo_country"><?php the_field('pais'); ?></div>
						<div class="promo_city_image">
							<?php 
								$image = get_field('paisbandera');
								if( !empty($image) ): ?>
									<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
								<?php endif; 
							?>
						</div>						
					</div>
					<div class="promo_site_second">
						<div class="text_comparte">Comparte</div> <div class="addthis_sharing_toolbox"></div>
					</div>
				</div>
				<div class="promo_city_description" style="display:none;"><?php the_field('aboutCity'); ?></div>

				<!--Selecciona tu hotel-->
				<div class="content-selected-hotel">
					<h3 id="title_hotel_label">Selecciona tu hotel: </h3> <span id="title_hotel_selected"></span>
					<div id="starts_hotel"></div>
					<div id="hotel_id"></div>
					<div id="seleccion_hoteles_contenedor"></div>
				</div>

				<!-- Modal -->
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				  <div class="modal-dialog" id="acercadelaciudad">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title" id="myModalLabel">Acerca de la Ciudad</h4>
				      </div>
				      <div class="modal-body">
				        <?php the_field('aboutCity'); ?>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				      </div>
				    </div>
				  </div>
				</div>


				<div id="type_room_section">
					<div id="type_room">
						<h3 id="title">Tipo y cantidad de habitaciones</h3>
						<div id="content-type-room">
							<div class="simple">
								<h3>Simple</h3>
								<select class="cs-select cs-skin-elastic" id="simple-select" >
									<option>0</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
									<option>9</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
								</select>
								<!-- <select class="form-control" id="simple-select"></select> -->
							</div>
							<div class="doble">
								<h3>Doble</h3>
								<select class="cs-select cs-skin-elastic" id="doble-select" >
									<option>0</option>
									<option selected >1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
									<option>9</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
								</select>
								<!-- <select class="form-control" id="doble-select"></select> -->
							</div>
							<div class="triple">
								<h3>Triple</h3>
								<select class="cs-select cs-skin-elastic" id="triple-select" >
									<option>0</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
									<option>9</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
								</select>
								<!-- <select class="form-control" id="triple-select"></select> -->
							</div>
								


						</div>

					</div>
					<div id="cant_person">
						<div id="textCantPersonas">Cantidad de personas</div>
						<div id="container_number_person"><i class="fa fa-users fa-2x user_number"></i><p id="numero_personas">0</p></div>
					</div>
				</div>
				<div class="price_and_book_it">
					<div class="price_total" >
						<div class="price_total_text">TOTAL : </div>
						<div class="price_element">$</div>
						<div class="price_element" id="position0">0</div>
						<div class="price_element" id="position1">0</div>
						<div class="price_element" id="position2">0</div>
						<div class="price_element" id="position3">0</div>
						<div class="price_element" id="position4">0</div>
					</div>
					<div id="promopreciofield" style="display:none;">
						<?php the_field('precio'); ?>
					</div>
					<div class="book_it_section" >
						<a type="button" class="btn btn-primary" id="btn-reserva" data-toggle="modal" onclick="validateHotel()" role="button" >RESERVAR</a>
					</div>
					<?php include(dirname(__FILE__) . '/templates-includes/modal_book_it.php'); ?>

				</div>
				<div id="container_cant_and_vent">
					<div class="promociones_vendidas">
						<div id="texto_cantidad">
							Promociones</br> vendidas :
						</div>
						<div id="promos_vendidas">
							<?php the_field('cantidad_de_promociones_vendidas'); ?>
						</div>
						
					</div>

					<div class="promo_end_section">
						<h3 class="title_vencimiento">La oferta finaliza en</h3>
						<div id="info-watch">
							<div class="reloj fa fa-clock-o fa-2x"></div>
							<div class="vencimiento_faltante"></div>
						</div>
					</div>
				</div>
				<div id="promoexpirationdata" style="display:none;">
					<?php the_field('promoexpiration'); ?>
				</div>
			</div>
			
			<!--Informacion Promocion-->
			<div class="col-md-12 promo_info_tab">

				<div class="tabs tabs-style-tzoid">
					<nav>
						<ul>
							<li><a href="#section-tzoid-1" class="fa fa-check-square"><span>Incluye</span></a></li>
							<li><a href="#section-tzoid-2" class="fa fa-briefcase"><span>Itinerario</span></a></li>
							<li><a href="#section-tzoid-3" class="fa fa-list-ol"><span>Condiciones</span></a></li>
							<li><a href="#section-tzoid-4" class="fa fa-smile-o"><span>Tips de viaje</span></a></li>
							<li><a href="#section-tzoid-5" class="fa fa-map-marker" onclick="setHotelMap()"><span>Ubicación del hotel</span></a></li>
							<li><a href="#section-tzoid-6" class="fa fa-sun-o"><span>Clima actual</span></a></li>
						</ul>
					</nav>
					<div class="content-wrap">
						<section id="section-tzoid-1"><?php the_field('promoincluye'); ?></section>
						<section id="section-tzoid-2"><?php the_field('promoitinerario'); ?></section>
						<section id="section-tzoid-3"><?php the_field('promocondiciones'); ?></section>
						<section id="section-tzoid-4"><?php the_field('promotips'); ?></section>
						<section id="section-tzoid-5">
							<div id="container-hotel-img">
								<div id="hotel-map">
									
								</div>
							</div>
							<div id="container-info-hotel">
								<div class="titleHotelContainerInfo" id="titleHotel"></div>
								<div class="titleDireccionContainerInfo">
									<strong>Dirección : </strong><div id="direccionHotel"></div>
								</div>
								<div class="titlePaginawebContainerInfo">
									<strong>Deseas saber más del hotel, ingresa a esta dirección : </strong><div id="paginawebHotel"></div>
								</div>
							</div>
						</section>
						<section id="section-tzoid-6"><div id="container_weather"><?php the_field('clima'); ?></div></section>
					</div><!-- /content -->
				</div><!-- /tabs -->
			</div>

			<div class="col-md-12" style="overflow: hidden;">
				<div class="title_promociones_relacionadas">Promociones Relacionadas</div>
				<div id="slider_promociones_relacionadas"></div>
			</div>

			<div class="col-md-12">
				<div id="fb-root"></div>
				<div id="promocion_comentario"></div>	
				<script>
					var co_fb = document.getElementById("promocion_comentario");
					co_fb.innerHTML = (" <div class='fb-comments' data-href=' " + document.URL + " ' data-numposts='5' data-colorscheme='light'></div> ");
				</script>

			</div>
		</div>
		<?php endwhile; // end of the loop. ?>
	</div>
</div>


 <?php get_footer(); ?>
