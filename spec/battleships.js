beforeEach(function() {
  player1 = new Player;
  player2 = new Player;
});

describe('Can create a board at start of the game', function () {
  it('of 10 rows', function () {
    expect(player1.ownBoard.length).toEqual(10);
  });

  it('with each row having ten squares', function () {
    expect(player1.ownBoard.length).toEqual(10);
  })
});

describe('Player can place', function() {
  it('1 ship of size 1', function () {
    player1.placeShip('sub', 'A1', 1);
    expect(player1.ships.length).toEqual(1)
  });
  it('1 ship of size 2 horizontally', function () {
    player1.placeShip('destroyer', 'B1', 2);
    expect(player1.ships.length).toEqual(2);
  });
  it('1 ship of size 2 vertically', function () {
    player1.placeShip('destroyer', 'B1', 2, 'V');
    expect(player1.ships.length).toEqual(2);
  });
  it('1 ship of size 3 horizontally', function () {
    player1.placeShip('cruiser', 'C1', 3);
    expect(player1.ships.length).toEqual(3);
  });
  it('1 ship of size 3 vertically', function () {
    player1.placeShip('cruiser', 'C1', 3, 'V');
    expect(player1.ships.length).toEqual(3);
  });
  it('1 ship of size 4 horizontally', function () {
    player1.placeShip('battleship', 'D1', 4);
    expect(player1.ships.length).toEqual(4);
  });
  it('1 ship of size 4 vertically', function () {
    player1.placeShip('battleship', 'D1', 4, 'V');
    expect(player1.ships.length).toEqual(4);
  });
  it('1 ship of size 5 horizontally', function () {
    player1.placeShip('carrier', 'E1', 5);
    expect(player1.ships.length).toEqual(5);
  });
  it('1 ship of size 5 vertically', function () {
    player1.placeShip('carrier', 'E1', 5, 'V');
    expect(player1.ships.length).toEqual(5);
  });
});

describe('Player cannot place a ship', function () {
  it('out of bounds', function () {
    expect( function() { player1.placeShip('sub', 'K1', 1); } ).toThrow(new Error('Cannot place out of bounds'));
    expect(player1.ships.length).toEqual(0);
  });
  it('out of bounds', function () {
    expect( function() { player1.placeShip('sub', 'A11', 1); } ).toThrow(new Error('Cannot place out of bounds'));
    expect(player1.ships.length).toEqual(0);
  });
  it('on top of another', function () {
    player1.placeShip('destroyer', 'B1', 2);
    expect( function() { player1.placeShip('sub', 'B1', 1); } ).toThrow(new Error('Cannot place on top of another ship'));
    expect(player1.ships.length).toEqual(2);
  });
});

describe('Player 1 can fire on player 2,', function () {

  beforeEach(function() {
    player2.placeShip('sub', 'A1', 1);
    player2.placeShip('destroyer', 'B1', 2);
  });

  it('at A2 square and miss', function () {
    player1.fire(player2, 'A2');
    expect(player2.boardOpponentSees[0][1]).toEqual('MISS');
  });

  it('at F3 square and miss', function () {
    player1.fire(player2, 'F3');
    expect(player2.boardOpponentSees[5][2]).toEqual('MISS');
  });

  it('at A10 square and miss', function () {
    player1.fire(player2, 'A10');
    expect(player2.boardOpponentSees[0][9]).toEqual('MISS');
  });

  it('at B1 and hit', function () {
    player1.fire(player2, 'B1');
    expect(player2.boardOpponentSees[1][0]).toEqual('HIT');
  });

});

describe('Player can sink', function () {

  it('the sub', function () {
    player2.placeShip('sub', 'A1', 1);
    player1.fire(player2, 'A1');
    expect(player2.boardOpponentSees[0][0]).toEqual('SUNK');
  });

  it('the destroyer', function () {
    player2.placeShip('destroyer', 'B1', 2);
    player1.fire(player2, 'B1');
    player1.fire(player2, 'B2');
    expect(player2.boardOpponentSees[1][0]).toEqual('SUNK');
    expect(player2.boardOpponentSees[1][1]).toEqual('SUNK');
  });

  it('the cruiser', function () {
    player2.placeShip('cruiser', 'C1', 3);
    player1.fire(player2, 'C1');
    player1.fire(player2, 'C2');
    player1.fire(player2, 'C3');
    expect(player2.boardOpponentSees[2][0]).toEqual('SUNK');
    expect(player2.boardOpponentSees[2][1]).toEqual('SUNK');
    expect(player2.boardOpponentSees[2][2]).toEqual('SUNK');
  });

  it('the battleship', function () {
    player2.placeShip('battleship', 'D1', 4);
    player1.fire(player2, 'D1');
    player1.fire(player2, 'D2');
    player1.fire(player2, 'D3');
    player1.fire(player2, 'D4');
    expect(player2.boardOpponentSees[3][0]).toEqual('SUNK');
    expect(player2.boardOpponentSees[3][1]).toEqual('SUNK');
    expect(player2.boardOpponentSees[3][2]).toEqual('SUNK');
    expect(player2.boardOpponentSees[3][3]).toEqual('SUNK');
  });

  it('the carrier', function () {
    player2.placeShip('carrier', 'E1', 5);
    player1.fire(player2, 'E1');
    player1.fire(player2, 'E2');
    player1.fire(player2, 'E3');
    player1.fire(player2, 'E4');
    player1.fire(player2, 'E5');
    expect(player2.boardOpponentSees[4][0]).toEqual('SUNK');
    expect(player2.boardOpponentSees[4][1]).toEqual('SUNK');
    expect(player2.boardOpponentSees[4][2]).toEqual('SUNK');
    expect(player2.boardOpponentSees[4][3]).toEqual('SUNK');
    expect(player2.boardOpponentSees[4][4]).toEqual('SUNK');
  });

  it('the carrier when vertical too', function () {
    player2.placeShip('carrier', 'A10', 5, 'V')
    player1.fire(player2, 'A10');
    player1.fire(player2, 'B10');
    player1.fire(player2, 'C10');
    player1.fire(player2, 'D10');
    player1.fire(player2, 'E10');
    expect(player2.boardOpponentSees[0][9]).toEqual('SUNK');
    expect(player2.boardOpponentSees[1][9]).toEqual('SUNK');
    expect(player2.boardOpponentSees[2][9]).toEqual('SUNK');
    expect(player2.boardOpponentSees[3][9]).toEqual('SUNK');
    expect(player2.boardOpponentSees[4][9]).toEqual('SUNK');
  });

});

describe('Player can win the game', function () {

  beforeEach(function() {
    player2.placeShip('sub', 'A1', 1);
    player2.placeShip('cruiser', 'C1', 3);
  });

  it('by sinking all ships', function () {
    player1.fire(player2, 'A1');
    player1.fire(player2, 'C1');
    player1.fire(player2, 'C2');
    player1.fire(player2, 'C3');
    expect(player1.won).toEqual(true);
  });

  it('but not before', function () {
    player1.fire(player2, 'A1');
    player1.fire(player2, 'C1');
    expect(player1.won).toEqual(false);
  });
});