var {User} = require('../models/user');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var generator = require('generate-password');
var secret = 'deenspark';
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deenspark20@gmail.com',
      pass: 'Deenspark1540'
    }
  });

module.exports.getUser = async function (req, res){
  const user = await User.find().select('-__v');
  res.send(user);
}

module.exports.adduser = async function(req,res){
  const user = await User.find({email : req.body.email}).select('-__v');
  if(user.length == 0){
    const saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = hash;
    let userObj = {
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        address : req.body.address,
        password : req.body.password,
        spare_1 : '',
        spare_2 : '',
        spare_3 : '',
        spare_4 : '',
        temporarytoken : jwt.sign({fname: req.body.fname, email: req.body.email}, secret, {expiresIn: '24h'})
    }
    const user = new User(userObj);
    user.save();
    res.json("Verification link has been sent it to provided email");
      
      var mailOptions = {
        from: 'support@deenspark.com',
        to: user.email,
        subject: 'Activation Link',
        text: 'That was easy!',
        html: '<body style="background-color:#f6d55c;padding: 30px;"><h1>Hello  <strong>' + req.body.fname + '</strong>,</h1><h3>Thank you for registering at DeenSpark.com. Please click the button below to complete your activation:</h3><button style="padding: 10px;background: #173f5f;color: aliceblue;border: 1px solid #20639b;"><a style = "color: #eaeef5; padding: 15px; font-size: 20px;"href="http://localhost:4200/auth/activate/' + userObj.temporarytoken + '">Activate Account</button></body>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }else if(user[0].email !== null && user[0].active == false){
      token = jwt.sign({fname: req.body.fname, email: req.body.email}, secret, {expiresIn: '24h'})
      let obj = {
        temporarytoken : token
      }
      User.findByIdAndUpdate(user[0]._id, obj, {new: true})
    .then(response => {
        res.json(response);
    })
      var mailOptions = {
        from: 'support@deenspark.com',
        to: user[0].email,
        subject: 'Activation Link',
        text: 'That was easy!',
        html: '<body style="background-color:#f6d55c;padding: 30px;"><h1>Hello  <strong>' + req.body.fname + '</strong>,</h1><h3>Thank you for registering at DeenSpark.com. Please click the button below to complete your activation:</h3><br><br><button style="padding: 10px;background: #173f5f;color: aliceblue;border: 1px solid #20639b;"><a style="color: #eaeef5; padding: 15px; font-size: 20px;" href="http://localhost:4200/auth/activate/' + obj.temporarytoken + '">Avtivate Account</button></body>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
    }else if(user[0].email !== null && user[0].active == true){
      res.send({status:"Email Already exist"});
      console.log("Email already exist")
    }
}

module.exports.activate =  async function(req, res) {
    const user1 = await User.find({temporarytoken: req.body.token}).select('-__v');
    if(user1.length !== 0){
    var user = new User();
    User.findOne({temporarytoken: user1[0].temporarytoken}, function(err, user){
      if(user.temporarytoken !== false){
        if(err) throw err;
        var token = req.body.token;
        jwt.verify(token, secret, function(err, decoded){
            if(err){
                res.json({success : false, message: 'error.'});
            } else{
                user.temporarytoken = false;
                user.active = true;
                user.save(function(err){
                    if(err){
                        console.log(err);
                    } else{
                        var mailOptions = {
                            from: 'qaxim12@gmail.com',
                            to: user.email,
                            subject: 'Activation Link',
                            text: 'That was easy!',
                            html: '<body style="background-color:#f6d55c;padding: 30px;"><h1>Hello ,</h1><h3>Your account has been successfully activated</h3></body>'
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                          res.json("activated")
                    }
                });
            }
        })
      }
      })
    }else{
      res.json("expired")
    }
};

module.exports.userLogin = async function (req, res){
    const user = await User.find({email : req.body.email}).select('-__v');
    if(user.length > 0){
    bcrypt.compare(req.body.password, user[0].password, function(err, isMatch) {
      if (err) {
        throw err
      } else if (!isMatch) {
        res.send({status:"error", canlogin: "No"});
        console.log("Password doesn't match!")
      } else if(user[0].active == true && isMatch){
        res.send({status:user[0]})
      } else if(user[0].active == false){
        res.send({status:"activate"})
      }
    })
  }else{
    res.send({status:"Incorrect"})
  }
}

module.exports.checkPassword = async function (req, res){
  const user = await User.find({_id : req.body.id}).select('-__v');
  bcrypt.compare(req.body.oldPassword, user[0].password, function(err, isMatch) {
    if (err) {
      throw err
    } else if (!isMatch) {
      res.send({status:"notMatch", canlogin: "No"});
      console.log("Password doesn't match!")
    } else {
      res.send({status:"match", canlogin: "No"});
      console.log("match")
    }
  })
}

module.exports.reset = async function (req, res){
  const user1 = await User.find({email : req.body.email}).select('-__v');
  if(user1.length > 0 ){
  const user = User.findOne({email: req.body.email}, function(err, user){
  if(user !== null){
    var pswrd = generator.generate({
      length: 10,
      numbers: true
  })
  password = pswrd;
  const saltRounds = 10;
    var hash = bcrypt.hashSync(password, saltRounds);
  let obj = {
    password : hash
  }
  User.findByIdAndUpdate(user._id, obj, {new: true})
    .then(response => {
      console.log(response)
    })
    
  var mail = {
    from: 'support@deenspark.com',
    to: user.email,
    subject: 'Reset Password',
    text: 'Hello  ' + user.fname + 'Your new password is ' + password,
    html: '<body style="background-color:#f6d55c;padding: 30px;"><h1>Hello  <strong>' + user.fname + '</strong></h1><h2>Your new password is <b>' + password + '</h2></b><br></body>'
  };
  
  transporter.sendMail(mail, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send({status:"Email sent:"})
    }
  });
  res.send({status : 'sent'})
  };
})
}else{
  res.send({status : 'notexist'})
}
};

module.exports.changepassword = (req, res) => {
  // Find customer and update it
  const saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = hash;
  let obj = {
    password : req.body.password
  }
  User.findByIdAndUpdate(req.params.id, obj, {new: true})
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

module.exports.editinfo = async function (req, res){
  // Find customer and update it
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(response => {
          if(!response) {
              return res.status(404).json({
                  msg: "Customer not found with id " + req.params.id
              });
          }
          res.send(response)
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
module.exports.delUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(response => {
      if(!response) {
          return res.status(404).json({
              msg: "Customer not found with id " + req.params.id
          });
      }
      res.json({msg: "Customer deleted successfully!"});
  })
};
