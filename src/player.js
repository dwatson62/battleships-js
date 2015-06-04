function Ship(name, square) {
  this.name = name;
  this.square = square;
  this.status = 'FLOATING';
};

function Player() {
  this.ships = [];
};

Player.prototype.place = function(ship, square, direction) {
  if (ship == 'sub') {
    sub = new Ship('sub', square);
    this.ships.push(sub);
  }
  else if (ship == 'destroyer') { this.placeDestroyer(square, direction) }
  else if (ship == 'cruiser') { this.placeCruiser(square, direction) }
};

Player.prototype.placeDestroyer = function(square, direction) {
  for (i = 1; i < 3; i ++ ) {
    destroyer = new Ship('destroyer', square);
    this.ships.push(destroyer);
    if (direction == 'V') { square = this.nextVerticalSquare(square); }
    else { square = this.nextHorizontalSquare(square); }
  }
};

Player.prototype.placeCruiser = function(square, direction) {
  for (i = 1; i < 4; i ++ ) {
    cruiser = new Ship('cruiser', square);
    this.ships.push(cruiser);
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

Player.prototype.isSunk = function(coords) {
  for (i = 0; i < this.ships.length; i ++ ) {
    if (this.ships[i].name == 'sub' && this.ships[i].status == 'HIT') {
      this.ships[i].status = 'SUNK';
      board.grid[coords[0]][coords[1]] = 'SUNK';
    }
    else if (this.ships[i].name == 'destroyer' && this.ships[i].status == 'HIT' && this.ships[i + 1].status == 'HIT') {
      for (j = i; j < 3; j ++) {
        this.ships[j].status = 'SUNK';
        coords = this.convert(this.ships[j].square)
        board.grid[coords[0]][coords[1]] = 'SUNK';
      }
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