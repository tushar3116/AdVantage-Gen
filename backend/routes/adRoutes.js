const express = require('express');
const router = express.Router();
const { generateAd, getAdById } = require('../controllers/adController');

router.post('/generate', generateAd);
router.get('/:id', getAdById);

module.exports = router;
