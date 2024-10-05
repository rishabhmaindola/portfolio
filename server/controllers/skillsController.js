const Skill = require('../model/Skill');

exports.createSkill = async (req, res) => {
    try {
        const { skill, type, proficiency, iconUrl } = req.body;

        const existingSkill = await Skill.findOne({ skill });
        if (existingSkill) {
            return res.status(400).json({ success: false, message: 'Skill already exists' });
        }

        const newSkill = new Skill({
            skill,
            type,
            proficiency,
            iconUrl
        });
        const savedSkill = await newSkill.save();
        res.status(201).json({ success: true, message: 'Skill created successfully', data: savedSkill });

    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        return res.status(200).json({ success: true, message: 'All SKills Fetched Successfully', data: skills });
    } catch (error) {
        console.error('Error fetching skills:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};