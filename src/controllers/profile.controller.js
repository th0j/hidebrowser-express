const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { profileService } = require('../services');

const createProfile = catchAsync(async (req, res) => {
  const profile = await profileService.createProfile(req.body);
  res.status(httpStatus.CREATED).send(profile);
});

const getProfiles = catchAsync(async (req, res) => {
  const result = await profileService.getProfiles({});
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createProfile,
  getProfiles,
};
