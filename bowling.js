const BowlingGame = () => {
  const rolls = [];

  const roll = (pins) => {
    if (pins > 10) {
      throw new Error("Roll has max 10 pins");
    }

    if (rolls.length === 21) {
      throw new Error("Game has max of 21 rolls");
    }

    rolls.push(pins);

    if (isFirstRollOfFrame() && pins === 10) {
      rolls.push(0);
    }
  };

  const getScore = () => getAllFrames().reduce((score, frame, index, frames) => {
    let current = score + frame[0] + frame[1];

    if (isSpare(frame)) {
      return current + frames[index + 1][0];
    }
    
    if (isStrike(frame)) {
      return current + frames[index + 1][0] + frames[index + 1][1];
    }


    return current;
  } , 0);

  const getRollsLength = () => rolls.length;

  const getFrame = (index) => [rolls[2 * index], rolls[2 * index + 1]].concat(index === 10 ? rolls[2 * index + 2] : []);

  const getAllFrames = () => [...Array(10)].map((_, i) => getFrame(i));

  const isSpare = (frame) => frame[0] !== 10 && (frame[0] + frame[1]) === 10;

  const isStrike = (frame) => frame[0] === 10;

  const isFirstRollOfFrame = () => getRollsLength() % 2 === 1;

  return {
    roll,
    getScore,
    getRollsLength,
    getFrame,
  };
};

module.exports = BowlingGame;
