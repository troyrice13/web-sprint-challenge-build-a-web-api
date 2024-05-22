// Write your "actions" router here!
const express = require('express');
const Actions = require('../actions/actions-model');
// add middleware

const router = express.Router();

router.get('/actions', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.json(action)
        })
        .catch(next)
})


module.exports = router