import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Company = new Schema({
  // used to internally match
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  // used to display in UI
  displayName: {
    type: String,
    unique: true,
    required: true
  },
  jobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Jobs'
    }
  ],
  locations: [
    {
      address: {
        type: Object,
        required: true
      },
      hq: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [{ type: Number, required: true }]
    }
  ],
  logo: String,
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  perks: Array,
  phone: Number,
  product: String,

  size: String,
  website: String
});

Company.plugin(timestamps);

export default mongoose.model('Company', Company);
