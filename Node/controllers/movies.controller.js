var {Movies} = require('../models/movies');
const mongoose = require('mongoose');
const multipart = require('connect-multiparty');

module.exports.getMovies = async function (req, res){
    const movies = await Movies.find().select('-__v');
    res.send(movies);
}

module.exports.getMovieList = async function (req, res){
    const movies = await Movies.find({selectcat : req.body.catvalue}).select('-__v');
    res.send(movies);
}

module.exports.getMovie = async function (req, res){
    const movies = await Movies.find({_id : req.body._id}).select('-__v');
    res.send(movies);
}

module.exports.addMovies = function(req,res){
    let obj = {
        mname : req.body.mname,
        selectcat : req.body.selectcat,
        description : req.body.description,
        spare_1 : '',
        spare_2 : '',
        spare_3 : '',
        spare_4 : '',
        img : req.files.img.path,
        vdo : req.files.vdo.path
    }
    const movies = new Movies(obj);
    movies.save();
    res.send(obj);
}
module.exports.delMovies = (req, res) => {
    Movies.findByIdAndRemove(req.params.id)
    .then(response => {
        if(!response) {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.id
            });
        }
        res.json({msg: "Customer deleted successfully!"});
    })
};
module.exports.updateMovies = (req, res) => {
    // // Find Movie and update it
    var imagePath = '';
    if(req.files.img !== undefined && req.files.img !== null){
        imagePath = req.files.img.path
    }else{
        imagePath = req.body.imgpath
    }
    var vdoPath = '';
    if(req.files.vdo !== undefined && req.files.vdo !== null){
        vdoPath = req.files.vdo.path
        
    }else{
        vdoPath = req.body.vdopath
    }
    let obj = {
        mname : req.body.mname,
        selectcat : req.body.selectcat,
        description : req.body.description,
        img : imagePath,
        vdo : vdoPath
    }
    Movies.findByIdAndUpdate(req.params.id, obj, {new: true})
    .then(response => {
        res.json(response);
    })
};
