const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        
    },
    lastname: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    phoneno:{
        type: String,
        
    },
    email:{
        type: String,
        
    },
    username: {
        type: String,
        required:true,
        unique: true,
    },
    password: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
   
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);