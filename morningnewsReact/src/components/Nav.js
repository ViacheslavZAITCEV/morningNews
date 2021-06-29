import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import { Menu } from 'antd'
import DropDownButton from '../components/DropDownButton'

import { connect } from 'react-redux';



function mapStateToProps(state){
  return {
    user : state.user,
  }
}

function Nav(props) {

  const {menuLang, lang, country, menuCountry, category, menuCategory, source} = props

  const dropdownStyle= {
    background: '#001529',
    color: '#fff',
    borderRadius: 15,
    margin: 15,
  }
  const dropdownHower = {
    background: '#002944',
  }
  const dropMenuStyle = { 
    paddingRight: 7,
    paddingLeft: 7, 
    paddingBottom: 0,
    paddingTop: 0,  
    margin: 0,
    borderRadius : 15 
  }


  return (
    <>
      <Menu style={{ justifyContent: 'space-around'}} mode="horizontal" theme="dark">

        {source &&
          <Menu.Item key="home" style={dropMenuStyle} >
            <Link to="/">
              <div type="home" />
              Sources
            </Link>
          </Menu.Item>
        }

        {menuLang && 
          <Menu.Item key="langMenu" style={dropMenuStyle}>
            <DropDownButton title='Language ' titleItem={lang} dropdown={menuLang}
             dropdownStyle={dropdownStyle}
            /> 
          </Menu.Item>
        }
        {menuCountry && 
          <Menu.Item key="menuCountry" style={dropMenuStyle}>
            <DropDownButton title="Country's source " titleItem={country} dropdown={menuCountry} image='all' 
            dropdownStyle={dropdownStyle}
            />
          </Menu.Item>
        }
        {menuCategory && 
          <Menu.Item key="menuCategory" style={dropMenuStyle}>
            <DropDownButton title="Category " titleItem={category} dropdown={menuCategory} image='allCategorys'
            dropdownStyle={dropdownStyle}
            />
          </Menu.Item>
        }

        <Menu.Item key="articles" style={dropMenuStyle}>
          <Link to="/screenmyarticles">
            <div type="read" />
            My Articles
          </Link>
        </Menu.Item>

        <Menu.Item key="login" style={dropMenuStyle}>
          <Link to="/login">
            <div type="logout" />
            {props.user.token === 'vide' ? 'Sign In / Sign Up' : 'Logout'}
          </Link>
        </Menu.Item>


      </Menu>
    </>
  );
}





export default connect(mapStateToProps, null) (Nav);