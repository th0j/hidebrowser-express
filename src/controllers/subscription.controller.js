const catchAsync = require('../utils/catchAsync');
const { subscriptionService } = require('../services');

const updateSubscription = catchAsync(async (req, res) => {
  const currentSubscription = await subscriptionService.updateSubscription(req.body);
  res.send(currentSubscription);
});

module.exports = { updateSubscription };
