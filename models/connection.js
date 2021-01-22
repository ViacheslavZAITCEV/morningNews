var mongoose = require('mongoose');


var options = {
    connectTimeoutMS : 5000,
    useNewUrlParser : true,
    useUnifiedTopology : true
}
//               mongodb+srv://sous:<password>@cluster0.vafap.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://sous:news@cluster0.vafap.mongodb.net/users?retryWrites=true&w=majority", 
options, 
function(error){
  if (error) {
    console.log(error);
  } else {
    console.log("connection ok");
  }
}
);

module.exports = mongoose;
