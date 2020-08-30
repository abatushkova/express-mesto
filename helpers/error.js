const handleUrlNotFoundError = (res) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
  });
};

const handleDocNotFoundError = (res) => {
  res.status(404).send({
    message: 'Элемент с таким id не найден',
  });
};

const renderErrors = (err) => {
  const errors = Object
    .values(err.errors)
    .map((elm) => `${elm.path} - ${elm.message}`)
    .join('. ');

  return errors;
};

const handleCastError = (err, res) => {
  res.status(400).send({
    message: `Запрос не прошел валидацию: ${renderErrors(err)}`,
  });
};

const handleValidationError = (err, res) => {
  res.status(400).send({
    message: `Входные данные не прошли валидацию: ${renderErrors(err)}`,
  });
};

const handleServerError = (res) => {
  res.status(500).json({
    message: 'На сервере произошла ошибка',
  });
};

module.exports = {
  handleUrlNotFoundError,
  handleDocNotFoundError,
  handleCastError,
  handleValidationError,
  handleServerError,
};
