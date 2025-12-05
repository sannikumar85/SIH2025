import express from 'express';
import Scheme from '../models/Scheme.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/v1/schemes
// @desc    Get all schemes with filters
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      category,
      occupation,
      incomeRange,
      ageGroup,
      search,
      sort = 'popularity',
      page = 1,
      limit = 20
    } = req.query;

    let query = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (occupation && occupation !== 'all') {
      query['eligibility.occupation'] = { $in: [occupation, 'all'] };
    }

    if (incomeRange && incomeRange !== 'all') {
      query['eligibility.incomeRange'] = { $in: [incomeRange, 'all'] };
    }

    if (ageGroup && ageGroup !== 'all') {
      query['eligibility.ageGroup'] = { $in: [ageGroup, 'all'] };
    }

    if (search) {
      query.$or = [
        { 'name.en': { $regex: search, $options: 'i' } },
        { 'name.hi': { $regex: search, $options: 'i' } },
        { shortName: { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } },
        { 'description.hi': { $regex: search, $options: 'i' } }
      ];
    }

    let sortQuery = {};
    switch (sort) {
      case 'newest':
        sortQuery = { createdAt: -1 };
        break;
      case 'name':
        sortQuery = { 'name.en': 1 };
        break;
      default:
        sortQuery = { popularity: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const schemes = await Scheme.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Scheme.countDocuments(query);

    res.json({
      success: true,
      count: schemes.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: schemes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/v1/schemes/:id
// @desc    Get single scheme
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    // Increment popularity
    scheme.popularity += 1;
    await scheme.save();

    res.json({
      success: true,
      data: scheme
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/v1/schemes/check-eligibility/:id
// @desc    Check eligibility for a scheme
// @access  Public
router.post('/check-eligibility/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    const { occupation, incomeRange, ageGroup, gender } = req.body;

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    let eligible = true;
    let reasons = [];

    if (scheme.eligibility.occupation.length > 0 && 
        !scheme.eligibility.occupation.includes('all') &&
        !scheme.eligibility.occupation.includes(occupation)) {
      eligible = false;
      reasons.push('Occupation does not match eligibility criteria');
    }

    if (scheme.eligibility.incomeRange.length > 0 &&
        !scheme.eligibility.incomeRange.includes('all') &&
        !scheme.eligibility.incomeRange.includes(incomeRange)) {
      eligible = false;
      reasons.push('Income range does not match eligibility criteria');
    }

    if (scheme.eligibility.ageGroup.length > 0 &&
        !scheme.eligibility.ageGroup.includes('all') &&
        !scheme.eligibility.ageGroup.includes(ageGroup)) {
      eligible = false;
      reasons.push('Age group does not match eligibility criteria');
    }

    if (scheme.eligibility.gender !== 'all' && scheme.eligibility.gender !== gender) {
      eligible = false;
      reasons.push('Gender does not match eligibility criteria');
    }

    res.json({
      success: true,
      data: {
        eligible,
        reasons,
        scheme: scheme.name
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

// @route   GET /api/v1/schemes/categories/list
// @desc    Get all categories with counts
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Scheme.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
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

export default router;
