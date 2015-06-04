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

describe('On player creation', function() {
  it('can place 1 ship of size 1', function () {
    player.place('sub', 'A1');
    expect(player.ships.length).toEqual(1)
  });
  it('can place 2 ships of size 1', function () {
    player.place('sub', 'A1');
    player.place('sub', 'A2');
    expect(player.ships.length).toEqual(2)
  });
  it('can place 1 ship of size 2 horizontally', function () {
    player.place('destroyer', 'B1');
    expect(player.ships.length).toEqual(2);
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
            console.log(player.ships)
    console.log(board.grid)
    expect(board.grid[1][0]).toEqual('SUNK');
    expect(board.grid[1][1]).toEqual('SUNK');
  });
});