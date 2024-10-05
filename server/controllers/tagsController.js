const Blog = require('../model/Blog');

exports.getAllTags = async (req, res) => {
    try {
        const blogs = await Blog.find().select('tags');
        const allTags = blogs.map(blog => blog.tags).flat();
        const uniqueTags = [...new Set(allTags)];

        res.status(200).json({
            success: true,
            message: 'All tags fetched successfully',
            data: uniqueTags
        });
    } catch (err) {
        console.error('Error fetching tags:', err.message);
        res.status(500).json({ success: false, message: 'Error fetching tags' });
    }
};