const mongoose = require("./connection");

var article = {
    _id: Number,
    title : String, 
    description : String, 
    urlToImage : String, 
    content : String,
    url : String
};

var articleSchema = mongoose.Schema(article);


var user = {
    token : String,
    email : String,
    pass : String,
    salt : String,
    lang: String,
    country : String,
    category : String,
    news : Array
}

var userSchema = mongoose.Schema ( user );
var users = mongoose.model('users', userSchema);


module.exports = users;
