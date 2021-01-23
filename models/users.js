const mongoose = require("./connection");

var articles = {
    _id: Number,
    title : String, 
    description : String, 
    urlToImage : String, 
    content : String,
    url : String
};

var articleSchema = mongoose.Schema(articles);


var users = {
    token : String,
    email : String,
    pass : String,
    salt : String,
    lang: String,
    country : String,
    category : String,
    news : [articleSchema],
}

var userSchema = mongoose.Schema ( users );
var users = mongoose.model('users', userSchema);


module.exports = users;
