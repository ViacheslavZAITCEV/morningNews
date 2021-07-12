import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import { chargeNews, updateBD } from '../services/fetchsBackend'
import { connect } from 'react-redux';
import { List, Avatar, Col } from 'antd';
import Nav from '../components/Nav'
import DropdownMenu from '../components/DropdownMenu'
import {
  countrys, 
  categorys, 
  languages,
  COLOR_SLATE,
  COLOR_CERAMIC,
  COLOR_LATTE,
  COLOR_COFFEE
} from '../constants/constants'

import background from './img/background.jpg'


function ScreenSource(props) {
  
  const banner = {
    // position: 'static',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'noRepeat',
    backgroundSize: 'cover',
    opacity: 0.9,
  }
  const listSources = {
    height: '85vh',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  }
  const listItemStyles = {
    background: '#fff',
    opacity: 0.8,
    borderRadius: 15,
    marginTop: 5,
  }


  const [lang, setLang] = useState(props.lang);
  const [country, setCountry] = useState(props.country);
  const [category, setCategory] = useState(props.category);
  const [sourceList, setSourceList] = useState([]);
  
  useEffect(()=>{
    chargeNews( lang, country, category, setSourceList );
  }, [lang, country, category]);
  

  // mis à jour les états les Reduxs
  function misajour(lang, country, category){
    setLang(lang);
    setCountry(country);
    setCategory(category);
    chargeNews(lang, country, category);
    console.log('lang: ' + lang)
    console.log('country: ' + country)
    console.log('category: ' + category)
  }


  async function majLang(lang){
    misajour(lang, country, category);
    props.setLang(lang);
    updateBD('/setLang', lang, props.token);    
  }    


  function majCountry(country){
    misajour(lang, country, category);
    props.setCountry(country);
    updateBD('/setCountry', country, props.token);
  } 


  function majCategory(category){
    misajour(lang, country, category);
    props.setCategory(category);
    updateBD('/setCategory', category, props.token);
  }


  const menuLang = ()=>{
    return (
      <DropdownMenu
      maj = {majLang}
      list = {languages}
      selected = {lang}
      proprety = 'language'
      name = "languageName"
      />
      )
    }
    
    
    const menuCountry = ()=>{
      return (
        <DropdownMenu
        maj = {majCountry}
        list = {countrys}
        selected = {country}
        proprety = 'country'
        name = 'countryName'
        />
        )
      }
      
      
      
      
      const menuCategory = ()=>{
        return (
          <DropdownMenu
          maj = {majCategory}
          list = {categorys}
          selected = {category}
          proprety = 'category'
          name = 'categoryName'
          />
    )
  }

  

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

        <div 
        // style={banner}
        >
          <List
            style={listSources}
            itemLayout="horizontal"
            dataSource={sourceList}
            renderItem={source => (
              
              <List.Item
              style={listItemStyles}
              >
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



  function mapStateToProps(state){
    if(state.user.token !== "vide"){
      // state.artLikes = state.user.news;
      return {
        token : state.user.token,
        lang : state.user.lang !== 'language=undefined&' ? state.user.lang : 'All', 
        country : state.user.country !== 'country=undefined&' ? state.user.country : 'All', 
        category : state.user.category !== 'category=undefined&' ? state.user.category : 'All',
         }
    }else{
      return {
        token : 'vide',
        lang: 'All',
        country : 'All',
        category : 'All',
        news : [],
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