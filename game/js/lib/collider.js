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
		
		game.world.arms.forEach(function(arm) {
			if (collides(bullet, arm)) {
				arm.explode("bullet");
				if (this.parent === null) {
				} else {
					//arm.parent.explode("bullet");
					if (this.child === "one") {
						this.parent.thirdStarfishOne = true;
					} else {
						this.parent.thirdStarfishTwo = true;
					}
				}
				bullet.explode("arm");
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
		game.world.arms.forEach(function(arm) {
			if (collides(player, arm)) {
				player.explode(3);
				arm.explode("player");
			}
		});
		
		game.world.platforms.forEach(function(platform) {
			if (collides(player, platform)) {
				if (player.jumpDown == true) {
					player.jumping = false;
					player.y = platform.y - player.height;
					player.velY = 0;
				}
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
