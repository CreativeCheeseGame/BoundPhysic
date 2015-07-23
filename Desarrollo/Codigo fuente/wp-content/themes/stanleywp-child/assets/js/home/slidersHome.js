window.onload = function(){
	var elementContainerMainSlider = "main_slider_vamosya";
	var elementContainerPromociones = "promotions_categories_slider_vamosya";
	var elementContainerBasicSliderPromotion = "slider_basic_promociones";
	var slideNumber = 5;

	R(elementContainerMainSlider).raskitSliderMainSlider({ 
						slideLength: null });

	R(elementContainerPromociones).raskitSliderCategories({ 
						slideLength: slideNumber });

	searchCity();
	getPosts();
};