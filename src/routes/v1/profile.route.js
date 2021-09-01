const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const profileController = require('../../controllers/profile.controller');

const router = express.Router();

router.route('/').get(auth(), profileController.getProfiles);
router.route('/').post(auth(), profileController.createProfile);

module.exports = router;
