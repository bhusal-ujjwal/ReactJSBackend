const mongoose = require('mongoose');
const chaptercontentSchema = new mongoose.Schema({
    novel: {
        type: String,
        required: true
    }
}, { timestamps: true });
const novelSchema = new mongoose.Schema({
    name :
    {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    desc:
    {
        type: String,
        required: true
    },
    author:
    {
        type: String,
        required: true
    },
    genre:
    {
        type: String,
        required: true
    },
    chapters:
    {
        type: Number,
        required: true
    },
    chaptercontent: [chaptercontentSchema],
},{timestamps:true});
module.exports = mongoose.model('Novel', novelSchema);