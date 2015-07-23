
<div id="container_sliderhoteles">
	
	<div id="slidercontainer">
		<div id="shadowslider2">

		<?php
		    $args = array('post_type' => 'promociones','order'=> 'DES','posts_per_page' => 1000);
		    $loop = new WP_Query($args);
		    while($loop->have_posts()): $loop->the_post();
		?>
			
			<div class="slidecontainerhoteles">
				<a class="hoverme" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
					<?php the_post_thumbnail(); ?>
				</a>
			</div>

		<?php
		    endwhile;
		    wp_reset_query();
		?> 		
		</div>
	</div>
	<span class="nvgt" id="prev"></span>
	<span class="nvgt" id="next"></span>

</div>