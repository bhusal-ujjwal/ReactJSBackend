const mongoose = require('mongoose');

const novelcategorySchema= new mongoose.Schema({
    category: {
        type:String,
        required:true
    },
    image:{
        type:String,
       // required:true
    }

},{timestamps:true});

module.exports=mongoose.model('NovelCategory',novelcategorySchema);
