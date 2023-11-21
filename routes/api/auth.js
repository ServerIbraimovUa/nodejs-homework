const express = require('express');
const router = express.Router();
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

//  Sign up the user

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// Login the user
router.post('/login');

// Logout the user
router.post('/logout');

// refresh the user

router.get('/current');

module.exports = router;
