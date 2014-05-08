/*
Up : 38
Down : 40
Right : 39
Left : 37
Enter : 13
SpaceBar : 32
Shift : 16
*/

var walking;

$(document).keydown(function(e) {
	//var element = $(".joshua");
	if(e.keyCode == 32) {
		//alert("hi");
		$(".joshua").css("width", "80px");
		$(".joshua").css("background-image", "url(../image/joshua-sprite-walk.png)";
		$(".joshua").css("-webkit-animation-name", "joshua-sprite-walk");
	}
});

$(document).keyup(function(e) {
	if(e.keyCode == 32) {
		$(".joshua").css("width", "88px");
		$(".joshua").css("-webkit-animation-name", "joshua-sprite-idle");
	}
});
