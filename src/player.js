function Ship(name, square) {
  this.name = name;
  this.square = square;
  this.status = 'FLOATING';
};

function Player() {
  this.ships = [];
};

Player.prototype.placeShip = function(name, square, size, direction) {
  size ++;
  for (i = 1; i < size; i ++ ) {
    this.ships.push(new Ship(name, square));
    if (direction == 'V') { square = this.nextVerticalSquare(square); }
    else { square = this.nextHorizontalSquare(square); }
  }
};

Player.prototype.fire = function(board, square) {
  var coords = this.convert(square);
  for (i = 0; i < this.ships.length; i ++) {
    if (this.ships[i].square == square) {
      board.grid[coords[0]][coords[1]] = 'HIT';
      this.ships[i].status = 'HIT'
      break
    }
    else {
      board.grid[coords[0]][coords[1]] = 'MISS';
    }
  }
  this.isSunk(coords);
};

Player.prototype.isSunk = function() {
  for (i = 0; i < this.ships.length; i ++ ) {
    if (this.ships[i].name == 'sub' && this.ships[i].status == 'HIT') {
      this.sinkIt('sub');
    }
    else if (this.ships[i].name == 'destroyer' &&  this.ships[i].status == 'HIT' && this.ships[i + 1].status == 'HIT') {
      this.sinkIt('destroyer');
    }
    else if (this.ships[i].name == 'cruiser' &&  this.ships[i].status == 'HIT' && this.ships[i + 1].status == 'HIT' && this.ships[i + 2].status == 'HIT') {
      this.sinkIt('cruiser');
    }
    else if (this.ships[i].name == 'battleship' &&  this.ships[i].status == 'HIT' && this.ships[i + 1].status == 'HIT' && this.ships[i + 2].status == 'HIT' && this.ships[i + 3].status == 'HIT') {
      this.sinkIt('battleship');
    }
    else if (this.ships[i].name == 'carrier' &&  this.ships[i].status == 'HIT' && this.ships[i + 1].status == 'HIT' && this.ships[i + 2].status == 'HIT' && this.ships[i + 3].status == 'HIT' && this.ships[i + 4].status == 'HIT') {
      this.sinkIt('carrier');
    }
  }
};

Player.prototype.sinkIt = function(ship) {
  for (x = 0; x < this.ships.length; x ++ ) {
    if (this.ships[x].name == ship) {
      this.ships[x].status = 'SUNK'
      coords = this.convert(this.ships[x].square)
      board.grid[coords[0]][coords[1]] = 'SUNK';
    }
  }
};

Player.prototype.convert = function(square) {
  result = this.splitSquare(square)
  var alphabet = new Array();
  var letter = 'A';
  for (i = 0; i < 10; i ++) {
    alphabet[i] = letter;
    letter = String.fromCharCode(letter.charCodeAt() + 1)
  }

  coords = [alphabet.indexOf(result[0])];
  result = parseInt(result[1]);
  coords.push(result - 1);
  return coords;
};

Player.prototype.splitSquare = function(square) {
  var result = [];
  if (square.includes('10')) {
    result[0] = square.charAt(0);
    result[1] = '10';
  }
  else { result = square.split('',2) }
  return result;
};

Player.prototype.nextHorizontalSquare = function(square) {
  result = this.splitSquare(square);
  result[1] = String.fromCharCode(result[1].charCodeAt() + 1)
  return result.join('');
};

Player.prototype.nextVerticalSquare = function(square) {
  result = this.splitSquare(square);
  result[0] = String.fromCharCode(result[0].charCodeAt() + 1)
  return result.join('');
};