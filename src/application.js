player1 = new Player();
player2 = new Player();

$(document).ready (function () {
  // $('input:text').attr('disabled', true);
  for (x = 0; x < 10; x ++ ) {
    for (y = 0; y < 10; y ++ ) {
      square = player1.ownBoard[x][y];
      console.log(square)
      $('#' + square).val(square);
    };
  };
});