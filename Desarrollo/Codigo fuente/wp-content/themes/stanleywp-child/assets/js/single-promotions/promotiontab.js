(function() {

	[].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
		new CBPFWTabs( el );
	});

	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
		new SelectFx(el, {
			stickyPlaceholder: false,
			onChange: function(val){
				calcularCantidad();
			}
		});

		
	} );

})();