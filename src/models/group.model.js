const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

groupSchema.plugin(toJSON);
groupSchema.plugin(paginate);

groupSchema.statics.isTaken = async function (owner, name) {
  const group = await this.findOne({ owner, name });
  return !!group;
};

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
