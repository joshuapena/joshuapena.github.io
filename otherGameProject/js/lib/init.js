"use strict";

var start = function() {
	document.getElementById("world").style.display = "inline";
	document.getElementById("startButton").style.display = "none";
	
	var sprites = initGame();
	var audio = initSound();
	
	var game = new Game(document.getElementById("world"), sprites, audio, Explosion);
}

function initGame() {
	var spriteLoader = new SpriteLoader();
	var sprites = {};
	var spriteNames = ["enemy", "background"];
	for (var i = 0; i < 5; i++) {
		spriteNames.push("joshua/joshua" + i);
	}
	for (i = 0; i < 17; i++) {
		spriteNames.push("explosion/explosion-" + i);
	}
    for (i = 0; i < 3; i++) {
        spriteNames.push("bullet/bullet-" + i);
    }
	spriteLoader.load("./assets/images", spriteNames, ".png", function (loadedSprites) {
		for (var spriteName in loadedSprites) {
			sprites[spriteName] = loadedSprites[spriteName];
		}
	});
	
	return sprites;
}

function initSound() {
	var soundLoader = new SoundLoader();
	var audio = {};
	var audioNames = [];
	var extensions = [];
	soundLoader.load("./assets/sounds", audioNames, extensions, function (loadedAudio) {
		for (var audioName in loadedAudio) {
			audio[audioName] = loadedAudio[audioName];
			audio[audioName].setVolume(20);
		}
	});
	return audio;
}
