const httpStatus = require('http-status');
const { Profile } = require('../models');
const ApiError = require('../utils/ApiError');

const createProfile = async (profileBody) => {
  if (await Profile.isTaken(profileBody.uuid)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UUID already taken');
  }
  return Profile.create(profileBody);
};

const getProfiles = async (owner) => {
  const profiles = await Profile.find(owner);
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

module.exports = { createProfile, getProfiles, deleteProfile };
