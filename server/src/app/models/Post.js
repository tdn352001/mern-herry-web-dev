const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const Post = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNDED'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
})

module.exports = mongoose.model('posts', Post)
