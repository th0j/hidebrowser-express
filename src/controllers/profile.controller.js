const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { profileService } = require('../services');

const createProfile = catchAsync(async (req, res) => {
  const profile = await profileService.createProfile(req.user, req.body);
  res.status(httpStatus.CREATED).send(profile);
});

const updateProfile = catchAsync(async (req, res) => {
  const profile = await profileService.updateProfile(req.user, req.body);
  res.send(profile);
});

const updateProfileStatus = catchAsync(async (req, res) => {
  const profile = await profileService.updateProfileStatus(req.user, req.params.uuid, req.body);
  res.send(profile);
});

const getProfiles = catchAsync(async (req, res) => {
  const result = await profileService.getProfiles(req.user);
  res.status(httpStatus.OK).send(result);
});

const deleteProfile = catchAsync(async (req, res) => {
  await profileService.deleteProfile(req.user, req.params.uuid);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  updateProfileStatus,
};
