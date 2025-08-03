import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', req.user._id.toString());
    await fs.ensureDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    files: 10 // Max 10 files at once
  }
});

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private
router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const { width, height, quality } = req.body;
    let processedImagePath = req.file.path;

    // Process image if dimensions or quality specified
    if (width || height || quality) {
      const image = sharp(req.file.path);
      
      if (width || height) {
        image.resize(
          width ? parseInt(width) : null,
          height ? parseInt(height) : null,
          { fit: 'inside', withoutEnlargement: true }
        );
      }

      if (quality) {
        image.jpeg({ quality: parseInt(quality) });
      }

      const processedFilename = `processed-${path.basename(req.file.filename)}`;
      processedImagePath = path.join(path.dirname(req.file.path), processedFilename);
      
      await image.toFile(processedImagePath);
      
      // Remove original file if processed
      await fs.remove(req.file.path);
    }

    // Generate public URL
    const publicUrl = `/uploads/${req.user._id}/${path.basename(processedImagePath)}`;

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: path.basename(processedImagePath),
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: publicUrl,
        path: processedImagePath
      }
    });
  } catch (error) {
    console.error('Upload image error:', error);
    
    // Clean up uploaded file if error occurs
    if (req.file) {
      await fs.remove(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: 'Server error during image upload'
    });
  }
});

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private
router.post('/images', protect, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    const { width, height, quality } = req.body;
    const uploadedFiles = [];

    for (const file of req.files) {
      let processedImagePath = file.path;

      // Process image if dimensions or quality specified
      if (width || height || quality) {
        const image = sharp(file.path);
        
        if (width || height) {
          image.resize(
            width ? parseInt(width) : null,
            height ? parseInt(height) : null,
            { fit: 'inside', withoutEnlargement: true }
          );
        }

        if (quality) {
          image.jpeg({ quality: parseInt(quality) });
        }

        const processedFilename = `processed-${path.basename(file.filename)}`;
        processedImagePath = path.join(path.dirname(file.path), processedFilename);
        
        await image.toFile(processedImagePath);
        
        // Remove original file if processed
        await fs.remove(file.path);
      }

      const publicUrl = `/uploads/${req.user._id}/${path.basename(processedImagePath)}`;

      uploadedFiles.push({
        filename: path.basename(processedImagePath),
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        url: publicUrl,
        path: processedImagePath
      });
    }

    res.json({
      success: true,
      message: `${uploadedFiles.length} images uploaded successfully`,
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Upload images error:', error);
    
    // Clean up uploaded files if error occurs
    if (req.files) {
      for (const file of req.files) {
        await fs.remove(file.path);
      }
    }

    res.status(500).json({
      success: false,
      error: 'Server error during images upload'
    });
  }
});

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:filename
// @access  Private
router.delete('/:filename', protect, async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), 'uploads', req.user._id.toString(), filename);

    // Check if file exists
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    // Delete file
    await fs.remove(filePath);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during file deletion'
    });
  }
});

// @desc    Get user's uploaded files
// @route   GET /api/upload/files
// @access  Private
router.get('/files', protect, async (req, res) => {
  try {
    const userUploadDir = path.join(process.cwd(), 'uploads', req.user._id.toString());
    
    if (!await fs.pathExists(userUploadDir)) {
      return res.json({
        success: true,
        data: []
      });
    }

    const files = await fs.readdir(userUploadDir);
    const fileList = [];

    for (const file of files) {
      const filePath = path.join(userUploadDir, file);
      const stats = await fs.stat(filePath);
      
      fileList.push({
        filename: file,
        size: stats.size,
        url: `/uploads/${req.user._id}/${file}`,
        uploadedAt: stats.mtime
      });
    }

    res.json({
      success: true,
      data: fileList
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 