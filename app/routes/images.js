const express = require('express');
const imagesController = require('../controllers/images-controller');
const router = express.Router();

router.get('/consult', imagesController.consultImages);
router.post('/upload', imagesController.uploadImage);

module.exports = router; 