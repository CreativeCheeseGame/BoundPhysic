var pricePromotion;

window.onload = function(){
	var elementContainerMainSlider = "main_slider_vamosya";
	var elementContainerPromociones = "promotions_categories_slider_vamosya";
	var elementContainerBasicSliderPromotion = "slider_basic_promociones";

	var elementContainerRelationCategoryPromotion = "slider_promociones_relacionadas";

	var elementContainerHoltelSliderPromotion = "seleccion_hoteles_contenedor";

	var slideNumber = 4;

	pricePromotion = parseInt(document.getElementById('promopreciofield').innerHTML.trim());

	R(elementContainerRelationCategoryPromotion, true).raskitSliderRelationsCategory({ 
						slideLength: 4 });

	var promotionId = document.getElementById("promotionId").innerHTML.trim();
	getHotelWithPromotionId(promotionId);
	getImageToBasicSliderWithPromotionId(promotionId);

	timerExpired();
	drawPrice();
	setDefaultDescriptionText();
};

function getImageToBasicSliderWithPromotionId(promotionId){
	var request = new Ajax();
	request.post(MyAjax.url, { action: "get_postype_basic", promotion_id: promotionId  }, function(json){ 
		successBasicSliderRequest(json);
	}, true);
}

function successBasicSliderRequest(json){
	var buttonObjects = buildButtonActionsForSlider("slider_basic_promociones");
	var slider = new SliderBasic( buttonObjects);
	slider.contructionBasicImages(json);
	includePromotion();
	includeDescriptionPromo();
}


/* more and less acerca de la descripcion de la ciudad */
var textDescriptionCity, textMediunDescriptionCity;

function setDefaultDescriptionText(){
	textDescriptionCity = document.getElementsByClassName("promo_city_description")[0].innerHTML;
	textMediunDescriptionCity = textDescriptionCity.substring(0,200) + "....";
	document.getElementsByClassName("promo_city_description")[0].innerHTML = textMediunDescriptionCity; 	
}

function toggleText(){
	var toggleButton = document.getElementById('toggleButton').innerHTML.trim();
    if (toggleButton == "Ver menos") {
        document.getElementsByClassName("promo_city_description")[0].innerHTML= textMediunDescriptionCity;
        document.getElementById("toggleButton").innerText = "Ver mas";
    } else{
        document.getElementsByClassName("promo_city_description")[0].innerHTML = textDescriptionCity;
        document.getElementById("toggleButton").innerText = "Ver menos";
    }
}


/**
 * Detail Include Promotion
 */

function includePromotion(){
	var baseUrl =  (document.getElementById("baseUrlPath").innerHTML).trim();
	var iconDictionary = { "Tickets aéreos":  baseUrl + "aereo.png",
	   "Alojamiento" : baseUrl + "hotel.png",
	   "Desayunos" : baseUrl + "desayuno.png",
	   "Tours" : baseUrl + "excursion.png",
	   "Traslados" : baseUrl + "traslado.png",
	   "All Inclusive" : baseUrl + "allinclusive.png",
	   "Tarjeta de Asistencia" : baseUrl + "seguromedico.png",
	   "Almuerzos" : baseUrl + "alimentacion.png",
	   "Cenas" : baseUrl + "alimentacion.png",
	   "Seguros de Viaje" : baseUrl + "seguromedico.png",
	   "Discoteca" : baseUrl + "tragos.png" };

	var sliderBasicContent;
	if (document.getElementById("slider_basic_promociones").children[0].children.length == 3) {
		sliderBasicContent = document.getElementById("slider_basic_promociones").children[0].children[2];
	}else{
		sliderBasicContent = document.getElementById("slider_basic_promociones").children[0].children[0];
	}
	var keysIncludePromotion = document.getElementById("promotionKeys").innerHTML.split(",");
	var contentImage = document.createElement("div");
	
	contentImage.className = "contentImageIconPromotion";
	
	for( key of keysIncludePromotion ){
		var imgCont = document.createElement("img");
		var titleIcon = document.createElement("div");
		var imgIconCont = document.createElement("div");
		var centerContentIcon = document.createElement("div");

		imgCont.className = "imgCont";
		titleIcon.className = "titleIcon";
		imgIconCont.className = "imgIconCont";
		centerContentIcon.className = "centerContentIcon";

		titleIcon.innerHTML = key.trim();
		imgCont.src = iconDictionary[key.trim()];

		centerContentIcon.appendChild(imgCont);
		centerContentIcon.appendChild(titleIcon);
		imgIconCont.appendChild(centerContentIcon);
		contentImage.appendChild(imgIconCont);
	};
	
	sliderBasicContent.appendChild(contentImage);
}

function includeDescriptionPromo(){
	var textDescriptionCity = document.getElementsByClassName("promo_city_description")[0].innerHTML;
	var textMediunDescriptionCity = textDescriptionCity.substring(0,200) + "....";
	var sliderBasicContent;
	if (document.getElementById("slider_basic_promociones").children[0].children.length == 3) {
		sliderBasicContent = document.getElementById("slider_basic_promociones").children[0].children[2];
	}else{
		sliderBasicContent = document.getElementById("slider_basic_promociones").children[0].children[0];
	}
	var contentDescription = document.createElement("div");
	var textDescription = document.createElement("div");

	contentDescription.className = "contentDescriptionStyle";
	textDescription.className = "textDescriptionStyle";

	textDescription.innerHTML = textMediunDescriptionCity;
	textDescription.innerHTML += '<button type="button" class="btn btn-primary btn-lg ver-mas-button" data-toggle="modal" data-target="#myModal"> Ver mas </button>';
	contentDescription.appendChild(textDescription);
	sliderBasicContent.appendChild(contentDescription);
}

