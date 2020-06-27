const mongoose = require('mongoose');

const Addcategory = mongoose.model(
    'addcategory',
    new mongoose.Schema({
        catname : {
            type : String,
            required : false,
            minlength : 0
        },
        catvalue : {
            type : String,
            required : false,
            minlength : 0
        },
        catcolor : {
            type : String,
            required : false,
            minlength : 0
        },
    })
)
exports.Addcategory = Addcategory;