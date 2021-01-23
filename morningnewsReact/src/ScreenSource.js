import React,{useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom'
import './App.css';
import { List, Avatar, Menu, Dropdown, Button, Row, Col } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

import apikey from './apikey';

function mapStateToProps(state){
  if(state.user.token !== "vide"){
    // state.artLikes = state.user.news;
    return {
      token : state.user.token,
      lang : state.user.lang !== 'language=undefined&' ? state.user.lang : '', 
      country : state.user.country !== 'country=undefined&' ? state.user.country : '', 
      category : state.user.category !== 'category=undefined&' ? state.user.category : '',
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


function ScreenSource(props) {
  
  const [lang, setLang] = useState(props.lang);
  const [country, setCountry] = useState(props.country);
  const [category, setCategory] = useState(props.category);
  const [sourceList, setSourceList] = useState([]);
  
  useEffect(()=>{
    chargeNews(
      lang ? lang : '', 
      country ? country : '', 
      category ? category : ''
    );
  }, [lang, country, category]);
  
  async function chargeNews(lang, country, category){
    var apiKey = apikey;

    try {
      const data = await fetch(`https://newsapi.org/v2/sources?${lang}${country}${category}${apiKey}`)
      const body = await data.json();
      // console.log(body.sources);
      setSourceList(body.sources);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  
  async function updateBD(route, arg){
    var body = `${arg}token=${props.token}`
    var requet = {
      method : 'POST', 
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body : body
    };
    // console.log('updateBD, route=', route, ',  body=', body);
    
    try {
      await fetch(route, requet);
      // var reponseBE = await fetch(route, requet);
      // console.log('BD=', reponseBD);
    } catch (error) {
      console.log(error);
      
    }
    // console.log('updateBD, route = ', route, '  reponseBE=', reponseBE);
  }





  // mis à jour les états les Reduxs
  function misajour(lang, country, category){
    setLang(lang);
    setCountry(country);
    setCategory(category);
    chargeNews(lang, country, category);
  }


  async function majLang(lang){
    misajour(lang, country, category);
    props.setLang(lang);
    updateBD('/setLang', lang);    
  }    


  function majCountry(country){
    misajour(lang, country, category);
    props.setCountry(country);
    updateBD('/setCountry', country);
  } 


  function majCategory(category){
    misajour(lang, country, category);
    props.setCategory(category);
    updateBD('/setCategory', category);
  }

    






  function menuLang() {
    return (
      <Menu>
        <Menu.Item onClick={() => majLang('')}>
          All languages
        </Menu.Item>
        <Menu.Item onClick={() => majLang('language=en&')}>
          English
        </Menu.Item>
        <Menu.Item onClick={() => majLang('language=fr&')}>
          French
        </Menu.Item>
        <Menu.Item onClick={() => majLang('language=ru&')}>
          Russian
        </Menu.Item>
        <Menu.Item onClick={() => majLang('language=de&')}>
          Deutch
        </Menu.Item>
        <Menu.Item onClick={() => majLang('language=it&')}>
          Italian
        </Menu.Item>
        <Menu.Item onClick={() => majLang('language=pt&')}>
          Portugaise
        </Menu.Item>
      </Menu>
    );
  }






  function menuCountry (){
    return (
      <Menu>
        <Menu.Item onClick={() => majCountry('')}>
          All country's sources
        </Menu.Item>
        <Menu.Item onClick={() => majCountry('country=us&')}>
          source - United States
        </Menu.Item>
        <Menu.Item onClick={() => majCountry('country=fr&')}>
          source - France
        </Menu.Item>
        <Menu.Item onClick={() => majCountry('country=ru&')}>
          source - Russia
        </Menu.Item>
        <Menu.Item onClick={() => majCountry('country=de&')}>
          source - Deutchland
        </Menu.Item>
        <Menu.Item onClick={() => majCountry('country=it&')}>
          source - Italy
        </Menu.Item>
        <Menu.Item onClick={() => majCountry('country=br&')}>
          source - Brasil
        </Menu.Item>
      </Menu>
    );
  };
  



  function menuCategory (){
    return (
      <Menu>
        <Menu.Item onClick={() => majCategory('')}>
          All categorys
        </Menu.Item>
        <Menu.Item onClick={() => majCategory('category=general&')}>
          general
        </Menu.Item>
        <Menu.Item onClick={() => majCategory('category=entertainment&')}>
          entertainment
        </Menu.Item>
        <Menu.Item onClick={() => majCategory('category=business&')}>
          business
        </Menu.Item>
        <Menu.Item onClick={() => majCategory('category=health&')}>
          health
        </Menu.Item>
        <Menu.Item onClick={() => majCategory('category=science&')}>
          science
        </Menu.Item>
        <Menu.Item onClick={() => majCategory('category=sports&')}>
          sports
        </Menu.Item>
        <Menu.Item onClick={() => majCategory('category=technology&')}>
          technology
        </Menu.Item>
      </Menu>
    );
  };

    







  if(props.token === 'vide'){
    return (
      <Redirect to="/" />
    )
  }else{




    return (
      <div>
        <Nav/> 

        <Row>
          <Col className='sourceMenu'>



            <Dropdown overlay={menuLang} placement="bottomLeft">
              <Button >
                Language - {  
                  lang.substring(9,11) ?
                  lang.substring(9,11) :
                  <span> All </span>
                } &nbsp;
              </Button>
            </Dropdown>

            <Dropdown overlay={menuCountry} placement="bottomCenter">
              <Button>
                Country's source - {  
                  country.substring(8,10) ?
                  country.substring(8,10) :
                  <span> All </span>
                } &nbsp;
                <img 
                  className="Drapeau"
                  alt='Country'
                  src={ 
                    country.substring(8,10) ?
                    `/images/${country.substring(8,10)}.png` :
                    `/images/all.png` 
                  }
                />
              </Button>
            </Dropdown>

            <Dropdown overlay={menuCategory} placement="bottomRight">
              <Button>
                Category - {
                  category.substring(9,category.length-1) ?
                  category.substring(9,category.length-1) : 
                  <span> All </span>
                } &nbsp;
                <img 
                  className="Drapeau"
                  alt='Category'
                  src={ 
                    category.substring(9,category.length-1) ?
                    `/images/${category.substring(9,category.length-1)}.png` :
                    `/images/allCategorys.png` 
                  }
                />
              </Button>
            </Dropdown>



          </Col>
        </Row>

        <div className="Banner"/>
        <div className="HomeThemes">
            
                <List
                    itemLayout="horizontal"
                    dataSource={sourceList}
                    renderItem={source => (

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={`/images/${source.category}.png`} />}
                          title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                          description={source.description}
                        />
                      </List.Item>

                    )}
                  />


            </div>
                  
        </div>
    );
  }
}






function mapDispatchToProps(dispatch){
  return{
    setLang : function(lang){
      dispatch({type : "newLang", lang : lang})
    },
    setCountry : function(country){
      dispatch({type : "newCountry", country : country})
    },
    setCategory : function(category){
      dispatch({type : "newCategory", category : category})
    },
  }
}




export default connect(mapStateToProps, mapDispatchToProps) (ScreenSource);