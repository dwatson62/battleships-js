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
  var error = false;
  coords = this.convert(square);
  console.log(coords)
  if ( coords[0] < 0 || coords[1] > 9 ) {
    throw Error('Cannot place out of bounds')
    return
  }

  for (x = 0; x < this.ships.length; x ++ ) {
    if (this.ships[x].square == square) {
      error = true;
    }
  }
  if(error == true) {
    throw Error('Cannot place on top of another ship')
    return ;
  }

  for (i = 0; i < size; i ++ ) {
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
  for (i = 0; i < player.ships.length; i ++) {
    if (player.ships[i].square == square) {
      player.boardOpponentSees[coords[0]][coords[1]] = 'HIT';
      player.ships[i].status = 'HIT'
      break
    }
    else {
      player.boardOpponentSees[coords[0]][coords[1]] = 'MISS';
    }
  }
  this.isSunk(player);
  this.gameOver(player);
};

Player.prototype.isSunk = function(player) {
  for (i = 0; i < player.ships.length; i ++ ) {
    if (player.ships[i].name == 'sub' && player.ships[i].status == 'HIT') {
      player.sinkIt(player, 'sub');
    }
    else if (player.ships[i].name == 'destroyer' &&  player.ships[i].status == 'HIT' && player.ships[i + 1].status == 'HIT') {
      player.sinkIt(player, 'destroyer');
    }
    else if (player.ships[i].name == 'cruiser' &&  player.ships[i].status == 'HIT' && player.ships[i + 1].status == 'HIT' && player.ships[i + 2].status == 'HIT') {
      player.sinkIt(player, 'cruiser');
    }
    else if (player.ships[i].name == 'battleship' &&  player.ships[i].status == 'HIT' && player.ships[i + 1].status == 'HIT' && player.ships[i + 2].status == 'HIT' && player.ships[i + 3].status == 'HIT') {
      player.sinkIt(player, 'battleship');
    }
    else if (player.ships[i].name == 'carrier' &&  player.ships[i].status == 'HIT' && player.ships[i + 1].status == 'HIT' && player.ships[i + 2].status == 'HIT' && player.ships[i + 3].status == 'HIT' && player.ships[i + 4].status == 'HIT') {
      player.sinkIt(player, 'carrier');
    }
  }
};

Player.prototype.sinkIt = function(player, ship) {
  for (x = 0; x < player.ships.length; x ++ ) {
    if (player.ships[x].name == ship) {
      player.ships[x].status = 'SUNK'
      coords = this.convert(player.ships[x].square)
      player.boardOpponentSees[coords[0]][coords[1]] = 'SUNK';
    }
  }
};

Player.prototype.gameOver = function(player) {
  for(x = 0; x < player.ships.length; x ++) {
    if (player.ships[x].status != 'SUNK') {
      this.won = false;
      break;
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
  else if ( square.length > 2 ) {
    throw Error ('Cannot place out of bounds')
    return
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