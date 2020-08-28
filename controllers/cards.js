const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({}, (err, cards) => {
    if (err) {
      return res.status(404).send({
        message: 'Список карточек не найден',
      });
    }

    return res.status(200).send(cards);
  })
    .populate('owner');
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.countDocuments({})
    .then(() => Card.create({
      name, link, owner: req.user._id,
    }))
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(400).send({
      message: 'Данные при создании карточки не прошли валидацию',
    }));
};

const deleteCard = (req, res) => {
  Card.findOneAndRemove(
    { _id: req.params.cardId },
    (err, card) => {
      if (err) {
        return res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }

      return res.status(200).send(card);
    },
  );
};

const likeCard = (req, res) => {
  Card.findOneAndUpdate(
    { _id: req.params.cardId },
    { $addToSet: { likes: req.user._id } },
    { new: true },
    (err, card) => {
      if (err) {
        return res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }

      return res.status(200).send(card);
    },
  );
};

const dislikeCard = (req, res) => {
  Card.findOneAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { new: true },
    (err, card) => {
      if (err) {
        return res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }

      return res.status(200).send(card);
    },
  );
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
