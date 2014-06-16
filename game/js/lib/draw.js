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
	
	if (world.end) {
		world.ctx.globalAlpha = 0.4;
		world.ctx.fillStyle = "#333";
		world.ctx.fillRect(0, 0, 600, 300);
		world.ctx.fillStyle = "#FFF";
		world.ctx.font = "50px Ubuntu Mono";
		world.ctx.globalAlpha = 1.0;
		world.ctx.fillText("You Win", 200, 150);
	}
}
