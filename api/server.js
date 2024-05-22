const express = require('express');
const server = express();
const projectsRouter = require('../api/projects/projects-router')

server.use(express.json())

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Let's get to it</h2>`);
  });

module.exports = server;
