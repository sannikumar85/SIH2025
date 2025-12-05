import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { optionalAuth } from '../middleware/auth.js';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// @route   POST /api/v1/feedback
// @desc    Submit feedback
// @access  Public (with optional auth)
router.post('/', optionalAuth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required'),
  body('category').optional().isIn(['bug', 'feature', 'general'])
], validate, async (req, res) => {
  try {
    const { rating, comment, category = 'general' } = req.body;

    const feedback = await Feedback.create({
      user: req.user?._id,
      rating,
      comment,
      category
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      data: feedback
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/v1/feedback/stats
// @desc    Get feedback statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalFeedback: { $sum: 1 },
          fiveStars: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } },
          fourStars: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } }
        }
      }
    ]);

    res.json({
      success: true,
      data: stats[0] || { averageRating: 0, totalFeedback: 0 }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
