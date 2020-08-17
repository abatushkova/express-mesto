const express = require('express');
const cardController = require('../controllers/cards-controller');

const router = express.Router();

router.get('/', cardController);

module.exports = router;
