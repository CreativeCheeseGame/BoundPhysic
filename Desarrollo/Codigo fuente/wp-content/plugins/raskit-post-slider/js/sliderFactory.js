/* Factory */
function R(element, isArrowAdove){
	var buttonObjects;
	if ( isArrowAdove == null){
		buttonObjects = buildButtonActionsForSlider(element);
	}else{
		buttonObjects = buildButtonActionsArrowAdoveForSlider(element);
	}
	return new Slider( buttonObjects);
}

function buildButtonActionsForSlider(element){
	var raskitPostSlider  = document.createElement('div');
	raskitPostSlider.className = "raskitPostSlider";

	var elementContainer = document.getElementById(element);

	var nextButton = document.createElement('span');
	var prevButton = document.createElement('span');

	var magicSliderContainer = document.createElement('div');

	magicSliderContainer.className = "magicSliderContainer";

	raskitPostSlider.appendChild(prevButton);
	raskitPostSlider.appendChild(nextButton);
	raskitPostSlider.appendChild(magicSliderContainer);
	elementContainer.appendChild(raskitPostSlider);

	return { nextButton: nextButton, prevButton : prevButton, magicSliderContainer: magicSliderContainer, parentElement: elementContainer };
}

function buildButtonActionsArrowAdoveForSlider(element){
	var raskitPostSlider  = document.createElement('div');
	raskitPostSlider.className = "raskitPostSlider sliderPromotionRelation";

	var elementContainer = document.getElementById(element);

	var nextButton = document.createElement('span');
	var prevButton = document.createElement('span');

	var magicSliderContainer = document.createElement('div');

	magicSliderContainer.className = "magicSliderContainer";

	elementContainer.appendChild(prevButton);
	elementContainer.appendChild(nextButton);
	raskitPostSlider.appendChild(magicSliderContainer);
	elementContainer.appendChild(raskitPostSlider);

	return { nextButton: nextButton, prevButton : prevButton, magicSliderContainer: magicSliderContainer, parentElement: elementContainer };
}

function buildMainSliderElements(parameters, jsonPost){
	var slide = document.createElement('div');
	var slideBackgroundContainer = document.createElement('div');
	var infoContent = document.createElement('div');
	var infoAdsContainer = document.createElement('div');
	var linkPostContent = document.createElement('div');

	var titleContent = document.createElement('div');
	var descriptionContent = document.createElement('div');
	var referencePostLink = document.createElement('a');

	slide.className = "slideContainer";
	slideBackgroundContainer.className = "slideBackgroundContainer";
	infoContent.className = "infoContent container";
	infoAdsContainer.className = "infoAdsContainer";
	linkPostContent.className = "linkPostContent";
	titleContent.className = "titleContent";
	descriptionContent.className = "descriptionContent";
	referencePostLink.className = "referencePostLink";

	slideBackgroundContainer.style.backgroundImage= 'url('+ jsonPost.image +')';
	titleContent.innerHTML = jsonPost.title;
	descriptionContent.innerHTML = jsonPost.content;
	referencePostLink.innerHTML = jsonPost.text_url;
	referencePostLink.href = jsonPost.url;

	linkPostContent.appendChild(referencePostLink);
	infoAdsContainer.appendChild(titleContent);
	infoAdsContainer.appendChild(descriptionContent);
	infoContent.appendChild(infoAdsContainer);
	slideBackgroundContainer.appendChild(infoContent);
	slideBackgroundContainer.appendChild(linkPostContent);
	slide.appendChild(slideBackgroundContainer);
	parameters.instance.magicSliderContainer.appendChild(slide);

	parameters.instance.nextButton.className = "sliderButtonActions nextmainSliderContainer";
	parameters.instance.prevButton.className = "sliderButtonActions prevmainSliderContainer";	

	parameters.instance.slideArray.push(slide);

	/*autoresize heigth main slider*/
	var headerContent = document.getElementById("header_vamosya");
	style = window.getComputedStyle(headerContent),
	heightHeader = parseInt(style.getPropertyValue("height"), 10);
	var heightClient = document.documentElement.clientHeight;
	var mainContent = document.getElementById("search_container");
	var contentHeightHome = heightClient - heightHeader;
	mainContent.style.height= contentHeightHome + "px";



}

function buildCategoriesSliderElements(parameters, jsonCategory){

	var slideCategoryContainer = document.createElement('div');
	var referenceCategoryLink = document.createElement('a');
	var slideCategoryBackgroundContainer = document.createElement('div');
	var slideCategoryInfo = document.createElement('div');

	slideCategoryContainer.className = "slideCategoryContainer";
	referenceCategoryLink.className = "referenceCategoryLink";
	referenceCategoryLink.href = jsonCategory.link;
	slideCategoryBackgroundContainer.className = "slideCategoryBackgroundContainer";
	slideCategoryInfo.className = "slideCategoryInfo";

	slideCategoryBackgroundContainer.style.backgroundImage= 'url('+ jsonCategory.image +')';
	slideCategoryInfo.innerHTML = jsonCategory.title;

	parameters.instance.magicSliderContainer.setAttribute('style', "position: absolute;");

	slideCategoryBackgroundContainer.appendChild(slideCategoryInfo);
	referenceCategoryLink.appendChild(slideCategoryBackgroundContainer);
	slideCategoryContainer.appendChild(referenceCategoryLink);
	parameters.instance.magicSliderContainer.appendChild(slideCategoryContainer);


	parameters.instance.nextButton.className = "sliderButtonActions nextcategoriesSliderContainer";
	parameters.instance.prevButton.className = "sliderButtonActions prevcategoriesSliderContainer";	

	parameters.instance.slideArray.push(slideCategoryContainer);	
}


function buildBasicSliderElements(parameters, jsonCategory){
	var slideBasicContainer = document.createElement('div');
	var slideBasicBackgroundContainer = document.createElement('div');
	var slideTitle = document.createElement('div');
	var slideTitleText = document.createElement('div');

	slideBasicContainer.className = "slideBasicContainer";
	slideBasicBackgroundContainer.className = "slideBasicBackgroundContainer";
	slideTitle.className = "slideTitleBackgroundContainer";
	slideTitleText.className = "slideTitleTextRight";

	slideBasicBackgroundContainer.style.backgroundImage= 'url('+ jsonCategory.image +')';
	slideTitleText.innerHTML = jsonCategory.title;

	parameters.instance.magicSliderContainer.appendChild(slideBasicContainer);
	slideBasicContainer.appendChild(slideBasicBackgroundContainer);
	slideBasicBackgroundContainer.appendChild(slideTitle);
	slideTitle.appendChild(slideTitleText);

	parameters.instance.nextButton.className = "sliderButtonActions nextBasicSliderContainer";
	parameters.instance.prevButton.className = "sliderButtonActions prevBasicSliderContainer";	

	parameters.instance.slideArray.push(slideBasicContainer);	
	
}

function buildBasicSliderElementsMainCategories(parameters, jsonCategory){


	var slideBasicContainer = document.createElement('div');
	var slideBasicBackgroundContainer = document.createElement('div');
	var slideTitle = document.createElement('div');
	var slideTitleText = document.createElement('div');

	slideBasicContainer.className = "slideBasicContainer";
	slideBasicBackgroundContainer.className = "slideBasicBackgroundContainer";
	slideTitle.className = "slideTitleBackgroundContainer";
	slideTitleText.className = "slideTitleText";

	slideBasicBackgroundContainer.style.backgroundImage= 'url('+ jsonCategory.image +')';
	slideTitleText.innerHTML = jsonCategory.title;

	parameters.instance.magicSliderContainer.appendChild(slideBasicContainer);
	slideBasicContainer.appendChild(slideBasicBackgroundContainer);
	slideBasicBackgroundContainer.appendChild(slideTitle);
	slideTitle.appendChild(slideTitleText);

	parameters.instance.nextButton.className = "sliderButtonActions nextBasicSliderContainer";
	parameters.instance.prevButton.className = "sliderButtonActions prevBasicSliderContainer";	

	parameters.instance.slideArray.push(slideBasicContainer);	
}

function buildRelationCategorySliderElements(parameters, jsonPost){

	var slideRelationCategoryContainer = document.createElement('div');
	var slideRelationContainer = document.createElement('div');
	var linkRelationCategorySlide = document.createElement('a');
	var infoRelationCategoryContent = document.createElement('div');
	var slideRelationCategoryBackgroundContainer = document.createElement('div');
	var titleRelationCategoryContent = document.createElement('div');
	var subtitleDetailsRelationCategoryContent = document.createElement('div');	
	
	var priceDetailsContent = document.createElement('div');
	var textPriceSpan= document.createElement('span');
	var precioFinalPromocion= document.createElement('div');
	var btnLoQuiero = document.createElement('div');
	var buttonLoQuiero = document.createElement('button');

	slideRelationCategoryContainer.className = "slideRelationCategoryContainer";
	slideRelationContainer.className = "slideRelationContainer"
	linkRelationCategorySlide.className = "linkRelationCategorySlide";
	infoRelationCategoryContent.className = "infoRelationCategoryContent";
	slideRelationCategoryBackgroundContainer.className = "slideRelationCategoryBackgroundContainer";
	titleRelationCategoryContent.className = "titleRelationCategoryContent";
	subtitleDetailsRelationCategoryContent.className = "subtitleDetailsRelationCategoryContent";
	
	priceDetailsContent.className = "priceDetailsContent";
	precioFinalPromocion.className = "precioFinalPromocion";
	btnLoQuiero.className = "btnContainer";
	buttonLoQuiero.className = "btn btn-warning buttonLoQuiero";
	
	slideRelationCategoryBackgroundContainer.style.backgroundImage= 'url('+ jsonPost.image +')';
	linkRelationCategorySlide.href = jsonPost.link;
	titleRelationCategoryContent.innerHTML = jsonPost.title;
	subtitleDetailsRelationCategoryContent.innerHTML = jsonPost.subtitledetails;

	textPriceSpan.innerHTML = "Precio Regular : ";
	precioFinalPromocion.innerHTML = "US$ " + jsonPost.price;
	buttonLoQuiero.type = "button";
	buttonLoQuiero.innerHTML = "Lo quiero!";


	//padre  ---  (hijo)
	slideRelationCategoryContainer.appendChild(slideRelationContainer);
	slideRelationContainer.appendChild(linkRelationCategorySlide)
	linkRelationCategorySlide.appendChild(slideRelationCategoryBackgroundContainer);
	linkRelationCategorySlide.appendChild(infoRelationCategoryContent);

	infoRelationCategoryContent.appendChild(titleRelationCategoryContent);//titulo
	infoRelationCategoryContent.appendChild(subtitleDetailsRelationCategoryContent);//subtitulodetails
	
	infoRelationCategoryContent.appendChild(priceDetailsContent);//Contenedor de detalles del precio

	priceDetailsContent.appendChild(precioFinalPromocion);
	priceDetailsContent.appendChild(btnLoQuiero);
	btnLoQuiero.appendChild(buttonLoQuiero);

	parameters.instance.magicSliderContainer.appendChild(slideRelationCategoryContainer);
	parameters.instance.nextButton.className = "sliderButtonActions nextRelationCategorySliderContainer";
	parameters.instance.prevButton.className = "sliderButtonActions prevRelationCategorySliderContainer";	
	parameters.instance.slideArray.push(slideRelationCategoryContainer);

	/*seccion para la estrella de % y iconos de incluye*/

	var imagediscountRelationContainerRelation  = document.createElement('div');
	var incluyeGridContainerRelation =  document.createElement('div');
	var numberdiscountRelationRelation  = document.createElement('div');
	var imagesIncluyeRelation =  document.createElement('div');
	var discountRelation  = document.createElement('div');

	discountRelation.innerHTML = "-" + jsonPost.porcentaje + "%";

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

	for(var include of jsonPost.checkboxIncluye){
		var img = document.createElement('img');
		img.src = iconDictionary[include];
		img.className = "gridIconIncluyeRelation";
		imagesIncluyeRelation.appendChild(img);
	}

	imagediscountRelationContainerRelation.className = "imageDiscountContainerRelation";
	incluyeGridContainerRelation.className = "incluyeGridContainerRelation";
	numberdiscountRelationRelation.className = "numberDiscountRelation";
	imagesIncluyeRelation.className = "imagesIncluyeRelation";
	discountRelation.className = "discountRelation";

	slideRelationCategoryBackgroundContainer.appendChild(imagediscountRelationContainerRelation);
	slideRelationCategoryBackgroundContainer.appendChild(incluyeGridContainerRelation);
	imagediscountRelationContainerRelation.appendChild(numberdiscountRelationRelation);
	incluyeGridContainerRelation.appendChild(imagesIncluyeRelation);
	numberdiscountRelationRelation.appendChild(discountRelation);

	/*end section*/
}


function buildHotelSliderElements(parameters, jsonHotel){

	var slideHotelContainer = document.createElement('div');
	var slideHotelBackgroundContainer = document.createElement('div');
	var slideHotelInfoContainer = document.createElement('div');
	var slideHotelTitleContainer = document.createElement('div');
	var slideHotelStarsContainer = document.createElement('div');
	var slideHotelId = document.createElement('div');

	slideHotelContainer.className = "slideHotelContainer "+ parameters.index ;
	slideHotelBackgroundContainer.className = "slideHotelBackgroundContainer "+ parameters.index ;
	slideHotelInfoContainer.className = "slideHotelInfoContainer "+ parameters.index ;
	slideHotelTitleContainer.className = "slideHotelTitleContainer "+ parameters.index ;
	slideHotelStarsContainer.className = "slideHotelStarsContainer "+ parameters.index ;
	slideHotelId.className = "slideHotelId "+ jsonHotel.id;

	slideHotelBackgroundContainer.style.backgroundImage= 'url('+ jsonHotel.imageUrl +')';

	slideHotelTitleContainer.innerHTML = jsonHotel.title;
	slideHotelId.innerHTML = jsonHotel.id;

	parameters.instance.magicSliderContainer.setAttribute('style', "position: absolute;");
	parameters.instance.magicSliderContainer.setAttribute('id', "cantSlidesHotels");

	slideHotelInfoContainer.appendChild(slideHotelId);
	slideHotelInfoContainer.appendChild(slideHotelTitleContainer);
	slideHotelInfoContainer.appendChild(slideHotelStarsContainer);
	slideHotelBackgroundContainer.appendChild(slideHotelInfoContainer);
	slideHotelContainer.appendChild(slideHotelBackgroundContainer);
	parameters.instance.magicSliderContainer.appendChild(slideHotelContainer);

	slideHotelContainer.addEventListener("click", selectHotelAction);

	for( var i = 0; i < jsonHotel.star_hotel; i++){
		var startContent = 	document.createElement('img');
		startContent.src = jsonHotel.imageStar;
		startContent.className = "startContent " + parameters.index ;
		slideHotelStarsContainer.appendChild(startContent);
	}


	parameters.instance.nextButton.className = "sliderButtonActions nextcategoriesSliderContainer";
	parameters.instance.prevButton.className = "sliderButtonActions prevcategoriesSliderContainer";	

	parameters.instance.slideArray.push(slideHotelContainer);	
}