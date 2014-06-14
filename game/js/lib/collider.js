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
		
		game.world.boss.forEach(function(boss) {
			if (collides(bullet, boss)) {
				boss.explode("bullet");
				bullet.explode("boss");
			}
		});
	});

	game.world.players.forEach(function(player) {
		game.world.enemies.forEach(function(enemy) {
			if (collides(player, enemy)) {
				player.explode(2);
				enemy.explode("player");
			}
		});
		
		game.world.boss.forEach(function(boss) {
			if (collides(player, boss)) {
				player.explode(5);
				boss.explode("player");
			}
		});
	});
};

var collides = function(source, target) {
	var lethal = false;
	if (source.hasOwnProperty("owner") && target.hasOwnProperty("type")) {
		lethal = (source.owner == "player" && target.type == "enemy") ||
				 (source.owner == "player" && target.type == "boss") ||
				 (source.owner == "enemy" && target.type == "player") ||
				 (source.owner == "enemy" && target.type == "boss") ||
				 (source.owner == "boss" && target.type == "player") ||
				 (source.owner == "boss" && target.type == "enemy");
	} else {
		lethal = true;
	}
	
	if (source.hasOwnProperty("owner") && target.hasOwnProperty("owner") && source.owner == target.owner) {
		lethal = false;
	}
	
	return source.hitbox.x < target.hitbox.x + target.hitbox.width &&
		   source.hitbox.x + source.hitbox.width > target.hitbox.x &&
		   source.hitbox.y < target.hitbox.y + target.hitbox.height &&
		   source.hitbox.y + source.hitbox.height > target.hitbox.y &&
		   lethal;
};
