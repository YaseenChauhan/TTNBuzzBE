const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../../passport');

const userController = require('../controllers/user');
const authenticate = require('../../middleware/authenticate');
const { validateParam, schemas } = require('../../middleware/routerhelper');

router.post('/google/OAuth', passport.authenticate('googleToken', { session: false }), userController.googleAuth);
router.get('/', authenticate, userController.getUser);
router.get('/user', authenticate, userController.getUserById);

module.exports = router;


//router.get('/user', validateParam(schemas.idSchema, 'userId'), authenticate, userController.getUserById);