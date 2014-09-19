"use strict";

var World = function(context, options, sprites) {
	this.ctx = context;
	this.width = options.width;
	this.height = options.height;
	this.sprites = sprites;
	
	this.players = [];
	this.enemies = [];
	this.bullets = [];
	this.explosions = [];
    this.backgrounds = [];
	
    this.died = false;
	this.end = false;
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

World.prototype.drawCircle = function(color, x, y, radius, start, stop) {
	this.ctx.beginPath();
	this.ctx.arc(x, y, radius, start, stop);
	this.ctx.closePath();
	this.ctx.fillStyle = color;
	this.ctx.stroke();
};

World.prototype.drawPolygon = function(color, lines, points) {
	this.ctx.fillStyle = color;
	this.ctx.beginPath();
	this.ctx.moveTo(points.x0, points.y0);
	/*
	for (var i = 1; i < lines; i++) {
		this.ctx.lineTo(points.x + i, points.y + i);
	}
	*/
	this.ctx.lineTo(points.x1, points.y1);
	this.ctx.lineTo(points.x2, points.y2);
	this.ctx.lineTo(points.x3, points.y3);
	this.ctx.closePath();
	this.ctx.fill();
};
