// Write your "projects" router here!
const express = require('express');
const Projects = require('../projects/projects-model');
const { validateProjectId, validateProject, validateProjectForPut } = require('../projects/projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            next(err)
        })
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
});

router.put('/:id', validateProjectForPut, validateProjectId, async (req, res, next) => {
    try {
      await Projects.update(req.params.id, { name: req.name, description: req.description, completed: req.completed });
      const updated = await Projects.get(req.params.id);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(project => {
            project = req.project
            res.json(project)
        })
        .catch(err => {
            next(err)
        })
  })


  router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions)
        })
        .catch(err => {
            next(err)
        })
  })

module.exports = router