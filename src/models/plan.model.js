const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const planSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    periodType: {
      type: String,
      required: true,
      trim: true,
    },
    cost: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    profileLimit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

planSchema.plugin(toJSON);
planSchema.plugin(paginate);

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
