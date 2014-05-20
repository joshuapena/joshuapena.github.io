var realPhoto;
realPhoto = false;
var photoClicked = 0;
var number = Math.floor(Math.random() * 10) + 1;
var numGuess = 9;
var guess;

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

function guessGame() {
	guess = $("#guessInput").val();
	if (guess > number) {
		$("#guessAnswer").html("Too High. " + numGuess + " more guesses.");
	} else if (guess < number) {
		$("#guessAnswer").html("Too Low. " + numGuess + " more guesses.");
	}
	if (guess == number) {
		$("#guessAnswer").html("Correct.")
		numGuess = 10;
		number = Math.floor(Math.random() * 10) + 1;
	} else if (numGuess == 0) {
		$("#guessAnswer").html("You lose");
		numGuess = 10;
		number = Math.floor(Math.random() * 10) + 1;
	}
	numGuess--;
}

function collatzPrint() {
	var x = $("#collatzInital").val();
	var sizeCollatz;
	if (isNaN(x)) {
		var start = 10;
		var seqOutput = collatz(start);
		sizeCollatz = seqOutput.length;
		$("#outputCollatz").html("Usage : collatz starting-number (default is 10)\n"
			 + seqOutput + "\ncollatz(%d) has %d items", start, sizeCollatz);
	} else {
		var start = $("#collatzInital").val();
		var seqOutput = collatz(start);
		$("#output").html(seqOutput + "collatz(%d) has %d items", start, sizeCollatz);
	}
};

function collatz(x) {
	var seq = [x];
	while (x > 1) {
		if (x % 2 === 0) {
			x = x / 2;
		} else {
			x = 3 * x + 1;
		}
		seq.push(x);
	}
	return seq;
}

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

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}