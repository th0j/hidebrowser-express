const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subscriptionSchema = mongoose.Schema({
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    default: 0,
  },
  profileLimit: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

subscriptionSchema.plugin(toJSON);
subscriptionSchema.plugin(paginate);

const Profile = mongoose.model('Subscription', subscriptionSchema);
module.exports = Profile;
