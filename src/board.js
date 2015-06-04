function Board() {

  var board = new Array();
  var letter = 'A';


  for (i = 0; i < 10; i ++) {
    board[i] = new Array();
    for (j = 0; j < 10; j ++) {
      board[i][j] = letter + (j + 1);
    }
    letter = String.fromCharCode(letter.charCodeAt() + 1)
  }
  this.grid = board
};