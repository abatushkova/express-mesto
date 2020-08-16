const getFile = require('../helpers');
const path = require('path');

const getAllUsers = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'users.json'))
  .then(users => {
    return res
      .status(200)
      .send(JSON.parse(users));
  })
  .catch(err => console.error(err));
};

const getUser = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'users.json'))
  .then(users => {
    const user = JSON.parse(users).find(user => user._id == req.params.id);

    if (!user) {
      return res
        .status(404)
        .send({
          message: "Нет пользователя с таким id"
        });
    }

    return res.status(200).send(user);
  })
  .catch(err => console.error(err));
};

module.exports = {
  getAllUsers,
  getUser
}
