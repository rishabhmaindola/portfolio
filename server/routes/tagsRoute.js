const express = require('express')
const router = express.Router()
const tagsController = require('../controllers/tagsController')

router.get('/tags', tagsController.getAllTags)

module.exports = router