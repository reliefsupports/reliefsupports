import mongoose from 'mongoose';

const postedBySchema = mongoose.Schema({
  name: String,
  phone: String,
  avatarUrl: String,
  orgnization: String,
});

const LocationSchema = mongoose.Schema({
  city: String,
});

const entrySchema = mongoose.Schema({
  id: Number,
  type: String,
  category: String,
  summary: String,
  body: String,
  createdAt: Date,
  lastUpdatedAt: Date,
  postedBy: postedBySchema,
  status: String,
  priority: String,
  location: LocationSchema,
  isVerified: Boolean,
  externalSource: String,
});

export default mongoose.model('Entry', entrySchema);
