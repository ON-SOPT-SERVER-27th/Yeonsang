const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const authUtils = require('../../middlewares/authUtil');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', userController.readAll);
router.get('/profile', authUtils.checkToken, userController.getProfile);
router.get('/:id', authUtils.checkToken, userController.readOne);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;