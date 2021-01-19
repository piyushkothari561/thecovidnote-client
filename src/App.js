import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import jwtDecode from 'jwt-decode';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//Components import 
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
//webpages
import  home from './webpages/home';
import  login from './webpages/login';
import  signup from './webpages/signup';
import  user from './webpages/user';

import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#BDC3C7 ',
      dark:'#000000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#000000',
      dark: '#b22a00',
      contrastText: '#fff'
    },
  },
  typography: {
    useNextVariants: true,
  },
});

axios.defaults.baseURL= 'https://asia-east2-thecovidnote-283505.cloudfunctions.net/api';
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


class App extends Component {
  render() { 
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
     <Router>
     <Navbar/>
       <div className="container">
       <Switch>
    <Route 
     exact path="/" 
     component={home}/>
    <AuthRoute 
     exact path="/login" 
     component={login} 
    />
    <AuthRoute 
     exact path="/signup" 
     component={signup} 
    />
       <Route exact path="/users/:handle" component={user} />
       <Route exact path="/users/:handle/note/:noteId" component={user} />
       </Switch>
       </div>
     </Router>
      </Provider>
    </MuiThemeProvider>
    
  );
}
}
export default App;
