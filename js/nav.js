$(function(){ //nav.js
	
	// 메인 메뉴 
	$('#nav>div>ul>li').on({
		mouseenter: function(){
			$('.mainMenuBtn').removeClass('addMainMenuBtn');
			$(this).find('.mainMenuBtn').addClass('addMainMenuBtn');
			
			$('.subMenu-container').hide();
			$(this).find('.subMenu-container').show();
			
			$('.subMenu-type2-container').hide();
			$(this).find('.subMenu-type2-container').show();
			
			$('.subMenuBtn').removeClass('addSubMenuBtn');
			$(this).find('.subMenuBtn').eq(0).addClass('addSubMenuBtn');
			
			$('.subSubMenu-wrap').hide();
			$(this).find('.subSubMenu-wrap').eq(0).show();
		}
	});
	
	$('#nav>div>ul').on({
		mouseleave: function(){
			$('.mainMenuBtn').removeClass('addMainMenuBtn');
			$('.subMenu-container').hide();
			$('.subMenu-type2-container').hide();
		}
	});
	
	$('.mainMenuBtn').on({
		focusin: function(){
			$('.mainMenuBtn').removeClass('addMainMenuBtn');
			$(this).addClass('addMainMenuBtn');
			
			$('.subMenu-container').hide();
			$(this).parent().find('.subMenu-container').show();
			
			$('.subMenu-type2-container').hide();
			$(this).parent().find('.subMenu-type2-container').show();
			
			$('.subMenuBtn').removeClass('addSubMenuBtn');
			$(this).parent().find('.subMenuBtn').eq(0).addClass('addSubMenuBtn');
			
			$('.subSubMenu-wrap').hide();
			$(this).parent().find('.subSubMenu-wrap').eq(0).show();
		}
	});
	
	$('.fidexIconBtn').on({
		focusin: function(){
			$('.subMenu-type2-container').hide();
		}
	});
	
	$('.subMenuBtn').on({
		mouseenter: function(){
			$('.subMenuBtn').removeClass('addSubMenuBtn');
			$(this).addClass('addSubMenuBtn');
			$('.subSubMenu-wrap').hide();
			$(this).parent().find('.subSubMenu-wrap').show();
		},
		focusin: function(){
			$('.subMenuBtn').removeClass('addSubMenuBtn');
			$(this).addClass('addSubMenuBtn');
			$('.subSubMenu-wrap').hide();
			$(this).parent().find('.subSubMenu-wrap').show();
		}
	});
	
	// 상단 어사이드
	$('.asideMenuBtn').on({
		mouseenter: function(){
			$(this).parent().find('.asideSub-wrap').show();
		},
		focusin: function(){
			$('.asideMenuBtn').removeClass('addAsideBtn');
			$(this).addClass('addAsideBtn');
			$('.asideSub-wrap').hide();
			$(this).parent().find('.asideSub-wrap').show();
		}
	});
	
	$('#aside>div>ul>li').on({
		mouseleave: function(){
			$('.asideSub-wrap').hide();
		}
	});
	
	// 푸터 메뉴
	$('.langBtn').on({
		mouseenter: function(){
			$(this).parent().find('ul').show();
		},
		focus: function(){
			$(this).parent().find('ul').show();
		}
	});
	
	$('.footer-menu-wrap>li').on({
		mouseleave: function(){
			$(this).find('ul').hide();
		}
	});
	
}); //nav.js
































