const express = require('express');
const path = require('path');
const helmet = require('helmet');
const { userRouter, cardRouter } = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users/', userRouter);
app.use('/cards/', cardRouter);

app.use((req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
  });
});

app.listen(PORT);
