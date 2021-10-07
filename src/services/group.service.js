const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const { Group } = require('../models');

const getGroups = async (owner) => {
  const groups = await Group.find({ owner }).select(['-owner']);
  return groups;
};

const createGroup = async (currentUser, body) => {
  if (await Group.isTaken(currentUser, body.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  // Todo: limit group

  return Group.create({ name: body.name, owner: currentUser });
};

const deleteGroup = async (owner, id) => {
  const group = await Group.findOne({ owner, _id: id });
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
  }
  await group.remove();
  return group;
};

module.exports = { createGroup, getGroups, deleteGroup };
