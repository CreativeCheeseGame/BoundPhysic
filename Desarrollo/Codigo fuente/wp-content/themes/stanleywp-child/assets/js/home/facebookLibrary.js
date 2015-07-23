(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&appId=1545227259086169&version=v2.0";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));



/**
 * Content fb background
 */

var jQuerycontent = jQuery('#backgroundFb .content')
  , jQueryblur    = jQuery('#backgroundFb .overlay')
  , wHeight  = document.getElementById("backgroundFb").offsetTop ;//jQuery(window).height();

jQuery(window).on('resize', function(){
  wHeight = document.getElementById("backgroundFb").offsetTop;
});

window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Scroller()
{
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

Scroller.prototype = {
 
  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
    jQueryblur.css('background-image',jQuery('#backgroundFb:first-of-type').css('background-image'));
  },


  onScroll: function() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  },

  
  requestTick: function() {
    if( !this.ticking ) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  },

  update: function() {
    var currentScrollY = this.latestKnownScrollY;
    this.ticking       = false;
    
    
    var slowScroll = currentScrollY / 2
      , blurScroll = currentScrollY
      , opaScroll = 1.4 - currentScrollY / 400;
    
    jQuerycontent.css({
      'transform'         : 'translateY(' + slowScroll + 'px)',
      '-moz-transform'    : 'translateY(' + slowScroll + 'px)',
      '-webkit-transform' : 'translateY(' + slowScroll + 'px)',
      'opacity' : opaScroll
    });
    

    if (currentScrollY < (wHeight + 500) ) {
    	blurScroll = 0;
    } else{
    	blurScroll -= (wHeight + 500);
    };

    jQueryblur.css({
      'opacity' : (blurScroll * 2) / (wHeight)
    });
  }
};


var scroller = new Scroller();  
scroller.init();