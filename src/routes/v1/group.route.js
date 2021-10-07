const express = require('express');
const auth = require('../../middlewares/auth');
const groupController = require('../../controllers/group.controller');

const router = express.Router();

router.route('/').get(auth(), groupController.getGroups);
router.route('/').post(auth(), groupController.createGroup);
router.route('/:id').delete(auth(), groupController.deleteGroup);

module.exports = router;
