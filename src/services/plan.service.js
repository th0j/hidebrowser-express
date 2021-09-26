const { Plan } = require('../models');

const getPlan = async (planName) => {
  return Plan.findOne({ name: planName });
};

const getPlanById = async (planID) => {
  return Plan.findById(planID);
};

module.exports = { getPlan, getPlanById };
