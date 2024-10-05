const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true,
        unique: true
    },
    type: String,
    proficiency: String,
    iconUrl: String
});

module.exports = mongoose.model('Skill', skillSchema);
