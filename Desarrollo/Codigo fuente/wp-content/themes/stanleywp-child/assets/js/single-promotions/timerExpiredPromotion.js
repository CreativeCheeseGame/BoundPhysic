function timerExpired(){
	var vencimiento_element = document.getElementsByClassName("vencimiento_faltante")[0]; 
	var get_date = document.getElementById('promoexpirationdata').innerHTML.trim();
	var expirate_date = get_date.toString();
	var expirate_year = expirate_date.substr(0,4);
	var expirate_mount = expirate_date.substr(4,2)- 1;
	var expirate_day = expirate_date.substr(6,2);

	fechaFinal = new Date(expirate_year, expirate_mount, expirate_day);
	fechaActual = new Date()
	diferencia = fechaFinal - fechaActual
	diferenciaSegundos = diferencia /1000
	diferenciaMinutos = diferenciaSegundos/60
	diferenciaHoras = diferenciaMinutos/60
	diferenciaDias = diferenciaHoras/24
	diferenciaHoras2 = parseInt(diferenciaHoras) - (parseInt(diferenciaDias) *24)
	diferenciaMinutos2 = parseInt(diferenciaMinutos) - (parseInt(diferenciaHoras) * 60)
	diferenciaSegundos2 = parseInt(diferenciaSegundos) - (parseInt(diferenciaMinutos) * 60)
	diferenciaDias = parseInt(diferenciaDias)
	if (diferenciaDias < 10 && diferenciaDias > -1){diferenciaDias = "0" + diferenciaDias}
	if(diferenciaHoras2 < 10 && diferenciaHoras2 > -1){diferenciaHoras2 = "0" + diferenciaHoras2}
	if(diferenciaMinutos2 < 10 && diferenciaMinutos2 > -1){diferenciaMinutos2 = "0" + diferenciaMinutos2}
	if(diferenciaSegundos2 < 10 && diferenciaSegundos2 > -1){diferenciaSegundos2 = "0" + diferenciaSegundos2}
	if(diferenciaDias <= 0 && diferenciaHoras2<= 0 && diferenciaMinutos2 <= 0 && diferenciaSegundos2 <= 0){
		diferenciaDias = 0
		diferenciaHoras2 = 0
		diferenciaMinutos2 = 0
		diferenciaSegundos2 = 0
		vencimiento_element.textContent = "" + diferenciaDias + "d "+ diferenciaHoras2 + "h " + diferenciaMinutos2 + "m " + diferenciaSegundos2 + "s ";
	}else{
		vencimiento_element.textContent = "" + diferenciaDias + "d "+ diferenciaHoras2 + "h " + diferenciaMinutos2 + "m " + diferenciaSegundos2 + "s ";
		setTimeout('timerExpired()',1000)
	}
}