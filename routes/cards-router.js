const express = require('express');
const { cardController } = require('../controllers');
const router = express.Router();

router.get('/', cardController);

module.exports = router;
