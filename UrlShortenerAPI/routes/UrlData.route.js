const express = require('express');
const router = express.Router();

const urldata_controller = require('../controllers/UrlData.Controller');
const SignUpController = require('../controllers/SignUp.Controller');

router.get('/test', urldata_controller.test);
router.post('/VerifyUserEmail', SignUpController.VerifyUserEmail);

router.post('/ActivateAccount', SignUpController.ActivateAccount);

router.post('/insertURL', urldata_controller.InsertURL);
router.post('/shortenURL', urldata_controller.ShortenURL);
router.post('/red', urldata_controller.GetOriginalURL);

module.exports = router;    