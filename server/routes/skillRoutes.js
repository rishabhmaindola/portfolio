const express = require('express')
const router = express.Router()
const skillsController = require('../controllers/skillsController')

router.post('/skills/new', skillsController.createSkill)
router.get('/skills/all', skillsController.getAllSkills)

module.exports = router