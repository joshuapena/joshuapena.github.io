"use strict";

var bossTime = false;
var bossOn = false;

var update = function (game, Enemy, Bullet, audio) {

	[game.world.enemies,
	game.world.players,
	game.world.bullets,
	game.world.boss
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
		game.world.enemies.push(new Boss(game.world, Bullet, audio));
		bossTime = false;
		bossOn = true;
		audio["casanova"].stop();
		audio["pokemonRuby"].loop();
		audio["pokemonRuby"].volume = 30;
		audio["pokemonRuby"].play();
	} else if (bossTime && bossOn) {
		//document.write("foo");
	}
};
