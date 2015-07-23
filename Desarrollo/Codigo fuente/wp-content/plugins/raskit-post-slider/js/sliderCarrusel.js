function SliderCarrusel(widthBySlide, elementPrev, elementNext, elementContainerSlider) {
	Slider.call(this, widthBySlide, elementPrev, elementNext, elementContainerSlider);

	// handle on click listener
	var that = this;
	this.resizeWindows = function(){
		window.addEventListener('resize', function(){
			that.slideViewCount = Math.floor(that.widthTotal.parentElement.parentElement.parentElement.offsetWidth / that.slideWidth );
			that.setContentWidth();
		});
	};

	this.initCarrusel = function(){
		this.setContentWidth();
		this.resizeWindows();
	};

}

SliderCarrusel.prototype = Object.create( Slider.prototype);
SliderCarrusel.prototype.constructor = SliderCarrusel;