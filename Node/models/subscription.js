const mongoose = require('mongoose');

const Subscription = mongoose.model(
    'subscription',
    new mongoose.Schema({
        pname : {
            type : String,
            required : false,
            minlength : 0
        },
        price : {
            type : String,
            required : false,
            minlength : 0
        },
        duration : {
            type : String,
            required : false,
            minlength : 0
        },
    })
)
exports.Subscription = Subscription;