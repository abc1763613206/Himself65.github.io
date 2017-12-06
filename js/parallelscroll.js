var img = $("img");
var imgRect = $("#clip")[0].getBoundingClientRect();

var imgToTop  = imgRect.top;
var imgHeight = imgRect.height;
var winHeight = window.innerHeight;

// enter and leave position
var enterPos = imgToTop - winHeight;
var leavePos = imgToTop + imgHeight;

// update the image's offset according to the window's scroll distance
function moveImage(scrollDist) {
	var rate = (scrollDist - enterPos) / (leavePos - enterPos) - 0.5;
  rate = Math.max(Math.min(rate, 0.5), -0.5);
  
  img.css("transform", "translateY(" + (rate * 200) + "px)");
}

// bind the window scroll event
$(window).on('scroll', function (event) {
	moveImage(window.scrollY);
});