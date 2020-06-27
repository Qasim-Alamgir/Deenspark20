const mongoose = require('mongoose');

const Movies = mongoose.model(
    'movies',
    new mongoose.Schema({
        mname : {
            type : String,
            required : false,
            minlength : 0
        },
        selectcat : {
            type : String,
            required : false,
            minlength : 0
        },
        img : {
            type : String,
            required : false,
            minlength : 0
        },
        vdo : {
            type : String,
            required : false,
            minlength : 0
        },
        description : {
            type : String,
            required : false,
            minlength : 0
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
exports.Movies = Movies;