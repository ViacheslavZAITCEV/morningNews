import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import '../App.css';
import { Card } from 'antd';
import Nav from '../components/Nav'


function mapStateToProps(state){
  if(state.user.token !== "vide"){
    
    return {
      token : state.user.token,
      lang : state.user.lang, 
      country : state.user.country, 
      category : state.user.category,
      wishist : state.user.news
    }
  }else{
    return {
      token : 'vide',
      lang : '',
      country : '',
      category : ''
    }
  }
}


const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([])
  const [link, setLink] = useState('')
  const [redirect, setRedirect] = useState(false)



  useEffect(() => {
    const findArticles = async() => {

      try {
        var toBackend = {
          url : `https://newsapi.org/v2/top-headlines?`,
          sources : props.match.params.id
        }
        var fromFront = JSON.stringify(toBackend);
        var requet = {
          method : 'POST',
          headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
          body : `fromFront=${fromFront}`
        }

        // const data = await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&${apiKey}`);
        console.log('requet=', requet);
        const data = await fetch('/getArticles', requet)
        const body = await data.json()

        if (body.status){
          // console.log ('findArticles from API');
          // console.log('body=', body)
          setArticleList(body.articles) 

        }else{
          console.log( 'error BE=', body.error )
        }
      } catch (error) {
        console.log ('error fetch( route= /getArticles )=', error);
        
      }
    }

    findArticles(); 
  },[props.match.params.id])





  async function addArticleToBD(token, article){
    console.log('token=', token)
    console.log('article=', article)
    var requet = {
      method : 'POST', 
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body : `token=${token}&title=${article.title}&description=${article.description}&urlToImage=${article.urlToImage}&content=${article.content}&url=${article.url}`
    };
    // await fetch("/addArticle", requet);
    await fetch("/addArticle", requet);
    // console.log('addArt:icleToBD, route= /addArticle  reponseBE=', reponseBE);
  }

  const toLink = (url)=>{
    console.log('click', url)
    setLink(url);
    setRedirect(true)
  }

  if (redirect){
    return(
      <Link to={link} />
    )
  }else{

  return (
      <div>
          
              <Nav/>

              <div className="Banner"/>

              <div className="Card">
                {articleList.map((article,i) => (
                  <div key={i} style={{display:'flex',justifyContent:'center'}}>

                  <Card
                    style={{ 
                    width: 300, 
                    margin:'15px', 
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent:'space-between' }}
                    cover={
                      <>
                        <a
                        href={article.url}
                        target='_blank'
                        alt={article.title}
                        >
                          <img 
                          style={{ width: 300 }}
                          src={article.urlToImage} 
                          // onClick={ ()=> { toLink(article.url) }}
                          />
                        </a>
                      </>
                    }
                    actions={[
                      <div 
                      type="like" 
                      key="ellipsis"
                      color='#red'
                      onClick={() => {addArticleToBD(props.token, article) ; props.likeClick(article)}} 
                      />
                    ]}
                    >

                    <Meta
                      title={article.title}
                      description={
                        <>
                        {article.description}
                        <a
                        href={article.url}
                        target='_blank'
                        alt={article.title}
                        >
                          Read more
                        </a>
                          </>
                      }
                    />

                  </Card>

                </div>

                ))}
                
            </div> 

        </div>
    );
  }
  
}



function mapDispatchToProps(dispatch){
  return {
    likeClick : function(article){
      // console.log('user like article=', article);
      dispatch( {type : 'likeArticle', article : article} );
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenArticlesBySource);
