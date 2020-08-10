

 $(document).ready(function(){
   $('a[href*=#].arrow-up, .top-header .logo a[href*=#], .header-bottom a[href*=#], a[href*=#].nav-services').bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top
      }, 1400);
      e.preventDefault();
   });
   return false;
});

  

 

$(function(){
$('.parallax-window').parallax({imageSrc: 'images/paralax-question.jpg'});
$('.parallax-story').parallax({imageSrc: 'images/bg-our-story.jpg'});
		});
		


	/*Fancybox*/
$(document).ready(function(){

            var forms = $('.form-modal'),
            cb_input = forms.find('input[type=text], input[type=email], input[type=tel] , textarea'),
            cr_close = $.fancybox.close();

    $("#fancybox-overlay").fancybox({
        padding: [0, 0, 0, 0],
        margin: [120, 0, 0, 0],
        scrolling: 'visible',
        minWidth: 315,
        minHeight: 330,
        autoSize: false,
        autoHeight: true,
        autoWidth: true,
        maxWidth: 9999,
        maxHeight: 9999,
        fixed: false,
        autoCenter: false,
        closeBtn: true,
        afterClose: function () {
            cb_input.val('');
        }
    });

    $('.btr').click(function () {
        $.fancybox.close();
    });
	
   });
/*Fancybox end*/  


		
		//   $("a[href$='.jpg'], a[href$='.png']")
//           .addClass("fancybox");
          
           $("a[href$='.jpg'], a[href$='.png']").each(function() {
      $(this).addClass("fancybox");
       $(this).attr('rel', 'gallery');
     
});
 $(".fancybox").fancybox({
        padding: [0, 0, 0, 0],
        openEffect: 'elastic',
        openSpeed: 300,
//        closeEffect: 'elastic',
//        scrolling: 'visible',
         background:'white',
        maxWidth: 800,
		arrows: false,
        fixed: false,
        autoCenter: false,
     
    });
	
	 $('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
    })
	
	



var map;
var egglabs = new google.maps.LatLng(50.4504996602356, 30.51102876663208);
var mapCoordinates = new google.maps.LatLng(50.4504996602356, 30.51102876663208);


var markers = [];
var image = new google.maps.MarkerImage(
    'images/ico-marker.png',
    new google.maps.Size(101,82),
    new google.maps.Point(0,0),
    new google.maps.Point(42,56)
	
  );

function addMarker() 
{
      markers.push(new google.maps.Marker({
      position: egglabs,
      raiseOnDrag: false,
	  icon: image,
      map: map,
      draggable: false,
	
	  
      }));
      
}

function initialize() {
  var mapOptions = {
	
    zoom: 15,
	disableDefaultUI: false,
    center: mapCoordinates,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	  scrollwheel: false,
	styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text.stroke","stylers":[{"gamma":"5.10"},{"invert_lightness":true}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#3db8e0"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#3db8e0"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]}]
    
  };
map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
addMarker();

}
google.maps.event.addDomListener(window, 'load', initialize);



/*placeholder*/
$(document).ready(function(){
        $.Placeholder.init({ color : "#939393" });
 });
 
 var html = document.documentElement;
var rAF, target = 0, scroll = 0;

onmousewheel = function(e) {
  e.preventDefault();
  var scrollEnd = html.scrollHeight - html.clientHeight;
  target += (e.wheelDelta > 0) ? -120 : 120;
  if (target < 0) target = 0;
  if (target > scrollEnd) target = scrollEnd;
  if (!rAF) rAF = requestAnimationFrame(animate);
};

onscroll = function() {
  if (rAF) return;
  target = pageYOffset || html.scrollTop;
  scroll = target;
};

function animate() {
  scroll += (target - scroll) * 0.06;
  if (Math.abs(scroll.toFixed(5) - target) <= 0.47131) {
    cancelAnimationFrame(rAF);
    rAF = false;
  }
  scrollTo(0, scroll);
  if (rAF) rAF = requestAnimationFrame(animate);
}
 

	$(document).ready(function(){
			$('#myParallax1').parallax({ focusZ:100}); 
			$('#myParallax2').parallax({ focusZ:100, height:714,
			sensitivityX:.1,
	sensitivityY: 0,}); 
	$('#myParallax3').parallax({ focusZ:50}); 
		});
		
	
	(function($){
	'use strict';

	var DO = function(o, e){
		$(o).html('');
	};

	$('.portfolio-total .portfolio-work-box, #reviews .jcarousel ul li, .portfolio-list .portfolio-work-box, .our-offer-gradient').on('click', function(e){
		DO(this, e);
	});

	$('.portfolio-total .portfolio-work-box, #reviews .jcarousel ul li, .portfolio-list .portfolio-work-box, .our-offer-gradient').on('tap', function(e){
		DO(this, e);
	});
})(jQuery);

	function windowSize(){
  if ($(window).width() < '479')
  {
    $('.footer-copyright').detach().insertAfter('.logo-footer'),
	 $('.footer-copyright').detach().insertAfter('.social');
  } 
 
}
	
$(window).load(windowSize); 
$(window).resize(windowSize);
