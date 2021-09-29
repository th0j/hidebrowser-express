const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const profileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate() {},
    },
    uuid: {
      type: String,
      required: true,
      trim: true,
    },
    proxy: {
      type: String,
      validator() {},
    },
    proxyType: {
      type: String,
      enum: ['', 'http', 'socks4', 'socks5'],
      default: '',
    },
    isRunning: {
      type: Boolean,
      default: false,
    },
    disableWebGL: {
      type: Boolean,
      default: false,
    },
    lastAccess: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

profileSchema.plugin(toJSON);
profileSchema.plugin(paginate);

profileSchema.statics.isTaken = async function (owner, uuid) {
  const profile = await this.findOne({ owner, uuid });
  return !!profile;
};

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
