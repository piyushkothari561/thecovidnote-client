import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Mybutton from '../../util/Mybutton';
import PostNote from '../note/PostNote';
import Notifications from './Notifications'
//material ui imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//icons
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

 class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
           
                <AppBar position="static">
               <Button style={{fontSize: '35px', fontFamily:"Roboto"}}  component={Link} to="/">CovidNote</Button>

               <Toolbar className="nav-container">
                {authenticated ? (
                    <Fragment>
                         <PostNote />
                        <Link to="/" >
                        <Mybutton tip="Home">
                            <HomeTwoToneIcon  />
                        </Mybutton>
                        </Link>
                        <Notifications />
                    </Fragment>
        ) :  (
                   <Fragment>
                        <Button style={{fontFamily:"Roboto", fontSize: '22px'}}  size="large" component={Link} to="/login">Login</Button>
                    <Button style={{fontFamily:"Roboto", fontSize: '22px'}}  size="large" component={Link} to="/signup">SignUp</Button>
                    
                   </Fragment>
                )}

               </Toolbar>
            </AppBar>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };
  
  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  });
  
  export default connect(mapStateToProps)(Navbar);
