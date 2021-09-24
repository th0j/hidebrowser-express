const { Subscription, User } = require('../models');

const createSubscription = async (currentUser, plan) => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + plan.duration);

  return Subscription.create({ user: currentUser, plan, startDate, endDate, profileLimit: plan.profileLimit });
};

const getSubscription = async (currentUser) => {
  return Subscription.findOne({ user: currentUser, active: true });
};

const updateSubscription = async (body) => {
  const user = await User.findOne({ email: body.email });
  const currentSubscription = await Subscription.findOne({ user });

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + body.numberDays);

  currentSubscription.endDate = endDate;
  await currentSubscription.save();

  return currentSubscription;
};

module.exports = { createSubscription, getSubscription, updateSubscription };
