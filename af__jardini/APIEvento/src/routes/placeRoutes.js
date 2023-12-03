// routes/placeRoutes.js
const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

router.get('/', placeController.getAllPlaces);
router.post('/', placeController.createPlace);
router.put('/:placeId', placeController.updatePlace);
router.delete('/:placeId', placeController.deletePlace);

module.exports = router;
