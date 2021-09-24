const express = require('express');
const auth = require('../../middlewares/auth');
const subscriptionController = require('../../controllers/subscription.controller');

const router = express.Router();

router.route('/').patch(auth('manageUsers'), subscriptionController.updateSubscription);

module.exports = router;
