const httpStatus = require('http-status');
const { Profile } = require('../models');
const ApiError = require('../utils/ApiError');

const { Subscription } = require('../models');

const createProfile = async (currentUser, profileBody) => {
  if (await Profile.isTaken(currentUser, profileBody.uuid)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UUID already taken');
  }
  const currentSubscription = await Subscription.findOne({ user: currentUser, active: true });

  const numberProfileCreated = await Profile.countDocuments({ owner: currentUser });

  if (numberProfileCreated > currentSubscription.profileLimit) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have used up the number of profiles. Please upgrade your account.');
  }

  return Profile.create({
    name: profileBody.name,
    uuid: profileBody.uuid,
    proxy: profileBody.proxy,
    disableWebGL: profileBody.disableWebGL,
    owner: currentUser,
  });
};

const updateProfile = async (currentUser, profileBody) => {
  const profile = Profile.findOne({ owner: currentUser, uuid: profileBody.uuid });
  return profile.updateOne({
    name: profileBody.name,
    uuid: profileBody.uuid,
    proxy: profileBody.proxy,
    disableWebGL: profileBody.disableWebGL,
    owner: currentUser,
    lastAccess: Date.now(),
    isRunning: profileBody.isRunning,
  });
};

const updateProfileStatus = async (currentUser, uuid, profileBody) => {
  const profile = Profile.findOne({ owner: currentUser, uuid });
  return profile.updateOne({ isRunning: profileBody.isRunning, lastAccess: Date.now() });
};

const getProfiles = async (owner) => {
  const profiles = await Profile.find({ owner });
  return profiles;
};

const getProfileByUuid = async (owner, uuid) => {
  return Profile.findOne({ owner, uuid });
};

const deleteProfile = async (owner, uuid) => {
  const profile = await getProfileByUuid(owner, uuid);

  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  await profile.remove();
  return profile;
};

module.exports = { createProfile, getProfiles, deleteProfile, updateProfile, updateProfileStatus };
