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
//redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

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



class signup extends Component {
    constructor() {
      super();
      this.state = {
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
        errors: {}
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.UI.errors) {
        this.setState({ errors: nextProps.UI.errors });
      }
    }
    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({
        loading: true
      });
      const newUserData = {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        handle: this.state.handle
      };
      this.props.signupUser(newUserData, this.props.history);
    };
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
           <Grid container className={classes.form}>
               <Grid  item sm>
               <img src={AppIcon}  alt="Logo" className={classes.image}/>     
            </Grid>
               <Grid item sm>
                   <Card className={classes.card}>
                       <CardContent>
                       <Typography variant="h4" className={classes.pageTitle}>SignUp</Typography>        
                   <form noValidate onSubmit={this.handleSubmit}>
                       <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                      helperText={errors.email} error={errors.email ? true : false} value={this.state.email} onChange={this.handleChange} fullWidth/>
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                      helperText={errors.password} error={errors.password ? true : false} value={this.state.password} onChange={this.handleChange} fullWidth/>
                      <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField}
                      helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} value={this.state.confirmPassword} onChange={this.handleChange} fullWidth/>
                      <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField}
                      helperText={errors.handle} error={errors.handle ? true : false} value={this.state.handle} onChange={this.handleChange} fullWidth/>
                  {errors.general && (
                      <Typography variant="body2" className={classes.customError}>
                          {errors.general}
                      </Typography>
                  )}
                  <Button type="submit" variant="contained" color="primary" disabled={loading} 
                  className={classes.button}>SignUp
                   {loading && (<CircularProgress  size={30} className={classes.progress}>
                    </CircularProgress>)}</Button>
<br />                 <small>Already have an account? Login <Link to="/login">here!</Link></small>
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

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
  
  export default connect(
    mapStateToProps,
    { signupUser }
  )(withStyles(styles)(signup));