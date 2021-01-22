export default function (user = {token : "vide"}, action){
    var newUser;
    var wishList;
    console.log('user.reduceur, action.type=', action.type)
    if (action.type ==='token'){
        console.log('login user=', action.user);
        newUser = action.user;
        return newUser;
    } else if(action.type ==='initialisation'){
        newUser = {token : "vide"};
        return newUser;
    } else if (action.type ==='newLang') {
        newUser = {
            token : user.token,
            email : user.email,
            pass : user.pass,
            salt : user.salt,
            lang: action.lang,
            country : user.country,
            category : user.category,
            news : user.news 
        }
        return newUser;
    } else if (action.type ==='newCountry') {
        newUser = {
            token : user.token,
            email : user.email,
            pass : user.pass,
            salt : user.salt,
            lang: user.lang,
            country : action.country,
            category : user.category,
            news : user.news 
        }
        return newUser;
    } else if (action.type ==='newCategory') {
        newUser = {
            token : user.token,
            email : user.email,
            pass : user.pass,
            salt : user.salt,
            lang: user.lang,
            country : user.country,
            category : action.category,
            news : user.news 
        }
        return newUser;
    } else if (action.type ==='delArticle') {
        console.log('delArticle, user.news=', user.news);
        wishList = user.news.filter(art => art.urlToImage !== action.article.urlToImage);
        newUser = {
            token : user.token,
            email : user.email,
            pass : user.pass,
            salt : user.salt,
            lang: user.lang,
            country : user.country,
            category : user.category,
            news : wishList 
        }
        console.log('delArticle, newUser.news=', newUser.news);
        return newUser;
    } else if (action.type ==='likeArticle') {
        wishList = user.news.filter(art => art.urlToImage !== action.article.urlToImage);
        wishList.push(action.article);
        newUser = {
            token : user.token,
            email : user.email,
            pass : user.pass,
            salt : user.salt,
            lang: user.lang,
            country : user.country,
            category : user.category,
            news : wishList 
        }
        return newUser;
    } else if(action.type === 'initialisation'){
        newUser =  {token : "vide"};
        return newUser;
    } else {
        return user;
    }
}