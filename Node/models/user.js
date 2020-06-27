const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    new mongoose.Schema({
        fname : {
            type : String,
            required : false,
            minlength : 0
        },
        lname : {
            type : String,
            required : false,
            minlength : 0
        },
        email : {
            type : String,
            required : true,
            minlength : 0
        },
        address : {
            type : String,
            required : true,
            minlength : 0
        },
        password : {
            type : String,
            required : true,
            minlength : 0
        },
        active: { 
            type : Boolean, 
            default : false 
        },
        temporarytoken: {
            type : String,
            required : true 
        },
        spare_1 : {
            type : String,
            required : false,
            minlength : 0
        },
        spare_2 : {
            type : String,
            required : false,
            minlength : 0
        },
        spare_3 : {
            type : String,
            required : false,
            minlength : 0
        },
        spare_4 : {
            type : String,
            required : false,
            minlength : 0
        },
    })
)
exports.User = User;