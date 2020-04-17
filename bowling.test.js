const expect = require('expect.js');
const BowlingGame = require('./bowling');

describe('Bowling test',() => {
  let game;

  beforeEach(() => {
    game = BowlingGame();
  });

  it('should create empty game', () => {
    expect(game.getRollsLength()).to.eql(0);
  });

  it('should roll once', () => {
    game.roll(0);
    expect(game.getRollsLength()).to.eql(1);
  });

  it('should score 0 if all rolls miss', () => {
    for(i = 0; i < 20; i++) {
      game.roll(0);
    };
    expect(game.getScore()).to.eql(0);
  });

  it('should not hit more than 10 pins in a roll', () => {
    try {
      game.roll(11);
    } catch (error) {
     expect(error.message).to.eql('Roll has max 10 pins');  
    }
  });

  it('should not pass 21 rolls per game', () => {
    try {
      for(i = 0; i < 22; i++) {
        game.roll(0);
      };
    } catch (error) {
      expect(error.message).to.eql('Game has max of 21 rolls');  
    }
  });

  it('should play a game with some successfully rolls', () => {
    game.roll(6);
    game.roll(3);
    game.roll(2);
    for(i = 0; i < 18; i++) {
      game.roll(0);
    };
    expect(game.getScore()).to.eql(11);
  });

  it('should play a game with first frame is a spare', () => {
    game.roll(6);
    game.roll(4);
    game.roll(2);
    for(i = 0; i < 18; i++) {
      game.roll(0);
    };
    expect(game.getScore()).to.eql(14);
  });

  it('should play a game with first roll is a strike', () => {
    game.roll(10);
    game.roll(4);
    game.roll(2);
    for(i = 0; i < 17; i++) {
      game.roll(0);
    };
    expect(game.getScore()).to.eql(22);
  });
});
