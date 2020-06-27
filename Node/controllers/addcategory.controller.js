var {Addcategory} = require('../models/addcategory');
const mongoose = require('mongoose');

module.exports.getCategory = async function (req, res){
    const addcategory = await Addcategory.find().select('-__v');
    console.log(addcategory);
    res.send(addcategory);
}
module.exports.addCategory = function(req,res){
    console.log(Addcategory);
    let catObj = {
        catname : req.body.catname,
        catvalue : req.body.catvalue,
        catcolor : req.body.catcolor
    }
    const addcategory = new Addcategory(catObj);
    addcategory.save();
    console.log(addcategory);
    res.send(addcategory);
}
module.exports.delCategory = (req, res) => {
    console.log('controller')
    console.log(req.params.id)
    Addcategory.findByIdAndRemove(req.params.id)
    .then(response => {
        if(!response) {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.id
            });
        }
        res.json({msg: "Customer deleted successfully!"});
    })
};
module.exports.updateCategory = (req, res) => {
    // Find customer and update it
    let catObj = {
        catname : req.body.catname,
        catvalue : req.body.catvalue,
        catcolor : req.body.catcolor,
    }
    console.log("controller")
    Addcategory.findByIdAndUpdate(req.params.id, catObj, {new: true})
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