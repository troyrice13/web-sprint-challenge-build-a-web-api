// Write your "projects" router here!
const express = require('express');
const Projects = require('../projects/projects-model');
const { validateProjectId, validateProject } = require('../projects/projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, async (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body)

        res.status(201).json(newProject)
    }
    catch{(next)}
})


module.exports = router