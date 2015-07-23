function validateHotel(){
	if (hotelSeleted == null) {
		toastr.error('Seleccione un hotel y cantidad de habitaciones', 'Problema')
	}else{
		jQuery('#modalSenData').modal('show'); 
	}	
}

function validarSolicitud(){
	var nameForm = document.getElementById('input_1_1'),
	lastNameForm = document.getElementById('lastNameForm'),
	emailForm = document.getElementById('emailForm'),
	documentoForm = document.getElementById('documentoForm'),
	celularForm = document.getElementById('celularForm'),
	dateFromForm = document.getElementById('dateFromForm'),
	dateToForm = document.getElementById('dateToForm');

	if (nameForm.value == "") {
		toastr.error('Ingrese su nombre ', 'Problema');
	}else if (lastNameForm.value == ""){
		toastr.error('Ingrese su apellido', 'Problema');
	}else if (emailForm.value == "" || validateEmail(emailForm.value)){
		toastr.error('Ingrese un correo valido', 'Problema');
	}else if (documentoForm.value == ""){
		toastr.error('Ingrese su documento de identificacion', 'Problema');
	}else if (celularForm.value == ""){
		toastr.error('Ingrese su numero de celular', 'Problema');
	}else if (dateFromForm.value == ""){
		toastr.error('Ingrese una fecha de partida', 'Problema');
	}else if (dateToForm.value == ""){
		toastr.error('Ingrese una fecha de llegada', 'Problema');
	}else if(validateDates(dateFromForm.value, dateToForm.value)){
		toastr.error('Ingrese una fecha de llegada mayor a la de partida', 'Problema');
	}else{
		toastr.success('Se envio tu solicitud en breve nos comunicaremos con usted', 'Sastisfactorio')
		jQuery('#modalSenData').modal('toggle');
	}

}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return !re.test(email);
}

function validateDates(firstDate, secondDate){
	var dateFrom = new Date(firstDate);
	dateFrom.setTime( dateFrom.getTime()+1*24*60*60*1000 );
	var dateTo = new Date(secondDate);
	dateTo.setTime( dateTo.getTime()+1*24*60*60*1000 );
	return dateFrom > dateTo;
}

