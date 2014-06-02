"use strict";

var update = function (game, Enemy, Bullet) {
	[game.world.enemies,
	game.world.players,
	game.world.bullets
	].forEach (
		function(gameElementArray) {
			gameElementArray.forEach(function(gameElement) {
				gameElement.update();
			});
		}
	);
	
	game.world.enemies = game.world.enemies.filter(function(enemy) {
		return enemy.active;
	});
	
	game.world.bullets = game.world.bullets.filter(function(bullet) {
		return bullet.active;
	});
	
	if (Math.random() < 0.02) {
		if (Math.random() < 0.1) {
		} else {
			if (Math.random() < 0.8) {
				game.world.enemies.push(new Enemy(game.world, "right"));
			} else {
				game.world.enemies.push(new Enemy(game.world, "left"));
			}
		}
	}
}