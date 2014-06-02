var collider = function(game) {
	game.world.bullets.forEach(function(bullet) {
		game.world.enemies.forEach(function(enemy) {
			if (collides(bullet, enemy)) {
				enemy.explode();
				bullet.explode("enemy");
			}
		});
	});

	game.world.enemies.forEach(function(enemy) {
		game.world.players.forEach(function(player) {
			if (collides(enemy, player)) {
				enemy.explode();
				player.explode();
			}
		});
	});
};

var collides = function(source, target) {
	var lethal = false;
	if (source.hasOwnProperty("owner") && target.hasOwnProperty("type")) {
		lethan = (source.owner == "player" && target.type == "enemy") ||
			(source.owner == "enemy" && target.type == "player");
	} else {
		lethal = true;
	}
	
	if (source.hasOwnProperty("owner") && target.hasOwnProperty("owner") && source.ownder == target.owner) {
		lethal = false;
	}
	
	return source.x < target.x + target.width &&
		source.x + source.width > target.x &&
		source.y < target.y + target.height &&
		source.y + source.height > target.y &&
		lethal;
};