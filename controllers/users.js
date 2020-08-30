const User = require('../models/user');
const {
  handleDocNotFoundError,
  handleCastError,
  handleValidationError,
  handleServerError,
} = require('../helpers/error');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => handleServerError(res));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .orFail()
    .then((user) => res.status(200).send(user))
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

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return handleValidationError(err, res);
      }

      return handleServerError(res);
    });
};

const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return handleDocNotFoundError(res);
      }
      if (err.name === 'ValidationError') {
        return handleValidationError(err, res);
      }

      return handleServerError(res);
    });
};

const updateUserAvatar = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return handleDocNotFoundError(res);
      }
      if (err.name === 'ValidationError') {
        return handleValidationError(err, res);
      }

      return handleServerError(res);
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
