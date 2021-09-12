const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const accountController = require('../../controllers/account.controller');

const router = express.Router();

router.route('/').get(auth(), accountController.getAccount);
module.exports = router;
