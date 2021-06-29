import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import { List, Avatar, Menu, Dropdown, Button, Row, Col } from 'antd';
import Nav from '../components/Nav'
import DropDownButton from '../components/DropDownButton'
import { connect } from 'react-redux';

import {countrys, categorys, languages } from '../constants/constants'


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

    var toBack = {
      url : 'https://newsapi.org/v2/sources?',
      lang : lang,
      country : country,
      category : category,
    }
    var fromFront=JSON.stringify(toBack);

    try {
      console.log('etape1');
      var requet = {
        method: 'POST',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : `fromFront=${fromFront}`
      }
      console.log('requet');
      // const data = await fetch(`https://newsapi.org/v2/sources?${lang}${country}${category}${apiKey}`)
      const data = await fetch('/fetch', requet);
      const body = await data.json();
      console.log('etape2, body=', body);

      if( body.status ){
        console.log('etape2, body.response=', body.response);
        setSourceList(body.response);
        // console.log('body.sources=', body.sources);
      }else{
        console.log('error BackEnd=', body.error);
      }
      
    } catch (error) {
      console.log('error fetch=', error);
      
    }
  }
  
  
  
  async function updateBD(route, arg){
    var body = `${arg}token=${props.token}`
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


  const menuLang = ()=>{
    return (
      <Menu>
        <Menu.Item onClick={() => majLang('')}>
          All languages
        </Menu.Item>
        { languages.map( (l, i) =>{ 
          return (
            <Menu.Item key={i} onClick={() => majLang(`language=${l.language}`)} >
              {l.languageName}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }


  const menuCountry = ()=>{
    return (
      <Menu>
        <Menu.Item onClick={() => majCountry('')}>
          All country's sources
        <img style={{height: '3vh' }} src={ `./images/all.png`} />
        </Menu.Item>
        { countrys.map( (c, i) =>{ 
          return (
            <Menu.Item key={i} onClick={() => majCountry(`country=${c.country}`)} >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}  >
              <span className="drapeau">
                <img className="logos" src={ `./images/${c.country}.png`}x />
              </span>
              <span justifyContent="center">
                {c.countryName}
              </span>
              </div>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
  
  
  
  function menuCategory (){
    return (
      <Menu>
        <Menu.Item onClick={() => majCategory('')}>
          All categorys
        </Menu.Item>
        {
          categorys.map ((c, i) =>{
            return (
              <Menu.Item style={{justifyContent: 'space-between'}} key={i} onClick={() => majCategory(`category=${c.category}`)}>

                  <img style={{width: '2vw', paddingRight: '10px'}} src={c.img} />
                {c.categoryName}
              </Menu.Item>
            )
          })
        }
      </Menu>
    );
  };

    









    return (
      <div>
        <Nav
        lang={lang}
        menuLang={menuLang}
        country={country}
        menuCountry={menuCountry}
        category={category}
        menuCategory={menuCategory}
        
        /> 


          <Col>
            <div className="HomeThemes Banner">
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
        </Col>
                  

        </div>
    );
  }



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