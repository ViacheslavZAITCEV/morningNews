import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource'
import ScreenMyArticles from './ScreenMyArticles'
import ScreenSource from './ScreenSource'
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import user from './reduceurs/user.reduceur';
// import artLikes from './reduceurs/artLikes.reduceur';


// const store = createStore(combineReducers({user, artLikes}));
const store = createStore(combineReducers({user}));

function App() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={ScreenSource} path="/" exact />
          <Route component={ScreenArticlesBySource} path="/screenarticlesbysource/:id" exact />
          <Route component={ScreenMyArticles} path="/screenmyarticles" exact />
          <Route component={ScreenHome} path="/login" exact />
        </Switch>
      </Router>
    </Provider>
    </>
  );
}

export default App;
