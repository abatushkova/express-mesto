const path = require('path');
const getFile = require('../helpers');

const getCards = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'cards.json'))
    .then((cards) => {
      res.status(200).send(JSON.parse(cards));
    })
    .catch(() => {
      res.status(500).json({
        message: 'Запрашиваемый файл не найден',
      });
    });
};

module.exports = getCards;
