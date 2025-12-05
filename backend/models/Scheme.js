import mongoose from 'mongoose';

const SchemeSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    hi: { type: String, required: true }
  },
  shortName: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['agriculture', 'business', 'education', 'housing', 'pension', 'women', 'youth', 'health', 'employment']
  },
  description: {
    en: { type: String, required: true },
    hi: { type: String, required: true }
  },
  benefits: {
    en: [{ type: String }],
    hi: [{ type: String }]
  },
  eligibility: {
    occupation: [{ type: String }],
    incomeRange: [{ type: String }],
    ageGroup: [{ type: String }],
    gender: { type: String, enum: ['all', 'male', 'female'], default: 'all' },
    criteria: {
      en: [{ type: String }],
      hi: [{ type: String }]
    }
  },
  requiredDocuments: {
    en: [{ type: String }],
    hi: [{ type: String }]
  },
  applicationProcess: {
    en: [{ type: String }],
    hi: [{ type: String }]
  },
  officialWebsite: {
    type: String
  },
  deadline: {
    type: Date
  },
  maxBenefit: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  popularity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

SchemeSchema.index({ category: 1, 'eligibility.occupation': 1, 'eligibility.incomeRange': 1 });

export default mongoose.model('Scheme', SchemeSchema);
