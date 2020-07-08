var {Subscription} = require('../models/subscription');
const mongoose = require('mongoose');

module.exports.getSubPlan = async function (req, res){
    const subscription = await Subscription.find().select('-__v');
    res.send(subscription);
}

module.exports.addSubPlan = function(req,res){
    let obj = {
        pname : req.body.pname,
        price : req.body.price,
        duration : req.body.duration
    }
    const subscription = new Subscription(obj);
    subscription.save();
    res.send(subscription);
}
module.exports.delPlan = (req, res) => {
    Subscription.findByIdAndRemove(req.params.id)
    .then(response => {
        if(!response) {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.id
            });
        }
        res.json({msg: "Customer deleted successfully!"});
    })
};
module.exports.updatePlan = (req, res) => {
    // Find customer and update it
    let Obj = {
        pname : req.body.pname,
        price : req.body.price,
        duration : req.body.duration,
    }
    console.log("controller")
    Subscription.findByIdAndUpdate(req.params.id, Obj, {new: true})
    .then(response => {
        if(!response) {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.id
            });
        }
        res.json(response);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.id
            });                
        }
        return res.status(500).json({
            msg: "Error updating customer with id " + req.params._id
        });
    });
};