var realPhoto;
realPhoto = false;
var photoClicked = 0;

function enterPage() {
	var name;
	name = $("#name").val();
	$("#nameText").fadeOut();
	$("#name").fadeOut();
	$("#enter").fadeOut();
	$("#welcome").html("Welcome " + name);
	$("#info").fadeIn();
	$("body").css("background-color", "#EEE");
	$("#welcome").css("font-size", "16pt");
	$("#welcome").css("font-family", "Ubuntu Mono");
}

function collatzConjecture() {
	var x = parseInt($("#collatzInital").value);
	//x = 23;
	alert(x);
	$("#output").html(x);
};

$("#mePhoto").click(function() {
	if (!realPhoto) {
		$("#mePhoto").attr("src", "image/jpg/frame.jpg");
		if (photoClicked < 1) {
			$("#myPhotoText").html("Another Picture of Me");
			photoClicked++;
		} else {
			$("#myPhotoText").html("Frame");
		}
		realPhoto = true;
	} else {
		$("#mePhoto").attr("src", "image/jpg/stickFigure.jpg");
		if (photoClicked < 2) {
			$("#myPhotoText").html("And Another");
			photoClicked++;
		} else {
			$("#myPhotoText").html("Stick Figure");
		}
		realPhoto = false;
	}
});
