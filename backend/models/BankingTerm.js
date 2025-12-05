import mongoose from 'mongoose';

const BankingTermSchema = new mongoose.Schema({
  term: {
    en: { type: String, required: true },
    hi: { type: String, required: true }
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['banking', 'loans', 'investments', 'insurance', 'general']
  },
  explanation: {
    en: { type: String, required: true },
    hi: { type: String, required: true }
  },
  example: {
    en: { type: String },
    hi: { type: String }
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  icon: {
    type: String,
    default: 'FaInfoCircle'
  },
  relatedTerms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankingTerm'
  }],
  audioUrl: {
    en: { type: String },
    hi: { type: String }
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

BankingTermSchema.index({ category: 1, difficulty: 1 });

export default mongoose.model('BankingTerm', BankingTermSchema);
