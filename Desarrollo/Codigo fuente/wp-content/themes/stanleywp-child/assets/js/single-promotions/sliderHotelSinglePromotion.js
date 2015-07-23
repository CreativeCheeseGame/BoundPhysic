var action_get_hotels_by_promotion = "get_hotels_by_promotion";
var elementHotelsContainer = "seleccion_hoteles_contenedor";
var precioSimplePDF;
var precioDoblePDF;
var precioTriplePDF;

var hotelsArray = [];
var hotelSeleted;
var prevHotelElement;
var oldPrice = 0;

function getHotelWithPromotionId(promotionId){
	request = new Ajax();
	request.post(MyAjax.url, { action: action_get_hotels_by_promotion, promotion_id: promotionId  }, function(json){ 
		successHotelRequest(json);
	}, true);
}

function successHotelRequest(json){
	hotelsArray = json;
	buttonObjects = buildButtonActionsForSlider(elementHotelsContainer);
	var slider = new SliderHotel( buttonObjects, { slideNumber: 5 } );
	slider.contructionHotels(json);
	setDefaultHotel(json);
}

function setDefaultHotel(json){
	if (json.length > 0) {
		hotelSeleted = json[0];
		setImageHotelMap();
		doble.value = 1;
		calcularCantidad();
		setHoverSlideHotel(document.getElementById("cantSlidesHotels").children[0]);
	}
}

function selectHotelAction(event){
	var targetElement = event.target || event.srcElement;
	var index = parseInt(targetElement.className.split(" ")[1]);
	hotelSeleted = hotelsArray[index];
	setImageHotelMap();
	calcularCantidad();
	setHoverSlideHotel(targetElement);
}


function setTitleHotel(){
	var titleHotel = document.getElementById("title_hotel_selected");
	titleHotel.innerHTML = hotelSeleted.title;
}

function setStartHotel(){
	var startsContainer =  document.getElementById("starts_hotel");
	startsContainer.innerHTML = "";
	for (var i = parseInt(hotelSeleted.star_hotel) - 1; i >= 0; i--) {
		var img = document.createElement('img');
		img.src = hotelSeleted.imageStar;
		startsContainer.appendChild(img);
	};
}

function setHotelId(){
	var hotelid = document.getElementById("hotel_id");
	hotelid.innerHTML = hotelSeleted.id;
}

/* seleccionar la cantidad de personas */
var simple = document.getElementById("simple-select");		
var doble = document.getElementById("doble-select");		
var triple = document.getElementById("triple-select");
var numero_personas = document.getElementById("numero_personas");
var select_array = [simple, doble, triple];

function calcularCantidad(){
	// Display an error toast, with a title
	numero_personas.innerHTML = parseInt(simple.value) + parseInt(doble.value)*2 + parseInt(triple.value)*3;
	if (hotelSeleted == null) {
		hotelSeleted = hotelsArray[0];
	}
	getPrecioHabitacionPorHotel();
	calcularTotalPrecio();
	setTitleHotel();
	setStartHotel();
	setHotelId();
}

function getPrecioHabitacionPorHotel(){
	precioSimplePDF = parseInt(hotelSeleted.precio_h_simple);
	precioDoblePDF = parseInt(hotelSeleted.precio_h_doble);
	precioTriplePDF = parseInt(hotelSeleted.precio_h_triple);
}

function calcularTotalPrecio(){
	var precioTotal = parseInt(simple.value)*parseInt(hotelSeleted.precio_h_simple) + parseInt(doble.value)*parseInt(hotelSeleted.precio_h_doble) + parseInt(triple.value)*parseInt(hotelSeleted.precio_h_triple);
	//precioTotal += pricePromotion;
	document.getElementById('promopreciofield').innerHTML = precioTotal;
	drawPrice();
}

function getPrecioTotal(){
	var precioTotalModal = parseInt(simple.value)*parseInt(hotelSeleted.precio_h_simple) + parseInt(doble.value)*parseInt(hotelSeleted.precio_h_doble) + parseInt(triple.value)*parseInt(hotelSeleted.precio_h_triple);
	return precioTotalModal;
}

/* pintar y separar el precio de la promocion */

function drawPrice(){
	var data = document.getElementById('promopreciofield').innerHTML.trim().split(""); 
	var position0 = document.getElementById("position0");
	var position1 = document.getElementById("position1");
	var position2 = document.getElementById("position2");
	var position3 = document.getElementById("position3");
	var position4 = document.getElementById("position4");
	var elementArrayPosition = [position4, position3, position2, position1, position0];

	var newDigitArray = getFormatArray(data);
	var oldDigitArray = getFormatArray(oldPrice.toString().split(""));

	var drawInterval = setInterval(setTimeDraw, 50);
	var index = 0;
	function setTimeDraw(){
		if ( newDigitArray[4 - index] < oldDigitArray[ 4 - index] ) {
			interfalRest(index)
		}else if( newDigitArray[4 - index] > oldDigitArray[ 4 - index] ){
			interfalSum(index);
		}
		index++;
		if (index == 5) {
			clearInterval(drawInterval);
		};
	}

	function interfalRest(indexPositionElements){
		var i = oldDigitArray[ 4 - indexPositionElements];
		var intervalRest = setInterval(setTimeRest, 150);

		function setTimeRest(){
			elementArrayPosition[indexPositionElements].innerHTML = i;
			if (i == newDigitArray[4 - indexPositionElements]) {
				clearInterval(intervalRest);
			};
			i --;
		}
	}

	function interfalSum(indexPositionElements){
		var i = oldDigitArray[ 4 - indexPositionElements];
		var intervalSum = setInterval(setTimeRest, 150);

		function setTimeRest(){
			elementArrayPosition[indexPositionElements].innerHTML = i;
			if (i == newDigitArray[4 - indexPositionElements]) {
				clearInterval(intervalSum);
			};
			i++;
		}
	}

	function getFormatArray(array){
		var newArray = [];
		for (var element of array) {
			newArray.push(parseInt(element));
		};
		if (array.length < 5) {
			var cerosCount = 5 - array.length;
			for (var i = 0; i < cerosCount ; i++) {
				newArray.splice(0, 0, 0);
			};
		};
		return newArray;
	}

	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break;
			}
		}
	}

	oldPrice = parseInt(data.join(''));
}
