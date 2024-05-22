// Write your "actions" router here!
const express = require('express');
const Actions = require('../actions/actions-model');
// add middleware
const { validateActionId, validateAction } = require('../actions/actions-middlware')
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


module.exports = router