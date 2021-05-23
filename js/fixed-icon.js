$(function(){ //fixed-icon.js
	
	$('.fidexIconBtn').on({
		mouseenter: function(){
			$(this).parent().find('.fidexIcon-hidden-wrap').css({ width:100, opacity:1, transition:'all 0.5s' });
		},
		focusin: function(){
			$(this).parent().find('.fidexIcon-hidden-wrap').css({ width:100, opacity:1, transition:'all 0.5s' });
		}
	});
	
	$('#fixed-icon-wrap>ul>li').on({
		mouseleave: function(){
			$('#fixed-icon-wrap>ul>li').find('.fidexIcon-hidden-wrap').css({ width:0, opacity:0, transition:'all 0.5s' });
		}
	});
	
}); //fixed-icon.js