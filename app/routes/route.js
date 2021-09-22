const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/api/auth/signup', userController.signup);

router.post('/api/auth/login', userController.login);

router.get('/api/user/:userId', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'), userController.getUser);

router.get('/api/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/api/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/api/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;
