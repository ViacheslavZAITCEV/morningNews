import React, {useState, useEffect} from 'react';
// import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon, Modal, Divider} from 'antd';
import Nav from './Nav'


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
  const [img, setImg] = useState('')

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

  var showModal = (title, content, url, img) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
    setUrl(url);
    setImg(img);
  }

  var handleOk = e => {
    // console.log(e);
    setVisible(false);
  }

  var handleCancel = e => {
    // console.log(e);
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
    // await fetch("/addArticle", requet);
    var reponseBE = await fetch("/addArticle", requet);
    console.log('addArt:icleToBD, route= /addArticle  reponseBE=', reponseBE);
}



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
                        onClick={() => showModal(article.title, article.content, article.url, article.urlToImage)} 
                        />
                      }
                      actions={[
                        <a
                        href={article.url}
                        target='_blank'
                        alt={article.title}
                        >
                        <Icon 
                        type="read" 
                        key="ellipsis2" 
                        />
                      </a>,

                      <Icon 
                        type="like" 
                        key="ellipsis"
                        color='#red'
                        onClick={() => {addArticleToBD(props.token, article) ; props.likeClick(article)}} 
                        />
                      ]}
                      >

                    <Meta
                      onClick={() => showModal(article.title,article.content,article.url, article.urlToImage)} 
                      title={article.title}
                      description={article.description}
                    />

                  </Card>
                  <Modal
                    className='modal'
                    title={title}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <a
                    href={article.url}
                    target='_blank'
                    alt={article.title}
                    >
                      <img
                      alt={title}
                      className='imgModal'
                      src={img}
                      />
                    </a>
                    <Divider />
                    <a href={url} target='_blank'>{content}</a>
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
      // console.log('user like article=', article);
      dispatch( {type : 'likeArticle', article : article} );
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenArticlesBySource);
