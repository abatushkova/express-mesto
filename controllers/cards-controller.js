const getFile = require('../helpers');
const path = require('path');

const getCards = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'cards.json'))
  .then(cards => {
    return res
      .status(200)
      .send(JSON.parse(cards));
  })
  .catch(err => console.error(err));
};

module.exports = getCards;
