var express = require('express');
var router = express.Router();
var uid2 = require('uid2');
var SHA256 = require('crypto-js/sha256');
var encBase64 = require('crypto-js/enc-base64');
var users = require('../models/users');
var request = require('sync-request');
const { response } = require('express');
// cons apiKey = require( './apiKey');


const apiKey = 'apiKey=363e10d03e28468da1fc356d3eff9f14';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




// ******************************
//route: user cherche son account
router.post('/signin', async function(req, res, next) {
  console.log('Route sign in');
  login = req.body.login;
  pass = req.body.pass;
  console.log('login = ', login);
  console.log('pass  = ', pass);

  //-------------------------------
  // var reponse = user (si il existe)
  // var reponse = tab vide (si le compte n'existe pas)
  var reponse = await isExistUser(login);
  console.log('reponse  isExistUser= ', reponse);
  if (reponse.length == 0){
    console.log('user unExistant')
    var toReact = {error : 'login est incconu', succes : false};
  }else{

    //-------------------------------
    //il y a une compte de user
    //verification le mot de pass
    if (reponse[0].pass === SHA256(pass+reponse[0].salt).toString(encBase64)){
      reponse[0].login = "";
      reponse[0].pass = "";
      reponse[0].salt = "";
      var toReact = {user : (reponse[0]), succes : true};
    }else{
      var toReact = {error : 'pass est incorrect', succes : false};
    }
  }

  //-------------------------------
  // var toReact = est reponse pour ReactApp
  res.json(toReact);
});




// ******************************
//route: user create un account
router.post('/signup', async function(req, res, next) {

  console.log('Route sign Up');
  login = req.body.login;
  pass = req.body.pass;
  console.log('login = ', login);
  console.log('pass  = ', pass);

  //-------------------------------
  // var reponse = user (si il existe)
  // var reponse = tab vide (si le compte n'existe pas)
  var reponse = await isExistUser(login);
  console.log('reponse  isExistUser= ', reponse);
  if (reponse.length == 0 ){

  //-------------------------------
  // il n'y a pas de compte
  // on va creer un compte pour user 
    reponse= await createUser(login, pass);
    console.log('Creation new user. Report = ', reponse);
    reponse.login = "";
    reponse.pass = "";
    reponse.salt = "";
    var toReact = {user : reponse, succes : true};
  }else{

    //-------------------------------
    //il y a une compte d'user
    console.log('Error of inscription');
    var toReact = {error : 'email existe', succes : false};
  }

  //-------------------------------
  // var toReact = est reponse pour ReactApp
  res.json(toReact);
});




router.post('/setLang', async function( req, res, next){
  console.log('route: /setLang, req.body.language=', req.body.language, ', token=', req.body.token);
  var reponse;
  if (req.body.token != 'vide'){
    reponse = await setLang(req.body.token, 'language='+ req.body.language+'&');
    console.log (reponse);
  }

  res.json(reponse)
});




router.post('/setCountry', async function( req, res, next){
  console.log('route: /setCountry, req.body.country=', req.body.country, ', token=', req.body.token);
  var reponse;
  if (req.body.token != 'vide'){
    reponse = await setCountry(req.body.token, 'country='+ req.body.country+'&');
    console.log (reponse);
  }
  res.json(reponse)
});




router.post('/setCategory', async function( req, res, next){
  console.log('route: /setCategory, req.body.category=', req.body.category, ', token=', req.body.token);
  var reponse;
  if (req.body.token != 'vide'){
    reponse = await setCategory(req.body.token, 'category='+ req.body.category+'&');
    console.log (reponse);
  }
  res.json(reponse)
});




router.post('/addArticle', async function(req, res, next){
  console.log('route: addArticle,  req.body=', req.body);
  var reponse;
  if (req.body.token != 'vide'){
    reponse = await addArticleToBD(req.body.token, req.body.title, req.body.description, req.body.urlToImage, req.body.content, req.body.url);
    console.log ('add article to BD. reponseBD=', reponse);
  }
  res.json(reponse)
})




router.post('/delArticle', async function(req, res, next){
  console.log('route: delArticle,  req.body=', req.body);
  var reponse;
  if (req.body.token != 'vide'){
    reponse = await delArticleToBD(req.body.token, req.body.urlToImage);
    console.log ('del article from BD. reponseBD=', reponse);
  }
  res.json(reponse)
})



router.post ('/fetch', async function (req, res, next){
  console.log ('route /fetch');
  console.log ('req.body = ', req.body);
  var fromFrontRAW = req.body.fromFront;
  var fromFront = JSON.parse(fromFrontRAW);
  // console.log ('fromFront = ', fromFront);
  var response = {status : false};
  
  if (fromFront.lang) {
    fromFront.lang = fromFront.lang + '&'
  }
  
  if (fromFront.country) {
    fromFront.country = fromFront.country + '&'
  }
  
  if (fromFront.category) {
    fromFront.category = fromFront.category + '&'
  }
  
  try {

    var data = await request('GET', `${fromFront.url}${fromFront.lang}${fromFront.country}${fromFront.category}${apiKey}`);
    // console.log('data.body=', data.body);
    var body = JSON.parse(data.getBody());
    // console.log('body=', body);
    response.response = body.sources;
    // console.log('response.response=', response.response);
    response.status = true;

  } catch (error) {
    console.log(error);
    response.error= error;    
  }
  
  // console.log('response=', response);
  res.json(response);
})




router.post ('/getArticles', async function (req,res,next){

  console.log( 'route getArticles, req.body=', req.body);
  var response = { status : false };
  var fromFront = JSON.parse(req.body.fromFront)

  try {
    var data = await request('GET', `${fromFront.url}sources=${fromFront.sources}&${apiKey}`);
    response.articles = JSON.parse(data.getBody()).articles;
    response.status = true;
  } catch (error) {
    console.log( 'route getArticles, catch.error=', body.error )
  }


  console.log('response=', response);

  res.json(response)
})






//--------------------------------------------------
//
//          - = FUNCTIONS = -
// 
// *************************************************

async function isExistUser(email){
  var reponse;
  reponse = users.find({email});
  return reponse;
}



async function createUser(email, pass){
  var reponse;
  var salt = uid2(32);
  var newUser = new users({
    email : email,
    pass : SHA256(pass+salt).toString(encBase64),
    token : uid2(32),
    salt : salt,
    lang: '',
    country : '',
    category : '',
    news : []
  });
  reponse = await newUser.save();
  return reponse;
}



async function setLang(token, lang){
  console.log('function setLang, lang = ', lang)
  console.log('function setLang, token = ', token)
  var reponse = await users.update({token}, {lang});
  return reponse;
}



async function setCountry(token, country){
  var reponse = await users.update({token}, {country});
  return reponse;
}



const temp = {
  fun : function (arg){
    console.log('function imbriqué, arg=', arg);
  }
}



async function setCategory (token, category){
  temp.fun('test');
  var reponse = await users.update({token}, {category});
  return reponse;
}



async function addArticleToBD(token, title, description, urlToImage, content, url){
  var reponse = 'is present in BD'
  try{
    var user = await users.findOne({token});
    if ( !  isPresentInTab(user.news, urlToImage)){
      user.news.push({title, description, urlToImage, content, url})
      reponse = await users.updateOne ( {token : token }, user);
    }
  }catch (e){
    console.log(e);
    reponse = e;
  }
    return reponse;
}



async function delArticleToBD(token,  img){
  var reponse = 'error';
  try{
    var user = await users.findOne({token});
    var news = user.news.filter ( art => art.urlToImage != img );
    user.news = news;
    reponse = await users.updateOne ( {token : token }, user);
  }catch (e){
    console.log(e);
  }
  return reponse;
}


function isPresentInTab(tab, str){
  console.log('on cherche article dans wishList');
  var i=0;
  var reponse = false;
  while (i<tab.length){
    if (tab[i].image == str){
      console.log('article est trouvé, index=', i);
      return i;
    }
    i++;
  }
  console.log("article n'est pas trouvé, reponse=", reponse);
  return reponse;
}



module.exports = router;
