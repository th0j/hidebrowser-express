const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, subscriptionService, planService } = require('../services');

const getAccount = catchAsync(async (req, res) => {
  const { user } = req;
  const currentSubscription = await subscriptionService.getSubscription(user);
  const currentPlan = await planService.getPlanById(currentSubscription.plan);
  const account = {
    user,
    subscription: {
      endDate: currentSubscription.endDate,
      profileLimit: currentSubscription.profileLimit,
      plan: currentPlan.name,
    },
  };
  res.send(account);
});

module.exports = { getAccount };
