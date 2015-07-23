var resultArraySearchPromotion = [];
var totalResultSearchPromotion;
var searhInputToQuery;
var pagedToSearchPromotion = 1;

function searchCity(){
	var searchInput = document.getElementById("input_search");
	var actionSearchApi = "get_postype_search_promotions";
	var containerList = document.getElementById("container_elements_searched");
	var tableContainer = document.getElementsByClassName("tableContainer")[0];
	var tableSearched = document.getElementById('tableSearched');
	var flagMorePromotions = false;

	tableContainer.hidden = true;

	searchInput.addEventListener('input', function(){
		search();
	});

	document.onclick = function(event){
		event = event || window.event
		var target = event.target || event.srcElement
		if( target.className !=  "active rowSearchList"){
			tableContainer.hidden = true;
		}
	}

	function search(){
		if(searchInput.value != "" && searchInput.value.length > 1){
			if (searhInputToQuery != searchInput.value) {
				pagedToSearchPromotion = 1;
			}
			var request = new Ajax();
			request.post(MyAjax.url, { action: "get_postype_search_promotions" , textToSearch : [searchInput.value], paged: pagedToSearchPromotion }, function(json){
				setValuesToGlobalVariables(json);
				tableSearched.innerHTML = "";
				showList();
			}, true);
		}
	}

	function setValuesToGlobalVariables(json){
		console.log(json);
		if (json.length > 0 ) {
			totalResultSearchPromotion = parseInt(json[0].totalPost);
			tableContainer.hidden = false;
		}else{
			totalResultSearchPromotion = 0;
			tableContainer.hidden = true;
		}


		if ( flagMorePromotions) {
			resultArraySearchPromotion = resultArraySearchPromotion.concat(json);
			pagedToSearchPromotion += 1;
			flagMorePromotions = false;
		}else{
			resultArraySearchPromotion = json;
			searhInputToQuery = searchInput.value;
			pagedToSearchPromotion += 1;				
		}
	}

	function showList(){
		for(var index in resultArraySearchPromotion){
			var row = tableSearched.insertRow(index);
			var cell = row.insertCell(0);
			var aElementUrl = document.createElement("a");
			var promocionELement = document.createElement("div");
			var paisELement = document.createElement("div");
			var ciudadELement = document.createElement("div");
			aElementUrl.href = resultArraySearchPromotion[index].link;
			// aElementUrl.onclick = function() {
			// 	window.location = resultArraySearchPromotion[index].link;
			// };
			promocionELement.innerHTML = "    " + resultArraySearchPromotion[index].title;
			ciudadELement.innerHTML = resultArraySearchPromotion[index].ciudad;
			paisELement.innerHTML = resultArraySearchPromotion[index].pais;

			paisELement.className = "paisCellRow";
			ciudadELement.className = "ciudadCellRow";
			promocionELement.className = "promotionCellRow";
			aElementUrl.className = "rowSearchedPromotions";

			aElementUrl.appendChild(promocionELement);
			aElementUrl.appendChild(ciudadELement);
			aElementUrl.appendChild(paisELement);
			cell.appendChild(aElementUrl);
			cell.className = "active rowSearchList";
			row.className = "promotionHover";
		}

		addPromocionesDisponibles();

		if ( arrayWithSameCity(resultArraySearchPromotion)) {
			addCiudadToTableSearch();
		}

		function addCiudadToTableSearch() {
			var fisrtObjectInfo = resultArraySearchPromotion[0];
			var rowCity = tableSearched.insertRow(0);
			var cellCity = rowCity.insertCell(0);
			var cityContainer = document.createElement("div");
			var cityLabel = document.createElement("div");
			var countryLabel = document.createElement("strong");
			var countryImage = document.createElement("img");

			cityLabel.innerHTML = fisrtObjectInfo.ciudad;
			countryLabel.innerHTML = fisrtObjectInfo.pais;
			countryImage.src = fisrtObjectInfo.paisImg;

			cityContainer.className = "headerCityTableSearch";
			cellCity.className = "active headerCellCityTableSearch";

			cityContainer.appendChild(cityLabel);
			cityContainer.appendChild(countryLabel);
			cityContainer.appendChild(countryImage);
			cellCity.appendChild(cityContainer);

			var row = tableSearched.insertRow(0);
			var cell = row.insertCell(0);
			cell.className = "active";
			var divTitle = document.createElement("div");
			divTitle.className = "rowHeaderSearchList";
			divTitle.innerHTML = "DESTINOS VAMOSYA";
			cell.appendChild(divTitle);
		}

		function addPromocionesDisponibles() {
			var row = tableSearched.insertRow(0);
			var cell = row.insertCell(0);
			cell.className = "active";
			var divTitle = document.createElement("div");
			divTitle.className = "rowHeaderSearchList";
			divTitle.innerHTML = "Promociones disponibles";
			cell.appendChild(divTitle);
		}

		if (resultArraySearchPromotion.length != totalResultSearchPromotion ) {
			addMoreButtonSearch();
		}		
	}



	function arrayWithSameCity(array) {
		var flagArrayCity = true;
		var firstCityName = array[0].ciudad;
		for (var object of array) {
			if (object.ciudad != firstCityName) {
				flagArrayCity = false;
				break;
			}
		}
		return flagArrayCity;
	}


	function addMoreButtonSearch(){
		var row = tableSearched.insertRow(resultArraySearchPromotion.length + 1);
		var cell = row.insertCell(0);
		cell.className = "active";
		var buttonMoreSearch = document.createElement("button");
		buttonMoreSearch.innerHTML = "Encontrar mas resultados para  \" "+ searchInput.value + "\" ";
		buttonMoreSearch.className = "btn btn-primary buttonSearchMore";
		buttonMoreSearch.type = "button";
		buttonMoreSearch.onclick = function(){
			flagMorePromotions = true;
			search();
		};
		cell.appendChild(buttonMoreSearch);
	}
}