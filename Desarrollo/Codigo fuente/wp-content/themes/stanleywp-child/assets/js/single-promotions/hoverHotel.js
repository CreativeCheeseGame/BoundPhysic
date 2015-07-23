
function setHoverSlideHotel(targetHotel){
	var arrayContentHotel = document.getElementById("cantSlidesHotels").children;
	var targetHotelIndex = parseInt(targetHotel.className.split(" ")[1]);
	var elementHotel = arrayContentHotel[targetHotelIndex].children[0].children[0];


	if (prevHotelElement == null) {
		prevHotelElement = elementHotel;
	}else{
		prevHotelElement.style.background = "rgba(0, 0, 0, 0)";
		prevHotelElement = elementHotel;
	};
	elementHotel.style.background = "rgba(21, 101, 192, 0.7)";
}