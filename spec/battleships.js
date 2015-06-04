beforeEach(function() {
  board = new Board;
  player = new Player;
  ship = new Ship;
});

describe('Can create a board at start of the game', function () {
  it('of 10 rows', function () {
    expect(board.grid.length).toEqual(10);
  });

  it('with each row having ten squares', function () {
    expect(board.grid[9].length).toEqual(10);
  })
});

describe('On player creation', function() {
  it('has 1 available ship of size 1 to place', function () {
    player.place(ship, 'A1');
    expect(player.ships).toEqual([ship, 'A1'])
  });
});

describe('Player can fire', function () {

  beforeEach(function() {
    player.place(ship, 'A1');
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
});