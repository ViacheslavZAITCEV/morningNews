import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'

import apikey from './apikey';



function mapStateToProps(state){
  if(state.user.token !== "vide"){
    
    return {
      token : state.user.token,
      lang : state.user.lang, 
      country : state.user.country, 
      category : state.user.category,
      wishist : state.user.news }
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

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const findArticles = async() => {
      var apiKey = apikey;
      const data = await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&${apiKey}`);
      const body = await data.json()
      console.log ('findArticles from API');
      console.log('body=', body)
      setArticleList(body.articles) 
    }

    findArticles(); 
  },[])

  var showModal = (title, content, url) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
    setUrl(url);
  }

  var handleOk = e => {
    console.log(e);
    setVisible(false);
  }

  var handleCancel = e => {
    console.log(e);
    setVisible(false);
  }

  async function addArticleToBD(token, article){
    console.log('token=', token)
    console.log('article=', article)
    var requet = {
      method : 'POST', 
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body : `token=${token}&title=${article.title}&description=${article.description}&urlToImage=${article.urlToImage}&content=${article.content}&url=${article.url}`
    };
    var reponseBE = await fetch("/addArticle", requet);
    console.log('addArticleToBD, route= /addArticle  reponseBE=', reponseBE);
}
// http://localhost:3001/screenarticlesbysource/https://www.rbc.ru/economics/15/01/2021/6000bcae9a79477c7d2bde36?from=from_main_4
//                                             /44
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
                  <img
                      alt="example"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content,article.url)} />,
                      <Icon type="like" key="ellipsis"  onClick={() => {addArticleToBD(props.token, article) ; props.likeClick(article)}} />
                  ]}
                  >

                  <Meta
                    title={article.title}
                    description={article.description}
                  />

                </Card>
                <Modal
                  title={title}
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>{content}</p>
                </Modal>

              </div>

              ))}
              
           </div> 

      </div>
  );
}



function mapDispatchToProps(dispatch){
  return {
    likeClick : function(article){
      console.log('user like article=', article);
      dispatch( {type : 'likeArticle', article : article} );
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenArticlesBySource);
