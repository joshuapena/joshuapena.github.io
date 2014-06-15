"use strict";

var QuadrapusBoss = function(world, Bullet, audio) {
	this.world = world;
	
	this.spriteName = null;//"quadrapusBoss";
	this.Bullet = Bullet;
	this.audio = audio;
	
	this.type = "boss";
	this.active = true;
	this.width = 114;
	this.height = 114;
	this.x = this.world.width / 2 - this.width / 2;
	this.y = this.world.height - this.height - 60;
	
	this.lives = 30;
	this.alive = true;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 114,
		height: 114
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
	
	this.armUpperRight = new QuadrapusArm(this.world, Bullet, {
		x: this.x + this.width,
		y: this.y + 40,
		width: 100,
		side: "right",
		section: "upper"
	}, this.audio);
	this.armUpperLeft = new QuadrapusArm(this.world, Bullet, {
		x: this.x - 100,
		y: this.y + 40,
		width: 100,
		side: "left",
		section: "upper"
	}, this.audio);
	this.armLowerRight = new QuadrapusArm(this.world, Bullet, {
		x: this.x + this.width,
		y: this.y + 100,
		width: 80,
		side: "right",
		section: "lower"
	}, this.audio);
	this.armLowerLeft = new QuadrapusArm(this.world, Bullet, {
		x: this.x - 80,
		y: this.y + 100,
		width: 80,
		side: "left",
		section: "lower"
	}, this.audio);
	
	this.world.arms.push(this.armUpperRight, this.armUpperLeft, this.armLowerRight, this.armLowerLeft);
	
	this.healthBar = new HealthBar(world, this, {
		x: 350,
		lives: this.lives
	});
};

QuadrapusBoss.prototype.update = function () {
	if (Math.random() < 0.5) {
		if (Math.random() < 0.5) {
			if (Math.random() < 0.015) {
				this.armUpperRight.shotArc(0, Math.PI, Math.PI / 8);
			} else if (Math.random() < 0.02) {
				this.shotCircle();
			}
		} else {
			if (Math.random() < 0.015) {
				this.armUpperLeft.shotArc(0, Math.PI, Math.PI / 8);
			} else if (Math.random() < 0.02) {
				this.shotCircle();
			}
		}
	} else {
		if (Math.random() < 0.5) {
			if (Math.random() < 0.015) {
				this.armLowerRight.shotArc(Math.PI / 2, -Math.PI / 2, -Math.PI / 8);
			} else if (Math.random() < 0.02) {
				this.shotCircle();
			}
		} else {
			if (Math.random() < 0.015) {
				this.armLowerLeft.shotArc(Math.PI / 2, 3 * Math.PI / 2, Math.PI / 8);
			} else if (Math.random() < 0.02) {
				this.shotCircle();
			}
		}
	}

	if (this.alive) {
		this.healthBar.update(this.lives);
		this.updateHitbox();
	}
};

QuadrapusBoss.prototype.draw = function() {
	if (this.alive) {
		if (this.spriteName === null) {
			this.world.drawRectangle("#580058", this.x, this.y, this.width, this.height);
		} else {
			this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
		}
		this.healthBar.draw();
	}
};

QuadrapusBoss.prototype.shotCircle = function() {
	for (var i = 0; i < 2 * Math.PI; i += Math.PI / 8) {
		this.world.bullets.push(
			new this.Bullet(this.world, {
				x: (this.x + this.width / 2),
				y: (this.y + this.height / 2),
				width: 20,
				height: 20,
				hitboxMetrics: {
					x: 0,
					y: 0,
					width: 20,
					height: 20
				},
				angle: i,
				speed: 5,
				acceleration: 0.1,
				owner: this.type
			}, this.audio
		));
	}
};

QuadrapusBoss.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

QuadrapusBoss.prototype.explode = function(source) {
	if (source === "bullet") {
		this.lives--;
	}
	
	if (this.lives < 1) {
		this.active = false;
	}
};
