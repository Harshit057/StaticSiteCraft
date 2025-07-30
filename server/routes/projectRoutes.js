const express = require('express');
const router = express.Router();
const {
  getUserProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getPublicProjects,
  duplicateProject
} = require('../controllers/projectController');

// Get all projects for a user
router.get('/user/:userId', getUserProjects);

// Get public projects
router.get('/public', getPublicProjects);

// Get a single project
router.get('/:id', getProject);

// Create a new project
router.post('/', createProject);

// Update a project
router.put('/:id', updateProject);

// Delete a project
router.delete('/:id', deleteProject);

// Duplicate a project
router.post('/:id/duplicate', duplicateProject);

module.exports = router; 