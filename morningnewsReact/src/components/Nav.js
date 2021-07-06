import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import { Menu, Row, Col } from 'antd'
import DropDownButton from '../components/DropDownButton'
import { connect } from 'react-redux';

import { COLOR_SLATE, COLOR_COFFEE } from '../constants'


function mapStateToProps(state){
  return {
    user : state.user,
  }
}

function Nav(props) {

  const {menuLang, lang, country, menuCountry, category, menuCategory, source} = props

  const navBarStyle= {
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    background: COLOR_SLATE,
  }
  
  const dropMenuStyle = { 
    paddingRight: 7,
    paddingLeft: 7, 
    paddingBottom: 0,
    paddingTop: 0,  
    margin: 0,
    border : 2,
    borderRadius : 15,
    color: COLOR_COFFEE,
    "&:hover":{
      background: '#fff',
    }
  }


  return (
    <Row style={navBarStyle}>
        {source &&
          <div key="home" style={dropMenuStyle} >
            <Link to="/">
              Sources
            </Link>
          </div>
        }

        {menuLang && 
          <span key="langMenu" style={dropMenuStyle}>
            <DropDownButton 
            title='Language ' 
            titleItem={lang} 
            dropdown={menuLang}
            /> 
          </span>
        }

        {menuCountry && 
          <span key="menuCountry" style={dropMenuStyle}>
            <DropDownButton 
            title="Country's source " 
            titleItem={country} 
            dropdown={menuCountry} 
            image='all' 
            />
          </span>
        }
        
        {menuCategory && 
          <span key="menuCategory" style={dropMenuStyle}>
            <DropDownButton 
            title="Category " 
            titleItem={category} 
            dropdown={menuCategory} 
            image='allCategorys'
            />
          </span>
        }
            <Link to="/screenmyarticles">
              My Articles
            </Link>
            <Link to="/login">
              {props.user.token === 'vide' ? 'Sign In / Sign Up' : 'Logout'}
            </Link>

    </Row>
  );
}





export default connect(mapStateToProps, null) (Nav);