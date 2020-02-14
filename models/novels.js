const mongoose = require('mongoose');
const novelSchema = new mongoose.Schema({
    novelname:
    {
        type: String,
        //required: true
    },
    noveldesc:
    {
        type: String,
       // required: true
    },
    rate:
    {
        type: Number,
        //required: true
    },
    novelimg:{
        type:String,
        //required:true
    },
    ncategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        //required:true
    },
    done: {
        type: Boolean,
        default: true
    },
},{timestamps:true});
module.exports = mongoose.model('Novel', novelSchema);
