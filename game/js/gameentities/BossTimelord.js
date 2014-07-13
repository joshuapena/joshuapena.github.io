"use strict";

var TimelordBoss = function(world, Bullet, audio, Explosion) {
    console.log("WHAT TIME IS IT?");
    this.world = world;
    this.Explosion = Explosion;

    this.spriteName = null;
    this.Bullet = Bullet;
    this.audio = audio;

    this.type = "boss";
    this.active = true;
    this.width = 80;
    this.height = 80;
    this.x = this.world.width / 2 - this.width / 2;
    this.y = -this.height;

    this.velX = 0;
    this.velY = 0;
    this.speed = 1;

    this.hitboxMetrics = {
        x: 0,
        y: 0,
        width: 80,
        height: 80
    };

    this.hitbox = {
        x: this.x + this.hitboxMetrics.x,
        y: this.y + this.hitboxMetrics.y,
        width: this.hitboxMetrics.width,
        height: this.hitboxMetrics.height
    };

    this.lives = 40;

    this.healthBar = new HealthBar(world, this, {
        x: 350,
        lives: this.lives
    });
};

TimelordBoss.prototype.update = function(player) {
    if (player.x + player.width / 2 < this.x + this.width / 2) {
        if (this.velX > -this.speed) {
            this.velX--;
        }
    } else if (player.x + player.width / 2 > this.x + this.width / 2) {
        if (this.velX < this.speed) {
            this.velX++;
        }
    }

    if (player.y + player.height / 2 > this.y + this.height / 2){
        if (this.velY < this.speed) {
            this.velY++;
        }
    } else if (player.y + player.height / 2 < this.y + this.height / 2) {
        if (this.velY > -this.speed) {
            this.velY--;
        }
    }

    this.x += this.velX;
    this.y += this.velY;
    console.log(this.x + " " + this.y);

    this.healthBar.update(this.lives);
    this.updateHitbox();
};

TimelordBoss.prototype.draw = function() {
    this.world.drawRectangle("#FFFF00", this.x, this.y, this.width, this.height);

    this.healthBar.draw();
};

TimelordBoss.prototype.explode = function(source) {
    if (source === "bullet") {
        this.lives--;
    }

    if (this.lives < 1) {
        this.active = false;
    }
};

TimelordBoss.prototype.updateHitbox = function() {
    this.hitbox = {
        x: this.x + this.hitboxMetrics.x,
        y: this.y + this.hitboxMetrics.y,
        width: this.hitboxMetrics.width,
        height: this.hitboxMetrics.height
    };
};
