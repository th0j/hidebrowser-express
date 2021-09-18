const httpStatus = require('http-status');
const { Profile } = require('../models');
const ApiError = require('../utils/ApiError');

const createProfile = async (currentUser, profileBody) => {
  if (await Profile.isTaken(currentUser, profileBody.uuid)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UUID already taken');
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
    isRunning: profileBody.isRunning,
  });
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

module.exports = { createProfile, getProfiles, deleteProfile, updateProfile };
