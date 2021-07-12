  
  export async function chargeNews(lang, country, category, setSourceList){

    var toBack = {
      url : 'https://newsapi.org/v2/sources?',
      lang : lang,
      country : country,
      category : category,
    }
    var fromFront=JSON.stringify(toBack);

    try {
      var requet = {
        method: 'POST',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : `fromFront=${fromFront}`
      }
      const data = await fetch('/fetch', requet);
      const body = await data.json();

      if( body.status ){
        setSourceList(body.response);
      }else{
        console.log('error! retour BackEnd=', body.error);
      }
      
    } catch (error) {
      console.error('error! catch=', error);
      
    }
  }
  
  
  
export async function updateBD(route, arg, token){
    var body = `${arg}token=${token}`
    var requet = {
      method : 'POST', 
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body : body
    };
    
    try {
      await fetch(route, requet);
    } catch (error) {
      console.log(error);      
    }
  }

