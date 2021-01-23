import React, {useState}  from 'react';
import {Redirect} from 'react-router-dom';
import './App.css';
import { Card, Icon, Modal, Divider} from 'antd';
import Nav from './Nav';
import {connect} from 'react-redux';


function mapStateToProps(state){
  return {
    // wishList : state.artLikes,
    wishList : state.user.news,
    token : state.user.token
  };
}


const { Meta } = Card;



function ScreenMyArticles(props) {

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('')
  const [img, setImg] = useState('')

  var likes;
  console.log('wishList = ', props.wishList);

  
  if(props.token === 'vide'){
    return (
      <Redirect to="/" />
    )
  }else{




    if(props.wishList.length > 0){

      likes = props.wishList.map(function (article, i){
        var showModal = (title, content, url, img) => {
          setVisible(true);
          setTitle(title);
          setContent(content);
          setUrl(url);
          setImg(img);
        }
        var handleOk = e => {
          console.log(e);
          setVisible(false);
        }
        var handleCancel = e => {
          console.log(e);
          setVisible(false);
        }

        
        async function delArticleToBD(token, article){
          var body = `token=${token}&title=${article.title}&urlToImage=${article.urlToImage}`;
          console.log('delArticleToBD,  body=', body)
          var requet = {
              method : 'POST', 
              headers: {'Content-Type':'application/x-www-form-urlencoded'},
              body : body
            };
            var reponseBE = await fetch("/delArticle", requet);
            console.log('delArticleToBD, route= /delArticle,  reponseBE=', reponseBE);
        }

        return <Card
            style={{  
              width: 300, 
              margin:'15px', 
              display:'flex',
              flexDirection: 'column',
              justifyContent:'space-between' }}
            cover={ 
              <img  
              onClick={() => showModal(article.title, article.content, article.url, article.urlToImage)}
              alt={article.title}
              src={article.urlToImage} 
              />
            }
            actions={[
              <Icon type="read" key="ellipsis2"   />,
              <Icon type="delete" key="ellipsis" onClick={ ()=> {delArticleToBD(props.token, article) ; props.delAricle(article)}} />
            ]} >

            <Meta
            onClick={() => showModal(article.title, article.content, article.url, article.urlToImage)}
            title={article.title}
            description={article.description}
            />
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
        </Card>
      });
      
    }else{
      likes = <div>No Articles</div>;

    }




    console.log('likes=', likes);

    return (
      <div>
        <Nav/>
        <div className="Banner"/>
        <div className="Card">
        {likes}
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch){
  return {
    delAricle : function(article){
      console.log('user del article=', article);
      dispatch( {type : 'delArticle', article : article} );
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenMyArticles);
