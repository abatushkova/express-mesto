const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    minlength: [2, 'Минимальное количество символов: 2'],
    maxlength: [30, 'Максимальное количество символов: 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    minlength: [2, 'Минимальное количество символов: 2'],
    maxlength: [30, 'Максимальное количество символов: 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: {
      validator: (link) => link.match(/(https?:)([\w|\W]*)/gm),
      message: 'Пожалуйста, введите корректный адрес',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
