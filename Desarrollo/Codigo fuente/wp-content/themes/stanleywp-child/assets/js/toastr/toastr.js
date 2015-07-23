var btnReservaModal = document.getElementById("gform_submit_button_1");
var inputDataforPDF= document.getElementById("input_1_10");
var promotionIDforPDF = document.getElementById("promotionId");
var hotelNameforPDF= document.getElementById("hotel-name");
var numberStarforPDF = document.getElementById("starts_hotel");
var hotelIdforPDF = document.getElementById("hotel_id");

 btnReservaModal.addEventListener("click", function(){
     getInfoForPDF();
},false);

function getInfoForPDF(){

	var arrayForPdf = [];
	var array = [[simple.value,"simple", precioSimplePDF], [doble.value,"doble", precioDoblePDF], [triple.value,"triple", precioTriplePDF]];

	for (var i = 0; i < array.length; i++) {
		var personPerRoom = i + 1;
		if (array[i][0] != 0) {
			arrayForPdf[i] = array[i][1] + " " + array[i][0] + " " + personPerRoom + " " + array[i][2];
		}
		else{
			array[i][0] = 0;
			arrayForPdf[i] = array[i][1] + " " + array[i][0] + " " + personPerRoom + " " + array[i][2];
		}
	};
	
	inputDataforPDF.value = promotionIDforPDF.textContent + "," + arrayForPdf + "," + hotelNameforPDF.textContent + "," + numberStarforPDF.childElementCount + "," + hotelIdforPDF.textContent;
}
