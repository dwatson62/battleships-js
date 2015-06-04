function Player() {
  this.ships = [];
};

Player.prototype.place = function(ship, square) {
  if (ship.name == 'sub') {
    this.ships.push([ship.name, square]);
  }
  else if (ship.name == 'destroyer') {
    this.ships.push([ship.name, square]);
    square = this.nextHorizontalSquare(square);
    this.ships.push([ship.name, square]);
  }
};

Player.prototype.fire = function(board, square) {
  var coords = this.convert(square);
  for (i = 0; i < this.ships.length; i ++) {
    if (this.ships[i][1] == square) {
      board.grid[coords[0]][coords[1]] = 'HIT';
      this.ships[i][1] = 'HIT'
      break
    }
    else {
      board.grid[coords[0]][coords[1]] = 'MISS';
    }
  }
  this.isSunk(coords);
};

Player.prototype.isSunk = function(coords) {
  for (i = 0; i < this.ships.length; i ++ ) {
    if (this.ships[i] == 'sub,HIT') {
      this.ships[i][1] = 'SUNK';
      board.grid[coords[0]][coords[1]] = 'SUNK';
    }
    else if (this.ships[i] == 'destroyer,HIT' && this.ships[i + 1] == 'destroyer,HIT') {
      this.ships[i][1] = 'SUNK';
      this.ships[i + 1][1] = 'SUNK';
      console.log(this.ships)
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