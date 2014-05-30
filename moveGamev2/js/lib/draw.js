"use strict";

var draw = function(world) {
	world.drawRectangle("#EEE", 0, 0, world.width, world.height);
	
	world.players.forEach(function(gameElement) {
		gameElement.draw();
	});
}