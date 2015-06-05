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

    if (player1.ships.length == 15 && player2.ships.length == 0) {
      var r = $('<input type="button" id="player2" value="Player 2"/>');
        $("#done").append(r);
    }
    else if (player1.ships.length == 15 && player2  .ships.length == 15) {
      var r = $('<input type="button" id="startgame" value="Start Game"/>');
        $("#done").append(r);
    }
  });

});

$(document).ready (function () {

  $('body').on ('click', '#player2', function () {
    fillShipSelect();
    $('#top').html('Place your ships player 2')
    for (x = 0; x < 10; x ++ ) {
      for (y = 0; y < 10; y ++ ) {
        controlSquare = control.ownBoard[x][y];
        $('#' + controlSquare).val('');
      };
    };
    $(this).remove();
  });

  $('body').on ('click', '#startgame', function () {
    fillShipSelect();
    $('#top').html('Player 1 Fire!')
    for (x = 0; x < 10; x ++ ) {
      for (y = 0; y < 10; y ++ ) {
        controlSquare = control.ownBoard[x][y];
        square = player2.boardOpponentSees[x][y];
        $('#' + controlSquare).val('');
      };
    };
    $(this).remove();
    $('#direction').remove();
    $('#ship').remove();
    $('#place').remove();
    var fire = $('<input type="button" id="fire" value="Fire"/>');
        $("#done").append(fire);
  });

  $('body').on ('click', '#fire', function () {
    square = $('#spot').val();
    player1.fire(player2, square)
    for (x = 0; x < 10; x ++ ) {
      for (y = 0; y < 10; y ++ ) {
        controlSquare = control.ownBoard[x][y];
        square = player2.boardOpponentSees[x][y];
        $('#' + controlSquare).val(square);
      };
    };
  });

});

// $("#buildyourform").on('click', "#add", function() {
//     // your code...
// });