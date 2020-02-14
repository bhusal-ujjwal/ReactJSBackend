const mongoose = require('mongoose');
const cartSchema =  new mongoose.Schema({
    usercart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    quantity:{
        type:Number
    },
    novel:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Novel',
        required:true
    }]
 
},{timestamps:true});

module.exports = mongoose.model('Cart',cartSchema);
