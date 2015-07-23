var pagedListPosts = 1;
var actionGetPostsApi = "get_postype_promociones";
var containerNewPosts = document.getElementById("containerNewPost");
var buttonMorePost = true;
var flagAnimation = false;
var jsonPostArray;

function getPosts(){
	flagAnimation = true;
	morePostAnimation();
	var request = new Ajax();
	request.post(MyAjax.url, { action: actionGetPostsApi , paged : pagedListPosts  }, function(json){
		if (json["information"] == null) {
			flagAnimation = false;
			jsonPostArray = json;
			pagedListPosts++;
		}else{
			buttonMorePost = false;
		};
	}, true);
}

function fillPost(){
	for(var index in jsonPostArray){
		createElementWithPost(jsonPostArray[index]);
	}
}

/* create post element */

function createElementWithPost(post){
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

	conteinerDiv.className = "col-md-4 col-sm-6 content_colum_promocion";
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

	/*end section*/

	containerNewPosts.appendChild(aHref);     
}