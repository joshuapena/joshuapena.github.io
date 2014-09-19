"use strict";

// Stages

var enemyReady = true;

var update = function (game, Bullet, audio, Explosion) {

	[
        game.world.enemies,
        game.world.bullets,
        game.world.explosions,
        game.world.backgrounds
	].forEach (
		function(gameElementArray) {
			gameElementArray.forEach(function(gameElement) {
				gameElement.update();
			});
		}
	);
	
	game.world.players.forEach(
		function(player) {
			player.update();
		}
	);

    game.world.players = game.world.players.filter(function(player) {
        return player.active;
    });
	
	game.world.enemies = game.world.enemies.filter(function(enemy) {
		return enemy.active;
	});
	
	game.world.bullets = game.world.bullets.filter(function(bullet) {
		return bullet.active;
	});

    game.world.explosions = game.world.explosions.filter(function(explosion) {
		return explosion.active;
	});
	
    game.world.backgrounds = game.world.backgrounds.filter(function(background) {
		return background.active;
	});

    if (game.world.backgrounds.length < 4) {
        game.world.backgrounds.push(new Background(game.world, game.world.width));
    }

	if (game.world.players.length < 1) {
       game.world.died = true; 
        
	} else {
        if (enemyReady) {
            if (Math.random() < 0.02) {
                if (Math.random() < 0.1) {
                } else {
                    enemyReady = false;
                    if (Math.random() < 0.8) {
                        game.world.enemies.push(new Enemy(game.world, "slow"));
                    } else {
                        game.world.enemies.push(new Enemy(game.world, "fast"));
                    }

                    setTimeout(function() {
                        enemyReady = true;
                    }, 700);
                }
            }
        }
	}
};
