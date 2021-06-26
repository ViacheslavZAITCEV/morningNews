import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { Menu, Icon } from 'antd'

import { connect } from 'react-redux';


function mapStateToProps(state){
  return {
    user : state.user,
  }
}

function Nav(props) {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="home">
          <Link to="/">
            <Icon type="home" />
            Sources
          </Link>
        </Menu.Item>

        <Menu.Item key="articles">
          <Link to="/screenmyarticles">
            <Icon type="read" />
            My Articles
          </Link>
        </Menu.Item>

        <Menu.Item key="login">
          <Link to="/login">
            <Icon type="logout" />
            {props.user.token === 'vide' ? 'Sign In / Sign Up' : 'Logout'}
          </Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}





export default connect(mapStateToProps, null) (Nav);