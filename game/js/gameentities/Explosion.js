"use strict";

var Explosion = function(world, audio, options) {
	this.world = world;
	this.audio = audio;
	this.animation = new SpriteAnimation('explosion/explosion-', 17, 0, 1);
	this.x = options.x;
	this.y = options.y;
	this.width = options.width || 71;
	this.height = options.height || 71;
	this.loops = 0;
	this.active = true;
	this.parent = options.parent;

    this.hitboxMetrics = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
    };

    this.hitbox = {
        x: this.x + this.hitboxMetrics.x,
        y: this.y + this.hitboxMetrics.y,
        width: this.hitboxMetrics.width,
        height: this.hitboxMetrics.height
    };
};

Explosion.prototype.update = function() {
	this.active = (this.loops < 17);
	if (!this.active) {
		this.parent.cannonFired = false;
	}
	this.loops++;

    this.updateHitbox();
};

Explosion.prototype.draw = function() {
	var that = this;
	this.animation.draw(this.x, this.y, function(spriteName, x, y) {
		that.world.drawSprite(spriteName, x, y, that.width, that.height);
	});
};

Explosion.prototype.explode = function() {
	//this.active = false;
};

Explosion.prototype.updateHitbox = function() {
    this.hitbox = {
        x: this.x + this.hitboxMetrics.x,
        y: this.y + this.hitboxMetrics.y,
        width: this.hitboxMetrics.width,
        height: this.hitboxMetrics.height
    };
};
