// add middlewares here related to projects
const Projects = require('../projects/projects-model')

async function validateProjectId(req, res, next) {
    try {
      const project = await Projects.get(req.params.id);
      if (!project) {
        res.status(404).json({
          message: "project not found"
        })
      } else {
        req.project = project
        next()
      }
    }
    catch (err) {
      res.status(500).json({
        message: 'error finding project',
        err: err.message
      })
    }
  }
  
  function validateProject(req, res, next) {
    // DO YOUR MAGIC
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        message: "name and description fields required"
      })
    } else {
      req.name = name
      req.description = description
      next()
    }
  }
  function validateProjectForPut(req, res, next) {
    // DO YOUR MAGIC
    const { name, description, completed } = req.body;
    if (!name || !description || completed === undefined) {
      res.status(400).json({
        message: "name, description, and completed fields required"
      })
    } else {
      req.name = name
      req.description = description
      req.completed = completed
      next()
    }
  }
  
//   function validatePost(req, res, next) {
//     // DO YOUR MAGIC
//     const { text } = req.body;
//     if (!text || !text.trim()) {
//       res.status(400).json({
//         message: "missing required text field"
//       })
//     } else {
//       req.text = text.trim()
//       next()
//     }
//   }
  
  // do not forget to expose these functions to other modules
  
  module.exports = {
   validateProjectId,
   validateProject,
   validateProjectForPut
  }