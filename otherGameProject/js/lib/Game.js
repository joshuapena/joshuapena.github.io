var Game = function(canvas, sprites, audio, Explosion) {
	this.fps = 60;
	var canvas = canvas;
    console.log(sprites);
	this.ctx = canvas.getContext("2d");
	this.sprites = sprites;
	this.audio = audio;
	this.explosion = Explosion;
		
	var worldOptions = {
		width : canvas.width,
		height : canvas.height
	};
	
	this.world = new World(this.ctx, worldOptions, this.sprites);
	
	this.world.addPlayer(new Player(this.world, Bullet, this.audio));

    this.world.backgrounds.push(new Background(this.world, 0));
    this.world.backgrounds.push(new Background(this.world, 200));
    this.world.backgrounds.push(new Background(this.world, 400));
    this.world.backgrounds.push(new Background(this.world, this.world.width));
	
	var game = this;
	
	//this.audio[this.backgroundSound].loop();
	//this.audio[this.backgroundSound].volume = 10;
	//this.audio[this.backgroundSound].play();
	
	var gameloop = setInterval(function() {
		collider(game);
		update(game, Bullet, audio, Explosion);
		draw(game.world);
	}, 1000 / this.fps);
};
