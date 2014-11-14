var Game = function(canvas, sprites, audio, Explosion) {
	this.fps = 60;
	var canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sprites = sprites;
	this.audio = audio;
	this.explosion = Explosion;
	this.backgroundSound = "casanova";
		
	var worldOptions = {
		width : canvas.width,
		height : canvas.height
	};
	
	this.world = new World(this.ctx, worldOptions, this.sprites);
	
	this.world.addPlayer(new Player(this.world, Bullet, this.audio));
	
	var game = this;
	
	var gameloop = setInterval(function() {
		collider(game);
		update(game, CatEnemy, Bullet, audio, Explosion);
		draw(game.world);
	}, 1000 / this.fps);
}
