const path = require('path');
const getFile = require('../helpers');

const getAllUsers = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      res.status(200).send(JSON.parse(users));
    })
    .catch(() => {
      res.status(500).json({
        message: 'Запрашиваемый файл не найден',
      });
    });
};

const getUser = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      const user = JSON.parse(users).find((item) => item._id === req.params.id);

      if (!user) {
        return res.status(404).send({
          message: 'Нет пользователя с таким id',
        });
      }

      return res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Запрашиваемый файл не найден',
      });
    });
};

module.exports = {
  getAllUsers,
  getUser,
};
