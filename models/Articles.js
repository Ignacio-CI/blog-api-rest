const { Schema, model } = require('mongoose');

// const ArticleSchema = Schema({
//     title: String,
//     content: String,
//     date: String,
//     image: String
// })

// This way sets more control over the Object's properties:
const ArticleSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        default: 'default.png',
    }
})

module.exports = model("Article", ArticleSchema, 'articles')