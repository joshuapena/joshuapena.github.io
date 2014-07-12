"use strict";

var HealthBar = function(world, owner, options) {
	this.world = world;
	this.x = options.x;
	this.y = 20;
	this.width = 200;
	this.height = 10;
	this.owner = owner;
	this.totalHealth = options.lives;
	this.currentHealth = this.totalHealth;
	this.lostHealth = 0;
};

HealthBar.prototype.update = function(currentLives) {
	this.currentHealth = currentLives * this.width / this.totalHealth;
};

HealthBar.prototype.draw = function() {
	this.lostHealth = this.width - this.currentHealth;
	this.world.drawRectangle("#14F548", this.x, this.y, this.currentHealth, this.height);
	this.world.drawRectangle("#F51414", this.x + this.width, this.y, -this.lostHealth, this.height);
};
