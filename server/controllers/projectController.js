const Project = require('../models/Project');

// Get all projects for a user
const getUserProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, page = 1 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const projects = await Project.findByUser(userId, parseInt(limit))
      .skip(skip)
      .select('-content'); // Don't include content in list view
    
    const total = await Project.countDocuments({ userId });
    
    res.json({
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting user projects:', error);
    res.status(500).json({ error: 'Failed to get projects' });
  }
};

// Get a single project
const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check if user can access this project
    if (project.userId !== userId && !project.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(500).json({ error: 'Failed to get project' });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const {
      userId,
      name,
      description = '',
      templateId,
      templateName,
      theme = 'light',
      content = {},
      isPublic = false,
      tags = []
    } = req.body;
    
    // Validate required fields
    if (!userId || !name || !templateId || !templateName) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, name, templateId, templateName' 
      });
    }
    
    const project = new Project({
      userId,
      name,
      description,
      templateId,
      templateName,
      theme,
      content,
      isPublic,
      tags
    });
    
    await project.save();
    
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check if user owns this project
    if (project.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Update allowed fields
    const allowedUpdates = [
      'name', 'description', 'theme', 'content', 
      'isPublic', 'tags', 'lastModified'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });
    
    project.lastModified = new Date();
    await project.save();
    
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check if user owns this project
    if (project.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await Project.findByIdAndDelete(id);
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

// Get public projects
const getPublicProjects = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const projects = await Project.findPublic(parseInt(limit))
      .skip(skip);
    
    const total = await Project.countDocuments({ isPublic: true });
    
    res.json({
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting public projects:', error);
    res.status(500).json({ error: 'Failed to get public projects' });
  }
};

// Duplicate a project
const duplicateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, newName } = req.body;
    
    const originalProject = await Project.findById(id);
    
    if (!originalProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check if user can access this project
    if (originalProject.userId !== userId && !originalProject.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const duplicatedProject = new Project({
      userId,
      name: newName || `${originalProject.name} (Copy)`,
      description: originalProject.description,
      templateId: originalProject.templateId,
      templateName: originalProject.templateName,
      theme: originalProject.theme,
      content: originalProject.content,
      isPublic: false, // Duplicates are private by default
      tags: originalProject.tags
    });
    
    await duplicatedProject.save();
    
    res.status(201).json(duplicatedProject);
  } catch (error) {
    console.error('Error duplicating project:', error);
    res.status(500).json({ error: 'Failed to duplicate project' });
  }
};

module.exports = {
  getUserProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getPublicProjects,
  duplicateProject
}; 