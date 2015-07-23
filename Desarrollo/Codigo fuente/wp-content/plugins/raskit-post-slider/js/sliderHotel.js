

var speedTransitionSlider = 10000; /* speed for change picture of slider */
var rangePixelPerMiliSeconds = 50; /* quantity of pixel to move slide by miliseconds */
//var speedAnimationSlides = 5; /* speed to move a slide in miliseconds */


/* Slider Class */
function SliderHotel( constructorObject, attributes){

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
	this.slideNumber = attributes.slideNumber;

	/*
		-----
		Construction attributes
		-----
	*/

	this.contructionHotels = function(json){
		for( var post in json ){
			buildHotelSliderElements({  instance: that, index: post }, json[post]);
		}
		setDefaultSliderCategoriesValues();
		listenButtonsSliderCategories();
		this.resizeWindows();
	}

	/*
		-----
		Default Values
		-----
	*/

	function setDefaultSliderCategoriesValues(){
		reziseSlideDepenceWidthParenElement();
		that.slideWidth = that.magicSliderContainer.parentElement.offsetWidth / that.slideNumber;
		that.magicSliderContainer.style.width = that.slideArray.length * that.slideWidth + 400 + "px";
		that.magicSliderContainer.style.left = "0px";

		for( var index in that.slideArray ){
			that.slideArray[index].setAttribute('style', " width: " + that.slideWidth +"px;");
		}
	}

	function reziseSlideDepenceWidthParenElement(){
		if(that.element.offsetWidth + (that.element.offsetLeft * 2) >= 320 && that.element.offsetWidth + (that.element.offsetLeft * 2) < 540){
			that.slideNumber = 2;
		}else if(that.element.offsetWidth + (that.element.offsetLeft * 2) >= 540 && that.element.offsetWidth + (that.element.offsetLeft * 2) < 768 ){
			that.slideNumber = 3;
		}else if(that.element.offsetWidth + (that.element.offsetLeft * 2) >= 768 && that.element.offsetWidth + (that.element.offsetLeft * 2) < 992 ){
			that.slideNumber = 4;
		}else if(that.element.offsetWidth + (that.element.offsetLeft * 2) >= 992 ){
			that.slideNumber = 5;
		}
		if(that.slideArray.length < that.slideNumber){
			that.slideNumber = that.slideArray.length;
		}
	}

	/*  ------ 
		listen events
	    --------
	*/

	function listenButtonsSliderCategories(){
		that.nextButton.onclick = function() {
			if (!that.isMotion){ that.isMotion = true; nextSlideSimpleAction(); }
		};

		that.prevButton.onclick = function() {
			if (!that.isMotion){  that.isMotion = true; prevSlideSimpleAction(); }
		};
	}

	this.resizeWindows = function(){
		window.addEventListener('resize', function(){
			setDefaultSliderCategoriesValues();
		});

	};

	/*
		---
		listen response
		---
	*/


	function nextSlideSimpleAction(){
		if ((that.slideArray.length - that.slideNumber) == that.positionSlide ){
			that.isMotion = false;
		}else{
			var magicSliderRectSizeLeft = parseFloat(that.magicSliderContainer.style.left.split("px")[0]);
			animationSimpleSliderSupport({
				element: that.magicSliderContainer,
				isSum: false,
				slideMovedX: magicSliderRectSizeLeft,
				slideToMov: magicSliderRectSizeLeft - that.slideWidth
			});
			that.positionSlide++;
		}
	}
	
	function prevSlideSimpleAction(){
		if (that.positionSlide == 0 ){
			that.isMotion = false;
		}else{
			var magicSliderRectSizeLeft = parseFloat(that.magicSliderContainer.style.left.split("px")[0]);
			animationSimpleSliderSupport({
				element: that.magicSliderContainer,
				isSum: true,
				slideMovedX: magicSliderRectSizeLeft,
				slideToMov: magicSliderRectSizeLeft + that.slideWidth
			});
			that.positionSlide--;
		}
	}

	/*  ------ 
		Animations 
	    --------
	*/

	function animationSimpleSliderSupport(properties){
		console.log(properties);
		var left = properties.slideMovedX;
		var timer = setInterval(function(){
			left = properties.isSum ?  (left + rangePixelPerMiliSeconds) :  (left - rangePixelPerMiliSeconds);

			properties.element.setAttribute('style', "left: "+ left +"px; position: absolute;");
			that.magicSliderContainer.style.width = that.slideArray.length * that.slideWidth + 400 + "px";
			var condition = properties.isSum ? (left + rangePixelPerMiliSeconds) > properties.slideToMov : (left - rangePixelPerMiliSeconds) < properties.slideToMov;
			if(condition ){
				clearInterval( timer );
				properties.element.setAttribute('style', "left: "+ properties.slideToMov +"px; position: absolute; width: " + (that.slideArray.length * that.slideWidth + 400) + "px");
				that.isMotion = false;
			}
		}, 1);
	}

}
