/* 
Project: Good Morning

Author: Robert Bue
		Good Morning
*/
var config = {};



$(document).ready(function () {

	config.window = $(window);
	config.document = $(document);
	config.body = $("body");
	config.mainHeader = $("#main-header");

	// Resize
    $(window).on("resize", function () {
        resizeWindow();
        resizeVideo();
    }).trigger("resize");

    /*var wheelActive = true, 
	    curScroll = 0, 
	    targetScroll = 0, 
	    element = "#scrollit",
	    minScroll = 0, 
	    maxScroll = config.document.height() - config.wHeight;

	VirtualScroll.addEventListener(function(e) {
	    targetScroll += e.deltaY * -1;
        targetScroll = Math.min(targetScroll, maxScroll);
        targetScroll = Math.max(targetScroll, minScroll);

        
	});

	TweenMax.ticker.addEventListener("tick", draw);

	function draw(event) {
		// Adjust this value (0.1) for different easing value. 1 = no easing, 0.000001 - loooots of easing
		curScroll += (targetScroll - curScroll) * 0.1;
		TweenMax.set(element, { y: -curScroll });
		// Opposite direction 
		//TweenMax.set(element, { y: curScroll * -1 });
	}*/

// $('#slideoverlay').remove();
    
 //    $('body').flowtype({
	//    minimum : 500,
	//    maximum : 1200
	// });

	//$(".rsABlock h1").fitText(1.2, { minFontSize: '25px', maxFontSize: '45px' });


    newsletterInit();

    //Slideshow
    initSlideshow();

    initService();

    if ( !isMobile () ) {
    	// Fade in articles
    	//initFadeArticles();

    	jiggle();
		setInterval(jiggle, 800);

		if ( !isAppleIos () ) {
			// Casestudies
			$(".casestudies article").hover(
				function () {
					//$(this).find(".overlay").fadeIn(350);
					TweenLite.to($(this).find(".overlay"), .35, {opacity: 1, ease: 'easeInOutExpo'});
					//$(this).find(".overlay").css({opacity : '0', display : 'block'});
					//TweenLite.to( lol, 0.35, { css: {width:"400px"} });
				},
				function () {
					//$(this).find(".overlay").fadeOut(350);
					TweenLite.to($(this).find(".overlay"), .35, {opacity: 0, ease: 'easeInOutExpo'});
					//$(this).find(".overlay").css({opacity : '1', display : 'block'});
					//TweenLite.to( $(this).find(".overlay"), 0.35, { css: {opacity:"0"} });
				}
			);
		}

		// $(".isNotMobile #main .our a").hoverLineGrow({
	 //        style: "2px solid #afafaf",
	 //        padding: 3,
	 //        activeClass: "current"
	 //    });
    }

	$('.isMobile .iosSlider').iosSlider({
		desktopClickDrag: true
	});

	$('.svginject').svgInject();

	//$('.isMobile .iosSlider').iosSlider('update');

	/*$('.isNotMobile .iosSlider').iosSlider({
		desktopClickDrag: true
	});*/

	$('.isMobile .iosSlider').bind("touchmove", function (e) {
		e.preventDefault();
	});

	// $('.isMobile .sidescroller').royalSlider({
	// 	arrowsNav: false,
	// 	fadeinLoadedSlide: false,
	// 	imageScaleMode: 'none',
	// 	imageAlignCenter:false,
	// 	slidesSpacing: 10,
	// 	easeIn: 'easeOutExpo',
	//     easeOut: 'easeInExpo'
	// });


	// $('#categories-con').waypoint(function(direction) {
	// 	// $('#categories-con').css('position', 'fixed');

	// });

	$('.process section').waypoint(function(direction) {
		
		if ( direction == 'up') {
			//$(this).addClass("inview");
			var sectionID = $(this).prev().attr("id");
			//console.log(direction + '-' + sectionID);
			$('.process a').removeClass('current');
			if ( sectionID == "about-intro") {
				sectionID = "home";
			}
			$('.process a[data-section="' + sectionID + '"]').addClass('current');
		} else {
			//$(this).addClass("inview");
			var sectionID = $(this).attr("id");
			//console.log(direction + '-' + sectionID);
			$('.process a').removeClass('current');
			if ( sectionID == "about-intro") {
				sectionID = "home";
			}
			$('.process a[data-section="' + sectionID + '"]').addClass('current');
		}
	}, {
		offset: '50%'
	});

	// Show guitar
   $('#process-nav a, .gotosection').on("click", function(event) {
   	event.preventDefault();

      $item = $(this);
      var itemSection = $item.data('section');

      showSlide(itemSection);

   });

   // Go to overview
   $('.goback').on("click", function() {
      event.preventDefault();
      showSlide('strategy');
   });



	// showSlide
	function showSlide(itemSection) {   
	   
	   if ( itemSection == "home" ) {
	   	TweenMax.to(window, .5, { scrollTo: { y: 0 }, ease:Power2.easeOut });
	   } else {
		TweenMax.set('.fifthyfifthy', {clearProps:"transform"});
		var toTop = $('.process').find("#" + itemSection + "").offset().top;
		TweenMax.to(window, .01, { scrollTo: { y: toTop -71 }, ease:Power2.easeOut, onComplete: function() {
			TweenMax.set('.fifthyfifthy', {clearProps:"transform"});
		} });
	   }
	}

	// Show guitar
	$('.gotoplace').on("click", function(event) {
		event.preventDefault();

		$item = $(this);
		var itemSection = $item.data('section');

		var toTop = $('body').find("#" + itemSection + "").offset().top;

		TweenMax.to(window, .5, { scrollTo: { y: toTop - 136 }, ease:Power2.easeOut, onComplete: function() {

		}});

	});

	if ( !Modernizr.touch && config.wWidth > 1024 && config.wHeight > 700) {



		var sectionHeight = config.wHeight;
		var headerHeight = $('header#main').height();
		var subnavHeight = $('#subnav').height();
		var scrollOffset = headerHeight + subnavHeight;

		if($('#digitalprocess').length){

			var pagesection = $.superscrollorama({
				triggerAtCenter: false,
				playoutAnimations: true
			});

			pagesection.addTween(0, (new TimelineMax()).append([
				TweenMax.fromTo('#about-intro', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200);

			pagesection.addTween($('#production-plan').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#production-plan', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#wireframes-ux').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#wireframes-ux', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#prototyping').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#prototyping', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#design').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#design', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#development').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#development', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#testing').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#testing', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#launch').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#launch', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			// pagesection.addTween('#maintenance', (new TimelineMax()).append([
			// 	TweenMax.fromTo('#maintenance', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			// ]), 1200, -scrollOffset);

		}

		if($('#visualprocess').length){

			/*var pagesection = $.superscrollorama();

			pagesection.addTween(0, (new TimelineMax()).append([
				TweenMax.fromTo('#about-intro', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

			pagesection.addTween((sectionHeight)-71, (new TimelineMax()).append([
				TweenMax.fromTo('#production', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

			pagesection.addTween((sectionHeight*2)-71*2, (new TimelineMax()).append([
				TweenMax.fromTo('#concept', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

			pagesection.addTween((sectionHeight*3)-71*3, (new TimelineMax()).append([
				TweenMax.fromTo('#location', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

			pagesection.addTween((sectionHeight*4)-71*4, (new TimelineMax()).append([
				TweenMax.fromTo('#casting', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

			pagesection.addTween((sectionHeight*5)-71*5, (new TimelineMax()).append([
				TweenMax.fromTo('#shoot', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

			pagesection.addTween((sectionHeight*6)-71*6, (new TimelineMax()).append([
				TweenMax.fromTo('#post-production', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);*/

			var pagesection = $.superscrollorama({
				triggerAtCenter: false,
				playoutAnimations: true
			});

			pagesection.addTween(0, (new TimelineMax()).append([
				TweenMax.fromTo('#about-intro', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200);

			pagesection.addTween($('#production').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#production', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#concept').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#concept', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#location').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#location', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#casting').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#casting', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#shoot').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#shoot', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#post-production').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#post-production', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

		}

		if($('#ideasprocess').length){

			console.log('ideas');

			/*var pagesection = $.superscrollorama();

			pagesection.addTween(0, (new TimelineMax()).append([
				TweenMax.fromTo('#about-intro', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

		
			pagesection.addTween((sectionHeight)-71, (new TimelineMax()).append([
				TweenMax.fromTo('#insight', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

			pagesection.addTween((sectionHeight*2)-71*2, (new TimelineMax()).append([
				TweenMax.fromTo('#coremessage', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

			pagesection.addTween((sectionHeight*3)-71*3, (new TimelineMax()).append([
				TweenMax.fromTo('#approach', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);

			pagesection.addTween((sectionHeight*4)-71*4, (new TimelineMax()).append([
				TweenMax.fromTo('#ideas', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
			]), 1200);*/



			var pagesection = $.superscrollorama({
				triggerAtCenter: false,
				playoutAnimations: true
			});

			pagesection.addTween(0, (new TimelineMax()).append([
				TweenMax.fromTo('#about-intro', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200);

			pagesection.addTween($('#insight').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#insight', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#coremessage').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#coremessage', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#approach').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#approach', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

			pagesection.addTween($('#ideas').offset().top, (new TimelineMax()).append([
				TweenMax.fromTo('#ideas', 1, {css:{y: 0 }}, {css:{y: 300}})
			]), 1200, -scrollOffset);

		}

		
		



		// pagesection3.addTween((sectionHeight*3)-71*3, (new TimelineMax()).append([
		// 	TweenMax.fromTo('#ux-wireframes', 1, {css:{y: 0 }, immediateRender:true}, {css:{y: 500}})
		// ]), 1200);

	}

	var awwwardcounter = $('.awwwardcounter').data('countto');
	var fwacounter = $('.fwacounter').data('countto');
	var awardscounter = $('.awardscounter').data('countto');
	$('.awwwardcounter .aw-number, .fwacounter .aw-number, .awardscounter .aw-number').html('&nbsp;');

	$('#about-grid-1').waypoint(function(direction) {
		

		$({someValue: 0}).animate({someValue: awwwardcounter}, {
			duration: 2000,
			easing: 'swing', // can be anything
			step: function() { // called on every step
				// Update the element's text with rounded-up value:
				$('.awwwardcounter .aw-number').html(Math.ceil(this.someValue));
			}
		});

		$({countTo: 0}).animate({countTo: fwacounter}, {
			duration: 2000,
			easing: 'swing',
			step: function() {
				$('.fwacounter .aw-number').html(Math.ceil(this.countTo));
			}
		});
	}, {
		offset: '50%'
	});

	$({countTo: 0}).animate({countTo: awardscounter}, {
		duration: 2000,
		easing: 'swing',
		step: function() {
			$('.awardscounter .aw-number').html(Math.ceil(this.countTo));
		}
	});


	var othercounter = $('.othercounter').data('countto');
	$('.othercounter .aw-number').html('&nbsp;');

	$('#about-intro-2').waypoint(function(direction) {
		
		$({someValue: 0}).animate({someValue: awwwardcounter}, {
			duration: 2000,
			easing: 'swing', // can be anything
			step: function() { // called on every step
				// Update the element's text with rounded-up value:
				$('.awwwardcounter .aw-number').html(Math.ceil(this.someValue));
			}
		});

		$({countTo: 0}).animate({countTo: fwacounter}, {
			duration: 2000,
			easing: 'swing',
			step: function() {
				$('.fwacounter .aw-number').html(Math.ceil(this.countTo));
			}
		});

		$({countTo: 0}).animate({countTo: othercounter}, {
			duration: 2000,
			easing: 'swing',
			step: function() {
				$('.othercounter .aw-number').html(Math.ceil(this.countTo));
			}
		});
	}, {
		offset: '70%'
	});

	




	$('#categories-con2').waypoint('sticky');
	//$('#subnav').waypoint('sticky');
	
	$('#service .section').waypoint(function(direction) {
		//console.log(direction);
		// if ( direction == 'up') {
		// 	$(this).removeClass("inview");
		// 	$(this).removeClass("blank");
		// } else {
		// 	$(this).addClass("inview");
		// 	$(this).addClass("blank");
		// }

		$(this).addClass("inview");
	}, {
		offset: '60%'
	});

	// var container = document.querySelector('#masonry');

	// var msnry = new Masonry( container, {
	//   itemSelector: '.box',
	//   columnWidth: '.grid-sizer'
	// });
/*
	//Setup waypoints plugin
    slide.waypoint(function (event, direction) {

        //cache the variable of the data-slide attribute associated with each slide
        dataslide = $(this).attr('data-slide');
        dataslide_prev = parseInt($(this).attr('data-slide'))-1;

        //$('#slide_container_' + dataslide).addClass('inview');

        var shit = $('#slide_container_' + dataslide);
        //$(".slide").not(shit).hide();


        //If the user scrolls up change the navigation link that has the same data-slide attribute as the slide to active and 
        //remove the active class from the previous navigation link 
        if (direction === 'down') {
            
            $('.navigation li[data-slide="slide_container_' + dataslide + '"]').addClass('active').prev().removeClass('active');


        }
        // else If the user scrolls down change the navigation link that has the same data-slide attribute as the slide to active and 
        //remove the active class from the next navigation link 
        else {
            $('.navigation li[data-slide="slide_container_' + dataslide_prev + '"]').addClass('active').next().removeClass('active');
        }
    });

    //waypoints doesnt detect the first slide when user scrolls back up to the top so we add this little bit of code, that removes the class 
    //from navigation link slide 2 and adds it to navigation link slide 1.

    
    mywindow.scroll(function () {
        
        moveArrow();

        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="slide_container_1"]').addClass('active');
            $('.navigation li[data-slide="slide_container_2"]').removeClass('active');
        }

    });
    */



	/*$('.wrapper article').css('opacity', 0);
	$('.wrapper article').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if (isInView) {
			var article = $(this);
			article.fadeIn(1200);
		} else {
		// element has gone out of viewport
		}
	});*/



    /*
    $('.wrapper article').css('opacity', 0);

	var articles = [];
	$(".wrapper article").each(function() {
	    //$(this).css('opacity', 0);
	    articles.push(this);
	});
	                               
	function fadeArticle(children) {
	    if (articles.length > 0) {
			var current = articles.shift();

			$(current).animate({
				opacity: '1'
			}, 300, function() {
				fadeArticle(articles);
			});
	    }
	}

    fadeArticle(articles);
    */


    initIsotopeMasonry();




	// Animate bars
	barsInit();

    if ( Modernizr.csstransforms ) {
    	//var slideshow = new Swipe(document.getElementById('showcase'));
	}

	//$('#blogpage .content_ws').isotope({ layoutMode : 'fitRows' });

	// Break every third work
	$("#casestudies-more a:nth-child(3n+4)").append('<div class="workbreak"></div>');
	$("#casestudies-work a:nth-child(3n+4)").append('<div class="workbreak"></div>');

	// Set first/last child classes
	$('#casestudies-work a article:first, #services a article:first, #blog a article:first, #casestudies-more a article:first, .more_posts a article:first').addClass('firstChild');
	$('#casestudies-work a article:last, #services a article:last, #blog a article:last, #casestudies-more a article:last, .more_posts a article:last').addClass('lastChild');


	// Main nav
	/*if ( !isMobile () ) {
		$('header#main nav li.dbl a.current').parent().next().children('a').css('border-left', '#2f2f2f');

		$("header#main nav li.dbl a").hoverIntent(
			function(){
				//$(this).css({ backgroundPosition: "0 94px" });
				$(this).stop().animate({ 
					backgroundPosition: "0 -265px"
				}, 1000, "easeOutExpo");

				$(this).find('.page').stop().animate({ 
					color: "#ffffff"
				}, 350, "easeOutExpo");
			},
			function(){
				
				$(this).find('.page').stop().animate({ 
					color: "#4f4f4f"
				}, 150, "easeOutExpo");

				$(this).stop().animate(
					{ 
						backgroundPosition: "0px -571px"
					}, 
					1000, 
					"easeOutExpo", 
					function(){
						$(this).css({
							backgroundPosition: "0 94px" 
						});
					}
				);
			}
		);
	}*/

	TweenLite.set( $('#scroll'), { css: {opacity:"0"} });

	setTimeout(function() {
		TweenLite.to( $('#scroll'), 0.15, { css: {opacity:"1"} });
	}, 3000);

	setTimeout(function() {
		TweenLite.to( $('#scroll'), 0.15, { css: {opacity:"0"} });
	}, 8000);

	// Scroll down sign
	$(window).scroll(function(){
		if ( $('#scroll').length ) {
			if( $(window).scrollTop() > 10 ) {
				TweenLite.to( $('#scroll'), 0.15, { css: {opacity:"0"} });
			}
		}


		if ( $('#blogpage').length ) {

			// Endless scrolling - at bottom of page (-footer)
			/*
			var scrollTop = $(window).scrollTop() + 330;

		    if( scrollTop >= $(document).height() - $(window).height()) {
		        $('#loadingpages').fadeIn();

		        $.ajax({
			        url: "inc/loadmore.php?last="+ $(".postorsomething:last").attr('id'),
			        success: function(html) {
			            if (html) {
			                $(".content_ws").append(html);
			                $(window).trigger("resize");
			                $('#loadingpages').hide();
			            } else {
			                $('#loadingpages').html('Ingen flere innlegg');
			            }
			        }
		        });
		    }
		    */
		}
	});

	

	if ( !Modernizr.touch ) {
		$('a:not(#offices a, #social a, #details a, #bodytext a, #scroll, .caselink, .officecontacts a, .instagram_feed a, #ge_logo, #mobile-nav-open, .playhtml5video, .nopre, .slide-box-article .button)').live('click', function(event){
			event.preventDefault();

			var href = $(this).attr('href');

			$('body').append('<div id="slideoverlay" class="loading" style="background-color: white; position: fixed; top: 0; z-index: 99; opacity: 0; width: 100%; height: 100%"></div>');
			
			TweenMax.to($('#slideoverlay'), .4, {opacity: 1, onComplete: function () {
				window.location = href;
			}});

			// $('#slideoverlay').fadeIn('400', function() {
			// 	window.location = href;

			// 	// TweenLite.to($('header#main'), .3, {css:{top: '-110px'}, ease: 'easeInOutExpo', onComplete: function () {
					
			// 	// }});
			// });
		});
	}

	if ( !Modernizr.touch ) {
		if ( !$("#loadingBg").length ) {
			// TweenLite.to($('header#main'), .3, {css:{top: '0'}, ease: 'easeInOutExpo', onComplete: function () {
				
			// }});
			

				//$('#slideoverlay').fadeOut('400'); 

			if ( !$(".preloadimages").length ) {

				TweenMax.to($('#slideoverlay'), .4, {delay: .2, opacity: 0, onComplete: function () {
					$('#slideoverlay').remove();
				}});
			} else {
				$('.preloadimages').imagesLoaded( function(){
					//$(".rsABlock h1").fitText(1, { minFontSize: '25px', maxFontSize: '45px' });
					TweenMax.to($('#slideoverlay'), .4, {delay: .2, opacity: 0, onComplete: function () {
						$('#slideoverlay').remove();
						$('.preloadimages').remove();
					}});
				});
			}
			

		} else {
			//$('header#main').css({'top': 0, 'z-index': '98'});
			$('#slideoverlay').remove();
		}
	}

	/*
	// Grid changer
	$('#page_header h1').click(function() {

        $('#blogpage .content_ws').toggleClass('grid');

		


		$("#blogpage .content_ws article").each(function(index, element) {
			var number = Math.floor(Math.random() * 6) + 1
	        if (number%2 == 0) {
	        	$(element).addClass('grid1'); 
			} else {
				$(element).addClass('grid2'); 
			}
		
		});
    });
	*/



	// Scroll past slideshow
	$('.scroll').click(function() {

        var $anchor = $(this);
 
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1200, 'easeInOutExpo');
   
        event.preventDefault();
    });

    // Scroll past intro screen on about
	$('#welcome-go').click(function() {

        var $anchor = $(this);


 		//TweenLite.to($('.services-overlay'), 1, {opacity: 0.2, ease: 'easeInOutExpo'});

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('data-goto')).offset().top
        }, 1200, 'easeInOutExpo');
   
        
    });

    // Scroll past intro screen on about
	$('.scrollto').click(function(event) {

        event.preventDefault();

        var $anchor = $(this);
 
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1200, 'easeInOutExpo');
   
        
    });


	// Stickem
	var w3 = $(window).width();
	if ( w3 > 1024 ) {	
		$('#blogpage, #servicepage').stickem();
	}

	

	// View map (scroll to top)
	$('.view_map').click(function() {
		var $anchor = $(this);
 
        $('html, body').stop().animate({
            scrollTop: $('#subnav').offset().top
        }, 800, 'easeInOutExpo');
	});




	if ( config.wWidth <= 1024 ) {
		if ( !$('.officecontacts').length ) {
			$('#subnav').iosSlider({
				desktopClickDrag: true,
				keyboardControls: true,
				scrollbar: true,
				scrollbarLocation: 'bottom',
				scrollbarHeight: '0',
				//frictionCoefficient: 0.3,
				elasticPullResistance: 0.7,
				responsiveSlideContainer: false,
				responsiveSlides: false,
				scrollbarHide: false,
				scrollbarBackground: '#fff',
				navPrevSelector: $('.rsArrowLeft'),
				navNextSelector: $('.rsArrowRight')
			});
		}
	}



	// Open mobil navigation
	$('#mobile-nav-open').click(function() {

		var toggle = $("#mobile-nav-open");
		var status = toggle.attr('data-status');
		var header = $('header#main nav ul');
		var listItems = $("header#main nav ul li");

		if ( status == 'closed' ) {
			header.show();
			toggle.attr('data-status', 'open');

			listItems.each(function(index, element) {
				setTimeout(function(){
					$(element).addClass('flipi'); 
				},index*150);
			});
		} else {
			toggle.attr('data-status', 'closed');

			$(listItems.get().reverse()).each(function(index, element) { 

				setTimeout(function(){
					$(element).removeClass('flipi'); 
				},index*150);

				setTimeout(function(){
					header.hide();
				},listItems.length*150);
			});
		}
	});



	if ( $('.sidenav').length ) {
		var w3 = $(window).width();
		if ( w3 <= 1024 ) {
			openSidebar ();
			setTimeout(function(){
				closeSidebar ();
			}, 2000);
		}
	}

	// Open sidebar
	$('.sidenav').click(function() {

		var w3 = $(window).width();

		if ( w3 <= 1024 ) {

			var toggle = $('.sidenav');
			var status = toggle.attr('data-status');

			if ( status == 'closed' ) {
				openSidebar ();
			} else {
				closeSidebar ();
			}
		}
	});

	$('.content_ws').click(function() {
		var w3 = $(window).width();
		if ( w3 <= 1024 ) {
			closeSidebar ();
		}
	});

	$(window).bind('orientationchange', function(e) {
		closeSidebar ();
	});


	// Open sidebar list
	$('.isMobile .sidenav .header h2').click(function() {
		$(this).parent().next().slideToggle();
		$(this).toggleClass("active");
	});
	
	// For older browsers (yes, thats you IE)
	if ( $('html').hasClass('no-js ie7 oldie') || $('html').hasClass('no-js ie8 oldie') ) {
		//$("#something").css('margin', 0);
	}

	// Hide address bar
	if ( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) ) {
		setTimeout(function() { window.scrollTo(0, 1); }, 100);

	}


	// Post slideshow
	var slider_post = $('#slideshow_post').royalSlider({
		arrowsNav: true,
		arrowsNavHideOnTouch: true,
		controlNavigation: 'bullets',
		imageScaleMode: 'fill',
		imageAlignCenter: true,
		autoScaleSlider: true,
		arrowsNavAutoHide: true,
		autoScaleSliderWidth: 1280,
		autoScaleSliderHeight: 800,
		autoHeight: true,
		navigateByClick: true,
		slidesSpacing: 0,
	    usePreloader: true,
	    numImagesToPreload: 2,
	    video: {
	    		autoHideControlNav: true,
		    	autoHideBlocks: true
	    	},
	    fullscreen: {
    		// fullscreen options go gere
    		enabled: false,
    		nativeFS: true,
    		buttonFS: true,
    		keyboardNav: true
    	}
	}).data('royalSlider');

	var slider_post2 = $('#slideshow_post2').royalSlider({
		addActiveClass: true,
    arrowsNav: true,
    controlNavigation: 'bullets',
    autoScaleSlider: true, 
    autoScaleSliderWidth: 1440,     
    autoScaleSliderHeight: 474,
    loop: false,
    fadeinLoadedSlide: false,
    globalCaption: true,
    slidesSpacing: 0,
    usePreloader: true,
    keyboardNavEnabled: true,
    globalCaptionInside: false,
    video: {
	    		autoHideControlNav: true,
		    	autoHideBlocks: true
	    	},
	   visibleNearby: {
      enabled: true,
      centerArea: 0.50,
      center: true,
      breakpoint: 768,
      breakpointCenterArea: 1,
      navigateByCenterClick: true
    }
	}).data('royalSlider');

	// if ( $("#slideshow_post").length ) {
	// 	slider_post.ev.on('rsAfterContentSet', function(e, slideObject) {
	// 	    slider_post.updateSliderSize();
	// 	   $(window).trigger("resize");
	// 	});

	// 	slider_post.ev.on('rsAfterSlideChange', function() {
	// 	    slider_post.updateSliderSize();
	// 	    $(window).trigger("resize");
	// 	});
	// }



	if ( $('#triangle').length ) {
		TweenLite.to($('#triangle .fill'), 1.5, {css:{width:"100%"}, ease: 'easeInOutExpo'});
	}

	if ( $('.triangles').length ) {
		TweenLite.to($('.triangles .fill'), 1.5, {css:{width:"50%"}, ease: 'easeInOutExpo'});
	}

	// if ( $('.triangles').length ) {
	// 	TweenLite.to($('.triangles .fill'), 1.5, {css:{width:"50%"}, ease: 'easeInOutExpo'});
	// 	$("#services article").hover(
	// 		function () {
	// 			TweenLite.to($(this).find('.fill'), 1, {css:{width:"100%"}, ease: 'easeInOutExpo'});
	// 		},
	// 		function () {
	// 			TweenLite.to($(this).find('.fill'), 0.5, {css:{width:"50%"}, ease: 'easeInOutExpo'});
	// 		}
	// 	);
	// }

 });




function initIsotopeMasonry() {
	
	if ( isMobile () ) {
		console.log('initIsotopeMasonry');
		return;
	}

	$(".portfolio-work-box .image-box img").panr({
		sensitivity: 10,
		moveTarget: "parent",
		scale: false,
		scaleTo: 1.1,
		scaleDuration: .25,
		panY: true,
		panX: true,
		panDuration: 1.25,
		resetPanOnMouseLeave: true
	});

	$(".portfolio-work-box .image-box img").panr({
		sensitivity: 40,
		moveTarget: "parent parent parent",
		scale: false,
		scaleTo: 1.1,
		scaleDuration: .25,
		panY: true,
		panX: true,
		panDuration: 1.25,
		resetPanOnMouseLeave: true
	});

	// Isotop
	$(window).smartresize(function(){
	  	if ( isMobile () ) {
			return;
		}

		//console.log(config.wWidth);

	    if ( config.wWidth >= 768 && config.wWidth <= 1024 ) {
			config.boxSplit = 3;
			config.boxSplit2 = 1.5;
			config.boxSplit3 = 1.5;
		}

		else if ( config.wWidth < 768 ) {
			config.boxSplit = 1;
			config.boxSplit2 = 1;
			config.boxSplit3 = 1;
		}

		else {
			config.boxSplit = 4;
			config.boxSplit2 = 2;
			config.boxSplit3 = 2;
		}
	 
		$('.format-1x1, .format-2x1').css("height", Math.round(config.wWidth / config.boxSplit));
		$('.format-1x2').css("height", Math.round(config.wWidth / config.boxSplit2));
		$('.format-2x2').css("height", Math.round(config.wWidth / config.boxSplit3));

		$container.isotope({
	        masonry: {
	          columnWidth: config.wWidth / config.boxSplit
	        }
	    });


	});
}

	var $container = $('#isotop, #isotop2, #isotop3');

	$container.imagesLoaded( function(){

		//$(window).trigger("smartresize");

		if ( isMobile () ) {
			return;
		}

		$container.isotope({
			itemSelector : '.portfolio-work-box .image-box img',
			animationEngine: 'css',
			resizable: false,
			masonry: {
				columnWidth: $container.width() / 4
			}
		});

		// $(window).trigger("smartresize");

		// $container.isotope({
	 //  		layoutMode: 'perfectMasonry',
	 // 		perfectMasonry: {
	 // 			layout: 'vertical',
	 //            liquid: true,
	 //            columnWidth: Math.round(config.wWidth / 4),
	 //            rowHeight: Math.round(config.wWidth / 4)
	 //  		}
	 //  	});

	  	

		$(window).trigger("smartresize");

		//$(".aw-number").fitText(0.3, { minFontSize: '75px', maxFontSize: '120px' });

	});

	// Filter
	var $optionSets = $('.option-set'),
	$optionLinks = $optionSets.find('a');

	$optionLinks.click(function(){

		var value = $(this).attr('data-option-value');
		var key = $(this).parents('.option-set').attr('data-option-key');

	
		console.log('option value: ' + value);
		console.log('option key: ' + key);


		var hash = value.replace(/\./g, '');

		if (hash == '*') hash = 'all';

		$.address.value(hash);  
	     
	  return false;

	});

	$.address.change(function(event) {  

		if ( !$('.casestudies').length) return;

		var hash = $.address.value().replace(/ |\//g, '.');
		var $this = undefined;
		var $optionSet = $('.option-set'),
		$optionLinks = $optionSets.find('a');

		$optionSet.find('.current').removeClass('current');

		if(hash == '.all') hash = '*';
		
		$optionLinks.each( function( index, el ) {
		    
		    if($( el ).attr('data-option-value') == hash) {
		    	
		    	$this = $(this);
		    }
		});

		if($this == undefined) return;

		
		// don't proceed if already selected
		if ( $this.hasClass('current') ) {
			return false;
		}
		var $optionSet = $this.parents('.option-set');
		$optionSet.find('.current').removeClass('current');
		$this.addClass('current');

		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		var options = {},
		key = $optionSet.attr('data-option-key'),
		value = $this.attr('data-option-value');


		// parse 'false' as false boolean
		value = value === 'false' ? false : value;
		options[ key ] = value;
		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			// changes in layout modes need extra logic
			changeLayoutMode( $this, options )
			console.log('1')
		} else {
			// otherwise, apply new options
			$container.isotope( options );
			console.log('2')
			$container.isotope('reLayout');

			setTimeout(function() {
				//$(window).trigger("smartresize");
				$container.isotope('reLayout');
			}, 500);
		}

	
	});

$(window).trigger('hashchange');






// Offices
// $.address.init(function(event) {
//     $('#offices a').address();
// }).change(function(event) {
//     changeLoc(event.value);
// });

// Open mobil navigation
	map();
	$('#subnav a').click(function(event) {
		

		if ( !$('#contactpage').length ) {
			return;
		}

		event.preventDefault();

		var url = $(this).data("location");

		$('#subnav a').removeClass('current');
		$("#subnav").find("[data-location='" + url + "']").addClass('current');

		$('.officecontacts').toggleClass('open');
		$('#offices').toggleClass('open');

		
		changeMap(url);
	});

	$('.officecontact .button').click(function(event) {
		event.preventDefault();

		var $anchor = $(this);
 
        $('html, body').stop().animate({
            scrollTop: $('#map_container').offset().top
        }, 800, 'easeInOutExpo');
	});


function changeLoc(url) {

if ( !$('#contactpage').length ) {
		return;
	}

var url = url.replace('/', '');

	if (url != '' ) {
			
		$('#subnav a').removeClass('current');
		$("#subnav").find("[data-location='" + url + "']").addClass('current');

		$('.officecontacts').toggleClass('open');
		$('#offices').toggleClass('open');

		/*$('#contactpage #grey_bg').fadeOut(400);
		$('#contactpage #offices-ajax, #map').fadeOut(400, function() {

			$('#contactpage .wrapper').addClass('loading');

			$('#contactpage #offices-ajax').load('../wp-content/themes/gm/inc/offices/' + url + '.php', function () {

				$('#contactpage .wrapper').removeClass('loading');

				$('#map').show();
				changeMap(url);
				$('#map').hide();

				$('#contactpage #offices-ajax, #contactpage #grey_bg, #map').fadeIn(400, function() {
					setTimeout(function() { changeMap(url); }, 100);
					console.log('a');
				});

			});
		});*/

		changeMap(url);

	}	else {
		map();	
	}
}


function changeMap(loc) {

	if ( !$('#contactpage').length ) {
		return;
	}

	switch (loc) {
		case 'oslo':
			centerLocation = new google.maps.LatLng(59.911156, 10.737842);
			break;
		case 'stockholm':
			centerLocation = new google.maps.LatLng(59.342349,18.032749);
			break;
	}

    var map1 = new map(centerLocation);
}


$(window).load(function () {

	$.getScript("http://good-morning.no/wp-content/themes/gm/js/instagram.js", function(data, textStatus, jqxhr) {
		// Instagram feed
		$(".instagram_feed .fullwrapper").instagram({
		    hash: 'goodmorningno',
		    clientId: '8284ea38287545778ad7e32046d5fe94',
		    show : 8
		});
	});


	$.getScript("http://good-morning.no/wp-content/themes/gm/js/twitter.js", function(data, textStatus, jqxhr) {
		// Twitter
    	initTwitterStream();
	});


	
		
}); 
			

// Mask slideshow
var page = {
	h:$(window).outerHeight(true), 
	w:$(window).outerWidth(true)
};

var tid = null;
var ogg = {myProp:0};

function doMask(){
	if ( !isMobile () ) {
		tid = setInterval(mycode, 25);
	}

	setTimeout(function(){
		//$('#slideoverlay').remove();
	}, 50);
}

function removeMask() { 
	clearInterval(tid);
	$('#loadingBg').remove();
}

function mycode() {
	if ( $("#loadingBg").length ) {
		$("#loadingBg").removeClass('loading');
		$("#loadingBg").css('background-color', 'transparent');
		$("#loadingBg canvas").attr({width: page.w, height: page.h});
		var masks = document.getElementById('mask');
		var cx = masks.getContext('2d');
			cx.beginPath();
			cx.rect(0,0,page.w,page.h);
			cx.arc(page.w*0.5,page.h*0.5,ogg.myProp,0,2*Math.PI, true);
			cx.fillStyle = "#FFF";
			cx.fill();
	} else {
		clearInterval(tid);
		//console.log('clearInterval!')
	}
}


// Fade in articles one at the time
function initFadeArticles() {
	
	$('.wrapper article').css('opacity', 0);

	var articles = [];
	$(".wrapper article").each(function() {
	    //$(this).css('opacity', 0);
	    articles.push(this);
	});
	                               
	function fadeArticle(children) {
	    if (articles.length > 0) {
			var current = articles.shift();

			$(current).animate({
				opacity: '1'
			}, 300, function() {
				fadeArticle(articles);
			});
	    }
	}

    fadeArticle(articles);
}

// newsletter
function newsletterInit() {
	try {
        //$(':input:visible:first').focus();
        $('#archive-list li:even').addClass("odd");
        $('.field-group, .field-group input, .field-group select').bind('click',function(event){               
         if (event.type == 'click') {
            if ($(this).hasClass('field-group')){
                var fg = $(this);
                if($(this).children('.datefield').length == 1){
                    // Do not select 1st input so date picker will work.
                } else {
                    $(this).find('input, select').slice(0,1).focus();
                 }
            } else {
                var fg = $(this).parents('.field-group');
                $(this).focus();
            }
               fg.not('.focused-field').addClass('focused-field').children('.field-help').slideDown('fast');
               $('.focused-field').not(fg).removeClass('focused-field').children('.field-help').slideUp('fast');
         }
          event.stopPropagation();
        });
        $('label').bind('click',function(event){
         if (event.type == 'click') {
                var fg = $(this).next();

             if(fg.children('.datefield').length == 1){
                 // Do not select 1st input so date picker will work.
             } else {
                 fg.find('input, select').slice(0,1).focus();
              }
               fg.not('.focused-field').addClass('focused-field').children('.field-help').slideDown('fast');
               $('.focused-field').not(fg).removeClass('focused-field').children('.field-help').slideUp('fast');
         }
          event.stopPropagation();
        });
        // Allow select inputs to be width:auto up to 500px (because max-width doesn't work in IE7)
        $("select").each(function(){
            $(this).css("width", "auto");
            if($(this).width() > 500){
                $(this).css("width", "500px");
            }
        });

      } catch(e){ console.log(e); }


      /*
      try {
        var domains =['hotmail.co.uk','yahoo.co.uk','yahoo.com.tw','yahoo.com.au','yahoo.com.mx','gmail.com','hotmail.com','yahoo.com','aol.com','comcast.net','msn.com','seznam.cz','sbcglobal.net','live.com','bellsouth.net','hotmail.fr','verizon.net','mail.ru','btinternet.com','cox.net','yahoo.com.br','bigpond.com','att.net','yahoo.fr','mac.com','ymail.com','googlemail.com','earthlink.net','xtra.co.nz','me.com','yahoo.gr','walla.com','yahoo.es','charter.net','shaw.ca','live.nl','yahoo.ca','orange.fr','optonline.net','gmx.de','wanadoo.fr','optusnet.com.au','rogers.com','web.de','ntlworld.com','juno.com','yahoo.com.sg','rocketmail.com','yandex.ru','yahoo.co.in','centrum.cz','live.co.uk','sympatico.ca','libero.it','walla.co.il','bigpond.net.au','yahoo.com.hk','ig.com.br','live.com.au','free.fr','sky.com','uol.com.br','abv.bg','live.fr','terra.com.br','hotmail.it','tiscali.co.uk','rediffmail.com','aim.com','blueyonder.co.uk','telus.net','bol.com.br','hotmail.es','email.cz','windowslive.com','talktalk.net','home.nl','t-online.de','yahoo.de','telenet.be','163.com','embarqmail.com','windstream.net','roadrunner.com','bluewin.ch','skynet.be','laposte.net','yahoo.it','qq.com','live.dk','planet.nl','hetnet.nl','gmx.net','mindspring.com','rambler.ru','iinet.net.au','eircom.net','yahoo.com.ar','wp.pl','mail.com'];
        var tdomains = [];
        $('#MERGE0').on('blur', function() {
          $(this).mailcheck({
            domains: domains,
            topLevelDomains: tdomains,
            suggested: function(element, suggestion) {
                var msg = 'Hmm, did you mean '+suggestion.full+'?';
                if ( $('#MERGE0_mailcheck').length > 0 ){
                    $('#MERGE0_mailcheck').html(msg);
                } else {
                    element.after('<div id="MERGE0_mailcheck" class="errorText">'+msg+'</div>');
                }
            },
            empty: function(element) {
                if ( $('#MERGE0_mailcheck').length > 0 ){
                    $('#MERGE0_mailcheck').remove();
                }
              return;
            }
          });
        });
        } catch(e){ console.log(e); }
        */
}

// Count to %
function initInfographic() {

	if ($("#infographic").hasClass('animated')) {
		return;
	}

	$("#infographic").addClass('animated');


	var graphs = [];
	$("#numbers li").each(function() {
	    //$(this).css('opacity', 0);


	    $(this).data("number", $(this).attr('data-number'));
	    $(this).find('.siffer').html('0%');
	    graphs.push(this);

	    
	});
	/*                               
	function countGraph(children) {
	    if (graphs.length > 0) {
			var current = graphs.shift();

			$(current).animate({
				width: $(current).data("number")
			}, 400, function() {
				countGraph(graphs);
			});
	    }
	}*/


	function countGraph(children) {
		if (graphs.length > 0) {
			var current = graphs.shift();
			var reach = $(current).data("number");
			//console.log(reach);
			var cnt = 0;
			

			var counter = setInterval(function() {
				if (cnt <= reach) {
					$(current).find('.siffer').html('' + cnt + '%');
					cnt++;
				} else {
					clearInterval(counter);
					countGraph(graphs);	
				}
			}, 20);
		} else {
			clearInterval(counter);
			//console.log("Timeout!!");
		}
	}




    countGraph(graphs);
}



// Jiggle scroll sign
function jiggle() {
	var sign = $('#scroll');
	if (sign.hasClass('bottom')) {
		sign.removeClass('bottom').addClass('top');
	} else {
		sign.removeClass('top').addClass('bottom');
	}
}

// Init map
function map(latlng) {

	if ( $('#map').length == 0) {
		return;
	}

	if ( !latlng ) {
		latlng = new google.maps.LatLng(59.911156, 10.737842);
	}

	var styles = [
            {
               featureType: "water",
               stylers: [
               {
                  color: "#1C1C1C"
               },
               {
                  visibility: "on"
               }]
            },
            {
               featureType: "landscape",
               stylers: [
               {
                  color: "#282828"
               }]
            },
            {
               featureType: "administrative",
               elementType: "geometry.stroke",
               stylers: [
               {
                  color: "#4a4a4a"
               },
               {
                  weight: 0.4
               }]
            },
            {
               featureType: "poi",
               stylers: [
               {
                  color: "#3f3f3f"
               }]
            },
            {
               featureType: "road",
               elementType: "geometry.fill",
               stylers: [
               {
                  color: "#494949"
               }]
            },
            {
               featureType: "road",
               elementType: "geometry.stroke",
               stylers: [
               {
                  color: "#a0a0a0"
               },
               {
                  weight: 0.1
               },
               {
                  visibility: "off"
               }]
            },
            {
               featureType: "road",
               elementType: "labels.text.stroke",
               stylers: [
               {
                  color: "#282828"
               },
               {
                  weight: 4
               }]
            },
            {
               featureType: "road",
               elementType: "labels.text",
               stylers: [
               {
                  color: "#eaeaea"
               },
               {
                  weight: 0.5
               }]
            },
            {
               elementType: "labels.text",
               stylers: [
               {
                  color: "#dbdbdb"
               },
               {
                  weight: 0.4
               }]
            },
            {
               featureType: "administrative",
               elementType: "labels.text",
               stylers: [
               {
                  visibility: "on"
               },
               {
                  weight: 0.4
               },
               {
                  color: "#f9f9f9"
               }]
            },
            {
               featureType: "road.highway",
               elementType: "geometry",
               stylers: [
               {
                  color: "#757575"
               }]
            },
            {
               featureType: "road",
               elementType: "labels.icon",
               stylers: [
               {
                  visibility: "off"
               }]
            },
            {
               featureType: "transit",
               elementType: "labels.icon",
               stylers: [
               {
                  visibility: "off"
               }]
            },
            {
               featureType: "administrative",
               elementType: "labels.icon",
               stylers: [
               {
                  visibility: "off"
               }]
            },
            {
               featureType: "poi",
               elementType: "labels.icon",
               stylers: [
               {
                  visibility: "off"
               }]
            },
            {
               featureType: "transit.line",
               elementType: "geometry",
               stylers: [
               {
                  visibility: "on"
               },
               {
                  color: "#a0a0a0"
               }]
            },
            {
               featureType: "poi.medical",
               elementType: "labels",
               stylers: [
               {
                  color: "#636363"
               },
               {
                  visibility: "off"
               }]
            },
            {
               featureType: "poi.place_of_worship",
               elementType: "labels",
               stylers: [
               {
                  visibility: "off"
               }]
            },
            {
               featureType: "poi.attraction",
               elementType: "labels",
               stylers: [
               {
                  visibility: "off"
               }]
            },
            {
               featureType: "poi.business",
               elementType: "labels",
               stylers: [
               {
                  visibility: "off"
               }]
            }];
	var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
	//var latlng = new google.maps.LatLng(59.922471, 10.715878);

	if ( !isMobile () ) {
		var settings = {
			scrollwheel: false,
			center: latlng,
			zoom: 15,
			panControl: false,
			zoomControl: false,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.LEFT_TOP
		    },
			draggable: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false
		};
	} else {

		var settings = {
			scrollwheel: false,
			center: latlng,
			zoom: 15,
			draggable: false,
			panControl: false,
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false
		};
	}

	var map = new google.maps.Map(document.getElementById("map"), settings);
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	var contentString = '<div id="content">'+
					'<div id="siteNotice">'+
					'</div>'+
					'<h1 id="firstHeading" class="firstHeading">Good Morning</h1>'+
					'<div id="bodyContent">'+
					'<p>Tekst her?</p>'+
					'</div>'+
					'</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
				
	var parkingImage = new google.maps.MarkerImage('../wp-content/themes/gm/assets/gfx/global/gm_logo-googlemaps.png',
		new google.maps.Size(60,61),
		new google.maps.Point(0,0),
		new google.maps.Point(60,61)
	);

	//var parkingPos = new google.maps.LatLng(59.922471, 10.715878);

	var parkingMarker = new google.maps.Marker({
		position: latlng,
		map: map,
		icon: parkingImage,
		title:"Good Morning",
		zIndex: 1
	});

	map.setCenter(latlng);
				
	google.maps.event.addDomListener(window, 'resize', function() {
	    map.setCenter(latlng);
	});

	google.maps.event.addListener(parkingMarker, 'click', function() {
		//infowindow.open(map,parkingMarker);
	});	


/*
	var dragFlag = false;
	var start = 0, end = 0;
	var container = document.getElementById("map");

	function thisTouchStart(e) {
	    dragFlag = true;
	    start = e.touches[0].pageY; 
	}

	function thisTouchEnd() {
	    dragFlag = false;
	}

	function thisTouchMove(e) {
	    if ( !dragFlag ) return;
		    end = e.touches[0].pageY;
		    window.scrollBy( 0,( start - end ) );
		}

		container.addEventListener("touchstart", thisTouchStart, true);
		container.addEventListener("touchend", thisTouchEnd, true);
		container.addEventListener("touchmove", thisTouchMove, true);*/
}





// Animate Bars
function barsInit() {
	
	var bars = [];
	$(".meter > span").each(function() {
	    $(this).data("origWidth", $(this).width()).width(0);
	    bars.push(this);
	});
	                               
	function animateBars(children) {
	    if (bars.length > 0) {
			var current = bars.shift();

			$(current).animate({
				width: $(current).data("origWidth")
			}, 400, function() {
				animateBars(bars);
			});
	    }
	}

    animateBars(bars);
}

    
// 3D Flip on link
function flip3D(selector) {
	var nodes = document.querySelectorAll( selector );

	for( var i = 0, len = nodes.length; i < len; i++ ) {
		var node = nodes[i];

            if( !node.className || !node.className.match( /flip/g ) ) {
			$(node).addClass('flip');
			$(node).html('<span data-title="'+ node.text +'">' + node.innerHTML + '</span>');
		}
	}; 
}



function initService() {
	

	if ( $('.indexiso').length ) {

		$(".portfolio-work-box .image-box img").panr({
			sensitivity: 50,
			moveTarget: "parent parent parent",
			scale: false,
			scaleTo: 1.1,
			scaleDuration: .25,
			panY: true,
			panX: true,
			panDuration: 1.25,
			resetPanOnMouseLeave: true
		});
	}

	if ( !$('.slider-images').length ) {
		return false;
	}

	console.log('Init slider');

	if ( $('.slider-index').length ) {
		$('.slide-box-article').removeAttr('rel');
	} else {

		$.address.change(function(event) {  
			openPopup(event.value);
		});

		$('.slide-box-article').click(function() {  
		    $.address.value($(this).attr('href'));  
		});

		// $('.slide-box-article').address(function() {  
		//     return $(this).attr('href').replace(/^#/, '');  
		// });



		// $('.slide-box-article .button').click(function(event) {
		// 	//return false;
		// 	event.stopPropagation();
		// });

		// $('.slide-box-article').click(function(event) {
		// 	console.log('asd')	
		// 	$(this).find('.button').click();	
		// }); 
	}


	if ( !$('.brand-item-single').length ) {
		// $(window).bind('touchmove', function(event){
		// 	event.preventDefault();
		// });
	}

	$(".portfolio-work-box .image-box img").panr({
		sensitivity: 50,
		moveTarget: "parent",
		scale: false,
		scaleTo: 1.1,
		scaleDuration: .25,
		panY: true,
		panX: true,
		panDuration: 1.25,
		resetPanOnMouseLeave: true
	});

	// Open sidebar list
	$('.close-service').click(function() {
		TweenMax.to('.click-overlay', .4, { autoAlpha: 0, ease: Power2.easeOut});
		config.userScrolling = false;
		$.address.value("");
	});

	$(document).keyup(function(e) {
	  if (e.keyCode == 27) { $('.close-service').click(); }   // esc
	});

	// Open sidebar list

	function openPopup(event) {
		//event.preventDefault();
		console.log(event);
		var url = $(this).data('service');
		var url =  event.replace("/", '');

		if ( url == "" ) {
			return;
		}

		TweenMax.to('#' + url, .4, { display: "block", autoAlpha: 1, ease: Power2.easeOut});
		config.userScrolling = true;
	}

	

	// User scrolling



    if ( !Modernizr.cssanimations ) {
    	var autoSlideTransTimer = 0;
   	} else {
   		var autoSlideTransTimer = 1000;
   	}

	if ( config.wWidth <= 1024 ) {

		// Slider
	    $('.slider-images').iosSlider({
			snapToChildren: true,
			scrollbar: true,
			desktopClickDrag: true,
			keyboardControls: true,
			scrollbar: true,
			scrollbarLocation: 'bottom',
			scrollbarHeight: '4px',
			frictionCoefficient: 0.9,
			//frictionCoefficient: 0.3,
			elasticPullResistance: 0.9,
			autoSlideTransTimer: autoSlideTransTimer,
			responsiveSlideContainer: false,
			responsiveSlides: false,
			scrollbarHide: false,
			scrollbarBackground: '#fff',
			navPrevSelector: $('.rsArrowLeft'),
			navNextSelector: $('.rsArrowRight'),
			onSlideStart: startSliding,
			onSliderLoaded: sliderLoaded,
			//onSlideComplete: slideChange,
			onSlideChange: slideChange
		});
	} else {
		// Slider
	    $('.slider-images').iosSlider({
			desktopClickDrag: true,
			keyboardControls: true,
			scrollbar: true,
			scrollbarLocation: 'bottom',
			scrollbarHeight: '4px',
			//frictionCoefficient: 0.3,
			elasticPullResistance: 0.7,
			autoSlideTransTimer: autoSlideTransTimer,
			responsiveSlideContainer: false,
			responsiveSlides: false,
			scrollbarHide: false,
			scrollbarBackground: '#fff',
			navPrevSelector: $('.rsArrowLeft'),
			navNextSelector: $('.rsArrowRight'),
			onSlideStart: startSliding,
			onSliderLoaded: sliderLoaded,
			//onSlideComplete: slideChange,
			onSlideChange: slideChange
		});
	}


	function sliderLoaded(args) {
		config.sliderLoaded = true;

		$('.slider-images').addClass('sliderloaded');

		$('.prev-container, .next-container').height(config.wHeight - 70);

		if ( config.isTablet ) {

			$('.slide-item img, .brand-thumb').height(config.wHeight - 50);
		}
		else if ( config.isMobile ) {

			$('.slide-item img, .brand-thumb').height(config.wHeight - 50);
			$('.slider-images').height(config.wHeight - 50);

			$('.merker .slide-item img, .brand-item-single .brand-thumb').height(300);
			$('.merker .slider-images').height(300);

		} else {
			$('.slide-item img, .brand-thumb').height(config.wHeight - 70);

		}

		slideChange(args);



	}

	function startSliding(args) {
		TweenMax.to('.swipe-gesture', .5, { autoAlpha: 0, ease: Power2.easeOut});		
	}


	function slideChange(args) {

		var currentSlideNumber = args.currentSlideNumber;

		$('.slide-item').removeClass('selected');
		$('.slide-item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');

		if ( currentSlideNumber == 1 ) {
			TweenMax.to('.no-touch.opacity .prev-container', 1, { opacity: 0, display: 'none', ease: Power2.easeOut});
			TweenMax.to('.brand-logo-big', 1, { opacity: 1, display: 'block', ease: Power2.easeOut});
		}

		else if ( currentSlideNumber == 2 ) {
			TweenMax.to('.no-touch.opacity .prev-container', 1, { opacity: 1, display: 'block', ease: Power2.easeOut});
			TweenMax.to('.brand-logo-big', 1, { opacity: 0, display: 'none', ease: Power2.easeOut});
		}

		else if ( currentSlideNumber == args.data.numberOfSlides) {
			TweenMax.to('.no-touch.opacity .next-container', 1, { opacity: 0, display: 'none', ease: Power2.easeOut});
		}

		else {
			TweenMax.to('.no-touch.opacity .next-container', 1, { opacity: 1, display: 'block', ease: Power2.easeOut});
		}

	}

	if ( !Modernizr.touch && $('.slider-index').length == 0 ) {

		// User scrolling
		config.userScrolling = false;
		$(document).mousewheel(function(event, delta, deltaX, deltaY) {
	        event.preventDefault();

	        if ( config.userScrolling == false ) {
		        

		        if ( config.userScrolling == false ) {
		        	if (delta > 0.5) {
			        	$('.rsArrowLeft').trigger('click');
			        	config.userScrolling = true;

			        	setTimeout(function() { 
							config.userScrolling = false;
						}, 100);
			        }

			        else if (delta < -0.5) {
			        	$('.rsArrowRight').trigger('click');
			        	config.userScrolling = true;

			        	setTimeout(function() { 
							config.userScrolling = false;
						}, 100);
			        }


			    }

		        return false;
	        }
	    });
	}

	$('.slider-images').iosSlider('update');


}





 // Play video
function resizeWindow() {

	config.wWidth = config.window.width();
	config.wHeight = config.window.height();
	

	// calculate width and height
	var w = $(window).outerWidth(true);
	var h = $(window).outerHeight(true) - 70;
	var h2 = $(window).outerHeight(true) - 44;
	

	var w2 = $(window).width();

	// set video clipping box size
	$("#slideshow, #slideshow .rsContent, #slideshow .video_overlay, #slideshow .fallback, .about-overlay, #services-intro, .services-overlay, .slider-container, .fwh:not(.process .fwh), #about-intro").height(h).width(w);

	$('.slider-images').iosSlider('update');

	if (w2 >= 768) {
		$("#main nav ul").show();
	}

	if ( w2 <= 1024 ) {

		if ( w2 < 1024 ) {
			$("#slideshow, #slideshow .rsContent, #slideshow .video_overlay, #slideshow .fallback, .about-overlay, .fwh:not(.process .fwh), #about-intro").height(600);
			$("#about-intro, .fwh").height(h).width(w);
			$("#our-company-fifthy").height(500);
			$(".caseslideshow #slideshow").height(600);
			$('#scroll').remove();

		}

		if ( w2 < 769 ) {
			$("#services-intro, .services-overlay").height(600);


		}

		if ( w2 < 768 ) {
			$(".slider-container").height(h2);
			$(".caseslideshow #slideshow").height(300);
			$("#slideshow .rsContent").height(300);
			$("#about-intro, .fwh").height('auto').width('auto');
			$("#about-intro").height(500);
		}

		if ( $('.sidenav').length ) {
			//openSidebar ();

			
		$('.sidenav').css({right:"-43px"});
				
	
		}
	}

	if ( w2 > 1024 ) {
		$("#about-intro, .fwh").height(h).width(w);

		$(".sidenav").css({'right': '10%', 'cursor': 'default'});
		//$(".stickybox").css({'right': 'auto'});
	}
		
	if ( $('#fullscreen').hasClass('fullscreen') ) {
		$("#showcase").height(h).width(w);
	} else {
		$("#showcase").height('').width('');
	}




	setTimeout(function(){
		$("#casestudies-work .rsOverflow").height($("#casestudies-work a article").outerHeight() + 20);

		$("#services .rsOverflow").height($("#services a article").outerHeight() + 100);

		$("#blog .rsOverflow").height($("#blog a article").outerHeight() + 20);

		$("#news .rsOverflow").height($("#news a article").outerHeight() + 80); 
	}, 3000);

	// 100% sidebar on case
	if ( !isMobile () ) {
		$(".content_info").height($("#case_content").outerHeight());
		$(".content_info").height($(".content_ws").outerHeight());
	} else {
		$(".content_info").height(400);
	}
	
	//console.log($(".content_ws").outerHeight());
	$("#careers .sidenav").height($("#careers .content_ws").outerHeight());
	$(".sidenav").height($(".content_ws").outerHeight());

	// Mobile
	if ( $('body').hasClass('isMobile')) {
		if ( $('.royalSlider').length ) {
			//$(".royalSlider").height(275);
		}
	}
}



 // Start slideshow
function initSlideshow() {

    resizeWindow();

    if ( $('#slideshow').length ) {

	    if ( !Modernizr.touch ) {
	    	var pagesection1 = $.superscrollorama();
	
			pagesection1.addTween(120, (new TimelineMax()).append([
				TweenMax.fromTo($('.caseslideshow #slideshow'), 1, {css:{y: 0, opacity: 1}, immediateRender:true}, {css:{y: 500, opacity: 0.2}})
			]), 1200);

			var pagesection2 = $.superscrollorama();
	
			pagesection2.addTween(0, (new TimelineMax()).append([
				TweenMax.fromTo('#showcase #slideshow', 1, {css:{y: 0, opacity: 1}, immediateRender:true}, {css:{y: 500, opacity: 0.2}})
			]), 1200);
		}



	// Slideshow
		var slider = $('#slideshow').royalSlider({
		    arrowsNav: true,
		    arrowsNavHideOnTouch: true,
		    loop: false,
		    keyboardNavEnabled: true,
		    controlsInside: false,
		    imageScaleMode: 'fill',
		    arrowsNavAutoHide: true,
		    autoScaleSlider: false, 
		    autoHeight: false,     
		    controlNavigation: 'bullets',
		    thumbsFitInViewport: false,
		    navigateByClick: false,
		    startSlideId: 0,
		    numImagesToPreload: 2,
		    autoPlay: {
	    		// autoplay options go gere
	    		enabled: false,
	    		pauseOnHover: true,
	    		delay: 5000
	    	},
	    	video: {
	    		autoHideControlNav: true,
		    	autoHideBlocks: true
	    	},
		    transitionType:'move',
		    globalCaption: true,
		    slidesSpacing: 0,
		    easeIn: 'easeOutExpo',
		    easeOut: 'easeInExpo',
		    transitionSpeed: 600
		}).data('royalSlider');

		if (!Modernizr.canvas) {
			$('#slideoverlay, #loadingBg').remove();
		}

		slider.ev.on('rsAfterContentSet', function(e, slideObject) {
		    	initVideo();
		    	resizeVideo();

		    	// $('.fullheight').css({
		    	// 	width: "auto",
		    	// 	height: "100%",
		    	// 	marginTop: "0",
		    	// 	marginLeft: "0"
		    	// });
		    	
		    	if (Modernizr.canvas) {
		    		doMask();
		    		TweenLite.to(ogg, 1.0, {myProp: page.w, onComplete: removeMask, ease: Power4.easeIn});
		    	}
		});

	    slider.ev.on('rsAfterSlideChange', function() {
			resizeVideo();
			 
			if ( isAppleIos() ) {
				$(".rsNoDrag").remove();
				return; 
			}

			/////////////////////////////
			// Pause HTML5 video here //
			////////////////////////////		
		});


		$(".playhtml5video").live("click", function(){
			$(this).hide();
		});
	}
}


function initVideo() {

	if ( isAppleIos() ) {
		$(".rsNoDrag").remove();
		return; 
	}

	if ( !$('#video_1585').attr('id') ) {
		return false;
	}

	var video = _V_('video_1585');

	// Developing state
	//video.volume(0);

	video.ready(function(){

		//console.log('Video ready');
		video.play();

		// var howLongIsThis = video.duration();

		// //Video playing
		// video.addEvent("timeupdate", function(){
		// 	//console.log(video.currentTime());
		// 	//console.log(howLongIsThis - 0.5 );
		// 	if ( video.currentTime() >= howLongIsThis - 0.2 ) {
		// 		//console.log('ended time');
		// 		//video.pause();
		// 		video.currentTime(0.1);
		// 		video.play();
		// 	}
		// });
			
		// video.addEvent("ended", function(){
		// 	console.log('Video ended');
		// 	// video.pause();
		// 	// video.currentTime(0);
		// 	// video.play();
		// 	//slider.startAutoPlay();
		// });
	});
}


 // Resize video
function resizeVideo() {

	// get video object
	var $video = $("#slideshow video, #slideshow object, #sky_loop video"); // must test with flash also
	var $flash = false;
	if ($video.parent().find("object").length > 0) $flash = true;

	
	// calculate width and height
	var w = $(window).outerWidth(true);
	var h = $(window).outerHeight(true);
	var vh = 720;//$video.height();
	var vw = 1280;//$video.width();

	if ($("#sky_loop").length) {
		h = $('#about-intro').outerHeight(true) - 71;
		vh = 624;
		vw = 1264;
	}


	// get video size
	
	//var vh = $video.height();
	//var vw = $video.width();
	
	//console.log('Width: ' + vw);
	//console.log('Height: ' + vh);
	
	var ratio = vw / vh;
	
	// calculate new size
	var nh = h;
	var nw = h * ratio;
	
	// is video wide enough to cover screen? 
	if (nw < w) {
		nw = w;
		nh = w / ratio;
		$video.width(nw);
		
		if ($flash) {
			$video.height(nh);
		} else {
			$video.css("height", "auto");
		}
	} else {
		if ($flash) {
			$video.width(nw);
		} else {
			$video.css("width", "auto");
		}		
		
		$video.height(nh);
	}
	
	// offset video so it's positioned in the middle of the available area
	if (nw > w) {
		$video.css("margin-left",-((nw-w) / 2));
		$video.css("margin-top", 0);
	}
	
	if (nh > h) {
		$video.css("margin-top",-((nh-h) / 2));
		$video.css("margin-left",0);
	}

	

	
	// set video clipping box size
	//$("#video_1585, .rsImg").height(h).width(w);
}

// Close sidebar
function closeSidebar () {
	
	$('.sidenav').attr('data-status', 'closed');

	TweenLite.to($('.sidenav'), 0.3, {css:{right:"-250px"}, ease: 'easeInOutExpo'});
	
	if ( $('.stickybox').length ) {
		//TweenLite.to($('.stickybox'), 0.3, {css:{right:"-110px"}, ease: 'easeInOutExpo'});
	}
}

// Open sidebar
function openSidebar () {
	
	$('.sidenav').attr('data-status', 'open');

	TweenLite.to($('.sidenav'), 0.5, {css:{right:"-43px"}, ease: 'easeInOutExpo'});

	if ( $('.stickybox').length ) {
		//TweenLite.to($('.stickybox'), 0.5, {css:{right:"95px"}, ease: 'easeInOutExpo'});
	}
}


 // get feed from twitter profile
function initTwitterStream() {

	// only if twitter-list is present
	if ($(".twitter-list").length == 0) return;
	$(".twitter-list").tweet({
            username: "goodmorningno",
            join_text: "auto",
            count: 4,
            loading_text: "loading tweets...",
            template: "{text}<br />{time}"
        });

	/*
	// get good morning twitter feed, loop and add
	$.getJSON('http://twitter.com/status/user_timeline/goodmorningno.json?count=4&callback=mycallback', function(data) {

		mycallback = function(data){
  alert(data.foo);
};

		$.each(data, function(i, tweet) {
			$(".twitter-list").append('\
					<li>\
						<div class="tweet">\
							' + linkify(tweet.text) + '\
						</div>\
						<em class="date">' + parseTwitterDate(tweet.created_at) + '</em>\
					</li>\
			');
		});
	});*/
}

function parseTwitterDate(dStr) {		
	dStr = dStr.replace("+0000 ", "");
	var d = new Date(dStr);
	return ('0' + d.getDay()).slice(-2) + '.' + ('0'+(d.getMonth()+1)).slice(-2) + "." + d.getFullYear();
}

function linkify(text) {
    text = text.replace(/(https?:\/\/\S+)/gi, function (s) {
        return '<a href="' + s + '">' + s + '</a>';
    });

    text = text.replace(/(^|)@(\w+)/gi, function (s) {
        return '<a href="http://twitter.com/' + s + '">' + s + '</a>';
    });

    text = text.replace(/(^|)#(\w+)/gi, function (s) {
        return '<a href="http://search.twitter.com/search?q=' + s.replace(/#/,'%23') + '">' + s + '</a>';
     });
    return text;
}
 // JavaScript Document