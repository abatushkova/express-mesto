const Card = require('../models/card');
const {
  handleDocNotFoundError,
  handleCastError,
  handleValidationError,
  handleServerError,
} = require('../helpers/error');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((users) => res.status(200).send(users))
    .catch(() => handleServerError(res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return handleValidationError(err, res);
      }

      return handleServerError(res);
    });
};

const deleteCard = (req, res) => {
  Card.findOneAndDelete({ _id: req.params.cardId })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return handleDocNotFoundError(res);
      }
      if (err.name === 'CastError') {
        return handleCastError(err, res);
      }

      return handleServerError(res);
    });
};

const likeCard = (req, res) => {
  Card.findOneAndUpdate(
    { _id: req.params.cardId },
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return handleDocNotFoundError(res);
      }
      if (err.name === 'CastError') {
        return handleCastError(err, res);
      }

      return handleServerError(res);
    });
};

const dislikeCard = (req, res) => {
  Card.findOneAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return handleDocNotFoundError(res);
      }
      if (err.name === 'CastError') {
        return handleCastError(err, res);
      }

      return handleServerError(res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
