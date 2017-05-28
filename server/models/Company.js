import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Company = new Schema({
  // used to internally match
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  // used to display in UI
  displayName: {
    type: String,
    unique: true,
    required: true
  },
  // logo: { type: String },
  size: { type: String },
  logo: { type: Buffer, contentType: String },
  website: { type: String },
  product: { type: String },
  location: { type: String },
  phone: { type: Number },
  jobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Jobs'
    }
  ]
});

export default mongoose.model('Company', Company);
