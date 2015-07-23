var btnReserva = document.getElementById("btn-reserva");
var spanHotelName= document.getElementById("hotel-name");
var parentDivRoom = document.getElementById("dinamyc-room");
var totalPerson = document.getElementById("numero_personas");
var getTotalPersonModal = document.getElementById("total-person");
var getTotalPriceModal = document.getElementById("total-price");

 btnReserva.addEventListener("click", function(){
     spanHotelName.innerHTML = hotelSeleted.title;
     setTypeOfRoom();
     getCantperson();
     getPrecioTotalModal();

},false);

function setTypeOfRoom(){

	//limpiamos los child nodes en caso modifique la reserva y haga de nuevo click en Reservar
	while (parentDivRoom.hasChildNodes()) {  
	    parentDivRoom.removeChild(parentDivRoom.firstChild);
	}

	var array = [[simple.value,"simple"], [doble.value,"doble"], [triple.value,"triple"]];

	for (var i = 0; i < array.length; i++) {
		if (array[i][0] != 0) {
			var createDiv = document.createElement('div');
			createDiv.innerHTML = "Habitacion " + array[i][1] + ": " + array[i][0];
			createDiv.className = "nameHotelModal";
			parentDivRoom.appendChild(createDiv);
		};
	};
}

function getCantperson(){
	var numberPerson = parseInt(totalPerson.textContent);
	getTotalPersonModal.innerHTML = numberPerson;
}

function getPrecioTotalModal(){
	var precioTotal = getPrecioTotal();
	getTotalPriceModal.innerHTML = "$" + precioTotal;

}