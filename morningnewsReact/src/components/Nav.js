import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import { Menu } from 'antd'

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
            <div type="home" />
            Sources
          </Link>
        </Menu.Item>

        <Menu.Item key="articles">
          <Link to="/screenmyarticles">
            <div type="read" />
            My Articles
          </Link>
        </Menu.Item>

        <Menu.Item key="login">
          <Link to="/login">
            <div type="logout" />
            {props.user.token === 'vide' ? 'Sign In / Sign Up' : 'Logout'}
          </Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}





export default connect(mapStateToProps, null) (Nav);