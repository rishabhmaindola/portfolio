const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    coderepo: {
        type: String,
        required: true
    },
    livedemo: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('Project', projectSchema);