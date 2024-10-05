const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectsController')

router.post('/project/create', projectsController.createProject )
router.get('/projects/all', projectsController.getAllProjects)
router.put('/projects/update/:id', projectsController.updateProject )

module.exports = router