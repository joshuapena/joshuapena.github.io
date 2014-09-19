"use strict";

var Background = function(world, x) {
    this.world = world;
    this.spriteName = "background";
    this.x = x;
    this.y = 0;
    this.width = 200;
    this.height = 300;
    this.velX = -2;
    this.active = true;
};

Background.prototype.update = function() {
    this.x += this.velX;

    if (this.x < -this.width + 5) {
        this.active = false;
    }
};

Background.prototype.draw = function() {
    this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
};
