function Ship(name, square) {
  this.name = name;
  this.square = square;
  this.status = 'FLOATING';
};

function Player() {
  this.ships = [];
  this.ownBoard = this.emptyBoard();
  this.boardOpponentSees = this.emptyBoard();
  this.won = false;
};

function Board() {
  this.board = this.createBoard();
}

Board.prototype.createBoard = function() {
  var board = new Array();
  var letter = 'A';
  for (i = 0; i < 10; i ++) {
    board[i] = new Array();
    for (j = 0; j < 10; j ++) {
      board[i][j] = letter + (j + 1);
    }
    letter = String.fromCharCode(letter.charCodeAt() + 1)
  }
  return board;
};

Player.prototype.emptyBoard = function() {
  var board = new Array();
  for (i = 0; i < 10; i ++) {
    board[i] = new Array();
    for (j = 0; j < 10; j ++) {
      board[i][j] = '-';
    }
  }
  return board;
};

Player.prototype.placeShip = function(name, square, size, direction) {
  size ++;
  for (i = 1; i < size; i ++ ) {
    this.ships.push(new Ship(name, square));
    if (direction == 'V') { square = this.nextVerticalSquare(square); }
    else { square = this.nextHorizontalSquare(square); }
  }
  this.updateBoard();
};

Player.prototype.updateBoard = function() {
  for (x = 0; x < this.ships.length; x ++ ) {
    coords = this.convert(this.ships[x].square);
    this.ownBoard[coords[0]][coords[1]] = 'SHIP';
  };
};

Player.prototype.fire = function(player, square) {
  var coords = this.convert(square);
  for (i = 0; i < this.ships.length; i ++) {
    if (this.ships[i].square == square) {
      player.boardOpponentSees[coords[0]][coords[1]] = 'HIT';
      this.ships[i].status = 'HIT'
      break
    }
    else {
      player.boardOpponentSees[coords[0]][coords[1]] = 'MISS';
    }
  }
  this.isSunk(player);
  return this.gameOver();
};

Player.prototype.isSunk = function(player) {
  for (i = 0; i < this.ships.length; i ++ ) {
    if (this.ships[i].name == 'sub' && this.ships[i].status == 'HIT') {
      this.sinkIt(player, 'sub');
    }
    else if (this.ships[i].name == 'destroyer' &&  this.ships[i].status == 'HIT' && this.ships[i + 1].status == 'HIT') {
      this.sinkIt(player, 'destroyer');
    }
    else if (this.ships[i].name == 'cruiser' &&  this.ships[i].status == 'HIT' && this.ships[i + 1].status == 'HIT' && this.ships[i + 2].status == 'HIT') {
      this.sinkIt(player, 'cruiser');
    }
    else if (this.ships[i].name == 'battleship' &&  this.ships[i].status == 'HIT' && this.ships[i + 1].status == 'HIT' && this.ships[i + 2].status == 'HIT' && this.ships[i + 3].status == 'HIT') {
      this.sinkIt(player, 'battleship');
    }
    else if (this.ships[i].name == 'carrier' &&  this.ships[i].status == 'HIT' && this.ships[i + 1].status == 'HIT' && this.ships[i + 2].status == 'HIT' && this.ships[i + 3].status == 'HIT' && this.ships[i + 4].status == 'HIT') {
      this.sinkIt(player, 'carrier');
    }
  }
  return this.gameOver();
};

Player.prototype.sinkIt = function(player, ship) {
  for (x = 0; x < this.ships.length; x ++ ) {
    if (this.ships[x].name == ship) {
      this.ships[x].status = 'SUNK'
      coords = this.convert(this.ships[x].square)
      player.boardOpponentSees[coords[0]][coords[1]] = 'SUNK';
    }
  }
};

Player.prototype.gameOver = function() {
  for(x = 0; x < this.ships.length; x ++) {
    if (this.ships[x].status != 'SUNK') {
      break
    }
    this.won = true;
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