"use strict";

var bossTime = false;
var bossOn = false;

var update = function (game, Enemy, Bullet, audio) {

	[game.world.platforms,
	game.world.enemies,
	game.world.boss,
	game.world.players,
	game.world.bullets
	].forEach (
		function(gameElementArray) {
			gameElementArray.forEach(function(gameElement) {
				gameElement.update();
			});
		}
	);
	
	game.world.players.forEach(
		function(gameElement) {
			if (gameElement.kills > 22) {
				bossTime = true;
			}
		}
	);
	
	game.world.enemies = game.world.enemies.filter(function(enemy) {
		return enemy.active;
	});
	
	game.world.bullets = game.world.bullets.filter(function(bullet) {
		return bullet.active;
	});
	
	game.world.boss = game.world.boss.filter(function(boss) {
		return boss.active;
	});
	
	game.world.arms = game.world.arms.filter(function(arm) {
		return arm.active;
	});
	
	game.world.platforms = game.world.platforms.filter(function(platform) {
		return platform.active;
	});
	
	if (!bossTime && !bossOn) {
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
	} else if (bossTime && !bossOn) {
		game.world.boss.push(new QuadrapusBoss(game.world, Bullet, audio));
		game.world.platforms.push(new Platform(game.world, {
			x: 125,
			y: 250,
		}));
		game.world.platforms.push(new Platform(game.world, {
			x: 425,
			y: 250,
		}));
		game.world.platforms.push(new Platform(game.world, {
			x: 100,
			y: 191,
		}));
		game.world.platforms.push(new Platform(game.world, {
			x: 450,
			y: 191,
		}));
		bossTime = false;
		bossOn = true;
		audio["casanova"].stop();
		audio["pokemonRuby"].loop();
		audio["pokemonRuby"].volume = 30;
		audio["pokemonRuby"].play();
	} else if (bossTime && bossOn) {
	}
};
