import React, {useState} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Input,Button} from 'antd';
import {Redirect} from 'react-router-dom'
import { useEffect } from 'react';

function ScreenHome(props) {
  // if (props.user.token == 'vide'){
  //   props.initialiserUser();
  // }

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
    return (<Redirect to="/screensource" />);
  }

  return (
    <div className="Login-page" >


          {/* SIGN-IN */}
          <div className="Sign">

                  <Input 
                  onChange={ (e)=> setLogin(e.target.value)} 
                  className="Login-input" 
                  placeholder='your login' 
                  value={login}
                  />

                  <Input.Password 
                  onChange={ (e)=> setPass(e.target.value)} 
                  className="Login-input" 
                  placeholder='your password' 
                  value = {pass} 
                  />

            <Button 
            onClick={ ()=> loginFE() } 
            style={{width:'80px'}} 
            type="primary"
            >
              Sign-in
            </Button>

            <p>{errSignIn}</p>

          </div>



          {/* SIGN-UP */}
          <div className="Sign">

                  <Input 
                  onChange={ (e)=> setLoginInscr(e.target.value)} 
                  className="Login-input" 
                  placeholder={loginInscr} 
                  />

                  <Input.Password 
                  onChange={ (e)=> setPassInscr(e.target.value)} 
                  className="Login-input" 
                  placeholder={passInscr} 
                  />

                  <Input.Password 
                  onChange={ (e)=> setPassInscr2(e.target.value)} 
                  className="Login-input" 
                  placeholder={passInscr2} 
                  />

                  <Button 
                  onClick={ ()=> inscrire() } 
                  style={{width:'80px'}} 
                  type="primary"
                  >
                    Sign-up
                  </Button>

            <p>{errSignUp}</p>
          </div>
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
