// add middlewares here related to actions
const Actions = require('../actions/actions-model');

async function validateActionId(req, res, next) {
    try {
      const action = await Actions.get(req.params.id);
      if (!action) {
        res.status(404).json({
          message: "action not found"
        })
      } else {
        req.action = action
        next()
      }
    }
    catch (err) {
      res.status(500).json({
        message: 'error finding action',
        err: err.message
      })
    }
  }

  function validateAction(req, res, next) {
    // DO YOUR MAGIC
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      res.status(400).json({
        message: "project_id, description, and notes fields required"
      })
    } else if (description.length > 128) {
        res.json({
            message: 'description must be no longer than 128 characters'
        })
    } else {
      req.project_id = project_id
      req.description = description
      req.notes = notes
      next()
    }
  }

  function validateActionForPut (req, res, next) {
    // DO YOUR MAGIC
    const { project_id, description, notes, completed } = req.body;
    if (!project_id || !description || !notes, completed === undefined) {
      res.status(400).json({
        message: "project_id, description, notes, and completed fields required"
      })
    } else if (description.length > 128) {
        res.json({
            message: 'description must be no longer than 128 characters'
        })
    } else {
      req.project_id = project_id
      req.description = description
      req.notes = notes
      req.completed = completed
      next()
    }
  }

  

  module.exports = {
    validateActionId,
    validateAction,
    validateActionForPut
  }