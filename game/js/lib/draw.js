"use strict";

var draw = function(world) {
	//world.drawRectangle("#EEE", 0, 0, world.width, world.height);
	world.drawSprite("turtleWithACrown", 0, 0, world.width, world.height);
	
	[world.enemies,
	world.players,
	world.bullets, 
	world.boss
	].forEach (
		function (gameElementArray) {
			gameElementArray.forEach(function(gameElement) {
				gameElement.draw();
			});
		}
	);
}