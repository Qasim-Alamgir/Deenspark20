var express = require('express');
var Routes = express.Router();
var uc = require('../controllers/user.controller');
var mc = require('../controllers/movies.controller');
var ac = require('../controllers/addcategory.controller');
var rc = require('../controllers/reports.controller')
var sc = require('../controllers/subscription.controller')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './upload/image'
});

const mongoose = require('mongoose');

Routes.route('/').get(function (req, res){
    console.log('main');
    res.send('main');
});

//routes for users
Routes.route('/adduser').post(uc.adduser);
Routes.route('/reset').post(uc.reset);
Routes.route('/getuser').get(uc.getUser);
Routes.route('/userLogin').post(uc.userLogin);
Routes.route('/remainderemail').post(uc.remainderEmail);
Routes.route('/activate').post(uc.activate);
Routes.route('/checkpassword').post(uc.checkPassword);
Routes.route('/changepassword/:id').put(uc.changepassword);
Routes.route('/deluser/:id').delete(uc.delUser);
Routes.route('/editinfo/:id').put(uc.editinfo);

//Routes for movies
Routes.route('/addmovies').post(multipartMiddleware, mc.addMovies);
Routes.route('/updatemovies/:id').put(multipartMiddleware, mc.updateMovies);
Routes.route('/getmovies').get(mc.getMovies);
Routes.route('/delmovies/:id').delete(mc.delMovies);
Routes.route('/getmovies').get(mc.getMovies);
Routes.route('/getmovielist').post(mc.getMovieList);
Routes.route('/getmovie').post(mc.getMovie);

//Routes for category
Routes.route('/addcategory').post(ac.addCategory);
Routes.route('/getcategory').get(ac.getCategory);
Routes.route('/delcategory/:id').delete(ac.delCategory);
Routes.route('/updatecategory/:id').put(ac.updateCategory);

//Routes for reports
Routes.route('/userreport').get(rc.userReport);
Routes.route('/videoreport').get(rc.videoReport);

//Routes for subscription plan
Routes.route('/addsubplan').post(sc.addSubPlan);
Routes.route('/getsubplan').get(sc.getSubPlan);
Routes.route('/updateplan/:id').put(sc.updatePlan);
Routes.route('/delplan/:id').delete(sc.delPlan);



module.exports = Routes;