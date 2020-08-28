const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(404).send({
        message: 'Список пользователей не найден',
      });
    }

    return res.status(200).send(users);
  });
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.userId }, (err, user) => {
    if (err) {
      return res.status(404).send({
        message: 'Нет пользователя с таким id',
      });
    }

    return res.status(200).send(user);
  });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.countDocuments({})
    .then((id) => User.create({
      name, about, avatar, id,
    }))
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({
      message: 'Данные при создании профиля не прошли валидацию',
    }));
};

const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).send({
          message: 'Данные обновления профиля не прошли валидацию',
        });
      }

      return res.status(200).send(user);
    },
  );
};

const updateUserAvatar = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
    (err, avatar) => {
      if (err) {
        return res.status(400).send({
          message: 'Данные обновления аватар не прошли валидацию',
        });
      }

      return res.status(200).send(avatar);
    },
  );
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
