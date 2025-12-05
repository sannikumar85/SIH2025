import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/v1/auth/register
// @desc    Register user
// @access  Public
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('phone').optional().matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid 10-digit phone number')
], validate, async (req, res) => {
  try {
    const { name, email, phone, password, language, occupation } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [
        { email: email || undefined },
        { phone: phone || undefined }
      ].filter(Boolean)
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone'
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      language: language || 'hi',
      occupation: occupation || 'other'
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/v1/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('identifier').notEmpty().withMessage('Email or phone is required'),
  body('password').notEmpty().withMessage('Password is required')
], validate, async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }]
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/v1/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('learningProgress.termsLearned', 'term slug')
      .populate('bookmarkedSchemes', 'name shortName category');

    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/v1/auth/updateprofile
// @desc    Update user profile
// @access  Private
router.put('/updateprofile', protect, async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      language: req.body.language,
      occupation: req.body.occupation,
      incomeRange: req.body.incomeRange,
      ageGroup: req.body.ageGroup,
      state: req.body.state,
      familySize: req.body.familySize,
      voiceSettings: req.body.voiceSettings,
      notifications: req.body.notifications
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/v1/auth/updatepassword
// @desc    Update password
// @access  Private
router.put('/updatepassword', protect, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], validate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/v1/auth/bookmark/:schemeId
// @desc    Bookmark a scheme
// @access  Private
router.post('/bookmark/:schemeId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.bookmarkedSchemes.includes(req.params.schemeId)) {
      // Remove bookmark
      user.bookmarkedSchemes = user.bookmarkedSchemes.filter(
        id => id.toString() !== req.params.schemeId
      );
    } else {
      // Add bookmark
      user.bookmarkedSchemes.push(req.params.schemeId);
    }

    await user.save();

    res.json({
      success: true,
      data: user.bookmarkedSchemes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/v1/auth/learn/:termId
// @desc    Mark a term as learned
// @access  Private
router.post('/learn/:termId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.learningProgress.termsLearned.includes(req.params.termId)) {
      user.learningProgress.termsLearned.push(req.params.termId);
      await user.save();
    }

    res.json({
      success: true,
      data: user.learningProgress
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/v1/auth/calculation
// @desc    Save a calculation
// @access  Private
router.post('/calculation', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.savedCalculations.unshift(req.body);
    
    // Keep only last 10 calculations
    if (user.savedCalculations.length > 10) {
      user.savedCalculations = user.savedCalculations.slice(0, 10);
    }

    await user.save();

    res.json({
      success: true,
      data: user.savedCalculations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      language: user.language,
      occupation: user.occupation
    }
  });
};

export default router;
