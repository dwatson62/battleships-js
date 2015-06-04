function Player() {
  this.ships = []
};

Player.prototype.place = function(ship, square) {
  this.ships.push([ship, square]);
};

Player.prototype.fire = function(board, square) {
  var coords = this.convert(square);
  for (i = 0; i < this.ships.length; i ++) {
    if (this.ships[i][1] == square) {
      board.grid[coords[0]][coords[1]] = 'HIT';
      break
    }
    else {
      board.grid[coords[0]][coords[1]] = 'MISS';
    }
  }
};

Player.prototype.convert = function(square) {
  var alphabet = new Array();
  var letter = 'A';
  var result = []
  for (i = 0; i < 10; i ++) {
    alphabet[i] = letter;
    letter = String.fromCharCode(letter.charCodeAt() + 1)
  }
  if (square.includes('10')) {
    result[0] = square.charAt(0);
    result[1] = '10'
  }
  else { result = square.split('',2) }
  coords = [alphabet.indexOf(result[0])];
  result = parseInt(result[1]);
  coords.push(result - 1);
  return coords;
};