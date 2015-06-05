player1 = new Player();
player2 = new Player();
board = new Board();

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
      ref = board.board[x][y];
      square = player.ownBoard[x][y];
      $('#' + ref).val(square);
    };
  };
}

function seeOwnBoard(player) {
  for (x = 0; x < 10; x ++ ) {
    for (y = 0; y < 10; y ++ ) {
      ref = board.board[x][y];
      square = player.ownBoard[x][y];
      $('#' + ref).val(square);
    };
  };
}

function seeOpponentBoard(player) {
  for (x = 0; x < 10; x ++ ) {
    for (y = 0; y < 10; y ++ ) {
      ref = board.board[x][y];
      square = player.boardOpponentSees[x][y];
      $('#' + ref).val(square);
    };
  };
}

// For Ship Placement

$(document).ready (function () {
  // $('input:text').attr('disabled', true);

  fillShipSelect();
  $('body').on('click', '#place', function () {
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
      $("#buttons").append(r);
      $(this).remove();
    }
    else if (player1.ships.length == 15 && player2  .ships.length == 15) {
      var r = $('<input type="button" id="startgame" value="Start Game"/>');
      $("#buttons").append(r);
      $(this).remove();
    }
  });

  $('body').on ('click', '#player2', function () {
    fillShipSelect();
    $('#top').html('Place your ships player 2')
    for (x = 0; x < 10; x ++ ) {
      for (y = 0; y < 10; y ++ ) {
        ref = board.board[x][y];
        $('#' + ref).val('');
      };
    };
    $(this).remove();
    var place = $('<input type="button" id="place" value="Place"/>');
    $("#buttons").append(place);
  });

});

// Playing the Game

$(document).ready (function () {

  $('body').on ('click', '#startgame', function () {
    fillShipSelect();
    $('#top').html('Player 1 Fire!')
    $(this).remove();
    $('#direction').remove();
    $('#ship').remove();
    var fire1 = $('<input type="button" id="fire1" value="Fire"/>');
    $("#done").append(fire1);
    seeOpponentBoard(player2);
    var seeOwn = $('<input type="button" id="seeShips" value="See Ships"/>');
    $("#done").append(seeOwn);
    var seeOpp = $('<input type="button" id="oppShips" value="See Game"/>');
    $("#done").append(seeOpp);
  });

  $('body').on ('click', '#fire1', function () {
    square = $('#spot').val();
    player1.fire(player2, square)
    seeOpponentBoard(player2);
    $(this).remove();
    var nextPlayer1 = $('<input type="button" id="nextPlayer1" value="Next Player"/>');
    $("#done").append(nextPlayer1);
  });

  $('body').on ('click', '#nextPlayer1', function () {
    $('#top').html('Player 2 Fire!')
    this.remove();
    var fire2 = $('<input type="button" id="fire2" value="Fire"/>');
    $("#done").append(fire2);
    seeOpponentBoard(player1);
  })

  $('body').on ('click', '#fire2', function () {
    square = $('#spot').val();
    player2.fire(player1, square)
    seeOpponentBoard(player1);
    $(this).remove();
    var nextPlayer2 = $('<input type="button" id="nextPlayer2" value="Next Player"/>');
    $("#done").append(nextPlayer2);
  });

  $('body').on ('click', '#nextPlayer2', function () {
    $('#top').html('Player 1 Fire!')
    this.remove();
    var fire1 = $('<input type="button" id="fire1" value="Fire"/>');
    $("#done").append(fire1);
    seeOpponentBoard(player2);
  })

});

// Seeing your own board

$(document).ready (function () {

  $('body').on ('click', '#seeShips', function () {
    var turn = $('#top').text();
    console.log(turn)
    if (turn == 'Player 1 Fire!') {
      seeOwnBoard(player1);
    }
    else if (turn == 'Player 2 Fire!') {
      seeOwnBoard(player2);
    }
  });

  $('body').on ('click', '#oppShips', function () {
    var turn = $('#top').text();
    console.log(turn)
    if (turn == 'Player 1 Fire!') {
      seeOpponentBoard(player2);
    }
    else if (turn == 'Player 2 Fire!') {
      seeOpponentBoard(player1);
    }
  });

});

// if($('#save').length){
//             //your code goes here
//         }


// $("#buildyourform").on('click', "#add", function() {
//     // your code...
// });