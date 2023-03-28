const express = require('express');
const { ActiveAccount } = require('../controllers/auth/activate_account.controller');
const { ForgotPassword } = require('../controllers/auth/forgot_password.controller');
const { Login } = require('../controllers/auth/login.controller');
const { NewPassword } = require('../controllers/auth/new_password.controller');
const { register } = require('../controllers/auth/register.controller');
const { VerifyAccount } = require('../controllers/auth/verify_account.controller');
const { runValidation } = require('../controllers/validators');
const { userRegisterValidator } = require('../controllers/validators/auth');
const router = express.Router();

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/activate', ActiveAccount);
router.post('/login', Login)
router.put('/new-password', NewPassword)
router.post('/forgot-password', ForgotPassword)
router.post('/verify-account', VerifyAccount)

module.exports = router;