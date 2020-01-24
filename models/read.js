//creation or reading progress 
const mongoose = require('mongoose');

const readSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Novel'
    },
    chapters: {
        type: mongoose.Schema.Types.Number,
        ref: 'Novel'
    },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);