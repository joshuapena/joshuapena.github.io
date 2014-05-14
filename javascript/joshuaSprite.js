/*
Up : 38
Down : 40
Right : 39
Left : 37
Enter : 13
SpaceBar : 32
Shift : 16
*/

var walk;
walk = false

function walking() {
	$(".joshua").css("width", "80px");
	$(".joshua").css("background-image", "url(../image/jpg/joshua-sprite-walk.jpg)");
	$(".joshua").css("-webkit-animation-name", "joshua-sprite-walk");
}

function idle() {
	$(".joshua").css("width", "88px");
	$(".joshua").css("background-image", "url(../image/jpg/joshua-sprite-idle.jpg)");
	$(".joshua").css("-webkit-animation-name", "joshua-sprite-idle");
}

/*
$(".joshua").click(function() {
	if (!walk) {
		walking()
		walk = true;
	} else {
		idle();
		walk = false
	}
});
*/

$(document).keydown(function(e) {
	//var element = $(".joshua");
	if(e.keyCode == 39) {
		//alert("hi");
		walking();
	}
});

$(document).keyup(function(e) {
	if(e.keyCode == 39) {
		idle();
	}
});
