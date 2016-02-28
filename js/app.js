// Math used for generating an enemy's speed at random.
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    
    // The initial location of the enemy.
    this.x = -100*getRandomIntInclusive(1,15);
    this.y = -20+getRandomIntInclusive(1,3)*83;
    
    // The speed of the enemy.
    this.speed = getRandomIntInclusive(100,375);
    console.log(this.speed);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 600) {
        this.x = this.x+dt*this.speed;
    }
    else {
        this.x = -100*getRandomIntInclusive(1,6);
        this.y = -20+getRandomIntInclusive(1,3)*83;
        this.speed = getRandomIntInclusive(200,500);
    };
    this.locationX = Math.round(Math.round(this.x) / 101);
    this.locationY = (this.y+20)/83;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
}

Player.prototype.update = function() {
    this.x = player.locationX*101;
    this.y = player.locationY*83-11;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyInput) {
    if (keyInput==="left" && this.locationX>0) {
        this.locationX--;
    }
    else if (keyInput==="up" && this.locationY>0) {
        this.locationY--;
    }
    else if (keyInput==="right" && this.locationX<4) {
        this.locationX++;
    }
    else if (keyInput==="down" && this.locationY<5) {
        this.locationY++;
    }
    return;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(),new Enemy(), new Enemy()];
// Place the player object in a variable called player
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
