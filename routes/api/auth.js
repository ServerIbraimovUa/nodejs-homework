const express = require('express');
const router = express.Router();
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

//  Sign up the user

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// verify the user

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post(
  '/verify/',
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

// Login the user
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

// Logout the user
router.post('/logout', authenticate, ctrl.logout);

// refresh the user

router.get('/current', authenticate, ctrl.getCurrent);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);
module.exports = router;
