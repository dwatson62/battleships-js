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
    player.place('sub', 'A1');
    expect(player.ships.length).toEqual(1)
  });
  it('1 ship of size 2 horizontally', function () {
    player.place('destroyer', 'B1');
    expect(player.ships.length).toEqual(2);
    console.log(player.ships)
  });
  it('1 ship of size 2 vertically', function () {
    player.place('destroyer', 'B1', 'V');
    expect(player.ships.length).toEqual(2);
  });
  it('1 ship of size 3 horizontally', function () {
    player.place('cruiser', 'C1');
    expect(player.ships.length).toEqual(3);
  });
  it('1 ship of size 3 vertically', function () {
    player.place('cruiser', 'C1', 'V');
    expect(player.ships.length).toEqual(3);
  });
  it('1 ship of size 4 horizontally', function () {
    player.place('battleship', 'D1');
    expect(player.ships.length).toEqual(4);
  });
  it('1 ship of size 4 vertically', function () {
    player.place('battleship', 'D1', 'V');
    expect(player.ships.length).toEqual(4);
  });
  it('1 ship of size 5 horizontally', function () {
    player.place('carrier', 'E1');
    expect(player.ships.length).toEqual(5);
  });
  it('1 ship of size 5 vertically', function () {
    player.place('carrier', 'E1', 'V');
    expect(player.ships.length).toEqual(5);
  });
});

describe('Player can fire', function () {

  beforeEach(function() {
    player.place('sub', 'A1');
    player.place('destroyer', 'B1');
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

  it('at A1 and sink the sub', function () {
    player.fire(board, 'A1');
    expect(board.grid[0][0]).toEqual('SUNK');
  });

  it('at B1 and B2 and sink the destroyer', function () {
    player.fire(board, 'B1');
    player.fire(board, 'B2');
    expect(board.grid[1][0]).toEqual('SUNK');
    expect(board.grid[1][1]).toEqual('SUNK');
  });
});