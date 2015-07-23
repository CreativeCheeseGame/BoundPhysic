var mq = window.matchMedia('all and (min-width: 1200px)');
if(mq.matches) {
	var getheader = document.getElementById('header_vamosya');
	var getnavbar = document.getElementById('navbar-static-vamosya');
	var getlogo = document.getElementById("logochange");

	var firstlogo = getnavbar.getAttribute("logofirst");
	var secondlogo = getnavbar.getAttribute("logosecond");

		getheader.style.height = "81px";
		getheader.style.backgroundColor = "#FFF";

		window.addEventListener("scroll", function(event) {
		    var top = window.pageYOffset || document.documentElement.scrollTop;
		    if(top == 0){
		    	getheader.style.height = "81px";
				getnavbar.style.padding = "15px 0px";
				getnavbar.style.backgroundColor = "#FFF";
				getnavbar.style.borderColor = "#FFF";
				getlogo.style.left = "106px";
				getlogo.src=firstlogo;	     
		     }
		     else{

		     	getheader.style.height = "50px";
		     	getnavbar.style.padding = "0px";
				getnavbar.style.backgroundColor = "#FFF";//#38B9E1
				getnavbar.style.borderColor = "#FFF";
				getlogo.style.left = "200px";
				getlogo.src=secondlogo;
		     }
		    
		}, false);
}




