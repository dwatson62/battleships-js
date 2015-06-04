beforeEach(function() {
  board = new Board;
  player = new Player;
  sub = new Ship('sub');
  destroyer = new Ship('destroyer');
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
    player.place(sub, 'A1');
    expect(player.ships).toEqual([[sub, 'A1']])
  });
  it('can place 2 ships of size 1', function () {
    player.place(sub, 'A1');
    player.place(sub, 'B1');
    expect(player.ships).toEqual([[sub, 'A1'], [sub, 'B1']])
  });
  it('can place 1 ship of size 2 horizontally', function () {
    player.place(destroyer, 'B1');
    expect(player.ships).toEqual([[destroyer, 'B1'], [destroyer, 'B2']]);
  });
});

describe('Player can fire', function () {

  beforeEach(function() {
    player.place(sub, 'A1');
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

  it('at A1 and hit', function () {
    player.fire(board, 'A1');
    expect(board.grid[0][0]).toEqual('HIT');
  });
});