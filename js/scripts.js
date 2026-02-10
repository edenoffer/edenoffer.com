	
$(document).ready(function() {
	
	"use strict";
	
	PageLoad();
	ScrollEffects();
	FirstLoad();
	Showcase();
	ShowcaseCarousel();
	Portfolio();
	FitThumbScreen();
	Shortcodes();	
	AjaxLoad();
	JustifiedGrid();
	Lightbox();
	Sliders();
	ContactForm();
	PlayVideo();
	ContactMap();

});



/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {	
		
		if ($('#page-content').hasClass("light-content")) {
			$('.preloader-wrap').addClass('light-content');			
		}
		
		TweenMax.set($(".menu-timeline .before-span"), {y: 120, opacity:0});
		
		// Page Navigation Events
		$(".preloader-wrap").on('mouseenter', function() {	
			var $this = $(this);			
			TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:'#fff', backgroundColor:'#fff'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
		});
							
		$(".preloader-wrap").on('mouseleave', function() {					
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();				
		});		
		
		$('body').removeClass('hidden').removeClass('hidden-ball');
		TweenMax.to($(".preloader-marquee-wrapper"), 1, {force3D:true, opacity:1, y: 0, delay:0.2, ease:Power3.easeOut});
		TweenMax.to($("#header-container"), 0.5, {force3D:true, opacity:1, delay:0.2, ease:Power2.easeOut}); //modified time
		var width = 100,
			perfData = window.performance.timing, 
			EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
			time = ((EstimatedTime/10)%550) * 10
			
		// Loadbar Animation
		$(".loadbar").animate({
			width: width + "%"
		}, time  );	
		
		
		// Percentage Increment Animation
		var PercentageID = $("#precent"),
				start = 0,
				end = 100,
				durataion = time + 0;
				animateValue(PercentageID, start, end, durataion);
				
		function animateValue(id, start, end, duration) {
		  
			var range = end - start,
			  current = start,
			  increment = end > start? 1 : -1,
			  stepTime = Math.abs(Math.floor(duration / range)),
			  obj = $(id);
			
			var timer = setInterval(function() {
				current += increment;
				$(obj).text(current);
			  //obj.innerHTML = current;
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}
		
		// Fading Out Loadbar on Finised
		setTimeout(function(){
			$('.loadbar').append('<span class="hold-progress-bar"></span>');
			
			TweenMax.to($('.hold-progress-bar'), 0.3, {force3D:true,width:'100%', delay:0, ease:Power2.easeOut, onComplete:function(){  //modified time 2019 nov
				
				$('body').waitForImages({
						finished: function() {
							TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
							$('#ball p').remove();
							TweenMax.to($(" .trackbar, .percentage"),0.3, {force3D:true, opacity:0, y:-10, delay:0, ease:Power2.easeIn});
							TweenMax.to($(" .preloader-marquee"),0.5, {force3D:true, opacity:0, y:-40, delay:0.1, ease:Power2.easeIn});							
							TweenMax.to($(".preloader-wrap"),1, {force3D:true, yPercent: -101, delay:0.6, ease:Power2.easeInOut});
							TweenMax.set($(".preloader-wrap"), {visibility:'hidden', delay:1.7, opacity:0});
							TweenMax.to($("#header-container"), 0.5, {force3D:true, opacity:1, delay:1.4, ease:Power2.easeOut}); //modified time
							setTimeout(function(){
							
								$('body').waitForImages({
									finished: function() {
										TweenMax.to($(".header-middle, #footer-container, .showcase-counter, .swiper-pagination-bullet-active .counter"), 1, {force3D:true, opacity:1, delay:0, ease:Power2.easeOut}); 
												
									},
									waitForAll: true
								});
								
								if( $('.hero-video-wrapper').length > 0 ){
									$('#hero-image-wrapper').find('video').each(function() {
										$(this).get(0).play();
									}); 
								}
								
								TweenMax.to($("#main"), 0, {force3D:true, opacity:1, delay:0, ease:Power2.easeOut});//modified time
								if( $('#hero').hasClass("has-image")) {	
									TweenMax.to($("#hero-bg-image, #hero-fg-image"), 1, {force3D:true, scale:1.02 , opacity:1, delay:0.2, ease:Power2.easeOut});
									TweenMax.to($(".hero-title span"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
									TweenMax.to($(".hero-subtitle"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
									TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
									TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
									TweenMax.to($(".scroll-down-wrap"), 1, {force3D:true, scale:1, opacity:1, delay:1.2, ease: Elastic.easeOut});														
									TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:1.15, ease:Power2.easeOut});
								} else {
									TweenMax.to($(".hero-title span"), 0.4, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
									// Fading In Small Carousel elements on Finised
									var tlHerospan = new TimelineLite();
									tlHerospan.set($("#hero .hero-move-title span"), {y: 120, opacity:0});
									$("#hero .hero-move-title span").each(function(index, element) {
										tlHerospan.to(element, 0.7, {y:0, opacity:1, delay:0.6, ease:Power3.easeOut}, index * 0.1)
									});
									TweenMax.to($(".landing-caption"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
									TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.95, ease:Power2.easeOut});
									TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
									TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});									
									TweenMax.to($("#main-page-content"), 0.7, {force3D:true, opacity:1, y:0, delay:1.3, ease:Power2.easeOut});				
								}	
								
								
								// Fading In Showcase elements on Finised
								TweenMax.set($("#showcase-slider-holder"), {opacity:0, scale:1.1});
								TweenMax.set($("#showcase-carousel-holder, #showcase-vertical-carousel-holder"), {opacity:0, scale:1.05});
								TweenMax.set($(".swiper-prev, .swiper-next, .swiper-pagination-bullet, .arrows-wrap, .carousel-allprojects-wrapper"), {opacity:0});								
								TweenMax.to($("#showcase-slider-holder, #showcase-carousel-holder, #showcase-vertical-carousel-holder"), 0.7, {force3D:true, opacity:1, scale:1, delay:0.6, ease:Power2.easeOut});
								TweenMax.to($(".swiper-slide-active .move-caption .move-title span"), 1, {force3D:true, y: 0, opacity:1, delay:0.8, ease:Power2.easeOut});
								TweenMax.to($(".swiper-slide-active .move-caption .subtitle span"), 0.7, {force3D:true, y: 0, opacity:1, delay:1.1, ease:Power2.easeOut});
								TweenMax.to($(".move-caption .move-title span"), 0.1, {force3D:true, y: 0, opacity:1, delay:2, ease:Power2.easeOut});
								TweenMax.to($(".move-caption .subtitle span"), 0.1, {force3D:true, y: 0, opacity:1, delay:2, ease:Power2.easeOut});
								TweenMax.to($(".swiper-prev"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
								TweenMax.to($(".swiper-pagination-bullet, .arrows-wrap, .carousel-allprojects-wrapper"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
								TweenMax.to($(".swiper-next"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
								
								
								var slideWidth = $("#showcase-carousel-holder #showcase-slider .swiper-slide").width();
								TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").prev(), {x:slideWidth, scale:0.8, opacity:0});
								TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), {x:-slideWidth, scale:0.8, opacity:0});								
								TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").prev(), 2, {force3D:true, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut  });
								TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), 2, {force3D:true, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut  });
								
								
											
									
								setTimeout( function(){	
									$('body').removeClass("load-project-page").removeClass("load-project-page-carousel");
								} , 600 );
								
								setTimeout( function(){	
									$('body').removeClass("load-next-project");
									$('body').addClass("header-visible");
									$('#showcase-holder').removeClass("disabled");
								} , 1600 );
								
								setTimeout( function(){	
									$('body').removeClass("show-loader")
								} , 800 );	
								
							} , 600 );
						},
					waitForAll: true
				});
				
			}});
	  
		}, time);
		
		
		
	}// End Page Load


/*--------------------------------------------------
Function First Load
---------------------------------------------------*/	

	function FirstLoad() {	
		
		
		
		
		
		if ($("#page-content").hasClass("light-content")) {
			$("nav").css('background-color', '#141414');
			$("main, #main, #main-content").css('background-color', function () {
				return $("#page-content").data('bgcolor')
			});
			$('#magic-cursor').addClass('light-content');
			if( $('#hero').length > 0 ){						
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', 'transparent');
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		} else {			
			$("nav").css('background-color', '#141414');
			$("main, #main, #main-content").css('background-color', function () {
				return $("#page-content").data('bgcolor')
			});
			$('#magic-cursor').removeClass('light-content');
			if( $('#hero').length > 0 ){	
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', 'transparent');
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		}
		
		
		
		$('.video-cover').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		//Load Default Page
		$('a.ajax-link').on('click', function() {
			$("body").addClass("show-loader");	
			$(".flexnav").removeClass("flexnav-show");
			$('#menu-burger').removeClass("open");
			$('header').removeClass('white-header');
			$("#app").remove();
			$(".big-title-caption").remove();	
			var tlMenu = new TimelineLite();
			$(".fullscreen-menu .menu-timeline").each(function(index, element) {
				tlMenu.to(element, 0.25, {y:-30, opacity:0, ease:Power2.easeIn}, index * 0.03)
			});	
			TweenMax.to('#ball', 0.3,{borderWidth:"4px",scale:0.5,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});			
			TweenMax.to($("#main, #hero-image-wrapper, #project-nav, .next-project-image, #app"), 0.3, {opacity:0, delay:0.1, ease:Power0.ease});					
			TweenMax.to($("#footer-container, .header-middle"), 0.3, {opacity:0, ease:Power0.ease});			
			TweenMax.to('#show-filters, #counter-wrap', 0.2,{opacity:0});
		});
		
		//Load Project from Showcase
		$('#showcase-slider-holder #showcase-slider-captions-stroked a.move-title').on('click', function() {	
			$('header').removeClass('white-header');
			TweenMax.to($(".swiper-prev"), 0.3, {force3D:true, opacity:0, delay:0, ease:Power2.easeOut});
			TweenMax.to($(".swiper-pagination .swiper-pagination-bullet"), 0.3, {force3D:true, opacity:0, delay:0.1, ease:Power2.easeOut});
			TweenMax.to($(".swiper-next"), 0.3, {force3D:true, opacity:0, delay:0.15, ease:Power2.easeOut});
			TweenMax.to('#ball', 0.3,{borderWidth:"4px",scale:0.5,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			$("body").addClass("load-project-page").addClass("show-loader");
		});
		
		
		//Load Page From Menu
		$('nav .ajax-link').on('click', function() {
			$(this).parents('.flexnav').addClass('hover');
			$(this).parents('.item-with-ul').addClass('hover');
			TweenMax.set($(this).find('span'),{yPercent:0});
			var tl = new TimelineLite();
			$(".menu-timeline .before-span").each(function(index, element) {
				tl.to(element, 0.5, {force3D:true, y:-120, opacity:0, delay:0, ease:Power2.easeIn}, index * 0.05)
			});
			$('header').removeClass('white-header');
			$("#app").remove();
			$(".big-title-caption").remove();	
		});
		
		
		
		$('#burger-wrapper, .menu .button-text').on('click', function() {
			$('#menu-burger, nav').toggleClass('open');			
			setTimeout( function(){			
				if ($('#menu-burger').hasClass("open")) {
					$('header').addClass('over-sidebar').addClass('over-white-section');
					if (!$('#page-content').hasClass("light-content")) {	
						$('#magic-cursor').addClass('light-content');
						$('#header-container').addClass('light-content');
					}
					TweenMax.set($("nav ul ul li"), {y: 0, opacity:1});
					//Fade In Navigation Lists
					var tlMenu = new TimelineLite();
					tlMenu.set($(".menu-timeline .before-span"), {y: 120, opacity:0});
					//TweenMax.staggerTo($(".menu-timeline"), 0,{cycle:{x: ["50", "-50"]}, opacity:0});
					$(".menu-timeline .before-span").each(function(index, element) {
						tlMenu.to(element, 0.7, {force3D:true, y:0, opacity:1, delay:0.4, ease:Power2.easeOut}, index * 0.1)
					});
					
						
				} else {	
					//Fade Out Navigation Lists	
					var tlMenu = new TimelineLite();					
					$(".menu-timeline .before-span").each(function(index, element) {
						tlMenu.to(element, 0.5, {force3D:true, y:-120, opacity:0, delay:0, ease:Power2.easeIn}, index * 0.05)
					});
					
					var tlSubMenu = new TimelineLite();					
					$("ul.flexnav-show li").each(function(index, element) {
						tlSubMenu.to(element, 0.5, {force3D:true, y:-120, opacity:0, delay:0, ease:Power2.easeIn}, index * 0.03)
					});
					
					if (!$('#page-content').hasClass("light-content")) {	
						setTimeout( function(){
							$('#magic-cursor').removeClass('light-content');
							$('#header-container').removeClass('light-content');
						} , 500 );
					}
					setTimeout( function(){
						$(".touch-button.active").trigger("click");
						$('header').removeClass('over-sidebar')
						setTimeout( function(){
							$('header').removeClass('over-white-section');
						} , 350 );
					} , 500 );
				}							
			} , 20 );
		});
		
		
		// Page Navigation Events
		$(".next-ajax-link-page").on('mouseenter', function() {	
			var $this = $(this);			
			TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:'#fff', backgroundColor:'#fff'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
		});
							
		$(".next-ajax-link-page").on('mouseleave', function() {					
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();				
		});				
		
		
		$('.next-ajax-link-page').on('click', function() {					
			$("body").addClass("load-next-page");
			$("body").addClass("show-loader");
			$('header').removeClass('white-header');
			$("#app").remove();
			$(".big-title-caption").remove();	
				
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball p').remove();
			$('#ball i').remove();	
			
			if ($('#project-nav').hasClass("light-content")) {				
				setTimeout(function(){
					$('body').addClass('light-content');								
				} , 300 );
			}
			if ($("body").hasClass("smooth-scroll")) {
				var navmove = $("#content-scroll").height() - $("#page-nav").height() - $("footer").height() 			
			} else {
				var navmove = window.innerHeight - $("#hero").height() - $("footer").height() 		   
			}
			
			TweenMax.to($(".subtitle-info"), 0.3, {force3D:true, opacity:0, delay:0, y: -20, ease:Power2.easeOut});
			TweenMax.to($(".subtitle-name"), 0.3, {force3D:true, opacity:1, y: 0, delay:0.15, ease:Power2.easeOut});
			
			TweenMax.to($("#main-page-content, #hero"), 0.3, {opacity:0});		
			TweenMax.to($("#page-nav"), 0.7, {y: - navmove, delay:0, ease:Power2.easeInOut});
			TweenMax.to($("footer"), 0.3, {opacity:0, delay:0, ease:Power2.easeInOut});
		});
		
		
		// Project Navigation Events
		$("#project-nav .item-image").mouseenter(function(e) {	
			var $this = $(this);		
			TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:'#fff', backgroundColor:'#fff'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
		});
						
		$("#project-nav .item-image").mouseleave(function(e) {
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();
		});	
		
		$('.next-ajax-link-project').on('click', function() {					
			$("body").addClass("load-next-project").addClass("show-loader");
			$('header').removeClass('white-header');
			$("#app").remove();
			$(".big-title-caption").remove();	
					
			TweenMax.to('#ball', 0.3,{borderWidth:"4px",scale:0.5,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			if ($('#project-nav').hasClass("light-content")) {				
				setTimeout(function(){
					$('body').addClass('light-content');								
				} , 300 );
			}
			
			TweenMax.to($(".next-title"), 0.4, {force3D:true, opacity:0, delay:0, y: -20, rotation:3, ease:Power2.easeOut});						
			TweenMax.to($(".next-subtitle-name"), 0.4, {force3D:true, opacity:1, y: 0, rotation:0, delay:0.2, ease:Power2.easeOut});
			
			TweenMax.to($("#main-page-content"), 0.3, {opacity:0});			
			TweenMax.to($(".next-project-image"), 0.9, {scale:1.02, opacity: 1, ease:Power4.easeOut});
			TweenMax.to($(".next-project-image-bg"), 0.9, {scale:1, opacity: 1, ease:Power4.easeOut});
			TweenMax.to($(".next-project-image-fg"), 0.9, {scale:1, opacity: 1, ease:Power4.easeOut});
			TweenMax.to($("footer"), 0.3, {opacity:0, ease:Power2.easeInOut});
				
		});
		
		
		if( $('#project-nav').length > 0 ){
			$('#main-page-content').addClass('project-page');					
		}
		
		if( $('.portfolio').length > 0 ){
			$('#main-page-content').addClass('portfolio-page');			
		}
			
		
		
		
		var viewportWidth = $(window).width();
		if (viewportWidth < 1024) {				
			$('.hero-video-wrapper').remove();							 
		}
		
		
		
		
		
		
		
		
		
		
		
		
	}// End First Load
	
	

	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {	
		
		TweenMax.set($("#show-filters, #counter-wrap"), {opacity:0, delay:0});
		
		$('body').waitForImages({
			finished: function() {
				$('body').removeClass('loading')
				setTimeout( function(){	
					$('body').removeClass('hidden').removeClass('scale-up').removeClass('scale-none');
				} , 1500 );
			},
			waitForAll: true
		});	
		
		$('body').waitForImages({
			finished: function() {
				TweenMax.to($("#header-container, .header-middle"), 1, {force3D:true, opacity:1, ease:Power2.easeOut});				
			},
			waitForAll: true
		});
		
		TweenMax.to($("#main"), 0.3, {force3D:true, opacity:1, delay:0.1, ease:Power2.easeOut});
			
		
		if( $('#hero').hasClass("has-image")) {	
			if( $('body').hasClass("load-project-thumb-with-title")) {
				TweenMax.to($("#hero-fg-image, #hero-bg-image"), 0, {force3D:true, scale:1.02 , opacity:1, delay:0, ease:Power2.easeOut});				
				TweenMax.to($(".hero-title span"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:0.8, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});		
			} else if( $('body').hasClass("load-project-thumb")) {
				TweenMax.to($("#hero-fg-image, #hero-bg-image"), 0, {force3D:true, scale:1.02 , opacity:1, delay:0, ease:Power2.easeOut});				
				TweenMax.to($(".hero-title span"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});			
			}else {
				TweenMax.to($("#hero-fg-image, #hero-bg-image"), 0, {force3D:true, scale:1.02 , opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-title span"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.7, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});	
			}
			TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:0.95, ease:Power2.easeOut});
		} else {
			TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.1, ease:Power2.easeOut});
			var tlHerospan = new TimelineLite();
			tlHerospan.set($("#hero .hero-move-title span"), {y: 120, opacity:0});
			$("#hero .hero-move-title span").each(function(index, element) {
				tlHerospan.to(element, 0.7, {y:0, opacity:1, delay:0, ease:Power3.easeOut}, index * 0.1)
			});
			TweenMax.to($(".landing-caption"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.4, ease:Power2.easeOut});
			TweenMax.to($(".hero-subtitle"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.15, ease:Power2.easeOut});
			TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.5, ease:Power2.easeOut});
			TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content"), 0.2, {force3D:true, opacity:1, delay:0.15, ease:Power2.easeOut});
		}	
		
		// Fading In Showcase elements on Finised
		TweenMax.set($("#showcase-slider-holder"), {opacity:0, scale:1.1});
		TweenMax.set($("#showcase-carousel-holder, #showcase-vertical-carousel-holder"), {opacity:0, scale:1.1});
		TweenMax.set($(".swiper-prev, .swiper-next, .swiper-pagination-bullet, .arrows-wrap, .carousel-allprojects-wrapper"), {opacity:0});								
		TweenMax.to($("#showcase-slider-holder, #showcase-carousel-holder, #showcase-vertical-carousel-holder"), 0.4, {force3D:true, opacity:1, scale:1, delay:0.6, ease:Power2.easeOut});
		TweenMax.to($(".swiper-slide-active .move-caption .move-title span"), 1, {force3D:true, y: 0, opacity:1, delay:0.9, ease:Power2.easeOut});
		TweenMax.to($(".swiper-slide-active .move-caption .subtitle span"), 0.7, {force3D:true, y: 0, opacity:1, delay:1.3, ease:Power2.easeOut});
		TweenMax.to($(".move-caption .move-title span"), 0.1, {force3D:true, y: 0, opacity:1, delay:2, ease:Power2.easeOut});
		TweenMax.to($(".move-caption .subtitle span"), 0.1, {force3D:true, y: 0, opacity:1, delay:2, ease:Power2.easeOut});
		TweenMax.to($(".swiper-prev"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
		TweenMax.to($(".swiper-pagination-bullet, .arrows-wrap, .carousel-allprojects-wrapper"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
		TweenMax.to($(".swiper-next"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
		
		var slideWidth = $("#showcase-carousel-holder #showcase-slider .swiper-slide").width();
		TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").prev(), {x:slideWidth, scale:0.8, opacity:0});
		TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), {x:-slideWidth, scale:0.8, opacity:0});								
		TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").prev(), 2.5, {force3D:true, x:0, scale:1, delay:0, opacity:1, ease:Power3.easeInOut  });
		TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), 2.5, {force3D:true, x:0, scale:1, delay:0, opacity:1, ease:Power3.easeInOut  });
		
		
		
		TweenMax.to($("#footer-container"), 1, {force3D:true, opacity:1, delay:0.4, ease:Power2.easeOut});		
		
		if( $('.load-project-thumb').length > 0 ){
			setTimeout( function(){
				$('#hero-image-wrapper').find('video').each(function() {
					$(this).get(0).play();
				});
				$("#app.active").remove();
				$(".big-title-caption").remove();	
			} , 250 );
		} else if( $('.load-project-thumb-with-title').length > 0 ){
			setTimeout( function(){
				$('#hero-image-wrapper').find('video').each(function() {
					$(this).get(0).play();
				});
				$("#app.active").remove();
				$(".big-title-caption").remove();	
			} , 250 );
		} else {
			$('#hero-image-wrapper').find('video').each(function() {
				$(this).get(0).play();
			});
		}
		
		setTimeout( function(){	
			$('header').removeClass('white-header');
			$('body').removeClass("load-project-page").removeClass("load-project-thumb").removeClass("load-next-project").removeClass("load-next-page");
			setTimeout( function(){	
				$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");
			} , 300 );
			
		} , 500 );
		
	
	}// End Lazy Load		



/*--------------------------------------------------
Function Showcase Slider
---------------------------------------------------*/
	
	function Showcase() {
		
	
		if( $('#showcase-slider-holder').length > 0 ){
			
			$("footer").addClass("showcase-footer")
								
			var interleaveOffset = 0.5;
			
			var swiperOptions = {
				direction: "horizontal",
				loop: true,
				grabCursor: false,
				resistance : true,
				resistanceRatio:0.5,
				slidesPerView: 1,
				allowTouchMove:true,  
				speed:1000,
				autoplay: false,
				mousewheel: true,
				parallax:true,
				navigation: {
					nextEl: '.swiper-next',
					prevEl: '.swiper-prev',
				},
				pagination: {
				  el: '.swiper-pagination',
						clickable: true,
						renderBullet: function (index, className) {
					  return '<span class="' + className + '">'+'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
									'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)" stroke="#FFF"'+
									'stroke-opacity="1" stroke-width="2px"></circle>'+
							'<circle cx="10" cy="10" r="3" fill="#FFF"></circle>'+
									'</svg></div></div></span>';
					},
			
				},						
				on: {
					progress: function() {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							var slideProgress = swiper.slides[i].progress;
							var innerOffset = swiper.width * interleaveOffset;
							var innerTranslate = slideProgress * innerOffset;
							swiper.slides[i].querySelector(".img-mask").style.transform = "translate3d(" + innerTranslate + "px,0, 0)";
						}
					  
					},
					touchStart: function() {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							swiper.slides[i].style.transition = "";
						}
					},
					setTransition: function(speed) {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							swiper.slides[i].style.transition = speed + "ms";
							swiper.slides[i].querySelector(".img-mask").style.transition = speed + "ms";
						}   
				 	},
					init: function () {						
						$('.swiper-slide-active').find('video').each(function() {
							$(this).get(0).play();
						});
						
					},
					slideChangeTransitionStart: function () {
						
						$('.swiper-slide-active').find('video').each(function() {
							$(this).get(0).play();
						}); 				
						
					},				
					slideChangeTransitionEnd: function () {	
						
						$('.swiper-slide-prev').find('video').each(function() {
							$(this).get(0).pause();
						});
						
						$('.swiper-slide-next').find('video').each(function() {
							$(this).get(0).pause();
						});
						
					},
  				},
			};
							
			var showcaseSwiper = new Swiper("#showcase-slider", swiperOptions);			
			
			
			
			if ($(window).width() >= 1024) {
			
				$('#showcase-slider-holder .stroked .move-title').on('mousedown', function(event) {
					return false;
				});				
				
				$('#showcase-slider-holder').on('mousedown touchstart', function() {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					$("body" ).addClass("scale-drag");
				});
					
				$('#showcase-slider-holder').on('mouseup touchend', function() {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag").removeClass("drag-cursor");
				});
				
				$('body').on('mouseup touchend', function() {				
					$('body').removeClass('scale-drag');					
				});
				
				$("#showcase-slider-holder .stroked .move-title").mouseenter(function(e) {	
					var $this = $(this);		
					TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:'#fff', backgroundColor:'#fff'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				});
								
				$("#showcase-slider-holder .stroked .move-title").mouseleave(function(e) {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();
				});	
			
			}
			
			
		}	
		
			
	}//End Showcase Slider
	
	
	
/*--------------------------------------------------
Function Showcase Carousel
---------------------------------------------------*/
	
	function ShowcaseCarousel() {
		
	
		if( $('#showcase-carousel-holder').length > 0 ){	
								
			$("footer").addClass("showcase-footer")
			
			var showcaseSwiper = new Swiper('#showcase-slider', {
				direction: "horizontal",
				loop: true,
				grabCursor: false,
				resistance : true,
				resistanceRatio:0.5,
				slidesPerView: 'auto',
				allowTouchMove:true,  
				speed:1000,
				autoplay: false,
				mousewheel: true,
				centeredSlides: true,
				spaceBetween: 0,
				navigation: {
					nextEl: '.swiper-next',
					prevEl: '.swiper-prev',
				},
				pagination: {
				  el: '.swiper-pagination',
						clickable: true,
						renderBullet: function (index, className) {
					  return '<span class="' + className + '">'+'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
									'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)" stroke="#FFF"'+
									'stroke-opacity="1" stroke-width="2px"></circle>'+
							'<circle cx="10" cy="10" r="3" fill="#FFF"></circle>'+
									'</svg></div></div></span>';
					},
			
				},						
				on: {
					
					init: function () {						
						$('.swiper-slide-active').find('video').each(function() {
							$(this).get(0).play();
						});
					},				
					slideNextTransitionStart: function () {	
						
						var tl = new TimelineLite();
						
						$('.swiper-pagination-bullet-active').prev().find('.counter').each(function(index, element) {
							tl.to(element, 0.3, {scale:1, y:-20, opacity:0, ease:Power2.easeIn}, index * 0.01)
						});
						
						$('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
							tl.to(element, 0.4, {scale:1, y:0, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut}, index * 0.01)
						});
						
						$('.swiper-pagination-bullet-active').next().find('.counter').each(function(index, element) {
							tl.to(element, 0.3, {scale:1, y:20, opacity:0, ease:Power2.easeIn}, index * 0.01)
						});						
						
					},
					slidePrevTransitionStart: function () {	
						
						var tl = new TimelineLite();
						
						$('.swiper-pagination-bullet-active').prev().find('.counter').each(function(index, element) {
							tl.to(element, 0.3, {scale:1, y:-20, opacity:0, delay:0.1,  ease:Power2.easeIn}, index * 0.01)
						});
						
						$('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
							tl.to(element, 0.4, {scale:1, y:0, opacity:1, scale:1, delay:0.45, ease:Power2.easeOut}, index * 0.01)
						});
						
						$('.swiper-pagination-bullet-active').next().find('.counter').each(function(index, element) {
							tl.to(element, 0.3, {scale:1, y:20, opacity:0, delay:0.1,  ease:Power2.easeIn}, index * 0.01)
						});					
						
					},
					slideChangeTransitionStart: function () {
						
						$('.swiper-button-white').addClass('disable-click');
						
						$('.swiper-slide-active').find('video').each(function() {
							$(this).get(0).play();
						}); 					
						
					},				
					slideChangeTransitionEnd: function () {	
						
						$('.swiper-button-white').removeClass('disable-click');
						
						$('.swiper-slide-prev').find('video').each(function() {
							$(this).get(0).pause();
						});
						
						$('.swiper-slide-next').find('video').each(function() {
							$(this).get(0).pause();
						});
						
					}
  				},
			});
			
			
			
			
			
			if ($(window).width() >= 1024) {
			
				$('#showcase-carousel-holder .stroked .move-title').on('mousedown', function(event) {
					return false;
				});	
				
							
				
				$('#showcase-carousel-holder').on('mousedown touchstart', function() {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					$("body" ).addClass("scale-drag");
				});
					
				$('#showcase-carousel-holder').on('mouseup touchend', function() {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag").removeClass("drag-cursor");
				});
				
				$('body').on('mouseup touchend', function() {				
					$('body').removeClass('scale-drag');					
				});
				
				$("#showcase-carousel-holder .stroked .move-title").mouseenter(function(e) {	
					var $this = $(this);		
					TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:'#fff', backgroundColor:'#fff'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				});
								
				$("#showcase-carousel-holder .stroked .move-title").mouseleave(function(e) {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();
				});	
				
			
			}
			
			
		}	
		
			
	}//End Showcase Carousel
	
	
	
	

	


/*--------------------------------------------------
Function Portfolio
---------------------------------------------------*/	
		
	function Portfolio() {	
	
			
		if( $('.portfolio-wrap').length > 0 ){			
			
			
			if ($("body").hasClass("smooth-scroll")) {
				var elem = document.querySelector("#content-scroll");
				var scrollbar = Scrollbar.init(elem,
				{
					renderByPixels: true,
					damping:0.05
				});
			}
			
			var $container = $('.portfolio');
		
			$container.isotope({
			  layoutMode: 'packery',
			  itemSelector: '.item',
			  gutter:0,
			  transitionDuration: "0.5s"
			});
			
			$('#filters a').on('click', function() {
				$('#filters a').removeClass('active');
				$(this).addClass('active');
				$('.item').addClass('item-margins');
				var selector = $(this).attr('data-filter');
				$container.isotope({ filter: selector }, function( $changedItems, instance ) {
				  instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
				  instance.$filteredAtoms.addClass('is-filtered');
				});		
				return false;
			});
			
			$("#all").trigger('click');
				
			$('.item').each(function() {
				var image = $(this).find('.item-image').data('src');	
				$(this).find('.item-image').css({'background-image': 'url(' + image + ')'});
			});
			
			
			$(".item-image").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1, borderColor:'#fff'});
				TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
				$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
				$(this).parent().find('video').each(function() {
					$(this).get(0).play();
				});
			});
							
			$(".item-image").mouseleave(function(e) {
				TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999'});
				TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball i').remove();
				$(this).parent().find('video').each(function() {
					$(this).get(0).pause();
				});
			});			
			
			
			//Show Filters On overlay
			$('#show-filters, #close-filters').on('click', function() {			
				$('#filters-overlay').toggleClass('active');
				var navtitleheight = $(".hero-title").height()
				var navsubtitleheight = $(".hero-subtitle").height()
				
				setTimeout( function(){			
					if ($('#filters-overlay').hasClass("active")) {
						
						TweenMax.to($(".item-parallax"), 0.6, {force3D:true, scale:0.9, opacity:0.3, delay:1.1, ease:Power2.easeInOut});					
						TweenMax.to($(".active .item-caption"), 0.3, {opacity:0, ease:Power2.easeOut});
						TweenMax.to($("#show-filters, #counter-wrap"), 0.3, {opacity:0, delay:0, ease:Power2.easeOut});
						TweenMax.to($("#show-filters, #counter-wrap"), 0, {visibility:'hidden', delay:0.35, ease:Power2.easeOut}); 
						
						//Fade In Navigation Lists
						TweenMax.set($(".filters-info"), {y:30, opacity:0});
						TweenMax.to($(".filters-info"), 0.4, {force3D:true, y:0, opacity:1, delay:0.7, ease:Power2.easeOut});
						var tlMenu = new TimelineLite();
						tlMenu.set($(".filters-timeline"), {y:60, opacity:0});
						$(".filters-timeline").each(function(index, element) {
							tlMenu.to(element, 0.5, {y:0, opacity:1, delay:1.2, ease:Power3.easeOut}, index * 0.1)
						});
						
						var heroheight = $("#hero").height();			
						if ($("body").hasClass("smooth-scroll")) {
							TweenLite.to(scrollbar, 1.5, {scrollTop:heroheight, ease:Power4.easeInOut});
						} else {
							$("html,body").animate({scrollTop: heroheight}, 800);
						}
							
					} else {					
						
						
						TweenMax.to($(".item-parallax"), 0.6, {force3D:true, scale: 1, opacity:1, delay:0.3, ease:Power2.easeInOut});					
						TweenMax.to($(".active .item-caption"), 0.5, {opacity:1, delay:0.5, ease:Power2.easeOut});
						TweenMax.set($("#show-filters, #counter-wrap"), {visibility:'visible', opacity:0});
						TweenMax.to($("#show-filters, #counter-wrap"), 0.3, {opacity:1, delay:0.7, ease:Power2.easeOut});
						
						//Fade Out Navigation Lists
						TweenMax.to($(".filters-info"), 0.2, {force3D:true, y:-30, opacity:0, delay:0, ease:Power1.easeIn});					
						var tlMenu = new TimelineLite();
						$(".filters-timeline, .jssocials-share").each(function(index, element) {
							tlMenu.to(element, 0.25, {opacity:0, y:-60, delay:0.1, ease:Power1.easeIn }, index * 0.1)
						});	
						TweenMax.to('#ball', 0.1,{borderWidth: '4px', scale:0.5,});
						$("#ball").removeClass("close-icon");
						$('#ball i').remove();
						
					}							
				} , 20 );
			});
			
			
			$("#close-filters").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
				TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
				$( "#ball" ).addClass("close-icon").append( '<i class="fa fa-times"></i>' );
			});
				
			$("#close-filters").mouseleave(function(e) {
				TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
				TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("close-icon");
				$('#ball i').remove();
			});
			
			
			
			
			setTimeout( function(){
				var controller = new ScrollMagic.Controller();
				$('.portfolio').each(function(){
					var $this = $(this);
					var $elheight = window.innerHeight*0.7;
					var $thisHeight = $(this).outerHeight() - $elheight;
					
					var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
						.addTo(controller)
						
					
					scene.triggerHook(0.3)
					
					scene.on('enter', function(){				
						TweenMax.to($("#show-filters"), 0.3, {opacity:1, delay:0, ease:Power2.easeOut});
						$("#show-filters").addClass('enabled')
					});
					
					scene.on('leave', function(){				
						TweenMax.to($("#show-filters"), 0.15, {opacity:0, delay:0, ease:Power2.easeOut});
						$("#show-filters").removeClass('enabled')
					});
					
					if ($("body").hasClass("smooth-scroll")) {
						scrollbar.addListener(() => {
							scene.refresh()
						});
					}
				})
			} , 2000 );
			
			TweenMax.to($("#show-filters"), 0, {opacity:0, delay:0.05, ease:Power2.easeOut});
			
		}
	
	}//End Portfolio

	

/*--------------------------------------------------
Function Shortcodes
---------------------------------------------------*/
	
	function Shortcodes() {

		// Accordion	  
		
		$('dd.accordion-content').slideUp(1).addClass('hide');		
		$('dl.accordion').on('click', 'dt', function() {
			$(this).addClass('accordion-active').next().slideDown(200).siblings('dd.accordion-content').slideUp(200).prev().removeClass('accordion-active');						
		});	
		$('dl.accordion').on('click', 'dt.accordion-active', function() {
			$(this).removeClass('accordion-active').siblings('dd.accordion-content').slideUp(200);
		});
		
		$(".flexnav").flexNav({ 'animationSpeed' : 250 });
		
		// Project Share	
		
		$("#share").jsSocials({
            showLabel: false,
    		showCount: false,
    		shares: ["facebook", "twitter", "pinterest"]
        });
		
		$('.jssocials-share').wrap( "<div class='parallax-wrap'><div class='parallax-element'></div></div>" );
	
	}//End Shortcodes
	

	
	
/*--------------------------------------------------
Function Sliders
---------------------------------------------------*/
	
	function Sliders() {
		
		setTimeout( function(){
			
			if( $('.content-slider').length > 0 ){
			
				var interleaveOffset = 0.4;
				
				var ContentSliderOptions = {				
					direction: 'horizontal',
					loop: true,
					slidesPerView: 1,
					paginationClickable: true,
					spaceBetween: 0,
					mousewheelControl: false,
					simulateTouch: false,
					speed: 1000,
					navigation: {
						nextEl: '.slider-button-next',
						prevEl: '.slider-button-prev',
					},
					on: {
						progress: function() {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								var slideProgress = swiper.slides[i].progress;
								var innerOffset = swiper.height * interleaveOffset;
								var innerTranslate = slideProgress * innerOffset;
								swiper.slides[i].querySelector("img").style.transform = "translate3d(" + innerTranslate + "px,0, 0)";
							}
						  
						},
						touchStart: function() {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = "";
							}
						},
						setTransition: function(speed) {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = speed + "ms";
								swiper.slides[i].querySelector("img").style.transition = speed + "ms";
							}   
						}
					}
			
				}
				
				var swiper = new Swiper(".content-slider", ContentSliderOptions);
				
				$(".slider-button-prev").mouseenter(function(e) {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-left"></i>' );
				});
					
				$(".slider-button-prev").mouseleave(function(e) {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball i').remove();
				});
				
				$(".slider-button-next").mouseenter(function(e) {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-right"></i>' );
				});
					
				$(".slider-button-next").mouseleave(function(e) {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball i').remove();
				});
				
			}
			
			
			if( $('.content-carousel').length > 0 ){
			
				var ContentCarouselOptions = {			
					direction: 'horizontal',
					simulateTouch: true,
					slidesPerView: 'auto',
					spaceBetween: 0,
					mousewheelControl: false,
					speed: 700,			
				}
				
				var swiper = new Swiper(".content-carousel", ContentCarouselOptions);
				
				$('.content-carousel').on('mousedown touchstart', function(event) {
					TweenMax.to('.swiper-slide img', 0.7,{scale: 0.9});
					$("body").addClass("drag-cursor");
				});
				
				$('body').on('mouseup touchend', function(event) {
					TweenMax.to('.swiper-slide img', 0.7,{scale:1});
					$("body").removeClass("drag-cursor");
				});
				
				$('.content-carousel').on('mouseenter mousemove', function() {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					$("body" ).addClass("scale-drag");
				});
					
				$('.content-carousel').on('mouseleave', function() {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag").removeClass("drag-cursor");
				});
				
				$("body").mouseleave(function(e) {
					TweenMax.to('.swiper-slide img', 0.7,{scale:1});
					$("body").removeClass("scale-drag").removeClass("drag-cursor");
				});
			
			}
			
			
			if( $('.content-looped-carousel').length > 0 ){
			
				var ContentLoopedCarouselOptions = {			
					direction: 'horizontal',
					simulateTouch: true,
					slidesPerView: 'auto',
					spaceBetween: 150,
					centeredSlides: true,
					loop:true,
					mousewheelControl: false,
					speed: 700,			
				}
				
				var swiper = new Swiper(".content-looped-carousel", ContentLoopedCarouselOptions);
				
				$('.content-looped-carousel').on('mousedown touchstart', function(event) {
					TweenMax.to('.swiper-slide img', 0.7,{scale: 0.9});
					$("body").addClass("drag-cursor");
				});
				
				$('body').on('mouseup touchend', function(event) {
					TweenMax.to('.swiper-slide img', 0.7,{scale:1});
					$("body").removeClass("drag-cursor");
				});
				
				$('.content-looped-carousel').on('mouseenter mousemove', function() {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					$("body" ).addClass("scale-drag");
				});
					
				$('.content-looped-carousel').on('mouseleave', function() {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag").removeClass("drag-cursor");
				});
				
				$("body").mouseleave(function(e) {
					TweenMax.to('.swiper-slide img', 0.7,{scale:1});
					$("body").removeClass("scale-drag").removeClass("drag-cursor");
				});
			
			}
		
		} , 400 );
		
	}//End Sliders	
	
	
/*--------------------------------------------------
Function Justified Grid
---------------------------------------------------*/	
	
	function JustifiedGrid() {
		
		if( $('#justified-grid').length > 0 ){
		
			$('#justified-grid').justifiedGallery({
				rowHeight : 300,
				lastRow : 'nojustify',
				margins : 10
			});
		
		}
		
	}//End Justified Grid	
	
	
/*--------------------------------------------------
Function Lightbox
---------------------------------------------------*/
	
	function Lightbox() {
		
		$('.image-link').magnificPopup({
		  	type: 'image',
			mainClass: 'mfp-with-zoom',	
			gallery: {
			  enabled:true
			},		
			zoom: {
				enabled: true, 			
				duration: 300, 
				easing: 'ease-in-out', 
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}			
		});
		
		$(".image-link").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
		});
			
		$(".image-link").mouseleave(function(e) {
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
			
	}//End Lightbox	
	
	
	
/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/	
		
	function ContactForm() {	
	
		if( $('#contact-formular').length > 0 ){

			$('#contactform').submit(function(){
				var action = $(this).attr('action');
				$("#message").slideUp(750,function() {
					$('#message').hide();
					$('#submit').attr('disabled','disabled');
					$.ajax({
						url: action,
						method: 'POST',
						data: {
							name: $('#name').val(),
							email: $('#email').val(),
							message: $('#comments').val()
						},
						dataType: 'json',
						headers: { 'Accept': 'application/json' },
						success: function(){
							document.getElementById('message').innerHTML = '<p class="success">Your message was sent successfully.</p>';
							$('#message').slideDown('slow');
							$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
							$('#submit').removeAttr('disabled');
							$('#contactform').slideUp('slow');
						},
						error: function(){
							document.getElementById('message').innerHTML = '<p class="error">There was a problem sending your message. Please try again.</p>';
							$('#message').slideDown('slow');
							$('#submit').removeAttr('disabled');
						}
					});
				});
				return false;
			});
		}
		
		
		
		

	}//End ContactForm
	
	
	
/*--------------------------------------------------
Function Page PlayVideo
---------------------------------------------------*/	


	function PlayVideo() {
	
		if( $('.video-wrapper').length > 0 ){
			
			
			$(".video-wrapper").mouseenter(function(e) {
				if ($(this).hasClass("play")) {
					$( "#ball" ).addClass("pause-movie")		
				}
				TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
				$( "#ball" ).addClass("over-movie").append( '<i class="fa fa-play"></i><i class="fa fa-pause"></i>' );
			});
			
			$(".video-wrapper").mouseleave(function(e) {
				TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
				$("#ball").removeClass("over-movie").removeClass("pause-movie");
				$('#ball i').remove();
			});
			
			$(".video-wrapper .control").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.2,{borderWidth: '20px', scale: 0});
			});
			
			$(".video-wrapper .control").mouseleave(function(e) {
				TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
			});
			
			var videocenter = ($(window).height() - $('.video-cover').height()) / 2
					
			////////////////////////////////////////////////////// REFACTOR //////////////////////////////////////////////////////
			// plays or pause the video function of its current state
			var playpause = function( videoObj ) {
				
				if( videoObj[0] != null ){
					if(videoObj[0].paused || videoObj[0].ended) {
						
						videoObj.parent().addClass('play');
						videoObj[0].play();
					}
					else {
						
						videoObj.parent().removeClass('play');
						videoObj[0].pause();
					}
				}
			};
			
			//Time format converter - 00:00
			var timeFormat = function(seconds){
				var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
				var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
				return m+":"+s;
			};
			
			// Events
			// click to video cover - will start the video
			$('.video-wrapper').on('click', function() {
				
				$('html,body').animate({scrollTop: $(this).offset().top - videocenter},390);		
				// hide the video cover in order to start playing
				$(this).find('.video-cover').addClass('hidden');
				
				$( "#ball" ).toggleClass("pause-movie");
				
				// pause first the other videos
				var current_wrapper = $(this);
				$('#main-page-content').find('.video-wrapper').each(function() {
					
					if( !current_wrapper.is( $(this) ) ){
						
						$(this).removeClass('play');
						$(this).find('video').each(function() {
							
							if( !$(this).get(0).paused && !$(this).get(0).ended ) {
								
								$(this).get(0).pause();
							}
						});
					}
					
				});
				
				// trigger the click for the inner video
				$(this).find('video').each(function() {

					playpause( $(this) );
				});

			});
			
			//fullscreen button clicked
			$('.btnFS').on('click', function( e ) {
					
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
					
				if($.isFunction(video_object[0].webkitEnterFullscreen)) {
					video_object[0].webkitEnterFullscreen();
				}	
				else if ($.isFunction(video_object[0].mozRequestFullScreen)) {
					video_object[0].mozRequestFullScreen();
				}
				else {
					alert('Your browsers doesn\'t support fullscreen');
				}
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
				
			});
				
			//sound button clicked
			$('.sound').on('click', function( e ) {
					
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
					
				video_object[0].muted = !video_object[0].muted;
				$(this).toggleClass('muted');
				if(video_object[0].muted) {
					parent_wrapper.find('.volumeBar').css('width',0);
				}
				else{
					parent_wrapper.find('.volumeBar').css('width', video_object[0].volume*100+'%');
				}
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
			});
			
			//progress bar (video timebar) clicked
			$('.progress').on('click', function( e ) {
				
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
									
				// calculate click position
				// and update video current time
				// as well as progress bar
				var maxduration 	= video_object[0].duration;
				var position 			= e.pageX - $(this).offset().left;
				var percentage 	= 100 * position / $(this).width();
				if(percentage > 100) {
					
					percentage = 100;
				}
				if(percentage < 0) {
					
					percentage = 0;
				}
				$('.timeBar').css('width', percentage+'%');	
				video_object[0].currentTime = maxduration * percentage / 100;
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
			});
			
			$('#main-page-content').find('video').each(function() {
			
				var video = $(this);
				var video_wrapper = $(this).parent();
				
				//remove default control when JS loaded
				video[0].removeAttribute("controls");
				video_wrapper.find('.control').fadeIn(500);
				video_wrapper.find('.caption').fadeIn(500);
			 
				//before everything get started and we have the info about the video such as duration
				video.on('loadedmetadata', function() {
					
					var video_object = $(this);
					var parent_wrapper = $(this).parent();
					//set video properties
					parent_wrapper.find('.current').text(timeFormat(0));
					parent_wrapper.find('.duration').text(timeFormat(video[0].duration));
					
				});
				
				//display current video buffered progress
				video.on('progress', function() {
					
					var video_object 		= $(this);
					var parent_wrapper 	= $(this).parent();
					var maxduration 		= video_object [0].duration;
					
					if (maxduration > 0) {
					  for (var i = 0; i < video_object [0].buffered.length; i++) {
							if (video_object [0].buffered.start(video_object [0].buffered.length - 1 - i) <video_object [0].currentTime) {
								var perc = (video_object [0].buffered.end(video_object [0].buffered.length - 1 - i) / maxduration) * 100 + "%";
								parent_wrapper.find('.bufferBar').css('width',perc+'%');
								break;
							}
						}
					}
					
				});
				
				//display current video play time
				video.on('timeupdate', function() {
					
					var parent_wrapper 	= $(this).parent();
					var currentPos 			= $(this).get(0).currentTime;
					var maxduration 		= $(this).get(0).duration;
					var perc 					= 100 * currentPos / maxduration;
					parent_wrapper.find('.timeBar').css('width',perc+'%');	
					parent_wrapper.find('.current').text(timeFormat(currentPos));	
				});
				
				//video screen and play button clicked
				video.on('click', function() { 
					
					playpause( $(this) ); 
				});
				
				//video canplay event
				video.on('canplay', function() {
					
					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeOut(100); //?
				});
				
				//video canplaythrough event
				//solve Chrome cache issue
				var completeloaded = false;
				video.on('canplaythrough', function() {
					
					completeloaded = true;
				});
				
				//video ended event
				video.on('ended', function() {		
					
					$(this).get(0).pause();
					$(this).parent().removeClass("play");
					$( "#ball" ).toggleClass("pause-movie");
				});
			
				//video seeking event
				video.on('seeking', function() {
					
					//if video fully loaded, ignore loading screen
					if(!completeloaded) { 
						var parent_wrapper = $(this).parent();
						parent_wrapper.find('.loading').fadeIn(200); //?
					}	
				});
				
				//video seeked event
				video.on('seeked', function() { });
				
				//video waiting for more data event
				video.on('waiting', function() {
					
					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeIn(200); //?
				});
				
			});
			
		}
		
	}// End PlayVideo					
	
	
	/*--------------------------------------------------
Function Contact Map
---------------------------------------------------*/	
		
	function ContactMap() {	
	
		if( jQuery('#map_canvas').length > 0 ){					
			var latlng = new google.maps.LatLng(43.270441,6.640888);
			var settings = {
				zoom: 14,
				center: new google.maps.LatLng(43.270441,6.640888),
				mapTypeControl: false,
				scrollwheel: false,
				draggable: true,
				panControl:false,
				scaleControl: false,
				zoomControl: false,
				streetViewControl:false,
				navigationControl: false};			
				var newstyle = [
				{
					"featureType": "all",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"saturation": 36
						},
						{
							"color": "#000000"
						},
						{
							"lightness": 40
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.text.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#000000"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 17
						},
						{
							"weight": 1.2
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 29
						},
						{
							"weight": 0.2
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 18
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 19
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 17
						}
					]
				}
			];
			var mapOptions = {
				styles: newstyle,
				mapTypeControlOptions: {
					 mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'holver']
				}
			};
			var map = new google.maps.Map(document.getElementById("map_canvas"), settings);	
			var mapType = new google.maps.StyledMapType(newstyle, { name:"Grayscale" });    
				map.mapTypes.set('holver', mapType);
				map.setMapTypeId('holver');
						
			
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
			});	
			var contentString = '<div id="content-map-marker" style="text-align:center; padding-top:10px; padding-left:10px">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h4 id="firstHeading" class="firstHeading" style="color:#000!important; font-weight:600; margin-bottom:0px;">Hello Friend!</h4>'+
				'<div id="bodyContent">'+
				'<p color:#999; font-size:14px; margin-bottom:10px">Here we are. Come to drink a coffee!</p>'+
				'</div>'+
				'</div>';
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});	
			var companyImage = new google.maps.MarkerImage('images/marker.png',
				new google.maps.Size(58,63),<!-- Width and height of the marker -->
				new google.maps.Point(0,0),
				new google.maps.Point(35,20)<!-- Position of the marker -->
			);
			var companyPos = new google.maps.LatLng(43.270441,6.640888);	
			var companyMarker = new google.maps.Marker({
				position: companyPos,
				map: map,
				icon: companyImage,               
				title:"Our Office",
				zIndex: 3});	
			google.maps.event.addListener(companyMarker, 'click', function() {
				infowindow.open(map,companyMarker);
			});	
		}
		
		return false
	
	}//End ContactMap
	
	
/*--------------------------------------------------
Function Load Via Ajax
---------------------------------------------------*/	
		
	function LoadViaAjax() {		
		
		FirstLoad();
		ScrollEffects();		
		Showcase();
		ShowcaseCarousel();
		LazyLoad();				
		Portfolio();
		FitThumbScreen();	
		Shortcodes();
		Sliders();
		JustifiedGrid();
		Lightbox();
		ContactForm();
		PlayVideo();
		ContactMap();
		InitClouder();

	}//End Load Via Ajax
	
	
/*--------------------------------------------------
Function Clouder
---------------------------------------------------*/				
	
	function Clouder(params) {

		var self = this;
		var w, h, lastX, lastY;
		var rho = 0, theta = 0;
		var timer = null;
		var closest = null;
		var containerTop;
		var containerLeft;
		var timing = [1];
		var timingMax = 8;
	
		var container;
		var callback;
		var fontSize, fontShift;
		var colorMax, colorMin, colorBgr;
		var xScale = 0.9, yScale = 0.9;
		var interval = 50;
		var stepAngle = 0.08722;
		var idleMotion = 0.2;
		var nonSense = 0.025;
		var opaque = 0.4;
		
		
		var objs = [];
		
		
		function init() {
		
			if (params.tags) {
				setupElems(params.tags);
			} else {
				setupSpans();
			}
			
			process(function(o) {
				o.x = 1;
				o.y = 0;
				o.z = 0;
				spin(o, (Math.random() * 2 - 1) * Math.PI);
				step(o, (Math.random() * 2 - 1) * Math.PI);
				spin(o, (Math.random() * 2 - 1) * Math.PI);
			});
			
			w = container.clientWidth;
			h = container.clientHeight;
			
			if (colorBgr) {
				container.style.backgroundColor = colorBgr;
			} // if
			
			draw();
			
			timer = setInterval(onTimer, interval);
			containerTop = container.offsetTop;
			containerLeft = container.offsetLeft;
			container.onmousemove = onMouseMove;
			container.onmouseleave = onMouseLeave;
			container.onclick = onClick;
		} // init
		
		
		function onMouseMove(e) {
			if(!e) {
				e = window.event;
			} // if
			
			setPos(e.clientX, e.clientY);
			
			setClosest(findClosest(e.clientX - containerLeft, e.clientY - containerTop));
		} // onMouseMove
		
		
		function onMouseLeave(e) {
			if (!e) {
				e = window.event;
			} // if
			
			rho = idleMotion;
			setClosest(null);
		} // onMouseLeave
		
		
		function setupElems(elems) {
			
			if (elems) {
				for (var e in elems) {
					var c = {};
					c.text = elems[e].text;
					c.id = elems[e].id;
					c.weight = elems[e].weight;
					objs.push(c);
				} // for
			}
			
		} // setupElems
		
		
		
		function setupSpans() {
			for (var i = 0; i < container.children.length; i++) {
				var span = container.children[i];
				span.style.position = "absolute";
				span.style.cursor = "pointer";
				var c = {};
				c.span = span;
				c.width = 0;
				c.height = 0;
				objs.push(c);
			}
		} // setupSpans
		
		
		function adjustElems() {
			
			for (var i in objs) {
				var dx = 0, dy = 0, dz = 0;
				var o = objs[i];
				for (var j in objs) {
					if (i == j) {
						continue;
					} // if
					var diffX = o.x - objs[j].x;
					var diffY = o.y - objs[j].y;
					var diffZ = o.z - objs[j].z;
					var r = Math.sqrt(diffX * diffX + diffY * diffY + diffZ * diffZ);
					dx += 0.05 / (r * r) * diffX / r;
					dy += 0.05 / (r * r) * diffY / r;
					dz += 0.05 / (r * r) * diffZ / r;
				} // for
				
				o.x += dx;
				o.y += dy;
				o.z += dz;
				var dist = Math.sqrt(o.x * o.x + o.y * o.y + o.z * o.z);
				o.x /= dist;
				o.y /= dist;
				o.z /= dist;
			} // for
			
		} // adjustElems
		
		
		function sign(a) {
			return a > 0 ? 1 : (a < 0 ? -1 : 0);
		} // sign
		
		
		function setPos(x, y) {
			x = (lastX = x - container.offsetLeft) * 2 / w - 1;
			x = (Math.abs(x) < nonSense ? 0 : (x - nonSense * sign(x)) / (1 - nonSense)) / xScale;
			y = (lastY = y - container.offsetTop) * 2 / h - 1;
			y = (Math.abs(y) < nonSense ? 0 : (y - nonSense * sign(y)) / (1 - nonSense)) / yScale;
			theta = Math.atan2(y, x);
			rho = Math.sqrt(x * x + y * y);
		} // setPos
		
		function draw() {
			var filters = (typeof(document.body.filters) == "object");
	
			process(function(o) {
				
				if (!o.span) {
					o.span = document.createElement("span");
					o.width = 0;
					o.height = 0;
					o.span.innerHTML = o.text;
					o.span.style.fontWeight = "bold";
					o.span.style.position = "absolute";
					o.span.style.cursor = "pointer";
					var c = 1;
					for (var i in colorMax) {
						c = c * 256 + Math.floor((colorMax[i] - colorMin[i]) * o.weight + colorMin[i]);
					} // for
					o.span.style.color = "#" + c.toString(16).substr(1);
					container.appendChild(o.span);
					o.span.descriptor = o;
				} // if
				
				var size = fontSize + o.z * fontShift;
				o.factor = size / fontSize;
				if (o.width == 0) {
					o.width = asPixels(o.span.clientWidth / o.factor);
					o.height = asPixels(o.span.clientHeight / o.factor);
				} // if
				o.span.style.fontSize = asPixels(Math.round(size));
				o.screenX = w * (o.x * xScale + 1) / 2;
				o.span.style.left = asPixels(o.screenX - parseInt(o.width) * o.factor / 2);
				o.screenY = h * (o.y * yScale + 1) / 2;
				o.span.style.top = asPixels(o.screenY - parseInt(o.height) * o.factor / 2);
				o.span.style.zIndex = o.z >= 0 ? 10 : 5;
				var opa = (Math.sin(o.z * Math.PI / 2) / 2 + 0.5) * (1 - opaque) + opaque;
				if (!filters) {
					o.span.style.opacity = opa;
				} else {
					var f = o.span.filters["DXImageTransform.Microsoft.Alpha"];
					if (f) {
						f.opacity = opa * 100;
					} else {
						o.span.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=" + (opa * 100) + ")";
					} // else
				} // else
			});
			
		} // draw
		
		
		function findClosest(ex, ey) {
	
			var bestDist = w + h;
			var best = null;
			for (var i in objs) {
				var o = objs[i];
				var dx = ex - o.screenX;
				var dy = ey - o.screenY;
				var dist = Math.sqrt(dx * dx + dy * dy) / o.factor;
				if (dist < bestDist) {
					bestDist = dist;
					best = o;
				} // if
			} // for
			
			return best;
		} // findClosest
		
		
		function setClosest(obj) {
			
			if (closest == obj) {
				return;
			} // if
			
			if (closest != null) {
				closest.span.style.border = "";
			} // if
			closest = obj;
			
			if (closest != null) {
				closest.span.style.border = "1px solid rgba(255,255,255,0.3)";
			} // if
			
		} // setClosest
		
		
		function onTimer() {
			var t0 = new Date().getTime();
			
			var move = function(o) {
				spin(o, -theta);
				step(o, rho * stepAngle);
				spin(o, theta);
			}; // move
			
			process(move);
			adjustElems();
			draw();
			
			setClosest(findClosest(lastX, lastY));
			
			timing.push(new Date().getTime() - t0);
			if (timing.length > timingMax) {
				timing.splice(0, timing.length - timingMax);
			} // if
		} // onTimer
		
		
		function spin(o, angle) {
			var x = o.x;
			var y = o.y;
			o.x = x * Math.cos(angle) - y * Math.sin(angle);
			o.y = x * Math.sin(angle) + y * Math.cos(angle);
		} // spin
			
			
		function step(o, angle) {
			var x = o.x;
			var z = o.z;
			o.x = x * Math.cos(angle) - z * Math.sin(angle);
			o.z = x * Math.sin(angle) + z * Math.cos(angle);
		} // step
		
		
		function onClick(event) {
			
			if (closest == null || closest.id == null) {
				return;
			} // if
			
			callback(closest.id);
		} // spanClicked
		
		
		function process(func) {
			for (var i in objs) {
				func(objs[i]);
			} // for
		} // process
			
		
		function parseColor(text) {
			var hex = parseInt(text.substr(1), 16);
			return [Math.floor(hex / 65536), Math.floor((hex / 256) % 256), Math.floor(hex % 256)];
		} // parseColor
		
		
		function parametrize(p) {
			
			if (!p.container) {
				alert("Clouder could not be created without container!");
				throw "Clouder without container";
			} // if
			
			container = p.container;
			
			if (!p.tags && container.children.length < 0) {
				alert("Clouder could not be crated without tags or spans in container!");
				throw "Clouder without tags";
			} // if
			
			callback = p.callback ? p.callback : function(id) { alert(id); };
			fontSize = p.fontSize ? p.fontSize : 14;
			fontShift = typeof(p.fontShift) != "undefined" ? p.fontShift : fontSize / 2;
			colorMax = p.colorMax ? parseColor(p.colorMax) : parseColor("#000000");
			colorMin = p.colorMin ? parseColor(p.colorMin) : parseColor("#C0C0C0");
			colorBgr = p.colorBgr ? p.colorBgr : null;
			interval = typeof(p.interval) != "undefined" ? p.interval : interval;
			stepAngle = typeof(p.stepAngle) != "undefined" ? p.stepAngle : stepAngle;
			idleMotion = typeof(p.idleMotion) != "undefined" ? p.idleMotion : idleMotion;
			opaque = typeof(p.opaque) != "undefined" ? p.opaque : opaque;
			nonSense = typeof(p.nonSense) != "undefined" ? p.nonSense : nonSense;
			if (typeof(p.scale) != "undefined") {
				xScale = yScale = p.scale;
			} // if
			xScale = typeof(p.xScale) != "undefined" ? p.xScale : xScale;
			yScale = typeof(p.yScale) != "undefined" ? p.yScale : yScale;
		} // parametrize
		
		
		self.getRenderingTime = function() {
			var sum = 0;
			for (var i in timing) {
				sum += timing[i];
			} // for
			return sum / timing.length;
		}; // getRenderingTime
		
		self.kill = function() {
			clearInterval(timer);
			process(function(o){o.span.parentNode.removeChild(o.span);});
		}; // kill
		
		
		parametrize(params);
		
		init();
		
	} // Clouder
	
	function asPixels(number) {
		return number + 'px';
	} // asPixels

	function InitClouder() {
		var clouderEl = document.getElementById('clouder');
		if (!clouderEl) return;

		var w = Math.max(window.innerWidth, document.body.clientWidth);
		var h = Math.max(window.innerHeight, document.body.clientHeight);

		clouderEl.style.border = "none";
		clouderEl.style.width = asPixels(w * 2 / 3);
		clouderEl.style.height = asPixels(h * 2 / 3);
		clouderEl.style.position = "absolute";
		clouderEl.style.left = asPixels(w / 6);
		clouderEl.style.top = asPixels(h / 6);

		var tags = [];
		tags.push({ text: "UX<br/>UI", id: " you could say I am 9/10 in that ", weight: 0.5 });
		tags.push({ text: "Data<br/>Analysis", id: "you could say I am 6/10 in that", weight: 0.5 });
		tags.push({ text: "HTML<br/>", id: "you could say I am 8/10 in that", weight: 0.5 });
		tags.push({ text: "CSS<br/>", id: "you could say I am 8/10 in that", weight: 1 });
		tags.push({ text: "Java<br/>Script", id: "you could say I am 6/10 in that", weight: 1 });
		tags.push({ text: "Python<br/>", id: "you could say I am 6/10 in that", weight: 0.5 });
		tags.push({ text: "C++", id: "you could say I am 7/10 in that", weight: 1 });
		tags.push({ text: "Web analytics", id: "you could say I am 8/10 in that", weight: 0 });
		tags.push({ text: "statistics", id: " you could say I am 7/10 in that ", weight: 0 });
		tags.push({ text: "Qualitative and<br/> quantitative <br/>research", id: "you could say I am  8/10 in that", weight: 0.5 });
		tags.push({ text: "Product Management", id: "you could say I am 8/10", weight: 0.5 });
		tags.push({ text: "Product design", id: "you could say I am 7/10 in that", weight: 0 });
		tags.push({ text: "Machine learning", id: "you could say I am 6/10 in that", weight: 0.5 });
		tags.push({ text: "Entrepreneurship", id: "you could say I am 9/10 in that", weight: 0.5 });
		tags.push({ text: "Product strategy", id: "you could say I am 9/10 in that ", weight: 0 });
		tags.push({ text: "Electronics", id: "you could say I am7/10 in that ", weight: 0 });
		tags.push({ text: "Robotics", id: "you could say I am 7/10 in that ", weight: 1 });
		tags.push({ text: "VR AR", id: "you could say I am 7/10 in that", weight: 1 });
		tags.push({ text: "User centered design", id: "Listen to your users !!", weight: 1 });
		tags.push({ text: "Lover", id: "<3", weight: 1 });
		tags.push({ text: "Just contact me.. <br> And we'll take it from there", id: "Edenoffer7@gmail.com", weight: 1 });
		tags.push({ text: "Documentary junkie", id: "Who doesn't love the BBC planet earth?!?", weight: 1 });
		tags.push({ text: "Dog owner!", id: "Go to my instegram page to to see Renee the Most beautiful dog in the world", weight: 0 });
		tags.push({ text: "Data visualization", id: "you could say I am 9/10 in that", weight: 1 });
		tags.push({ text: "Foodie", id: "Oh yes I can cook!", weight: 1 });

		window.clouder = new Clouder({ container: clouderEl, tags: tags, colorMax: "#ffffff", colorMin: "#666666" });
	} // InitClouder
	