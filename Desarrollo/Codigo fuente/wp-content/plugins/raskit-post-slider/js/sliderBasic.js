var speedTransitionSlider = 3000; /* speed for change picture of slider */
var rangePixelPerMiliSeconds = 50; /* quantity of pixel to move slide by miliseconds */
//var speedAnimationSlides = 5; /* speed to move a slide in miliseconds */


/* Slider Class */
function SliderBasic( constructorObject){

	var that = this;

	/*
		-----
		Initialize attributes
		-----
	*/

	this.element = constructorObject.parentElement; /* container slider */
	this.nextButton = constructorObject.nextButton; /* button next slide */
	this.prevButton = constructorObject.prevButton; /* button prev slide */
	this.magicSliderContainer = constructorObject.magicSliderContainer; 

	this.slideArray = new Array();
	this.positionSlide = 0; /* position for array slides */
	this.isMotion = false; /* flag when slider is animating */

	/*
		-----
		Construction attributes
		-----
	*/

	this.contructionBasicImages = function(json){
		for( var post in json ){
			buildBasicSliderElements({  instance: that }, json[post]);
		}
		setDefaultSliderMainValues();
		listenButtonsSliderMain();
		if (json.length > 1) {
			setTimeOutMoveSlider();
		}else{
			var elementsToRemove = this.element.children[0].children;
			elementsToRemove[0].remove();
			elementsToRemove[0].remove();
		}
		this.resizeWindows();
	}

	this.contructionBasicImagesMainCategories = function(json){
		for( var post in json ){
			buildBasicSliderElementsMainCategories({  instance: that }, json[post]);
		}
		setDefaultSliderMainValues();
		listenButtonsSliderMain();
		if (json.length > 1) {
			setTimeOutMoveSlider();
		}else{
			var elementsToRemove = this.element.children[0].children;
			elementsToRemove[0].remove();
			elementsToRemove[0].remove();
		}
		this.resizeWindows();
	}

	/*
		-----
		Default Values
		-----
	*/

	function setDefaultSliderMainValues(){
		for( var index in that.slideArray ){
			that.slideArray[index].setAttribute('style', " width: "+that.element.offsetWidth+"px; left: -"+that.element.offsetWidth+"px;");
		}
		that.slideArray[0].setAttribute('style', " width: "+that.element.offsetWidth+"px; left: 0px;");
	}

	/*  ------ 
		listen events
	    --------
	*/

	function listenButtonsSliderMain(){
		that.nextButton.onclick = function() {
			if (!that.isMotion){ that.isMotion = true; nextSlideAction(); }
		};

		that.prevButton.onclick = function() {
			if (!that.isMotion){  that.isMotion = true; prevSlideAction(); }
		};
	}

	this.resizeWindows = function(){
		window.addEventListener('resize', function(){
			if ( that.typeAction == postypeMainSliderAction ||  that.typeAction == postypeSingleCategoryAction) { 
				that.slideArray[that.positionSlide].setAttribute('style', " width: "+that.element.offsetWidth+"px;");
			}else if( that.typeAction == postypeCategoryAction || that.typeAction == postypeHotelPromotionsAction || that.typeAction == postypeRelationCategoryAction ){
				setDefaultSliderCategoriesValues();
			}
		});

	};

	/*
		---
		listen response
		---
	*/

	function prevSlideAction(){

		var prevPostion;
		var screenWidth = that.element.offsetWidth;

		if ( that.positionSlide == 0 ){
			prevPostion = that.slideArray.length - 1;
		}else{
			prevPostion = that.positionSlide - 1;
		}
		/*
			set styles current position and next position animations
		*/
		animationSliderPrevWithElement(that.slideArray[that.positionSlide], {
			currentX : 0,
			moveToX : screenWidth,
			isDisplay :  false
		});
		animationSliderPrevWithElement(that.slideArray[prevPostion], {
			currentX : (-1) * screenWidth,
			moveToX : 0,
			isDisplay : true
		});

		that.positionSlide = prevPostion;
	}

	function nextSlideAction(){
		var nextPostion;
		var screenWidth = that.element.offsetWidth;

		if (that.slideArray.length - 1 == that.positionSlide ){
			nextPostion = 0;
		}else{
			nextPostion = that.positionSlide + 1;
		}
		/*
			set styles current position and next position animations
		*/
		animationSliderNextWithElement(that.slideArray[that.positionSlide], {
			currentX : 0,
			moveToX : (-1) * screenWidth,
			isDisplay : false
		});
		animationSliderNextWithElement(that.slideArray[nextPostion], {
			currentX : screenWidth,
			moveToX : 0,
			isDisplay : true
		});

		that.positionSlide = nextPostion;
	}

	/*  ------ 
		Animations 
	    --------
	*/

	function setTimeOutMoveSlider(){
		setInterval(function(){
			if (!that.isMotion){ that.isMotion = true; nextSlideAction(); }
		}, speedTransitionSlider);
	}


	function animationSliderNextWithElement(element, properties){
		baseAnimation(false, element, properties);
	}

	function animationSliderPrevWithElement(element, properties){
		baseAnimation(true, element, properties);
	}

	function baseAnimation(isSum, element, properties){
		element.style.left = properties.currentX + "px";

		var left = properties.currentX;
		var timer = setInterval(function(){
			left = isSum ?  (left + rangePixelPerMiliSeconds) :  (left - rangePixelPerMiliSeconds);

			element.setAttribute('style', "left: "+ left +"px; width: " + that.element.offsetWidth + "px; display: table-cell;");
			var condition = isSum ? left + rangePixelPerMiliSeconds > properties.moveToX : left - rangePixelPerMiliSeconds < properties.moveToX;
			if(condition ){
				clearInterval( timer );
				element.setAttribute('style', "left: "+ properties.moveToX +"px; width: " + that.element.offsetWidth + "px;");
				element.style.display = properties.isDisplay ? "table-cell" : "none";
				that.isMotion = false;
			}
		}, 1);
		
		element.style.display = properties.isDisplay ? "block;" : "none;";
	}

}