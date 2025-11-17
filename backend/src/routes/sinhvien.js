const express = require('express');
const controller = require('../controllers/sinhvien.controller');
const router = express.Router();

// CRUD SINHVIEN
router.get('/', controller.getAll);
router.get('/:Ma_SV', controller.getById);
router.post('/', controller.create);
router.put('/:Ma_SV', controller.update);
router.delete('/:Ma_SV', controller.delete);

module.exports = router;