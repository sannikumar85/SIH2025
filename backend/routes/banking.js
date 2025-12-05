import express from 'express';
import BankingTerm from '../models/BankingTerm.js';

const router = express.Router();

// @route   GET /api/v1/banking/terms
// @desc    Get all banking terms
// @access  Public
router.get('/terms', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;

    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { 'term.en': { $regex: search, $options: 'i' } },
        { 'term.hi': { $regex: search, $options: 'i' } },
        { 'explanation.en': { $regex: search, $options: 'i' } },
        { 'explanation.hi': { $regex: search, $options: 'i' } }
      ];
    }

    const terms = await BankingTerm.find(query)
      .sort({ order: 1, 'term.en': 1 })
      .populate('relatedTerms', 'term slug');

    res.json({
      success: true,
      count: terms.length,
      data: terms
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/v1/banking/terms/:slug
// @desc    Get single banking term
// @access  Public
router.get('/terms/:slug', async (req, res) => {
  try {
    const term = await BankingTerm.findOne({ slug: req.params.slug })
      .populate('relatedTerms', 'term slug explanation');

    if (!term) {
      return res.status(404).json({
        success: false,
        message: 'Term not found'
      });
    }

    res.json({
      success: true,
      data: term
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/v1/banking/categories
// @desc    Get all categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await BankingTerm.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/v1/banking/stats
// @desc    Get statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalTerms = await BankingTerm.countDocuments();
    const byCategory = await BankingTerm.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const byDifficulty = await BankingTerm.aggregate([
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalTerms,
        byCategory,
        byDifficulty
      }
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
