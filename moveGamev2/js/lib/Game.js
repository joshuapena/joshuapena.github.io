var Game = function(canvas, sprites) {
	this.fps = 60;
	var canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sprites = sprites;
	
	var worldOptions = {
		width : canvas.width,
		height : canvas.height
	};
	
	this.world = new World(this.ctx, worldOptions, this.sprites);
	
	this.world.addPlayer(new Player(this.world));;
	
	var game = this;
	
	var gameloop = setInterval(function() {
		update(game);
		draw(game.world);
	}, 1000 / this.fps);
}