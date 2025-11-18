const express = require('express');
const controller = require('../controllers/dangky.controller');

const router = express.Router();

router.get('/lop-sap-mo', controller.getUpcomingClasses);
router.post('/', controller.registerClass);
router.delete('/:Ma_SV/:Ma_LHP', controller.unregisterClass);

module.exports = router;

