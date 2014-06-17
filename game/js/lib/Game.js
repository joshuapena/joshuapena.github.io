"use strict";
var Game = function(canvas, sprites, audio) {
	this.fps = 60;
	var canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sprites = sprites;
	this.audio = audio;
	this.backgroundSound = "casanova";
		
	var worldOptions = {
		width : canvas.width,
		height : canvas.height
	};
	
	this.world = new World(this.ctx, worldOptions, this.sprites);
	
	this.world.addPlayer(new Player(this.world, Bullet, this.audio));
	
	var game = this;
	
	this.audio[this.backgroundSound].loop();
	this.audio[this.backgroundSound].play();
	
	var gameloop = setInterval(function() {
		collider(game);
		update(game, CatEnemy, Bullet, audio);
		draw(game.world);
	}, 1000 / this.fps);
}
