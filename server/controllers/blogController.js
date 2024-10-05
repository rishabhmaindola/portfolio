require('dotenv').config()
const { gitImage } = require('../utils/github')
const { notification } = require('../notifications')
const Blog = require('../model/Blog')

const user = process.env.USER
const repo = process.env.REPO
const branch = process.env.BRANCH

exports.createPost = async (req, res) => {
    const { title, description, body, tags, images } = req.body
    try {
        const imageUrls = images.map(image => {
            const imagePath = image;
            return gitImage(user, repo, branch, imagePath);
        });

        const newPost = new Blog({
            title,
            description,
            body,
            tags,
            images: imageUrls
        });

        const savedPost = await newPost.save();
        res.status(201).json({ success: true, message: 'Blog post created successfully', data: savedPost });
        notification.emit('createBlog', title, description);
    } catch (error) {
        console.error('Error saving the post in db', error.message);
        res.status(500).json({ success: false, message: 'Error saving the post in db' });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Blog.find();
        res.status(200).json({ success: true, message: 'All Blogs Fetched Successfully', data: posts });
    } catch (err) {
        console.error('Error Fetching blog posts:', err.message);
        res.status(500).json({ success: false, message: 'Error fetching blog post' });
    }
};

exports.getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Blog.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: `Post with id: ${id} not found` });
        }
        res.status(200).json({ success: true, message: 'Post Fetched Successfully', post });
    } catch (err) {
        console.error(`Error Fetching Post with id: ${id}`, err.message);
        res.status(500).json({ success: false, message: `Error Fetching Post with id: ${id}` });
    }
};

exports.likePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Blog.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ success: false, message: `Post with id: ${id} not found` });
        }
        res.status(200).json({ success: true, message: 'Likes updated successfully', data: post });
    } catch (err) {
        console.error(`Error Updating Likes for id: ${id}`, err.message);
        res.status(500).json({ success: false, message: `Error Updating Likes for id: ${id}` });
    }
};

exports.updateBlogById = async (req, res) => {
    const { id } = req.params;
    const { title, description, body, tags, images } = req.body;

    try {
        const post = await Blog.findByIdAndUpdate(
            id,
            { title, description, body, tags, images },
            { new: true, runValidators: true }
        );
        if (!post) {
            return res.status(404).json({ success: false, message: `Post with id: ${id} not found` });
        }
        res.status(200).json({ success: true, message: 'Blog updated successfully', data: post });
    } catch (err) {
        console.error(`Error updating blog with id: ${id}`, err.message);
        res.status(500).json({ success: false, message: `Error updating blog with id: ${id}` });
    }
};
