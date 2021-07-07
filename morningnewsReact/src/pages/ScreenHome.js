import React, {useState} from 'react';
import '../App.css';
import {connect} from 'react-redux';
import {Col, Row, Input,Button} from 'antd';
import {Redirect} from 'react-router-dom'
import { useEffect } from 'react';

import Nav from '../components/Nav'
import background from './img/background.jpg'
import { COLOR_LATTE, COLOR_COFFEE } from '../constants'





function ScreenHome(props) {

  const  backImage = {
    height: '100vh',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'noRepeat',
    backgroundSize: 'cover',
    // opacity: 0.7,
    }

  const LoginPage = {
    // height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',

    }

    const Sign = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 15,
      borderRadius: 15,
      borderColor: 'white',
      backgroundColor: 'rgba(148, 83, 9, 0.7)',
      margin: 40,
  }
  const loginInput = {
    margin: 15,
    width: '80%',
    borderRadius: 15,
    borderColor: COLOR_LATTE,

  }

  const btnStyle = {
    backgroundColor: COLOR_COFFEE,
    color: 'white',
    borderRadius: 15,
    borderColor: 'white',
    borderWight: 2,
  }

  const errStyle = {
    color: 'red',
  }


  const [login, setLogin] = useState ('');
  const [pass, setPass] = useState ('');
  const [loginInscr, setLoginInscr] = useState ('your login');
  const [passInscr, setPassInscr] = useState ('your password');
  const [passInscr2, setPassInscr2] = useState ('confirmation password');
  // const [user, setUser] = useState ([]);
  const [signin, setSignin] = useState(false);
  const [errSignIn, setErrSignIn] = useState('');
  const [errSignUp, setErrSignUp] = useState('');

  useEffect(() => {
    props.initialiserUser();
    misajour (login, pass, loginInscr, passInscr, passInscr2);
  }, [props,login, pass, loginInscr, passInscr, passInscr2]);


  function misajour (login, pass, loginInscr, passInscr, passInscr2) {
    setLogin(login);
    setPass(pass);
    setLoginInscr(loginInscr);
    setPassInscr(passInscr);
    setPassInscr2(passInscr2);
  }


  const loginFE = async ()=>{
    clearErr();
    // console.log('Process LoginFE. Login=', login);
    if(login === '' || pass === ''){
      misErrSignin ('le/les champs sont vides...');
    }else{
      var requet = {
        method : 'POST', 
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body : `login=${login}&pass=${pass}`
      };
      var resultRAW = await fetch(`/signin`, requet);
      // var resultRAW = await fetch(`/signin?login=${login}&pass=${pass}`);
      var result = await resultRAW.json();
      if(result.succes){
        // console.log('login with email = ', result.user.email);
        props.setUser(result.user);
        setSignin(true);
      }else{
        misErrSignin (result.error);
      }
    }
  }
  const inscrire = async ()=>{
    clearErr();
    // console.log('inscription. Login=', loginInscr);
    if (passInscr !== passInscr2){
      misErrInscr ('passwords ne sont pas identiques!');
    }else{
      var requet = {
        method : 'POST', 
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body : `login=${loginInscr}&pass=${passInscr}`
      };
      var resultRAW = await fetch(`/signup`, requet);
      var result = await resultRAW.json();
      if(result.succes){
        // console.log('login with email = ', result.user.email);
        props.setUser(result.user);
        setSignin(true);
      }else{
        misErrInscr (result.error);
      }
    }
  }

  function  clearErr(){
    // console.log('clearing errors ');
    setErrSignIn('');
    setErrSignUp('');
  }
  function misErrInscr(err){
    // console.log('mis en place ', err);
    setErrSignUp(err);
  }
  function misErrSignin(err){
    setErrSignIn(err);
  }


  if ( signin ){
    return (<Redirect to="/" />);
  }

  return (
    <div style={backImage}>
      <Nav  source />
      <Row style={LoginPage} >

        {/* SIGN-IN */}
        <Col xs={20} md={6} style={Sign}>

          <Input 
          onChange={ (e)=> setLogin(e.target.value)} 
          style={loginInput} 
          placeholder='your login' 
          value={login}
          // onPressEnter={loginFE()}
          />

          <Input.Password 
          onChange={ (e)=> setPass(e.target.value)} 
          style={loginInput} 
          placeholder='your password' 
          value = {pass} 
          // onPressEnter={loginFE()}
          />

          <Button 
          onClick={ ()=> loginFE() } 
          style={btnStyle}
          >
            Sign in
          </Button>

          <p>{errSignIn}</p>
        </Col>


        {/* SIGN-UP */}
        <Col xs={20} md={6} style={Sign}>

          <Input 
          onChange={ (e)=> setLoginInscr(e.target.value)} 
          style={loginInput} 
          placeholder={loginInscr} 
          // onPressEnter={inscrire()}
          />

          <Input.Password 
          onChange={ (e)=> setPassInscr(e.target.value)} 
          style={loginInput} 
          placeholder={passInscr} 
          // onPressEnter={inscrire()}
          />

          <Input.Password 
          onChange={ (e)=> setPassInscr2(e.target.value)} 
          style={loginInput} 
          placeholder={passInscr2} 
          // onPressEnter={inscrire()}
          />

          <Button 
          onClick={ ()=> inscrire() } 
          style={btnStyle} 
          >
            Sign up
          </Button>

          <p style={errStyle}>{errSignUp}</p>
        </Col>
      </Row>
    </div>
  );
  
}

function mapDispatchToProps(dispatch){
  return{
    setUser : function(user){
      dispatch({type : 'token', user : user})
    },
    initialiserUser : function(){
      dispatch({type : 'initialisation'})
    }
  }
}



export default connect (null, mapDispatchToProps) (ScreenHome);
