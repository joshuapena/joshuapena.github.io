"use strict";

var Platform = function(world, options) {
	this.world = world;
	this.color = options.color || "#EEE";
	
	this.x = options.x;
	this.y = options.y;
	this.width = options.width || 50;
	this.height = options.height || 5;
	
	this.active = true;
	
	this.hitbox = {
		x: this.x,
		y: this.y,
		width: this.width,
		height: this.height
	}
};

Platform.prototype.update = function() {
};

Platform.prototype.draw = function() {
	this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
};