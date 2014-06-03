"use strict";

var World = function(context, options, sprites) {
	this.ctx = context;
	this.width = options.width;
	this.height = options.height;
	this.sprites = sprites;
	
	this.players = [];
	this.enemies = [];
	this.boss = [];
	this.bullets = [];
	this.healthBars = [];
};

World.prototype.addPlayer = function(player) {
	this.players.push(player);
};

World.prototype.drawSprite = function(spriteName, x, y, width, height) {
	this.ctx.drawImage(this.sprites[spriteName], x, y, width, height);
};

World.prototype.cropSprite = function(spriteName, cropX, cropY, cropWidth, cropHeight, x, y, width, height) {
	this.ctx.drawImage(this.sprites[spriteName], cropX, cropY, cropWidth, cropHeight, x, y, width, height);
};

World.prototype.drawRectangle = function(color, x, y, width, height) {
	this.ctx.fillStyle = color;
	this.ctx.fillRect(x, y, width, height);
};

World.prototype.drawText = function(text, x, y) {
	this.ctx.fillStyle = "#EEE";
	this.ctx.font = "50px Ubunto Mono";
	this.ctx.fillText(text, x, y);
};