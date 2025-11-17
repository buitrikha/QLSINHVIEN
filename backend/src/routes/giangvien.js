const express = require('express');
const controller = require('../controllers/giangvien.controller');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:Ma_GV', controller.getById);
router.post('/', controller.create);
router.put('/:Ma_GV', controller.update);
router.delete('/:Ma_GV', controller.delete);

module.exports = router;