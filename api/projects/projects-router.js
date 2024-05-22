// Write your "projects" router here!
const express = require('express');
const Projects = require('../projects/projects-model');
// add middleware

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            res.json(project)
        })
        .catch(next)
})


module.exports = router