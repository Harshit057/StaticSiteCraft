import express from 'express';
import { body, validationResult } from 'express-validator';
import Portfolio from '../models/Portfolio.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all portfolios for current user
// @route   GET /api/portfolio
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user._id })
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: portfolios.length,
      data: portfolios
    });
  } catch (error) {
    console.error('Get portfolios error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Get single portfolio
// @route   GET /api/portfolio/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Create new portfolio
// @route   POST /api/portfolio
// @access  Private
router.post('/', protect, [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and must be less than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { title, description, category, tags } = req.body;

    // Create portfolio
    const portfolio = await Portfolio.create({
      user: req.user._id,
      title,
      description,
      category,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio created successfully',
      data: portfolio
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Portfolio with this title already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error during portfolio creation'
    });
  }
});

// @desc    Update portfolio
// @route   PUT /api/portfolio/:id
// @access  Private
router.put('/:id', protect, [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be less than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    // Update portfolio
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Portfolio updated successfully',
      data: updatedPortfolio
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during portfolio update'
    });
  }
});

// @desc    Delete portfolio
// @route   DELETE /api/portfolio/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    await Portfolio.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during portfolio deletion'
    });
  }
});

// @desc    Update portfolio components
// @route   PUT /api/portfolio/:id/components
// @access  Private
router.put('/:id/components', protect, async (req, res) => {
  try {
    const { components } = req.body;

    if (!Array.isArray(components)) {
      return res.status(400).json({
        success: false,
        error: 'Components must be an array'
      });
    }

    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    portfolio.components = components;
    portfolio.lastModified = new Date();
    portfolio.version += 1;
    await portfolio.save();

    res.json({
      success: true,
      message: 'Components updated successfully',
      data: portfolio
    });
  } catch (error) {
    console.error('Update components error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during components update'
    });
  }
});

// @desc    Update portfolio settings
// @route   PUT /api/portfolio/:id/settings
// @access  Private
router.put('/:id/settings', protect, async (req, res) => {
  try {
    const { settings } = req.body;

    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    portfolio.settings = { ...portfolio.settings, ...settings };
    portfolio.lastModified = new Date();
    await portfolio.save();

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: portfolio
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during settings update'
    });
  }
});

// @desc    Publish/Unpublish portfolio
// @route   PUT /api/portfolio/:id/publish
// @access  Private
router.put('/:id/publish', protect, async (req, res) => {
  try {
    const { isPublished } = req.body;

    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    if (isPublished) {
      await portfolio.publish();
    } else {
      await portfolio.unpublish();
    }

    res.json({
      success: true,
      message: `Portfolio ${isPublished ? 'published' : 'unpublished'} successfully`,
      data: portfolio
    });
  } catch (error) {
    console.error('Publish portfolio error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during portfolio publish/unpublish'
    });
  }
});

// @desc    Get public portfolio by slug
// @route   GET /api/portfolio/public/:slug
// @access  Public
router.get('/public/:slug', optionalAuth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      slug: req.params.slug,
      isPublic: true
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    // Increment views if not the owner
    if (!req.user || req.user._id.toString() !== portfolio.user.toString()) {
      await portfolio.incrementViews();
    }

    res.json({
      success: true,
      data: portfolio.getPublicData()
    });
  } catch (error) {
    console.error('Get public portfolio error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 