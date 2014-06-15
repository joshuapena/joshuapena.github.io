"use strict";

var draw = function(world) {
	//world.drawRectangle("#EEE", 0, 0, world.width, world.height);
	world.drawSprite("turtleWithACrown", 0, 0, world.width, world.height);
	
	[world.platforms,
	world.enemies,
	world.bullets, 
	world.boss,
	world.arms,
	world.players
	].forEach (
		function (gameElementArray) {
			gameElementArray.forEach(function(gameElement) {
				world.ctx.globalAlpha = 1.0;
				gameElement.draw();
			});
		}
	);
}
