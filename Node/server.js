var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var Routes = require('./routes/routes');
require('./config')();


var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}) );


app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});
app.use('/api', Routes);


// app.get('/api/addmovies', (req, res) => {
//   res.json({
//       'message': 'hello'
//   });
// });
// app.post('/api/addmovies', multipartMiddleware, (req, res) => {
//   res.json({
//       'message': 'File uploaded succesfully.'
//   });
//   console.log('server')
// });
path = __dirname + '/upload/image'
app.use('/upload/image', express.static(__dirname + '/upload/image'));
path = __dirname + '/upload/video'
app.use('/upload/video', express.static(__dirname + '/upload/video'));
app.get('/api/download', function(req, res){
  var file = __dirname + '/reports/user_report.xls';
  res.download(file);
});
app.get('/api/vdodownload', function(req, res){
  var file = __dirname + '/reports/video_report.xls';
  res.download(file);
});

app.listen(3000,() => {
    console.log("listen to the port 3000" );
})

