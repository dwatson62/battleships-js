beforeEach(function() {
  board = new Board;
  player = new Player;
});

describe('Can create a board at start of the game', function () {
  it('of 10 rows', function () {
    expect(board.grid.length).toEqual(10);
  });

  it('with each row having ten squares', function () {
    expect(board.grid[9].length).toEqual(10);
  })
});

describe('Player can place', function() {
  it('1 ship of size 1', function () {
    player.placeShip('sub', 'A1', 1);
    expect(player.ships.length).toEqual(1)
  });
  it('1 ship of size 2 horizontally', function () {
    player.placeShip('destroyer', 'B1', 2);
    expect(player.ships.length).toEqual(2);
  });
  it('1 ship of size 2 vertically', function () {
    player.placeShip('destroyer', 'B1', 2, 'V');
    expect(player.ships.length).toEqual(2);
  });
  it('1 ship of size 3 horizontally', function () {
    player.placeShip('cruiser', 'C1', 3);
    expect(player.ships.length).toEqual(3);
  });
  it('1 ship of size 3 vertically', function () {
    player.placeShip('cruiser', 'C1', 3, 'V');
    expect(player.ships.length).toEqual(3);
  });
  it('1 ship of size 4 horizontally', function () {
    player.placeShip('battleship', 'D1', 4);
    expect(player.ships.length).toEqual(4);
  });
  it('1 ship of size 4 vertically', function () {
    player.placeShip('battleship', 'D1', 4, 'V');
    expect(player.ships.length).toEqual(4);
  });
  it('1 ship of size 5 horizontally', function () {
    player.placeShip('carrier', 'E1', 5);
    expect(player.ships.length).toEqual(5);
  });
  it('1 ship of size 5 vertically', function () {
    player.placeShip('carrier', 'E1', 5, 'V');
    expect(player.ships.length).toEqual(5);
  });
});

describe('Player can fire', function () {

  beforeEach(function() {
    player.placeShip('sub', 'A1', 1);
    player.placeShip('destroyer', 'B1', 2);
  });

  it('at A2 square and miss', function () {
    player.fire(board, 'A2');
    expect(board.grid[0][1]).toEqual('MISS');
  });

  it('at F3 square and miss', function () {
    player.fire(board, 'F3');
    expect(board.grid[5][2]).toEqual('MISS');
  });

  it('at A10 square and miss', function () {
    player.fire(board, 'A10');
    expect(board.grid[0][9]).toEqual('MISS');
  });

  it('at B1 and hit', function () {
    player.fire(board, 'B1');
    expect(board.grid[1][0]).toEqual('HIT');
  });

});

describe('Player can sink', function () {

  beforeEach(function() {
    player.placeShip('sub', 'A1', 1);
    player.placeShip('cruiser', 'C1', 3);
    player.placeShip('destroyer', 'B1', 2);
    player.placeShip('battleship', 'D1', 4);
    player.placeShip('carrier', 'E1', 5);
  });

  it('the sub', function () {
    player.fire(board, 'A1');
    expect(board.grid[0][0]).toEqual('SUNK');
  });

  it('the destroyer', function () {
    player.fire(board, 'B1');
    player.fire(board, 'B2');
    expect(board.grid[1][0]).toEqual('SUNK');
    expect(board.grid[1][1]).toEqual('SUNK');
  });

  it('the cruiser', function () {
    player.fire(board, 'C1');
    player.fire(board, 'C2');
    player.fire(board, 'C3');
    expect(board.grid[2][0]).toEqual('SUNK');
    expect(board.grid[2][1]).toEqual('SUNK');
    expect(board.grid[2][2]).toEqual('SUNK');
  });

  it('the battleship', function () {
    player.fire(board, 'D1');
    player.fire(board, 'D2');
    player.fire(board, 'D3');
    player.fire(board, 'D4');
    expect(board.grid[3][0]).toEqual('SUNK');
    expect(board.grid[3][1]).toEqual('SUNK');
    expect(board.grid[3][2]).toEqual('SUNK');
    expect(board.grid[3][3]).toEqual('SUNK');
  });

  it('the carrier', function () {
    player.fire(board, 'E1');
    player.fire(board, 'E2');
    player.fire(board, 'E3');
    player.fire(board, 'E4');
    player.fire(board, 'E5');
    expect(board.grid[4][0]).toEqual('SUNK');
    expect(board.grid[4][1]).toEqual('SUNK');
    expect(board.grid[4][2]).toEqual('SUNK');
    expect(board.grid[4][3]).toEqual('SUNK');
    expect(board.grid[4][4]).toEqual('SUNK');
  });

  it('the carrier when vertical too', function () {
    player.placeShip('carrier', 'A10', 5, 'V')
    player.fire(board, 'A10');
    player.fire(board, 'B10');
    player.fire(board, 'C10');
    player.fire(board, 'D10');
    player.fire(board, 'E10');
    expect(board.grid[0][9]).toEqual('SUNK');
    expect(board.grid[1][9]).toEqual('SUNK');
    expect(board.grid[2][9]).toEqual('SUNK');
    expect(board.grid[3][9]).toEqual('SUNK');
    expect(board.grid[4][9]).toEqual('SUNK');
  });

});

describe('Player can win the game', function () {

  beforeEach(function() {
    player.placeShip('sub', 'A1', 1);
    player.placeShip('cruiser', 'C1', 3);
  });

  it('by sinking all ships', function () {
    player.fire(board, 'A1');
    player.fire(board, 'C1');
    player.fire(board, 'C2');
    expect(player.fire(board, 'C3')).toEqual('Game Over!');
  });
});