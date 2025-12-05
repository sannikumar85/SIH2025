import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Please add a valid 10-digit Indian phone number']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  language: {
    type: String,
    enum: ['en', 'hi'],
    default: 'hi'
  },
  occupation: {
    type: String,
    enum: ['farmer', 'business', 'student', 'salaried', 'housewife', 'senior_citizen', 'other'],
    default: 'other'
  },
  incomeRange: {
    type: String,
    enum: ['below_2l', '2l_5l', '5l_10l', 'above_10l'],
    default: 'below_2l'
  },
  ageGroup: {
    type: String,
    enum: ['18-25', '26-40', '41-60', '60+'],
    default: '26-40'
  },
  state: {
    type: String,
    default: ''
  },
  familySize: {
    type: Number,
    default: 4
  },
  profilePicture: {
    type: String,
    default: ''
  },
  voiceSettings: {
    speed: { type: Number, default: 1, min: 0.5, max: 2 },
    pitch: { type: Number, default: 1, min: 0.5, max: 2 },
    autoPlay: { type: Boolean, default: true }
  },
  learningProgress: {
    termsLearned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BankingTerm' }],
    quizzesCompleted: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 }, // in minutes
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  bookmarkedSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }],
  savedCalculations: [{
    loanAmount: Number,
    interestRate: Number,
    tenure: Number,
    loanType: String,
    emi: Number,
    totalInterest: Number,
    totalAmount: Number,
    createdAt: { type: Date, default: Date.now }
  }],
  notifications: {
    dailyTips: { type: Boolean, default: true },
    schemeUpdates: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: false }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);
