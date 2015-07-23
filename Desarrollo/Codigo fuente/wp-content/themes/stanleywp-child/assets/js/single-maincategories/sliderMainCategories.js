function getImagesSliderByCategorieName () {
	
	(function requestTogetImagesCategories () {
		var category_id = (document.getElementById("postIdContent").innerHTML).trim();
		var request = new Ajax();
		var params = { action: "get_images_by_category_id", category_id: category_id };
		request.post(MyAjax.url, params, function(json){
			if (json["information"] == null) {
				setSliderWithData(json);		
			}
		}, true);
	})();

	function setSliderWithData(json) {
		var buttonObjects = buildButtonActionsForSlider("sliderBasicMainCategories");
		var slider = new SliderBasic( buttonObjects);
		slider.contructionBasicImagesMainCategories(json);
	}
}