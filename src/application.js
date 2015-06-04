player1 = new Player();
player2 = new Player();
control = new Player();

$(document).ready (function () {
  // $('input:text').attr('disabled', true);
  for (x = 0; x < 10; x ++ ) {
    for (y = 0; y < 10; y ++ ) {
      square = player1.ownBoard[x][y];
      $('#' + square).val(square);
    };
  };

  $('#this').click (function () {
    spot = $('#spot').val();
    direction = $( "#direction option:selected" ).text()
    ship = $( "#ship option:selected" ).text()
    if ( ship == 'sub') { size = 1 }
    else if ( ship == 'destroyer') { size = 2 }
    else if ( ship == 'cruiser') { size = 3 }
    else if ( ship == 'battleship') { size = 4 }
    else if ( ship == 'carrier') { size = 5 }
    if (direction == 'Vertical') { player1.placeShip(ship, spot, size, 'V') }
    else { player1.placeShip(ship, spot, size) };
    for (x = 0; x < 10; x ++ ) {
      for (y = 0; y < 10; y ++ ) {
        controlSquare = control.ownBoard[x][y];
        square = player1.ownBoard[x][y];
        $('#' + controlSquare).val(square);
      };
    };
  });
});