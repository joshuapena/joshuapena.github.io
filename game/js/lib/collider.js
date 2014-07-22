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

        game.world.explosions.forEach(function(explosion) {
            if (collides(bullet, explosion)) {
                explosion.explode();
                bullet.explode("explosion");
            }
        });
		
		game.world.addOn.forEach(function(arm) {
			if (collides(bullet, arm)) {
				arm.explode("bullet");
				bullet.explode("arm");
				if (this.parent === null) {
				} else {
                    if (arm.parent) {
					  arm.parent.explode("bullet");
                    }
					if (this.child === "one") {
						this.parent.thirdStarfishOne = true;
					} else {
						this.parent.thirdStarfishTwo = true;
					}
				}
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
		game.world.addOn.forEach(function(arm) {
			if (collides(player, arm)) {
				player.explode(3, arm.object);
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

		// Add collider between Explosion and Player
        game.world.explosions.forEach(function(explosion) {
            if (collides(player, explosion)) {
                player.explode(5);
                explosion.explode();
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
