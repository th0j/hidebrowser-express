const { Plan } = require('../models');

const getPlan = async (planName) => {
  return Plan.findOne({ name: planName });
};

module.exports = { getPlan };
