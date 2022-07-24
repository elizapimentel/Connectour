const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    city: {
        type: String,
        required: true
    },
    attractionName: {
        type: String,
        required: true
    },
    opening_hours: [{
            days: String,
            starts: Date.parse(),
            ends: Date.parse()
    }],
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date()
    },
    updatedAt: {
        type: String,
        default: new Date()
    }
}, {timestamps: true})

module.exports = mongoose.model('post', postSchema);