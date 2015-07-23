var categoriesArray = [];
var categoriesNameArray = [];
var postByCategoryArray = [];
var pagedToGetCategories = 1;
var categoryName;
var flagAnimation = false;
var buttonMorePost = true;
var showGhost = false;

window.onload = function(){
	morePostAnimation();
	initMainCategoriesSlider();
	getCategoriesArray();
	fillCategories();
	defaultFillCategoriesPost();
	getImagesSliderByCategorieName();
};

function initMainCategoriesSlider(){
	var sliderCategoriesContiner = "promotions_categories_slider_vamosya";
	var slideNumber = 5;
	R(sliderCategoriesContiner).raskitSliderCategories({ 
						slideLength: slideNumber });
	
}


function getCategoriesArray(){
	var categoriesBaseContent = document.getElementById('content-data-categories');
	var categoriesHtmlArray = categoriesBaseContent.children; 
	for(var index in categoriesHtmlArray){
		if (index < categoriesHtmlArray.length) {
			categoriesArray.push(categoriesHtmlArray[index].children[0].innerHTML);
		}
	}
	generateArrayCategoriesName();
	cleanCategoriesHTML(categoriesBaseContent);
}

function generateArrayCategoriesName(){
	for(var index in categoriesArray){
		if (index < categoriesArray.length) {
			var category_name = convertStringToCategoryNameFormat(categoriesArray[index]);
			categoriesNameArray.push(category_name);
		}
	}
}

function cleanCategoriesHTML(element){
	element.parentElement.removeChild(element);
}

function convertStringToCategoryNameFormat(stringName){
	return stringName.toLowerCase()
				.replace(/á/,"a")
				.replace(/é/,"e")
				.replace(/í/,"i")
				.replace(/ó/,"o")
				.replace(/ú/,"u")
				.replace(" ","-");
}

function fillCategories(){
	var listCategoriesCollection = document.getElementById('list-child-collection');
    var list = document.createElement('ul');
    list.className = "listCollectionCategories"

	for(var index in categoriesArray){
		if (index < categoriesArray.length) {
	 		var item = document.createElement('li');
	 		var angle_right = document.createElement('i');
	        // Set its contents:
	        item.appendChild(angle_right);
	        item.appendChild(document.createTextNode(categoriesArray[index]));

	        angle_right.className = "fa fa-angle-right";
	        item.className = "itemCategory "+ index;
	        item.addEventListener("click", selectCategoryToGetPost);
	        // Add it to the list:
	        list.appendChild(item);
		}
	}
	listCategoriesCollection.appendChild(list);
}

function defaultFillCategoriesPost(){
	categoryName = document.getElementById('category-slug').innerHTML;
	initRequestToGetPostsByCategory();
}

var containerPostMainCategoryView = document.getElementById('containerPostMainCategories');

function selectCategoryToGetPost(event){
	var targetElement = event.target || event.srcElement;
	var index = parseInt(targetElement.className.split(" ")[1]);
	document.getElementById("title-feature").scrollIntoView();
	pagedToGetCategories = 1;
	categoryName = categoriesNameArray[index];
	containerPostMainCategoryView.innerHTML = "";
	document.getElementById("morePostButtonContainer").hidden = false;
	morePostAnimation();
	buttonMorePost = true;
	initRequestToGetPostsByCategory();
}

function morePostByCategory(){
	morePostAnimation();
	initRequestToGetPostsByCategory();
}


function initRequestToGetPostsByCategory(){
	flagAnimation = true;
	var request = new Ajax();
	request.post(MyAjax.url, { action: "get_promotions_by_category_name", category_name: categoryName , paged: pagedToGetCategories }, function(json){
		if (json["information"] == null) {
			flagAnimation = false;
			pagedToGetCategories++;
			postByCategoryArray = json;
		}else if(json["information"] == "no se encontraron mas posts" && (pagedToGetCategories - 1) < 1 ){
			containerPostMainCategoryView.innerHTML = "";
			showGhost = true;
			buttonMorePost = false;
		}else{
			buttonMorePost = false;
		}
	}, true);
}

function successGetPostByCategoryRequest(){
	if (showGhost) {
		noPostInCategory();
		showGhost = false;
	}else{
		for(var index in postByCategoryArray){
			createElementMainCategoriesWithPost(postByCategoryArray[index]);
		}
		postByCategoryArray = [];
	}
	
}

function noPostInCategory(){
	var container = document.createElement('div');
	var image = document.createElement('img');
	var title = document.createElement('h2');

	container.className = "col-lg-10 col-lg-offset-1 centered";
	image.src = document.getElementById('no-post-image-maincategories').src;
	title.innerHTML = "No se encontraron promociones para esta categoria"; 

	container.appendChild(title);
	container.appendChild(image);

	containerPostMainCategoryView.appendChild(container); 
}

/* create post element */

function createElementMainCategoriesWithPost(post){
	var aHref = document.createElement('a');
	var conteinerDiv = document.createElement('div');
	var contentPostPromotion = document.createElement('div');
	var imageBackgroundContent = document.createElement('div');//background image
	var freaturesList = document.createElement('div');
	var titlePostPromotions = document.createElement('div');
	var pTitlePostPromotions = document.createElement('p');
	var pSubTitlePostPromotions = document.createElement('p');
	var subTitleDetallePostPromotions  = document.createElement('div');
	var pSubTitleDetallePostPromotions = document.createElement('p');
	var precioPostPromotionsContainer  = document.createElement('div');
	var textPriceTitleContainer =  document.createElement('div');
	var spanTextPriceTitleContainer =  document.createElement('span');
	var textPriceOldTitleContainer =  document.createElement('div');
	var delTextPriceOldTitleContainer =  document.createElement('del');
	var textPriceNowTitleContainer =  document.createElement('div');
	var spanTextPriceNowTitleContainer =  document.createElement('span');
	var buttonContainer =  document.createElement('div');
	var buttonIWant = document.createElement('button');


	aHref.href = post.link;
	imageBackgroundContent.style.backgroundImage= 'url('+ post.image +')';
	pTitlePostPromotions.innerHTML = post.title;
	pSubTitleDetallePostPromotions.innerHTML = post.subtitledetails;
	spanTextPriceTitleContainer.innerHTML = "Precio Regular : ";
	delTextPriceOldTitleContainer.innerHTML = "US$ " + post.priceregular;
	spanTextPriceNowTitleContainer.innerHTML = "US$ " + post.price;
	buttonIWant.type = "button";
	buttonIWant.innerHTML = "Lo quiero!";

	conteinerDiv.className = "col-md-6 col-sm-6 content_colum_promocion";
	contentPostPromotion.className = "content_post_promocion";
	imageBackgroundContent.className = "image_background_promociones"; //background image
	freaturesList.className = "features_list";
	titlePostPromotions.className = "title_post_promociones";
	subTitleDetallePostPromotions.className = "subtitledetalle_post_promociones";
	precioPostPromotionsContainer.className = "precio_post_promociones";
	textPriceTitleContainer.className = "textprice";
	textPriceOldTitleContainer.className = "priceold";
	textPriceNowTitleContainer.className = "pricenow";
	buttonContainer.className = "btniwant";
	buttonIWant.className = "btn btn-warning btnloquiero";
	
	aHref.appendChild(conteinerDiv);
	conteinerDiv.appendChild(contentPostPromotion);
	contentPostPromotion.appendChild(imageBackgroundContent);
	contentPostPromotion.appendChild(freaturesList);
	freaturesList.appendChild(titlePostPromotions);
	titlePostPromotions.appendChild(pTitlePostPromotions);
	freaturesList.appendChild(subTitleDetallePostPromotions);
	subTitleDetallePostPromotions.appendChild(pSubTitleDetallePostPromotions);
	freaturesList.appendChild(precioPostPromotionsContainer);
	precioPostPromotionsContainer.appendChild(textPriceTitleContainer);
	textPriceTitleContainer.appendChild(spanTextPriceTitleContainer);
	precioPostPromotionsContainer.appendChild(textPriceOldTitleContainer);
	textPriceOldTitleContainer.appendChild(delTextPriceOldTitleContainer);
	precioPostPromotionsContainer.appendChild(textPriceNowTitleContainer);
	textPriceNowTitleContainer.appendChild(spanTextPriceNowTitleContainer);
	precioPostPromotionsContainer.appendChild(buttonContainer);
	buttonContainer.appendChild(buttonIWant);

	/*seccion para la estrella de % y iconos de incluye*/

	var imageDiscountContainer  = document.createElement('div');
	var incluyeGridContainer =  document.createElement('div');
	var numberDiscount  = document.createElement('div');
	var imagesIncluye =  document.createElement('div');
	var discount  = document.createElement('div');

	discount.innerHTML = "-" + post.porcentaje + "%";

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

	for(var include of post.checkboxIncluye){
		var img = document.createElement('img');
		img.src = iconDictionary[include];
		img.className = "gridIconIncluye";
		imagesIncluye.appendChild(img);
	}

	imageDiscountContainer.className = "imageDiscountContainer";
	incluyeGridContainer.className = "incluyeGridContainer";
	numberDiscount.className = "numberDiscount";
	imagesIncluye.className = "imagesIncluye";
	discount.className = "discount";

	imageBackgroundContent.appendChild(imageDiscountContainer);
	imageBackgroundContent.appendChild(incluyeGridContainer);
	imageDiscountContainer.appendChild(numberDiscount);
	incluyeGridContainer.appendChild(imagesIncluye);
	numberDiscount.appendChild(discount);



	containerPostMainCategoryView.appendChild(aHref);


	//containerPostMainCategoryView.appendChild(containerNewPosts);     
}


