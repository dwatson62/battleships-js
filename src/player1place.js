player1 = new Player();
player2 = new Player();
control = new Player();

function fillShipSelect() {
  $.getJSON('./src/ships.JSON', function(data){
        $('#ship').append('<option>' + data.ships[0].type1 + '</option>');
        $('#ship').append('<option>' + data.ships[0].type2 + '</option>');
        $('#ship').append('<option>' + data.ships[0].type3 + '</option>');
        $('#ship').append('<option>' + data.ships[0].type4 + '</option>');
        $('#ship').append('<option>' + data.ships[0].type5 + '</option>');
    });
}


function placeOnBoard(player, ship, spot, size, direction) {
  if (direction == 'Vertical') { player.placeShip(ship, spot, size, 'V') }
  else { player.placeShip(ship, spot, size) };
  for (x = 0; x < 10; x ++ ) {
    for (y = 0; y < 10; y ++ ) {
      controlSquare = control.ownBoard[x][y];
      square = player.ownBoard[x][y];
      $('#' + controlSquare).val(square);
    };
  };
}

$(document).ready (function () {
  // $('input:text').attr('disabled', true);
  fillShipSelect();
  $('#place').click (function () {
    spot = $('#spot').val();
    direction = $( "#direction option:selected" ).text()
    ship = $( "#ship option:selected" ).text()
    $("#ship option:selected").remove();
    if ( ship == 'sub') { size = 1 }
    else if ( ship == 'destroyer') { size = 2 }
    else if ( ship == 'cruiser') { size = 3 }
    else if ( ship == 'battleship') { size = 4 }
    else if ( ship == 'carrier') { size = 5 }
    if (player1.ships.length < 15) {
      // player 1 places ships
      placeOnBoard(player1, ship, spot, size, direction);
    }
    else {
      // player 2 places ships
      placeOnBoard(player2, ship, spot, size, direction);
    }

    var shipsLeftToPlace = $('#ship option').length
    if (shipsLeftToPlace == 0) {
      $('#done').html('Click here Player 2');

    }
    console.log(player1.ships.length)
  });

  $('#done').click( function () {
    fillShipSelect();
  });
    // for (x = 0; x < 10; x ++ ) {
    //   for (y = 0; y < 10; y ++ ) {
    //     controlSquare = control.ownBoard[x][y];
    //     $('#' + controlSquare).val('');
    //   };
    // };


});