const mongoose = require('mongoose');
 
// Connection URL
const url = 'mongodb://localhost/deenspark';
module.exports = function(){
  mongoose.set('useFindAndModify', false);

mongoose.connect(url, {
  useNewUrlParser : true,
  useUnifiedTopology: true,
  useCreateIndex: true
  
}).then(() => console.log(mongoose.connection.readyState))
}