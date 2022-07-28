const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
        unique: false
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    county: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user'],
        required: true
    },
    registrationNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String
    },
    createdAt: {
        type: String,
        default: new Date()
    }
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema);