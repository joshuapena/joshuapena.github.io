var collider = function(game) {
	game.world.bullets.forEach(function(bullet) {
		game.world.bullets.forEach(function(otherBullet) {
			if (collides( bullet, otherBullet)) {
				bullet.explode("bullet");
				otherBullet.explode("bullet");
			}
		});
		
		game.world.enemies.forEach(function(enemy) {
			if (collides(bullet, enemy)) {
				enemy.explode("bullet");
				bullet.explode("enemy");
			}
		});
		
		game.world.players.forEach(function(player) {
			if (collides(bullet, player)) {
				player.explode(1);
				bullet.explode("player");
			}
		});
	});

	game.world.enemies.forEach(function(enemy) {
		game.world.players.forEach(function(player) {
			if (collides(enemy, player)) {
				enemy.explode("player");
				player.explode(5);
			}
		});
	});
};

var collides = function(source, target) {
	var lethal = false;
	if (source.hasOwnProperty("owner") && target.hasOwnProperty("type")) {
		lethal = (source.owner == "player" && target.type == "enemy") ||
			(source.owner == "enemy" && target.type == "player");
	} else {
		lethal = true;
	}
	
	if (source.hasOwnProperty("owner") && target.hasOwnProperty("owner") && source.owner == target.owner) {
		lethal = false;
	}
	
	return source.x < target.x + target.width &&
		source.x + source.width > target.x &&
		source.y < target.y + target.height &&
		source.y + source.height > target.y &&
		lethal;
};