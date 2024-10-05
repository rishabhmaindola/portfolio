const axios = require('axios');
const Project = require('../model/Projects');

exports.createProject = async (req, res) => {
    const { title, description, languages, images } = req.body;
    try {
        const response = await axios.get(`https://api.github.com/repos/rishabhmaindola/${title}`);
        const { html_url: coderepo, homepage: livedemo } = response.data;

        const project = new Project({
            title,
            description,
            languages,
            coderepo,
            livedemo: livedemo || coderepo,
            images
        });

        await project.save();

        res.status(201).json({ success: true, message: "Project created successfully", project });
    } catch (error) {
        console.error('Error fetching project from GitHub:', error.message);
        res.status(500).json({ success: false, message: "Error creating project" });
    }
};


exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ success: true, projects });
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching projects' });
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, languages, coderepo, livedemo, images } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                title,
                description,
                languages,
                coderepo,
                livedemo,
                images
            },
            { new: true, runValidators: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        res.status(200).json({ success: true, message: "Project Updated Succcesfully", data: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};