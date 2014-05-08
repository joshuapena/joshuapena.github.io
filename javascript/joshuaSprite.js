/*
Up : 38
Down : 40
Right : 39
Left : 37
Enter : 13
SpaceBar : 32
Shift : 16
*/

$(document).keydown(function(e) {
	var element = $(".joshua");
	if(e.keyCode == 32) {
		alert("hi");
	}
});

$(document).ready(function() {
	alert("hi");
});
