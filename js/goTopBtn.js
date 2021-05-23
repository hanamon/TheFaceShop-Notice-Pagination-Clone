$(function(){ //goTopBtn.js
	
	$('.goTopBtn').on({
		click: function(){
			$('html, body').stop().animate({ scrollTop: 0 }, 600);
		}
	});
	
}); //goTopBtn.js