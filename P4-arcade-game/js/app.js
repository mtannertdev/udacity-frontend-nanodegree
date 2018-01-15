'use strict';

// Enemies our player must avoid
var Enemy = function(x, y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.minSpeed = 100;
	this.maxSpeed = 200;
	this.speed = Math.floor(Math.random()*(this.maxSpeed - this.minSpeed + 1) + this.minSpeed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// First, update the location
	this.x += this.speed * dt;
	
	// Now. check location and reset and speed as needed
	if (this.x >= 500) {
		this.x = -100;
		this.speed = Math.floor(Math.random()*(this.maxSpeed - this.minSpeed + 1) + this.minSpeed);
	}
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// The player does not need a starting position, it is set to the same each time
var Player = function() {
	this.startPositionX = 202;
	this.startPositionY = 394;
	this.x = this.startPositionX;
	this.y = this.startPositionY;
	
	// This array contains:
	// [0] the sprite name
	// [1] # pixels of whitespace on the left
	// [2] # pixels of whitespace on the right
	this.spriteArray = [
		["images/char-boy.png", 17, 17],
		["images/char-cat-girl.png", 17, 16],
		["images/char-horn-girl.png", 6, 17],
		["images/char-pink-girl.png", 13, 12],
		["images/char-princess-girl.png", 13, 13]
	]
	var spriteIndex = Math.floor(Math.random()*5 + 0);
	this.sprite = this.spriteArray[spriteIndex][0];
	this.spriteSpaceLeft = this.spriteArray[spriteIndex][1];
	this.spriteSpaceRight = this.spriteArray[spriteIndex][2];
	
	this.score = 0;
	this.highScore = 0;
};

Player.prototype.update = function() {
	for (var i = 0; i < allEnemies.length; i++) {
		// Check to see if the player has reached water, reset as needed
		if (this.y < 0) {
			// Player made it to water, so reset location and increment score
			this.resetToStartPosition();
			this.score += 1;
		}
		// Now check to see if the player is colliding with a bug
		if (this.y == allEnemies[i].y) {
			// Player is on the same Y-axis as this bug, so check the x-axis dimensions
			// Include the spacing on either side of the sprite in calcuations
			if ((this.x < allEnemies[i].x + 101 - this.spriteSpaceLeft - 5) && (this.x + 101 - this.spriteSpaceRight - 4 > allEnemies[i].x)) {
				// Player hit a bug, so reset position and score, update high score as needed
				this.resetToStartPosition();
				if (this.score > this.highScore) {
					this.highScore = this.score;
				}
				this.score = 0;
			}
		}
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	// Custom additions to the rendering to display scores
	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + this.score,10,575);
	ctx.fillText("High Score: " + this.highScore,360,575);
};

Player.prototype.handleInput = function(key) {
	// make sure player is within boundaries of canvas
	// make player move with appropriate keyboard key presse
	if (key == 'up') {
		if (this.y > -29) {
			this.y -= 83;
		}
	} else if (key == 'down') {
		if (this.y < 375) {
			this.y += 83;
		}
	} else if (key == 'left') {
		if (this.x > 0) {
			this.x -= 101;
		}
	} else if (key == 'right') {
		if (this.x < 400) {
			this.x += 101;
		}
	}
};

Player.prototype.resetToStartPosition = function() {
	this.x = this.startPositionX;
	this.y = this.startPositionY;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
	new Enemy(0, 62),
	new Enemy(0, 145),
	new Enemy(0, 228)
];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
