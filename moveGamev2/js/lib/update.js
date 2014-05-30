"use strict";

var update = function (game) {
	game.world.players.forEach(function(gameElement) {
		gameElement.update();
	});
}