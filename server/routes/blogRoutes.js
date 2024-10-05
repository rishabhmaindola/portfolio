const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.post('/blogs/create', blogController.createPost)
router.get('/blogs/all', blogController.getAllPosts)
router.get('/blogs/blog/:id', blogController.getBlogById)
router.put('/blogs/blog/like/:id', blogController.likePost)
router.put('/blogs/blog/update/:id', blogController.updateBlogById)

module.exports = router