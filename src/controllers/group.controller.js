const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { groupService } = require('../services');

const getGroups = catchAsync(async (req, res) => {
  const result = await groupService.getGroups(req.user);
  res.status(httpStatus.OK).send(result);
});

const createGroup = catchAsync(async (req, res) => {
  const group = await groupService.createGroup(req.user, req.body);
  res.status(httpStatus.CREATED).send(group);
});

const deleteGroup = catchAsync(async (req, res) => {
  await groupService.deleteGroup(req.user, req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { getGroups, createGroup, deleteGroup };
