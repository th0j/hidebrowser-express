const { Subscription } = require('../models');

const createSubscription = async (currentUser, plan) => {
  const startDate = new Date();
  const endDate = startDate + plan.duration * 24 * 60 * 60 * 1000;

  return Subscription.create({ user: currentUser, plan, startDate, endDate, profileLimit: plan.profileLimit });
};

const getSubscription = async (currentUser) => {
  return Subscription.findOne({ user: currentUser, active: true, endDate: { $gte: new Date() } });
};

module.exports = { createSubscription, getSubscription };
