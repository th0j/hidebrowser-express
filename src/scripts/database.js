const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../config/logger');
const { Plan, Subscription } = require('../models');

// Init Database

// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   logger.info('Connected to MongoDB');

//   Plan.create({ name: 'Trial', periodType: 'monthly', cost: 0, duration: 14, profileLimit: 5 });

//   Plan.create({ name: 'Basic', periodType: 'monthly', cost: 9.99, duration: 30, profileLimit: 30 });
//   Plan.create({ name: 'Professional', periodType: 'monthly', cost: 19, duration: 30, profileLimit: 100 });
//   Plan.create({ name: 'Business', periodType: 'monthly', cost: 79, duration: 30, profileLimit: 500 });

//   Plan.create({ name: 'Basic', periodType: 'annually', cost: 0, duration: 365, profileLimit: 10 });
//   Plan.create({ name: 'Professional', periodType: 'annually', cost: 0, duration: 365, profileLimit: 10 });
//   Plan.create({ name: 'Business', periodType: 'annually', cost: 0, duration: 365, profileLimit: 10 });

//   logger.info('DONE!!!');
// });

// Clear database

// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   Subscription.deleteMany({}, function (e) {
//     if (e) logger.info(e);
//   });

//   logger.info('DONE!!!');
// });
