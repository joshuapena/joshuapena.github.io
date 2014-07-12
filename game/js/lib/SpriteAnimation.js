"use strict";

var SpriteAnimation = function(spriteNamePrefix, numberOfSprites, startFrame, delay) {
	this.spriteNamePrefix = spriteNamePrefix;
	this.numberOfSprites = numberOfSprites + startFrame;
	this.delay = delay;
	this.startFrame = startFrame;
	
	this.currentFrame = this.startFrame;
	this.drawCounter = 0;
};

SpriteAnimation.prototype.draw = function(x, y, drawSprite) {
	if (this.currentFrame >= this.numberOfSprites) {
		this.currentFrame = this.startFrame;
	}
	drawSprite(this.spriteNamePrefix + this.currentFrame, x, y);
	if (this.drawCounter === this.delay || this.delay === 0) {
		this.currentFrame++;
		this.drawCounter = 0;
	}
	this.drawCounter++;
};
