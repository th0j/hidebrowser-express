const { Subscription } = require('../models');

const createSubscription = async (currentUser, plan) => {
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(startDate.getDate() + plan.duration);

  return Subscription.create({ user: currentUser, plan, startDate, endDate, profileLimit: plan.profileLimit });
};

const getSubscription = async (currentUser) => {
  // return Subscription.findOne({ user: currentUser, active: true, endDate: { $gte: new Date() } });
  return Subscription.findOne({ user: currentUser, active: true });
};

module.exports = { createSubscription, getSubscription };
