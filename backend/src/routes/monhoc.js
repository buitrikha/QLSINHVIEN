const express = require('express');
const controller = require('../controllers/monhoc.controller');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:Ma_MH', controller.getById);
router.post('/', controller.create);
router.put('/:Ma_MH', controller.update);
router.delete('/:Ma_MH', controller.delete);

module.exports = router;