"use strict";

var start = function() {
	document.getElementById("world").style.display = "inline";
	document.getElementById("startButton").style.display = "none";
	
	var sprites = initGame();
	
	var game = new Game(document.getElementById("world"), sprites);
}

function initGame() {
	var spriteLoader = new SpriteLoader();
	var sprites = {};
	var spriteNames = ["enemy", "turtleWithACrown", "coverTurtleWithACrown"];
	for (var i = 1; i < 7; i++) {
		spriteNames.push("connor/connorL" + i);
		spriteNames.push("connor/connorR" + i);
	}
	spriteLoader.load("./assets/images", spriteNames, ".png", function (loadedSprites) {
		for (var spriteName in loadedSprites) {
			sprites[spriteName] = loadedSprites[spriteName];
		}
	});
	
	return sprites;
}