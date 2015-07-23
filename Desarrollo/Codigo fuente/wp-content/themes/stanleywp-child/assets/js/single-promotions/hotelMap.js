function setHotelMap(){
	if (hotelSeleted == null) {
		toastr.warning('Seleccione un hotel para poder ver su ubicacion');
	}else{
		setImageHotelMap();
	}	
}

function setImageHotelMap(){
	var hotelMapContent = document.getElementById('hotel-map');
	hotelMapContent.innerHTML = "";
	var image = document.createElement('img');
	image.src = getUrlImage();
	image.addEventListener("click", openGoogleMaps);
	hotelMapContent.appendChild(image);

	var urlPaginaWeb = document.createElement('a');
	urlPaginaWeb.href = hotelSeleted.pagina_web;
	urlPaginaWeb.innerHTML = hotelSeleted.pagina_web;
	urlPaginaWeb.className = "urlPaginaWebHotel";

	var titleHotel = document.getElementById("titleHotel");
	var direccionHotel = document.getElementById("direccionHotel");
	var paginawebHotel = document.getElementById("paginawebHotel");

	titleHotel.innerHTML = hotelSeleted.title;
	direccionHotel.innerHTML = hotelSeleted.address_hotel;
	paginawebHotel.innerHTML = "";
	paginawebHotel.appendChild(urlPaginaWeb);
}

function getUrlImage(){
	return "http://maps.googleapis.com/maps/api/staticmap?center="+hotelSeleted.location.lat+","+hotelSeleted.location.lng + "&markers=red|"+hotelSeleted.location.lat+","+hotelSeleted.location.lng +"&zoom=15&size=400x400&sensor=false"
}

function openGoogleMaps(){
	window.open("http://maps.google.com/maps?q="+hotelSeleted.location.lat+","+hotelSeleted.location.lng +"&z=17",'_blank');
}