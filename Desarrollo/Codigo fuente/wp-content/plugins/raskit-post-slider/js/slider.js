
var postypeMainSliderAction =  "get_postype_main_slider"; /* param for request to api main slider */
var postypePromotionsAction =  "get_postype_promociones"; /*param for request to api promotions  */
var postypeCategoryAction =  "get_postype_main_category"; /*param for request to api promotions  */
var postypeSingleCategoryAction = "get_postype_basic";
var postypeRelationCategoryAction = "get_postype_relation_category";
var postypeHotelPromotionsAction = "get_postype_hotel_promotions";

var speedTransitionSlider = 7000; /* speed for change picture of slider */
var rangePixelPerMiliSeconds = 50; /* quantity of pixel to move slide by miliseconds */
var speedAnimationSlides = 5; /* speed to move a slide in miliseconds */


/* Slider Class */
function Slider( constructorObject){

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

	this.raskitSliderMainSlider = function(properties){
		this.setTypeMainSlider();
		this.raskitSlider(properties);
	};
	this.raskitSliderPromotions = function(properties){
		this.setTypePromotions();
		this.raskitSlider(properties);
	};

	this.raskitSliderCategories = function(properties){
		this.setTypeCategory();
		this.raskitSlider(properties);
	};

	this.raskitSliderBasic = function(properties){
		this.setTypeBasic();
		this.raskitSlider(properties);
	};


	this.raskitSliderRelationsCategory = function(properties){
		this.setTypeRelationCategories();
		this.raskitSlider(properties);
	};

	this.raskitSliderHotelPromotions = function(properties){
		this.setTypeHotelPromotions();
		this.raskitSlider(properties);
	};

	this.raskitSlider = function(properties){
		this.slideNumber = properties.slideLength; // number of slide
		this.initRequest();
		this.resizeWindows();
	};

	/* Set methods */
	
	this.setTypeMainSlider = function(){
		this.typeAction = postypeMainSliderAction;
	}

	this.setTypePromotions = function(){
		this.typeAction = postypePromotionsAction;
	}

	this.setTypeCategory = function(){
		this.typeAction = postypeCategoryAction;
	}

	this.setTypeBasic = function(){
		this.typeAction = postypeSingleCategoryAction;
	}

	this.setTypeRelationCategories = function(){
		this.typeAction = postypeRelationCategoryAction;
	}

	this.setTypeHotelPromotions = function(){
		this.typeAction = postypeHotelPromotionsAction;
	}


	/**
	 * SUPPORT GET OFFSET WIDTH
	 */
	
	function _getOffset(elm, height) {
		var cStyle = elm.ownerDocument && elm.ownerDocument.defaultView && elm.ownerDocument.defaultView.getComputedStyle
			&& elm.ownerDocument.defaultView.getComputedStyle(elm, null),
			ret = cStyle && cStyle.getPropertyValue(height ? 'height' : 'width') || '';
		if (ret && ret.indexOf('.') > -1) {
			ret = parseFloat(ret)
				+ parseInt(cStyle.getPropertyValue(height ? 'padding-top' : 'padding-left'))
				+ parseInt(cStyle.getPropertyValue(height ? 'padding-bottom' : 'padding-right'))
				+ parseInt(cStyle.getPropertyValue(height ? 'border-top-width' : 'border-left-width'))
				+ parseInt(cStyle.getPropertyValue(height ? 'border-bottom-width' : 'border-right-width'));
		} else {
			ret = height ? elm.offsetHeight : elm.offsetWidth;
		}
		return ret;
	}
	function getOffsetWidth(elm) {
		return _getOffset(elm);
	}
	function getOffsetHeight(elm) {
		return _getOffset(elm, true);
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

	function setDefaultSliderCategoriesValues(){
		if (that.typeAction == postypeRelationCategoryAction) {
			reziseSlideDepenceWidthParenElementRelationPromotion();
		}else{
			reziseSlideDepenceWidthParenElement();
		}
		that.slideWidth = getOffsetWidth(that.magicSliderContainer.parentElement) / that.slideNumber;
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

	function reziseSlideDepenceWidthParenElementRelationPromotion(){
		if(that.element.offsetWidth + (that.element.offsetLeft * 2) >= 0 && that.element.offsetWidth + (that.element.offsetLeft * 2) < 560){
			that.slideNumber = 1;
		}else if(that.element.offsetWidth + (that.element.offsetLeft * 2) >= 560 && that.element.offsetWidth + (that.element.offsetLeft * 2) < 750){
			that.slideNumber = 2;
		}else if(that.element.offsetWidth + (that.element.offsetLeft * 2) >= 750 && that.element.offsetWidth + (that.element.offsetLeft * 2) < 768 ){
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
		Request
		call to api
	    --------
	*/
	this.initRequest = function(){
		request = new Ajax();
		request.get(MyAjax.url, { action: this.typeAction }, function(json){ 
			if(that.typeAction == postypeMainSliderAction){
				successMainRequest(json);
			}
			else if(that.typeAction == postypeCategoryAction){
				successCategoryRequest(json);
			}
			else if(that.typeAction == postypeSingleCategoryAction){
				successBasicRequest(json);
			}else if(that.typeAction == postypeHotelPromotionsAction){
				successHotelRequest(json);
			}
			else if(that.typeAction == postypeRelationCategoryAction){
				successRelationCategoryRequest(json);
			}
		}, true);
	}

	function successMainRequest(json){
		for( var post in json ){
			buildMainSliderElements({ instance: that }, json[post]);
		}
		setDefaultSliderMainValues();
		listenButtonsSliderMain(); /* active listen buttons */
		setTimeOutMoveSlider();
	}

	function successCategoryRequest(json){
		for( var post in json ){
			buildCategoriesSliderElements({  instance: that }, json[post]);
		}
		setDefaultSliderCategoriesValues();
		listenButtonsSliderCategories(); /* active listen buttons */
		//setTimeOutMoveSlider();
	}

	function successBasicRequest(json){//Request para slider basico de solo imagenes
		for( var post in json ){
			buildBasicSliderElements({  instance: that }, json[post]);
		}
		setDefaultSliderMainValues();
		listenButtonsSliderMain();
		//setTimeOutMoveSlider();
	}

	function successRelationCategoryRequest(json){
		for( var post in json ){
			buildRelationCategorySliderElements({  instance: that }, json[post]);
		}
		setDefaultSliderCategoriesValues();
		listenButtonsSliderCategories();
		// timerAnimationSlideCategory();
	}

	function successHotelRequest(json){
		for( var post in json ){
			buildHotelSliderElements({  instance: that }, json[post]);
		}
		setDefaultSliderCategoriesValues();
		listenButtonsSliderCategories();
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

	function listenButtonsSliderCategories(){
		that.nextButton.onclick = function() {
			if (!that.isMotion){ that.isMotion = true; nextSlideSimpleAction(); }
		};

		that.prevButton.onclick = function() {
			if (!that.isMotion){  that.isMotion = true; prevSlideSimpleAction(); }
		};
	}

	function timerAnimationSlideCategory(){
		var positionSlide = that.slideArray.length - (that.slideArray.length - that.slideNumber);
		var direccion = true;
		var timer = setInterval(function(){
			if (direccion) {
				if (positionSlide == that.slideArray.length) {
					direccion = false;
				}else{
					positionSlide++;
				};
				nextSlideSimpleAction();
			}else{
				if (positionSlide == (that.slideArray.length - that.slideNumber)) {
					direccion = true;
				}else{
					positionSlide--;	
				};
				prevSlideSimpleAction();
			}
		}, 4000);
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
