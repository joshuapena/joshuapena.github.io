"use strict";

// Stages
var nextStage = false;
var minionTime = true;
var bossTime = false;
var round = 1;

var update = function (game, CatEnemy, Bullet, audio) {

	[game.world.platforms,
	game.world.enemies,
	game.world.bullets
	].forEach (
		function(gameElementArray) {
			gameElementArray.forEach(function(gameElement) {
				gameElement.update();
			});
		}
	);
	
	game.world.players.forEach(
		function(player) {
			game.world.boss.forEach (
				function(boss) {
					if (boss.lives < 1) {
						round++;
						minionTime = true;
						player.kills = 20;
						nextStage = false;
					}
					boss.update(player);
				}
			);
			game.world.arms.forEach (
				function(arm) {
					arm.update();
				}
			);
			player.update();
			if (player.kills > 22) {
				nextStage = true;
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
	
	if (minionTime && round == 0) {
		if (Math.random() < 0.02) {
			if (Math.random() < 0.1) {
			} else {
				if (Math.random() < 0.8) {
					game.world.enemies.push(new CatEnemy(game.world, "right"));
				} else {
					game.world.enemies.push(new CatEnemy(game.world, "left"));
				}
			}
		}
		if (nextStage) {
			nextStage = false;
			bossTime = true;
			minionTime = false;
		}
	} else if (bossTime && round == 0) {
		game.world.boss.push(new CatBoss(game.world, Bullet, audio));
		
		audio["casanova"].stop();
		audio["pokemonRuby"].loop();
		audio["pokemonRuby"].setVolume(20);
		audio["pokemonRuby"].play();
		bossTime = false;
	} else if (minionTime && round == 1) {
		if (Math.random() < 0.02) {
			if (Math.random() < 0.1) {
			} else {
				if (Math.random() < 0.8) {
					game.world.enemies.push(new QuadrapusEnemy(game.world, {
						//spriteName: "enemyQuadrapus",
						side: "left"
					}));
				} else {
					game.world.enemies.push(new QuadrapusEnemy(game.world, {
						//spriteName: "enemyQuadrapus",
						side: "right"
					}));
				}
			}
		}
		
		audio["pokemonRuby"].stop();
		/*
		audio["underTheSea"].loop();
		audio["underTheSea"].play();
		*/
		
		if (nextStage) {
			bossTime = true;
			minionTime = false;
			nextStage = false;
		}
	} else if (bossTime && round == 1) {
		game.world.boss.push(new QuadrapusBoss(game.world, Bullet, audio));
		game.world.platforms.push(new Platform(game.world, {
			x: 75,
			y: 250,
		}));
		game.world.platforms.push(new Platform(game.world, {
			x: 475,
			y: 250,
		}));
		game.world.platforms.push(new Platform(game.world, {
			x: 50,
			y: 191,
		}));
		game.world.platforms.push(new Platform(game.world, {
			x: 500,
			y: 191,
		}));
		
		/*
		audio["underTheSea"].stop();
		audio["itsPossible"].setVolume(100);
		audio["itsPossible"].loop();
		audio["itsPossible"].play();
		*/
		bossTime = false;
	} else if (minionTime && round == 2) {
		if (Math.random() < 0.02) {
			if (Math.random() < 0.1) {
			} else {
				if (Math.random() < 0.8) {
					game.world.enemies.push(new QuadrapusEnemy(game.world, {
						//spriteName: "enemyQuadrapus",
						side: "left"
					}));
				} else {
					game.world.enemies.push(new QuadrapusEnemy(game.world, {
						//spriteName: "enemyQuadrapus",
						side: "right"
					}));
				}
			}
		}
		
		if (nextStage) {
			bossTime = true;
			minionTime = false;
			nextStage = false;
		}
	} else if (bossTime && round == 2) {
		game.world.boss.push(new FrogBoss(game.world, Bullet, audio));
		
		bossTime = false;
	} else if (minionTime && round == 3) {
		if (Math.random() < 0.02) {
			if (Math.random() < 0.1) {
			} else {
				if (Math.random() < 0.8) {
					game.world.enemies.push(new QuadrapusEnemy(game.world, {
						//spriteName: "enemyQuadrapus",
						side: "left"
					}));
				} else {
					game.world.enemies.push(new QuadrapusEnemy(game.world, {
						//spriteName: "enemyQuadrapus",
						side: "right"
					}));
				}
			}
		}
		
		if (nextStage) {
			bossTime = true;
			minionTime = false;
			nextStage = false;
		}
	} else if (bossTime && round == 3) {
		game.world.boss.push(new StarfishBoss(game.world, Bullet, audio));
		
		bossTime = false;
	} else if (minionTime && round== 4) {
		game.world.end = true;
	}
};
