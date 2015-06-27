describe('Battleships', function () {
  beforeEach(function (){
    browser.get('http://localhost:8080')
  });

  it('Has a title', function () {
    expect(browser.getTitle()).toEqual('Battleships');
  });

  it('Can place the submarine on the board', function() {
    type starting square
    select submarine from ship type
    click place button
    expect ship to be on the board
  })
});