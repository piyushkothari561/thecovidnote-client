import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import {Link} from 'react-router-dom';

// Material uI imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
//REDUX STUFF
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: 'auto',
        width: 320

    },
    pageTitle: {
        margin: 'auto 20px auto 20px'
    },
    textField: {
        margin: 'auto 20px 10px 20px',
        width: 260
    },
    button:{
        marginTop: 20,
        margin: 'auto auto 10px auto',
        position: 'relative'
    },
    card: {
        backgroundColor: '#808080'
 },
   customError: {
       color: 'red',
        fontSize: '1rem',
        marginTop:10
   },
   progress : {
       position: 'absolute'
   }
};



 class login extends Component {
     constructor(){
         super();
         this.state = {
             email: '',
             password: '',
             errors: {}
         };
     }
  componentWillReceiveProps(nextProps){
      if (nextProps.UI.errors) {
    this.setState({ errors: nextProps.UI.errors});
          }
       }   
     handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };
     handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
     }
    render() {
        const { classes, UI: {loading} } = this.props;
        const { errors } = this.state;
        return (
           <Grid container className={classes.form}>
               <Grid  item sm>
               <img src={AppIcon}  alt="Logo" className={classes.image}/>     
            </Grid>
               <Grid item sm>
                   <Card className={classes.card}>
                       <CardContent>
                       <Typography variant="h4" className={classes.pageTitle}>Login</Typography>        
                   <form noValidate onSubmit={this.handleSubmit}>
                       <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                      helperText={errors.email} error={errors.email ? true : false} value={this.state.email} onChange={this.handleChange} fullWidth/>
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                      helperText={errors.password} error={errors.password ? true : false} value={this.state.password} onChange={this.handleChange} fullWidth/>
                  {errors.general && (
                      <Typography variant="body2" className={classes.customError}>
                          {errors.general}
                      </Typography>
                  )}
                  <Button type="submit" variant="contained" color="primary" disabled={loading} 
                  className={classes.button}>Login
                   {loading && (<CircularProgress  size={30} className={classes.progress}>
                    </CircularProgress>)}</Button>
<br />                 <small>Don't have an account? Sign Up <Link to="/signup">here!</Link></small>
                   </form>
                       </CardContent>
                   </Card>
                    </Grid>
                    <Grid  item sm>
               <img src={AppIcon}  alt="Logo" className={classes.image}/>     
            </Grid>

           </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired 
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
