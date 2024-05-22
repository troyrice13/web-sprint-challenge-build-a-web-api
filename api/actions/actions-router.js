// Write your "actions" router here!
const express = require('express');
const Actions = require('../actions/actions-model');
// add middleware
const { validateActionId, validateAction, validateActionForPut } = require('../actions/actions-middlware')
const { validateProjectId } = require('../projects/projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
    Actions.get(req.params.id)
        .then(action => {
            res.json(action)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', validateProjectId, validateAction, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)

        res.status(201).json(newAction)
    }
    catch{(next)}
})

router.put('/:id', validateActionForPut, async (req, res, next) => {
    try {
      await Actions.update(req.params.id, { project_id: req.project_id, description: req.description, notes: req.notes, completed: req.completed });
      const updated = await Actions.get(req.params.id);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  });

module.exports = router