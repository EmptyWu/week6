const express =  require('express');
const postsController = require('../controllers/postsController');
const handleErrorAsync = require('../services/handleErrorAsync');
const router = express.Router();

router.get('/', handleErrorAsync(postsController.get));

router.post('/create', handleErrorAsync(postsController.create));

router.delete('/', handleErrorAsync(postsController.delete));

router.delete('/:id', handleErrorAsync(postsController.deleteQuery));

router.patch('/:id', handleErrorAsync(postsController.editQuery));

module.exports =router;