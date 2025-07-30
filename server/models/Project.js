const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  templateId: {
    type: String,
    required: true
  },
  templateName: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true,
    default: 'light'
  },
  content: {
    type: Object,
    required: true,
    default: {}
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  lastModified: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
projectSchema.index({ userId: 1, createdAt: -1 });
projectSchema.index({ isPublic: 1, createdAt: -1 });
projectSchema.index({ templateId: 1 });

// Virtual for project URL
projectSchema.virtual('projectUrl').get(function() {
  return `/projects/${this._id}`;
});

// Method to update last modified
projectSchema.methods.updateLastModified = function() {
  this.lastModified = new Date();
  return this.save();
};

// Static method to find public projects
projectSchema.statics.findPublic = function(limit = 10) {
  return this.find({ isPublic: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-content'); // Don't include content for public listings
};

// Static method to find user projects
projectSchema.statics.findByUser = function(userId, limit = 50) {
  return this.find({ userId })
    .sort({ lastModified: -1 })
    .limit(limit);
};

// Pre-save middleware to update lastModified
projectSchema.pre('save', function(next) {
  if (this.isModified('content') || this.isModified('theme')) {
    this.lastModified = new Date();
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema); 