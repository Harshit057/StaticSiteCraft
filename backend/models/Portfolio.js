import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['header', 'about', 'skills', 'projects', 'contact', 'gallery', 'testimonials', 'experience', 'education', 'services']
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  styles: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { _id: false });

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Portfolio title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  components: [componentSchema],
  settings: {
    theme: {
      primaryColor: { type: String, default: '#667eea' },
      secondaryColor: { type: String, default: '#764ba2' },
      backgroundColor: { type: String, default: '#ffffff' },
      textColor: { type: String, default: '#333333' },
      fontFamily: { type: String, default: 'Inter, sans-serif' }
    },
    layout: {
      maxWidth: { type: String, default: '1200px' },
      padding: { type: String, default: '20px' },
      spacing: { type: String, default: '60px' }
    },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      keywords: [String],
      ogImage: { type: String, default: '' }
    },
    customCSS: {
      type: String,
      default: ''
    },
    customJS: {
      type: String,
      default: ''
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  version: {
    type: Number,
    default: 1
  },
  tags: [String],
  category: {
    type: String,
    enum: ['personal', 'business', 'creative', 'professional', 'other'],
    default: 'personal'
  }
}, {
  timestamps: true
});

// Generate slug from title
portfolioSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index for queries
portfolioSchema.index({ user: 1, createdAt: -1 });
portfolioSchema.index({ slug: 1 });
portfolioSchema.index({ isPublished: 1, isPublic: 1 });

// Method to get public portfolio data
portfolioSchema.methods.getPublicData = function() {
  const portfolio = this.toObject();
  delete portfolio.user;
  delete portfolio.isPublic;
  delete portfolio.lastModified;
  return portfolio;
};

// Method to increment views
portfolioSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to publish portfolio
portfolioSchema.methods.publish = function() {
  this.isPublished = true;
  this.publishedAt = new Date();
  return this.save();
};

// Method to unpublish portfolio
portfolioSchema.methods.unpublish = function() {
  this.isPublished = false;
  this.publishedAt = null;
  return this.save();
};

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio; 