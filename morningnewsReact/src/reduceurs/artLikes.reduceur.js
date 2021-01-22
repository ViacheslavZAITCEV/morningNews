export default function (artLikes = [], action){
    if (action.type ==='like'){
        var newArticles = artLikes.filter(art => art.url !== action.article.url);
        newArticles.push(action.article);
        return newArticles;
    }else if (action.type ==='del'){
        var newArticles = artLikes.filter(art => art.url !== action.article.url);
        return newArticles;
    }else if (action.type ==='initialisation'){
        return [];
    }else {
        return artLikes;
    }
}