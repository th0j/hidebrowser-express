const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const profileController = require('../../controllers/profile.controller');

const router = express.Router();

router.route('/').get(auth(), profileController.getProfiles);
router.route('/').post(auth(), profileController.createProfile);
router.route('/').put(auth(), profileController.updateProfile);
router.route('/:uuid/status').put(auth(), profileController.updateProfileStatus);

router.route('/:uuid').delete(auth(), profileController.deleteProfile);

module.exports = router;
