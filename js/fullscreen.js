var iOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/);
var safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

if(iOS || safari){
  function iosVhHeightBug() {
    var wH = $(window).height();
    var wW = $(window).width();
    $("#header").css('height', wH);
    $("#header").css('width', wW);
  }
  setTimeout(function(){
    iosVhHeightBug();
  }, 1000);
  $(window).bind('resize', iosVhHeightBug);
}