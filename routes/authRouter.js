const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/save-user', authController.SaveUser);
router.get( '/get-users', authController.GetUsers);
router.post('/login', authController.Login);

module.exports = router;