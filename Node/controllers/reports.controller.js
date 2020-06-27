var {Movies} = require('../models/movies');
var {User} = require('../models/user');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const mongoose = require('mongoose');

module.exports.userReport = async function (req, res){
    var user = await User.find().select('-__v');
    console.log(user[0].fname);
   
const csvWriter = createCsvWriter({
  path: 'reports/user_report.xls',
  header: [
    {id: 'fname', title: 'First Name'},
    {id: 'lname', title: 'Last Name'},
    {id: 'address', title: 'Address'},
    {id: 'email', title: 'Email'},
    {id: 'spare_1', title: 'Spare_1'},
    {id: 'spare_2', title: 'Spare_2'},
    {id: 'spare_3', title: 'Spare_3'},
    {id: 'spare_4', title: 'Spare_4'},
  ]
});

csvWriter
  .writeRecords(user)
  .then(()=> console.log('success'));
  res.send({status:"success"});
}

module.exports.videoReport = async function (req, res){
    const movies = await Movies.find().select('-__v');
    console.log(movies);
    const csvWriter = createCsvWriter({
      path: 'reports/video_report.xls',
      header: [
        {id: 'mname', title: 'Animation Name'},
        {id: 'selectcat', title: 'Category'},
        {id: 'description', title: 'Description'},
        {id: 'spare_1', title: 'Spare_1'},
        {id: 'spare_2', title: 'Spare_2'},
        {id: 'spare_3', title: 'Spare_3'},
        {id: 'spare_4', title: 'Spare_4'},
      ]
    });
    
    csvWriter
      .writeRecords(movies)
      .then(()=> console.log('success'));
      res.send({status:"success"});
}